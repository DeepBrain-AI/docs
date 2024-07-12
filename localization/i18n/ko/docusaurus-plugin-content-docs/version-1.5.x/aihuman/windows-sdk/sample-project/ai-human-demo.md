---
sidebar_position: 3
---

# AI Human 데모
:::note Sample Project에서 아래 파일들을 참고하세요.

- DemoView.xaml
- DemoViewModel.cs

:::

AI Human SDK Demo는 AIPlayer의 다양한 기능을 살펴볼 수 있는 메뉴입니다. [AI 선택]을 통해 승인된 다른 AI 모델로 변경할 수 있습니다. 기타 자세한 내용은 [AIPlayer 설명](../../../category/aiplayer-description-1)을 참고하세요.

<img src="/img/aihuman/windows/sampledemo_1.5.x.png" />

**먼저 사용 가능한 AI 목록을 가져와 UI를 설정합니다. 아래 AIAPI.AppId, AIAPI.UserKey는 앞서 입력한 App.xaml.cs의 APPID, USERKEY와 동일합니다. HomeView에서 Authenticate를 호출할 때 사용한 매개 변수입니다.**
- 엄밀히 말하면 HomeView에서의 Authenticate는 App.xaml.cs의 생성자에 의한 호출을 의미합니다.
- 초기 Authenticate 호출에 사용한 첫번째, 두번째 인자는 AIAPI.AppId, AIAPI.UserKey에 내부적으로 할당됩니다.

```csharp
// AIPlayer 객체 멤버 변수
private AIPlayer _aiPlayer;
// AIPlayer 뷰 반인딩 멤버 프로퍼티
public object AIPlayerObject
{
    get => (_aiPlayer?.GetObject());
    private set => OnPropertyChanged(nameof(AIPlayerObject));
}

public DemoViewModel()
{
    ...

    // SDK 인증 API
    // 인증이 성공적으로 완료되면 할당된 AI 목록을 확인할 수 있습니다. 인증에 실패하거나 할당된 모델이 없다면 에러 객체를 전달합니다.
    AIAPI.Instance.Authenticate(AIAPI.AppId, AIAPI.UserKey, (aiList, error) =>
    {
        try
        {
            if (error != null)
            {
                AIStatusText = error.ToString();
                return;
            }

            AIs = new ObservableCollection<AIAPI.AI>();
            foreach (AIAPI.AI item in aiList.ai)
            {
                AIs.Add(item);
            }

            SelectedAI = AIs[0];
        }
        catch (Exception /*e*/)
        {
            AIStatusText = Resource.ApiAiListEmptyError;
        }
    });

    ...
}
```

**AI 모델을 변경하는 부분 입니다.** AIPlayer를 생성하고 추가하는 것 외에도 샘플 텍스트를 얻어오고 발화 문장 콤보박스를 채웁니다. 나머지 기본 설정값들도 가져와 업데이트됩니다.
자세한 사항은 샘플 프로젝트의 코드를 참고하세요.

```csharp
private void UpdateSelectedAI()
{
    if (_aiPlayer != null)
    {
        _aiPlayer.Dispose();
        _aiPlayer = null;
    }
    ...

    // AIPlayerOptions 객체를 통해 AIPlayer 객체를 생성합니다.
    AIPlayerOptions options = new AIPlayerOptions(SelectedAI.aiName);
    _aiPlayer = new AIPlayer(options, this);
    // 새로 생성한 AIPlayer 객체의 뷰를 갱신합니다.
    AIPlayerObject = _aiPlayer.GetObject();           

    ...

    // 현재 AI가 사용할 수 있는 gesture 목록을 얻을 수 있습니다.
    _gestures = _aiPlayer.GetGestures();
    ...

    // 구사할 수 있는 언어들을 조회할 수 있습니다.
    // 이외에 AI와 관련된 API 함수들은 API 편람을 참고해 주세요.
    SpeakableLanguages = AIAPI.GetSpeakableLanguages(_aiPlayer.AIGender);
    ...
}

private void UpdateSelectedLanguage()
{
    ...

    AIAPI.Instance.GetSampleTextList(curLang, (texts, err) => { 
        ...
    });
}
```

