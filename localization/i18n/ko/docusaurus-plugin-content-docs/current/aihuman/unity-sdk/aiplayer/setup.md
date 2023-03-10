---
sidebar_position: 2
---

# 인증 및 생성하기

:::info 전체 셋업 과정 (총 4단계)

- 1단계: 유니티 Scene 구성하기 (AIHumanSDK, AIPlayer, AIPlayerUI 프리팹 배치)
- 2단계: Authenticate() 함수에 사용 할 AppID, 인증키, 플랫폼 등 정보 준비하기
- 3단계: Authenticate() 응답 구현하여 사용할 AI 가져오기
- 4단계: AIPlayer를 원하는 AI로 초기화하기

:::

### 1단계. 유니티 Scene 구성하기

- [AI Human 퀵스타트](/aihuman/unity-sdk/sample-project/quick-start)를 참고하여 Scene을 구성한다.
- AIHumanSDK 프리팹을 반드시 사용할 필요는 없다. AIHumanSDK 프리팹과 AIHumanSDKManager 스크립트는 SDK 사용자 편의를 위해 제공되는 것이므로 Inspector에 인정 정보를 설정하지 않고 AIHumanSDKManager.Instance.Authenticate(appId, userKey, platform, onComplete)를 함수를 직접 호출하여도 무방하다.
- AIPlayerUI 프리팹 또한 SDK 사용자 편의를 위해 제공되는 것으므로 반드시 사용할 필요는 없으며, 사용자 정의 UI 또는 Material을 제작하여 AIPlayer에서 제공하는 Texture를 적용할 수 있다.

### 2단계. 인증 관련 정보 준비하기

AuthStart 함수에는 3개의 전달인자가 필요하다. 이 3가지는 AppID, UserKey, Platform 정보이다. 

특히 UserKey는 DeepBrain AI에서 만든 문자열 타입으로써, 절대 외부에 노출되면 안되는 중요한 데이터이다. 이 인증키를 이용하여 API를 호출하면 사용 가능한 기본 AI 데이터와 앞으로 사용할 토큰을 얻는다. Platform은 사용자의 App Platform을 고려하여 Android, iOS, Windows 중에 하나를 선택한다.

**토큰 사용기간이 만료되어 토큰 리프레쉬가 필요한 경우는 Authenticate()를 다시 호출하면 리프레쉬가 된다.**

### 3단계. Authenticate 구현 및 AI 가져오기

2단계 과정에서 필요한 정보를 다 준비했다면 인증을 위한 준비가 완료된다. AIHumanSDKManager.Instance.Authenticate 함수의 매개변수로 인증 정보들을 전달하고 콜백 함수를 구현한다. 인증에 성공하면 사용할 수 있는 AI 목록을 돌려준다. 사용할 수 있는 AI가 없으면 aiList는 null이 반환된다. 

```csharp
AIHuman.SDK.AIHumanSDKManager.Instance.Authenticate("appId", "userKey", Platform.Android, (aiLIst, error) =>
{
    string message = string.Empty;
    if (error == null && aiLIst != null)
    {      
        message = string.Format("Auth Complete, Avaliable Count : {0}", aiLIst.ai.Length);

        /*   e.g.)           
            "ai":[{"aiName":"vida","aiDisplayName":"Vida","language":"en"},
                {"aiName":"bret","aiDisplayName":"Bret","language":"en"},
                {"aiName":"danny","aiDisplayName":"Danny","language":"en"},
                {"aiName":"kang","aiDisplayName":"Kang","language":"ko"}]
            */
    }
    else
    {
        message = string.Format("Auth Error : {0}", error);
    }
    Debug.Log(message);
});
```

### 4단계. AIPlayer를 원하는 AI로 초기화하기

인증 및 사용할수 있는 AI 목록을 확인 후 원하는 AI를 적용하려면 AIPlayer의 초기화 과정이 필요하다. AIPlayer.Init(string aiName, IAIPlayerCallback callback, IFrameImageProvider imageProvider) 함수를 호출하면 되는데 다른 AI로 교체가 필요할때도 마찬가지로 Init() 함수를 호출하면 된다.

AIPlayer가 성공적으로 초기화 되었다면 AIPlayer는 설정된 값에 따라 리소스를 다운받아 동작 가능한 상태로 바뀐다. 또한 AIPlayer.Init() 함수 호출 시 전달인자인 AIPlayerCallback에서 AI 동작 상태를 모니터링 할 수 있다.

