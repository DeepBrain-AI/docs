---
sidebar_position: 4
---

# AIPlayer Basic Speaking Features

### Basic Speaking using AIClipSet and Monitor AI Speaking

After AIPlayer resource is loaded, call **Send method**. In AI Human SDK Demo, the function operates when you select a utterance sentence from the Dropdown UI and press the **SPEAK** button.

In general, speech can be performed using pure text, but speech can also be performed using [AIHuman.Model.AIClipSet](/aihuman/unity-sdk/apis/aiclipset). Also, speech can be performed along with a specific gesture. For example, you could instruct the AI to say hello by waving his hand. This is called gesture speech. Details are explained in [Gesture speech related parts](/aihuman/unity-sdk/aiplayer/advanced-features#gestures).

If the text to speak is too long, it may not be possible to synthesize the resources required for the utterance. There are some models that can synthesize long sentences. Although it varies from ai to ai, it is generally recommended that sentences be cut to an appropriate length in Korean, usually within 30 to 40 characters, and at a similar level in English. In addition, if special characters, lists of incomplete characters, numbers, formulas, symbols, characters or abbreviations in other languages are included, they may or may not be uttered differently than expected.

```csharp
// using pure-text
_aiPlayer.Send(new[] {"this is sample sentence."});
// using AIClipSet
AIClipSet clip = AIAPI.CreateClipSet("this is sample sentence.");
_aiPlayer.Send(new[] {clip});
```

### Speaking related Monitoring

After the Send method is called, you can listen to the operation event feedback in the registered listener. This feedback is returned by calling the method (OnAIPlayerEvent) of the listener(AIPlayerCallback). OnAIPlayerEvent sequentially returns the following AIEvent values.

- AICLIPSET_PLAY_PREPARE_STARTED 
- AICLIPSET_PLAY_PREPARE_COMPLETED
- AICLIPSET_PLAY_STARTED
- AICLIPSET_PLAY_COMPLETED

```csharp
// Speaking related Callback example
public void OnAIPlayerEvent(AIEvent @event)
{
    if (@event.EventType == AIEvent.Type.AICLIPSET_PLAY_PREPARE_STARTED)
    {
        _statusText.text = "AI started preparation to speak.";
    } 
    else if (@event.EventType == AIEvent.Type.AICLIPSET_PLAY_PREPARE_COMPLETED)
    {
        _statusText.text = "AI finished preparation to speak.";
    }
    else if (@event.EventType == AIEvent.Type.AICLIPSET_PLAY_STARTED)
    {
        _statusText.text = "AI started speaking.";
    }
    else if (@event.EventType == AIEvent.Type.AICLIPSET_PLAY_COMPLETED)
    {
        _statusText.text = "AI finished speaking.";
    }
}

// AI error Callback example
public void OnAIPlayerError(AIError error) 
{
    if (error.ErrorCode == (int)AIError.Code.AI_API_ERR)
    {
		_statusText.text = "API Error: " + error.ToString();
    }
    else if (error.ErrorCode == (int)AIError.Code.AI_SERVER_ERR)
    {
        _statusText.text = "Server Error: " + error.ToString();
    }
	else if (error.ErrorCode == (int)AIError.Code.AI_RES_ERR)
    {
		_statusText.text = "Resource Error: " + error.ToString();
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
