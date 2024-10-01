---
sidebar_position: 2
---

# 인증 및 생성하기

:::info 전체 셋업 과정 (총 4단계)

- 1단계: 화면단에서 AIPlayer의 View와 binding할 레이아웃 추가하기
- 2단계: Authenticate 함수 호출 시 필요한 appId, userKey 등 정보 준비하기
- 3단계: Authenticate 콜백을 구현하여 사용할 AI 가져오기
- 4단계: AIPlayer를 원하는 AI로 초기화하기

:::

<br/>

`AIPlayer` 객체 생성 후 `GetObject()` 함수를 통해 View(UserControl) 객체를 얻어올 수 있습니다.  
현재 `IAIPlayer` interface 상에서 `GetObject()`의 타입은 `object`이며 AIHuman.SDK.WPF를 사용할 시 `AIPlayerView`로 캐스팅하거나 `object` 타입 그대로 binding해도 무방합니다.  

```csharp
// practical use example
private AIPlayer _aiPlayer;	// AIPlayer object to be used in cs
public object AIPlayerObject	// View (UserControl) of AIPlayer to be used in xaml
{
    get => _aiPlayer.GetObject();
    private set => OnPropertyChanged(nameof(AIPlayerObject));
}
```

## 1단계. 레이아웃 구성하기

XAML 파일에 AI Human을 사용할 View(UI Element)를 구성합니다. AI를 배치할 위치를 결정하고 거기에 `AIPlayer`를 Binding시킬 `ContentControl`을 생성합니다. CS 파일에는 실제 Binding되는 객체의 `Properties`를 정의합니다.

```csharp
public object AIPlayerObject
{
    get => _aiPlayer.GetObject();
    private set => OnPropertyChanged(nameof(AIPlayerObject));
}
```

```xml
...
	<Grid>
        <Grid.ColumnDefinitions>
            <ColumnDefinition/>
            <ColumnDefinition/>
        </Grid.ColumnDefinitions>

        <ContentControl Margin="0" Grid.Column="0" Content="{Binding Path=AIPlayerObject}" />
    </Grid>
...
```

## 2단계. 인증 관련 정보 준비하기

인증 과정에는 appId, userKey, uuid, platrom 정보가 필요합니다.  
현재 버전의 Authenticate 함수에서는 uuid와 platform 정보는 내부적으로 처리하고 있어 `appId`와 `userKey` 그리고 `callback` 3가지의 파라미터를 요구합니다.  

:::note

- appId와 userKey는 프로젝트 셋업하기 단계에서 획득 가능합니다.
- 이 부분은 추후 변경될 수 있습니다.

:::

특히 `userKey`는 DeepBrain AI에서 만든 문자열 타입으로써, **외부에 노출되지 않도록 주의**해야 합니다. 이 인증키를 이용하여 API를 호출하면 사용 가능한 기본 AI 데이터와 앞으로 사용할 `토큰` 등을 내부적으로 획득하게 됩니다.  
토큰 사용기간이 만료되어 토큰 리프레쉬가 필요한 경우는 `GenerateToken` 혹은 `Authenticate` 함수를 다시 호출하면 리프레쉬가 됩니다.  

## 3단계. 인증 이후 사용가능한 AI 획득하기

`AIHuam.AIAPI.Instance.Authenticate` 함수의 매개변수에 준비한 정보들을 입력하고 콜백 함수를 구현합니다. 인증에 성공하면 사용할 수 있는 AI 목록을 리턴합니다. 사용할 수 있는 AI가 없으면 aiList는 null이 반환됩니다.

```csharp
public ObservableCollection<AIAPI.AI> AIs { get; private set; }

...

AIAPI.Instance.Authenticate("APPID", "USERKEY", (aiList, error) => {
    string message = string.Empty;
    if (error == null)
    {
        message = $"Auth Complete, Avaliable Count : {aiList.ai.Length}";

        /* e.g.)
        "ai":[{"aiName":"vida","aiDisplayName":"Vida","language":"en", ...},
                {"aiName":"bret","aiDisplayName":"Bret","language":"en", ...},
                {"aiName":"danny","aiDisplayName":"Danny","language":"en", ...},
                {"aiName":"kang","aiDisplayName":"Kang","language":"ko", ...}]
        */

        AIs = new ObservableCollection<AIAPI.AI>();
        foreach (AIAPI.AI item in aiList.ai)
        {
            AIs.Add(item);
        }
    }
    else
    {
        message = $"Auth Error : {error.ToString()}";
    }

    AIHuman.Utils.Log.Write(message, Log.Level.Info);
});
```

2단계에서 언급한 `토큰`은 대기상태([IDLE](../../../aihuman/windows-sdk/apis/aiplayerstate))가 오랜 시간(12시간 이상) 지속될 경우 만료됩니다. 이때 발화 등의 신규 동작을 요청할 때 에러 콜백을 전달합니다.  
아래와 같이 내부적으로 관리되는 `토큰`을 갱신할 수 있습니다.

```csharp
AIAPI.Instance.GenerateToken("APPID", "USERKEY");
```

인증 혹은 토큰을 갱신한 이후에 아래와 같이 사용가능한 AI 목록을 갱신 조회할 수 있습니다.

