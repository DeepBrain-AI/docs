---
sidebar_position: 3
---

# AI Human Demo

:::note related files

- DemoView.xaml
- DemoViewModel.cs

:::

AI Human Demo is a page where you can try out various functionalities of AIPlayer. You can try changing to another approved AI model through [AI Select]. For other details, please refer to [AIPlayer Description](../../../category/aiplayer-description-1).

<img src="/img/aihuman/windows/sampledemo_1.4.x.png" />

**First, get a list of available AIs and set up the UI. The Constants.appId, userKey, uuid, and targetPlatform below are parameters entered when calling AuthStart in HomeView.**

```csharp
// AIPlayer's member variable
private AIPlayer _aiPlayer;
// AIPlayer's member property for View Binding
public object AIPlayerObject
{
    get => (_aiPlayer?.GetObject());
    private set => OnPropertyChanged(nameof(AIPlayerObject));
}

public DemoViewModel()
{
    ...

    // SDK Authentication API
    // Once the authentication is successfully completed, the assigned AI list can be checked. If the authentication fails or the assigned model does not exist, an error object will be delivered.
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

**The part that changes AI.** In addition to creating and adding AIPlayer, sample text is obtained and the utterance sentence ComboBox is filled. It is updated by getting the rest of the default settings.

```csharp
private void UpdateSelectedAI()
{
    if (_aiPlayer != null)
    {
        _aiPlayer.Dispose();
        _aiPlayer = null;
    }
    ...

    // Create an AIPlayer object through the AIPlayerOptions object.
    AIPlayerOptions options = new AIPlayerOptions(SelectedAI.aiName);
    _aiPlayer = new AIPlayer(options, this);
    // Update the view of the newly created AIPlayer object.
    AIPlayerObject = _aiPlayer.GetObject();           

    ...

    // You can get a list of gestures that are currently available to AI.
    _gestures = _aiPlayer.GetGestures();
    ...

    // You can inquire the languages currently set up by AI that can speak.
    // In addition, please refer to the API manual for API functions related to AI.
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

**Examples of Speak, Preload, Pause, Multi Speak(Randomly), Resume, and Pause.** 

AIHuman.Core.RelayCommand is used for View and Command Binding. This implementation is only an example and it is not necessary to use AIHuman.Core.RelayCommand.

Please refer to the [AIPlayer description](../../../category/aiplayer-description-1) that follows below.

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

**By implementing IAIPlayerCallback, it is possible to receive callback from AI operations.**

```csharp
public interface IAIPlayerCallback
{
    void OnAIPlayerError(AIError aiError);
    void OnAIPlayerResLoadingProgressed(int current, int total);
    void OnAIPlayerEvent(AIError aiEvent);
}
```

Through OnAIPlayerEvent implementation, you can receive Callback of AI Event shown below.

:::info AIEvent.Type

- RES_LOAD_COMPLETED: AI Resource loading completed.
- RES_LOAD_STARTED: AI Resource loading started.
- AICLIPSET_PLAY_PREPARE_STARTED: AI started preparation to speak.
- AICLIPSET_PLAY_PREPARE_COMPLETED: AI completed preparation to speak.
- AICLIPSET_PLAY_STARTED: AI started speaking.
- AICLIPSET_PLAY_COMPLETED: AI completed speaking.
- AICLIPSET_PLAY_FAILED: AI failed speaking.
- [Other Types](../../../aihuman/windows-sdk/apis/aievent)

:::
