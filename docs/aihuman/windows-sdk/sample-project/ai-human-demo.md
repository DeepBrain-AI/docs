---
sidebar_position: 3
---

# AI Human Demo
:::note 관련 파일

- DemoView.xaml
- DemoViewModel.cs

:::

AI Human Demo is a page where you can try out various functionalities of AIPlayer. You can try changing to another approved AI model through [AI Select]. For other details, please refer to [AIPlayer Description](#aiplayer-description).

<img src="/img/aihuman/windows/WPF_Sample_DemoPage.png" />

**First, get a list of available AIs and set up the UI. The Constants.appid, userKey, uuid, and targetPlatform below are parameters entered when calling AuthStart in HomeView.**

```csharp
AIAPI.Instance.AuthStart(Constants.AppId, Constants.UserKey, Constants.Uuid, Constants.TargetPlatform, (aiList, error) =>
{
    // You can get a list of available AIs via CallBack.
	AIAPI.AIList apiAIlist = JsonConvert.DeserializeObject<AIAPI.AIList>(aiList.Root.ToString());
	if (aiList == null)
	{
		AIStatusText = Resource.ApiAiListEmptyError;
	}

	AIs = new ObservableCollection<AIAPI.AI>();
	foreach (AIAPI.AI item in apiAIlist.ai)
	{
		AIs.Add(item);
	}
	SelectedAI = AIs[0];
});
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

    if (_speechList != null)
    {
        _speechList.Clear();
        _speechList = null;
    }

    _aiPlayer = new(SelectedAI.AIName, this);
    AIPlayerObject = _aiPlayer.GetObject();

    SpeechList = new ObservableCollection<string>(AIAPI.Instance.GetSampleTexts(SelectedAI.AIName));
    SpeechList.Insert(0, Resource.DefaultSpeech);

    SpeechIndex = 0;
    
    ...
}
```

**Examples of Speak, Preload, Pause, Multi Speak(Randomly), Resume, and Pause.** 

AIHuman.Core.RelayCommand is used for View and Command Binding. This implementation is only an example and it is not necessary to use AIHuman.Core.RelayCommand.

Please refer to the [AIPlayer description](#aiplayer-description) that follows below.

```csharp
private void Speak_Command(object args)
{
    _sendingMessage.Clear();

    _sendingMessage.Add(_speechText);
    
    _aiPlayer.Send(_sendingMessage.ToArray());
}

private void Preload_Command(object args)
{
    _sendingMessage.Clear();

    _sendingMessage.Add(_speechText);

    _isPreload = true;
    _aiPlayer.Preload(_sendingMessage.ToArray());
}

private void Stop_Command(object args)
{
    _aiPlayer.StopSpeaking();
    AIStatusText = Resource.StopStatus;
}

private void Multi_Command(object args)
{
    Random rand = new();
    _sendingMessage.Clear();

    for (int i = 1; i < SpeechList.Count; ++i)
    {
        if (rand.Next(0, 100) % 6 % 2 == 0)
        {
            _sendingMessage.Add(SpeechList[i]);
        }
    }

    _aiPlayer.Send(_sendingMessage.ToArray());
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
    void onAIPlayerError(AIError error);
    void onAIPlayerResLoadingProgressed(int current, int total);
    void onAIStateChanged(AIState state);
}
```

Through onAIStateChanged implementation, you can receive CallBack of AI states shown below.

:::info AIState.Type

- SPEAKING_STARTED: AI started speaking.
- SPEAKING_COMPLETED: AI finished speaking.
- SPEAKING_PREPARE_STARTED: AI started preparation to speak.
- RES_LOAD_COMPLETED: AI Resource loading completed.
- RES_LOAD_STARTED: AI Resource loading started.
- SPEAKING_PREPARE_COMPLETED: AI finished preparation to speak.
- ...

:::
