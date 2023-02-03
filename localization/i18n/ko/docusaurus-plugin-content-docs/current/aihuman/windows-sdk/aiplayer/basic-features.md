---
sidebar_position: 4
---

# 발화 관련 기본 기능

### Basic Speaking using AIClipSet and Monitor AI Speaking

After AIPlayer resource is loaded, call **Send method**. To activate the function, in the sample below, select the sentence to speak through the drop-down menu and click the **Play** button on the right.

In general, speech can be performed using pure text, but speech can also be performed using [AIHuman.Common.Model.AIClipSet](#main-class-apis). Also, speech can be performed along with a specific gesture. For example, you could instruct the AI to say hello by waving his hand. This is called gesture speech. Details are explained in [Gesture speech related parts](#main-class-apis).

If the text to speak is too long, it may not be possible to synthesize the resources required for the utterance. There are some models that can synthesize long sentences. Although it varies from ai to ai, it is generally recommended that sentences be cut to an appropriate length in Korean, usually within 30 to 40 characters, and at a similar level in English. In addition, if special characters, lists of incomplete characters, numbers, formulas, symbols, characters or abbreviations in other languages are included, they may or may not be uttered differently than expected.

<img src="/img/aihuman/windows/Speak_Haylyn.png" />

```csharp
// using pure-text
_aiPlayer.Send(new[] {"this is sample sentence."});
// using AIClipSet
AIClipSet clip = AIAPI.CreateClipSet("this is sample sentence.");
_aiPlayer.Send(new[] {clip});
```

### Speaking related Monitoring

After the Send method is called, you can listen to the operation status feedback in the registered listener. This feedback is returned by calling the method (onAIStateChanged) of the listener(IAIPlayerCallback). onAIStateChanged sequentially returns the following AIState values. 

- SPEAKING_PREPARE_STARTED 
- SPEAKING_PREPARE_COMPLETED
- SPEAKING_STARTED
- SPEAKING_COMPLETED

```csharp
// Speaking related CallBack example
public void onAIStateChanged(AIState state)
{
    if (state.state == AIState.Type.SPEAKING_PREPARE_STARTED)
    {
        _txtStatus.text = "AI started preparation to speak.";
    } 
    else if (state.state == AIState.Type.SPEAKING_PREPARE_COMPLETED)
    {
        _txtStatus.text = "AI finished preparation to speak.";
    }
    else if (state.state == AIState.Type.SPEAKING_STARTED)
    {
        _txtStatus.text = "AI started speaking.";
    }
    else if (state.state == AIState.Type.SPEAKING_COMPLETED)
    {
        _txtStatus.text = "AI finished speaking.";
    }
}

// AI error CallBack example
public void onAIPlayerError(AIError error)
{
    if (error.errorType == AIError.Type.SOCKET_ERR)
    {
		_txtStatus.text = "Socket Error: " + error.exInfo;
    }
    else if (error.errorType == AIError.Type.RES_LOAD_ERR)
    {
        _txtStatus.text = "Resource Error: " + error.exInfo);
    }
	else if (error.errorType == AIError.Type.SPEAK_SEND_ERR)
    {
		_txtStatus.text = "Speak Error: " + error.exInfo);
    }
}
```
<br/>

The following are actions that can be performed while the AIPlayer is Speaking.

### Pause Speaking

: Pause speaking.
```csharp
// pause method
_aiPlayer.Pause()
```

### Resume Speaking

: Resume speaking. (resume from pause)
```csharp
// resume method
_aiPlayer.Resume()
```

### Stop Speaking

: Stop speaking and reset all data. (cannot resume)
```csharp
// stop method
_aiPlayer.StopSpeaking()
```