```csharp
public ObservableCollection<AIAPI.AI> AIs { get; private set; }

...

AIAPI.Instance.GetAIList((aiList, error) => {
    string message = string.Empty;
    if (error == null)
    {
        message = $"Auth Complete, Avaliable Count : {aiList.ai.Length}";

        AIs = new ObservableCollection<AIAPI.AI>();
        foreach (AIAPI.AI item in aiList.ai)
        {
            AIs.Add(item);
        }
    }
    else
    {
        message = $"Auth Error : {error.ToString()}";
    }

    AIHuman.Utils.Log.Write(message, Log.Level.Info);
});
```

## 4단계. AIPlayer를 원하는 AI로 초기화하기

인증 및 사용할 수 있는 AI 목록을 확인 후 실제로 어떤 AI를 적용하려면 그 AI로 초기화가 필요합니다. 우선, 아래 예제 코드와 같이 원하는 `AIAPI.AI.aiName`으로 `AIPlayerOptions` 객체를 생성합니다. 기존에 사용하고 있던 `AIPlayer` 객체를 제거하고 싶다면 `Dispose` 함수를 이용하여 자원을 해제해 줍니다.

### AIPlayerOptions 
`AIPlayer` 객체를 생성하기 위한 매개변수로 사용됩니다. 초기화 시에만 유효하고 런타임 시 `AIPlayer` 객체의 프로퍼티 혹은 함수를 이용하도록 구현에 참고하세요.

#### AIName
초기화 하고자 하는 AI를 설정합니다.  
`AIHuman.Core.AIAPI.Authenticate` 혹은 `GetAIList` 함수를 통해 얻어오는 `AIList.AI.aiName` 값을 해당 프로퍼티에 대입합니다.  
임의의 값을 대입할 경우 AIPlayer가 정상적으로 초기화 되지 않을 수 있습니다.

#### AIScale
AI의 [스케일](../../../aihuman/windows-sdk/aiplayer/other-features#스케일-조절하기)을 초기화 단계에서 설정합니다.  
기본값은 `1.0f` 입니다.

#### AIMargin
AI의 [여백](../../../aihuman/windows-sdk/aiplayer/other-features#여백-조절하기)을 초기화 단계에서 설정합니다.  
기본값은 `null` 입니다.

#### AISpeed
AI의 [말하기 속도](../../../aihuman/windows-sdk/aiplayer/advanced-features#ai-말하기-속도-조절하기)를 초기화 단계에서 설정합니다.  
기본값은 `1.0f` 입니다.

#### AIDisconnection
AI의 [접속 해제](../../../aihuman/windows-sdk/aiplayer/other-features#ai와-접속-해제하기)를 초기화 단계에서 설정합니다.  
기본값은 `false` 입니다.

#### AICachingStrategy
AIPlayer의 로컬 [캐싱 전략](../../../aihuman/windows-sdk/aiplayer/basic-features#로컬-캐싱)을 초기화 단계에서 설정합니다.  
기본값은 `AIHuman.Interface.AIPlayerCachingStrategy.V1` 입니다.

#### CacheLimit
AIPlayer의 [최대 로컬 캐싱 수](../../../aihuman/windows-sdk/aiplayer/basic-features#로컬-캐싱)를 초기화 단계에서 설정합니다.  
기본값은 `2000`개 입니다. 단위는 `AIClipSet` 입니다.

```csharp
public AIPlayer AIPlayerObject // View Binding object
{
    ...
}

...

private AIAPI.AI _selectedAI;
public AIAPI.AI SelectedAI
{
    get => _selectedAI;
    set
    {
        if (value == null)
        {
            return;
        }

        _selectedAI = value;
        OnPropertyChanged(nameof(SelectedAI));
        UpdateSelectedAI();
    }
}

...

private void UpdateSelectedAI()
{
   	if (_aiPlayer != null)
    {
        _aiPlayer.Dispose();
        _aiPlayer = null;
    }

    GestureList?.Clear();
    SpeakableLanguages?.Clear();

    AIPlayerOptions options = new AIPlayerOptions(SelectedAI.aiName);
    //options.AICachingStrategy = AIPlayerCachingStrategy.V2; // for using local caching
    //options.CacheLimit = 300; // for using local caching Limit
    //options.AIScale = 1.2f; // for AI Human Scale
    //options.AISpeed = 1.2f; // for AI Human Speed
    //options.AIMargin = AIMargin; // for AI Human Position
    //options.AIDisconnection = true; // for AI Human network on/off-line

    _aiPlayer = new AIPlayer(options, this);
    AIPlayerObject = _aiPlayer.GetObject();     
    
    ...
}
```

이렇게 하면 `AIPlayer`는 설정된 값에 따라 초기화(리소스 다운로드 및 로딩) 완료 후 동작 가능한([IDLE](../../../aihuman/windows-sdk/apis/aiplayerstate)) 상태로 바뀌게됩니다. 또한 `AIPlayer` 생성자의 두번째 인자로 등록된 콜백으로 AI의 이벤트 등을 보고 받을 수 있습니다.

:::info Dev Tips!

- AIPlayerOptions 객체를 이용해 다양한 옵션을 설정할 수 있어요!
- AIHuman.Interface.IAIPlayerCallback를 상속 받아 구현된 객체를 통해 이벤트 등을 콜백 받을 수 있어요!
- API 편람에서도 이와 관련하여 명세하고 있어요!

:::

AI 이벤트 등의 콜백 관련해서는 다음 장에서 다루도록 하겠습니다.
