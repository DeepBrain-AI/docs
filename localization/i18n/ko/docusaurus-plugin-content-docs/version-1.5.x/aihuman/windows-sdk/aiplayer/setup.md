---
sidebar_position: 2
---

# 인증 및 생성하기

:::info 전체 셋업 과정 (총 4단계)

- 1단계: 화면단에서 AIPlayer의 View와 binding할 레이아웃 추가하기
- 2단계: Authenticate 함수 호출 시 필요한 appId, userKey 등 정보 준비하기
- 3단계: Authenticate 응답을 구현하여 사용할 AI 가져오기
- 4단계: AIPlayer를 원하는 AI로 초기화하기

:::

<br/>

AIPlayer를 생성하고 GetObject() 함수를 통해 View(UserControl) 객체를 얻어올 수 있습니다.  
현재 `IAIPlayer` interface 상에서 GetObject()의 타입은 `object`이며 AIHuman.SDK.WPF를 사용할 시 `AIPlayerView`로 캐스팅하거나 `object` 타입을 그대로 binding해도 무방합니다.  

```csharp
// practical use example
private AIPlayer _aiPlayer;	// AIPlayer object to be used in cs
public object AIPlayerObject	// View (UserControl) of AIPlayer to be used in xaml
{
    get => _aiPlayer.GetObject();
    private set => OnPropertyChanged(nameof(AIPlayerObject));
}
```

### 1단계. 레이아웃 구성하기

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

### 2단계. 인증 관련 정보 준비하기

인증 과정에는 appId, userKey, uuid, platrom 정보가 필요합니다.  
현재 버전의 Authenticate 함수에서는 uuid와 platform 정보는 내부적으로 처리하고 있어 `appId`와 `userKey` 그리고 `callback` 3가지의 파라미터를 요구합니다.  

:::note

- appId와 userKey는 프로젝트 셋업하기 단계에서 획득 가능합니다.
- 이 부분은 추후 변경될 수 있습니다.

:::

특히 `userKey`는 DeepBrain AI에서 만든 문자열 타입으로써, **외부에 노출되지 않도록 주의**해야 합니다. 이 인증키를 이용하여 API를 호출하면 사용 가능한 기본 AI 데이터와 앞으로 사용할 토큰 등을 획득하게 됩니다.

토큰 사용기간이 만료되어 토큰 리프레쉬가 필요한 경우는 GenerateToken 함수 혹은 Authenticate()를 다시 호출하면 리프레쉬가 됩니다.

### 3단계. Authenticate 함수 및 사용가능한 AI 획득하기

2 단계 과정에서 필요한 정보를 다 준비했다면 인증을 위한 준비가 완료됩니다. AIHuam.AIAPI.Instance의 Authenticate 함수 파라미터들로 정보들을 입력하고 콜백 함수를 구현합니다. 인증에 성공하면 사용할 수 있는 AI 목록을 리턴합니다. 사용할 수 있는 AI가 없으면 aiList는 null이 반환됩니다.

```csharp
public ObservableCollection<AIAPI.AI> AIs { get; private set; }

...

AIAPI.Instance.Authenticate(APPID, USERKEY, (aiList, error) => {
    string message = string.Empty;
    if (error == null)
    {
        message = string.Format("Auth Complete, Avaliable Count : {0}", aiList.ai.Length);

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

    AIHuman.Util.Log.LogWrite(message);
});
```

### 4단계. AIPlayer를 원하는 AI로 초기화하기

인증 및 사용할 수 있는 AI 목록을 확인 후 실제로 어떤 AI를 적용하려면 그 AI로 초기화가 필요합니다. 우선, 아래와 같이 원하는 `AIAPI.AI.aiName`으로 `AIPlayer` 객체를 생성합니다. 기존에 생성된 AIPlayer가 있다면 아래와 같이 제거해주고 새로 생성합니다.

이렇게 하면 AIPlayer는 설정된 값에 따라 리소스를 다운받아 동작 가능한 상태로 바뀌게됩니다. 또한 AIPlayer 생성자의 두번째 인자로 등록된 콜백으로 AI의 이벤트 등을 보고 받을 수 있습니다.

:::info Dev Tips!

- AIHuman.Interface.IAIPlayerCallback를 상속 받아 구현된 객체를 통해 이벤트 등을 콜백 받을 수 있어요!
- AIPlayer.State를 통해 콜백과 별개로 AIPlayer의 상태값을 확인할 수 있어요!
- API 편람에서 이와 관련되어 명세하고 있어요!

:::

```csharp
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