**다음은 플레이(발화), 프리로드, 일시정지, 재개, 정지 등의 예제입니다.** 

AIHuman.Core.RelayCommand는 View에서 명령 바인딩(Command Binding)에 사용됩니다. 이 구현은 예세로써 편의를 위해 제공할 뿐 필수적으로 AIHuman.Core.RelayCommand를 사용할 필요는 없습니다.

기타 자세한 내용은 [AIPlayer 설명](../../../category/aiplayer-description-1)을 참고하세요.

```csharp
private void Speak_Command(object args)
{
    _sendingMessage.Clear();
    CustomVoice cv;
    if (LanguageIndex == 0)
    {
        cv = CVIndex == 0 ? null : _customVoices[CVIndex - 1];
    }
    else
    {
        cv = _customVoices[CVIndex];
    }

    _aiPlayer.SetCustomVoice(cv);

    AIClipSet clip;
    if (GestureIndex > 0)
    {
        if (GstEnableSpeech)
        {
            clip = AIAPI.CreateClipSet(_speechText, _gestures[GestureIndex - 1].Name);
        }
        else
        {
            clip = AIAPI.CreateClipSet("", _gestures[GestureIndex - 1].Name);
        }
    }
    else
    {
        clip = AIAPI.CreateClipSet(_speechText);
    }
    _sendingMessage.Add(clip);

    _aiPlayer.Send(new[] { clip });
}

private void Preload_Command(object args)
{
    _sendingMessage.Clear();

    AIClipSet clip;
    if (GestureIndex > 0)
    {
        if (GstEnableSpeech)
        {
            clip = AIAPI.CreateClipSet(_speechText, _gestures[GestureIndex - 1].Name);
        }
        else
        {
            clip = AIAPI.CreateClipSet("", _gestures[GestureIndex - 1].Name);
        }
    }
    else
    {
        clip = AIAPI.CreateClipSet(_speechText);
    }

    _sendingMessage.Add(clip);

    _aiPlayer.Preload(new[] { clip });
}

private void Stop_Command(object args)
{
    _aiPlayer.StopSpeaking();
    AIStatusText = Resource.StopStatus;
}

private void Resume_Command(object args)
{
    _aiPlayer.Resume();
    AIStatusText = Resource.ResumeStatus;
}

private void Pause_Command(object args)
{
    _aiPlayer.Pause();
    AIStatusText = Resource.PauseStatus;
}
```

**IAIPlayerCallback 구현을 통해, AI 모델 및 AIPlayer의 동작에 대한 콜백을 받을 수 있습니다.**

```csharp
public interface IAIPlayerCallback
{
    void OnAIPlayerError(AIError aiError);
    void OnAIPlayerResLoadingProgressed(int current, int total);
    void OnAIPlayerEvent(AIError aiEvent);
}
```

예를 들어 OnAIPlayerEvent 구현을 통해 아래와 같은 AI 이벤트 콜백을 받을 수 있습니다.

:::info AIEvent.Type

- RES_LOAD_STARTED: AI 리소스 로딩이 시작 되었을 때 발생
- RES_LOAD_COMPLETED: AI 리소스 로딩이 완료 되었을 때 발생
- AICLIPSET_PLAY_PREPARE_STARTED: AI가 발화 관련 준비 시작 시 발생
- AICLIPSET_PLAY_PREPARE_COMPLETED: AI가 발화 관련 준비 완료 시 발생
- AICLIPSET_PLAY_STARTED: AI 발화 시작 시 발생
- AICLIPSET_PLAY_COMPLETED: AI 발화 완료 시 발생
- AICLIPSET_PLAY_FAILED: AI 발화 실패 시 발생
- [이 외의 Type](../../../aihuman/windows-sdk/apis/aievent)

:::
