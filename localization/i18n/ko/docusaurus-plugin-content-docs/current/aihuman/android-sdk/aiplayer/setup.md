---
sidebar_position: 2
---

# 인증 및 생성하기

:::info AIPlayer(AI3DPlayer) 셋업 (4 단계)

- 1단계: SDK 사용자 인증. (appId 및 userKey가 올바르지 않으면 콜백이 실패를 반환합니다.)
- 2단계: 사용 가능한 AI 목록을 가져옵니다. (인증을 수행하지 않으면 실패가 반환됩니다.)
- 3단계: AIPlayer를 생성합니다.
- 4단계: AI 모델 중 하나로 AIPlayer를 초기화합니다.

:::

### 1단계. SDK 사용자 인증

AIPlayer를 사용하기 위해서는 우선 권한을 가진 사용자인지 확인하는 과정(인증)이 필요하다. 사용자 인증을 위한 첫번째 단계는 사용자 인증키를 획득하는 것이다. 사용자키(userkey)는 [여기](../getting-started/first-aihuman.md)에 얻는 절차가 있다. 이 사용자 키는 DeepBrain AI에서 만든 특정 문자열(e.g. AAAAAAA7-BBB3-CCC3-DDD3-EEEEEEEEEEE11)로서 절대 외부에 노출해서는 안된다. 이 인증키를 이용하여 API를 호출하면 사용 가능한 기본 AI의 정보와 앞으로 사용할 토큰을 얻는다.

방법은 다음과 같이 AIModelInfoManager.generateToken(,,,) 메소드에 획득한 userKey 및 appId를 전달하여 호출하고, listener 등록해 결과를 받으면 된다. 결과는 인자로 전달한 listener로 전달된다. resp에는 바로 사용할수 있는 기본 AI 정보가 들어 있다. 토큰이 사용기간이 만료되어 토큰 리프레쉬가 필요한 경우 이 API를 호출하면 리프레쉬가 된다.

이 메소드는 앱시작 후 네트워크가 되는 상태에서 가능한한 빠르게(Launcher 액티비티의 onCreate 등) 호출하는 것이 좋다. 

**AI3DPlayer를 사용하기 위해 UnityPlayerActivity를 이용한다면 AIModelInfoManager.generateToken()을 재호출해줘야한다. 프로세스가 달라 값이 공유되지 않음.**   

```java
	AIModelInfoManager.generateToken(this, appId, userkey, (aiError, resp) -> {
        /* resp{
            "succeed":true,
            "defaultAI": {"ai_name":...}
            */

        if (aiError == null) {
            //create aiplayer inside aiWrapper
            aiPlayer = AIPlayerFactory.create(AILiveQuickStart.this, binding.aiWrapper, AILIVE, null);

            //init with default ai
            AIModelInfo defaultAI = AIModelInfoManager.getDefaultAIModelInfo();
            AIPlayerSettings aiSettings = new AIPlayerSettings(defaultAI.getName(), AILIVE, 0.8f, 40, 1);
            aiPlayer.init(aiSettings, iAiPlayerCallback);
        } else {
            Log.d(TAG, "onCreate: generateToken error:" + aiError);
        }
    });
```



### 2단계. 인증 후 사용할수 있는 AI 리스트 확인하기 

AIModelInfoManager는 인증을 하고, 그 인증 결과를 가지고 있다. 인증 후 어떤 AI를 사용할수 있는지 확인하려면 인증 과정을 거친 후 다음 메소드를 호출하면 된다. 사용할수 있는 AI가 없거나, 인증 이전에 이 값을 확인해보면 null을 반환한다.

```java
AIModelInfoManager.getAIList((aiError, resp) -> {
    /* resp
    {"succeed":true,
     "ai":[{"aiName":"vida","aiDisplayName":"Vida","language":"en"},
            {"aiName":"bret","aiDisplayName":"Bret","language":"en"},
            {"aiName":"danny","aiDisplayName":"Danny","language":"en"},
            {"aiName":"samh","aiDisplayName":"Samh","language":"en"},
            {"aiName":"kang","aiDisplayName":"Kang","language":"ko"}]}
     */

    if (aiError == null) {
        setUpUIWithAIPlayer();
    } else {
        Log.d(TAG, "onFinishedWithList: getAILit error: " + aiError);
    }
});
```



**인증 후 사용할수 있는 AI 이름 확인하기**

```java
//2D or 3D selection
JSONArray arr = AIModelInfoManager.getReceivedAIWithType("2D");
```

### 3단계. AIPlayer 생성 및 반환 하기

1,2 단계 과정에서 인증과 사용할 수 있는 AI들을 확인하였으면, 이제 사용할 AIPlayer를 생성해보자. 생성하는 방법은 생성자를 이용하거나 객체 생성 팩토리 메소드를 이용하여 생성할수 있다. 

생성할 때 생성자의 인자 context는 AIPlayer(extends View)를 포함할 activity를 말하며, parent는 AIPlayer가 add될 부모뷰를 지정한다. AIPlayer의 layout parameter(width, height)는 모두 match_parent로 되어있다.

**AIPlayer 생성하는 방법은 아래와 같다.**

```java
IAIPlayer aiPlayer = new AIPlayer(context, parent);

//Or use factory method 
//IAIPlayer aiPlayer = AIPlayerFactory.create(context, parent, UNITY, null);

//for 3d char
//mUnityPlayer = new AI3DPlayer(UnityActivity.this,
//                findViewById(R.id.unity_wrapper), UnityActivity.this);
//mAI3DPlayer = (AI3DPlayer) mUnityPlayer;
```

**자원 반환하기 (release)**

다 사용했을 때(onDestroy 등)는 aiPlayer.release()를 호출하여 자원을 환원해야한다.

```java
@Override
protected void onDestroy() {
    super.onDestroy();

    if (aiPlayer != null) {
        aiPlayer.release();
    }
}
```



### 4단계. AIPlayer를 원하는 AI로 초기화하기

AIPlayer 객체 생성 후 실제로 어떤 ai를 적용하여 사용하려면 그 ai로 초기화가 필요하다. 방법은 아래와 같이 AIPlayerSettings 클래스를 원하는 aiName을 주고 만들어 AIPlayer의 init(..., ...) 메소드를 호출하는 것이다. 이렇게 하면 aiPlayer는 설정된 값에 따라 리소스를 다운받아 동작 가능한 상태로 바뀐다. 또한 등록된 콜백으로 상황을 보고 받을 수 있다.  

```java
//AIPlayer created 
IAIPlayer aiPlayer = new AIPlayer(context, parent);

//set aiName and init.
AIPlayerSettings config = new AIPlayerSettings(
                   aiName, IAIPlayer.AIPlayerType.AIHuman, .8f, 80, 1f);
//set iAIPlayerCallback for callback.
aiPlayer.init(config, iAIPlayerCallback);

//for 3d 
//mUnityPlayer = new AI3DPlayer(UnityActivity.this,
//                findViewById(R.id.unity_wrapper), UnityActivity.this);
//        mAI3DPlayer = (AI3DPlayer) mUnityPlayer;
//AIPlayerSettings curAIPlayerSettings = new AIPlayerSettings(
//                    ai.optString(Constants.KEY_AINAME), UNITY, 1.f, 0, 1f);
// mAI3DPlayer.init(curAIPlayerSettings, iAiPlayerCallback);
```

AIPlayer의 init 메소드에 config(AIPlyerSettings) 인자는 player의 설정이다. AIPlyerSettings 클래스의 aiName은 사용할 AI를 결정한다. aiScale은 기본 1.0이며 aiTopMargin은 상단으로부터 거리. aiSpeed는 말하기 속도(기본 1)를 말한다. init 메소드에 callback인자는 AIPlayer의 이벤트, 로딩 상태, 에러 등을 모니터링하며 적절한 동작을 취할수 있는 리스너이다.

**3D Character의 경우는 약간의 추가 셋업 과정이 필요하다. [링크](../sample-project/with-3d-character.md) 참조**
