---
sidebar_position: 4
---

# 발화 관련 기본 기능

### Basic Speaking using AIClipSet and Monitor AI Speaking

After AIPlayer resource is loaded, call **Send method**. To activate the function, in the sample below, select the sentence to speak through the drop-down menu and click the **Play** button on the right.

In general, speech can be performed using pure text, but speech can also be performed using [AIHuman.Common.Model.AIClipSet](#main-class-apis). Also, speech can be performed along with a specific gesture. For example, you could instruct the AI to say hello by waving his hand. This is called gesture speech. Details are explained in [Gesture speech related parts](#main-class-apis).

If the text to speak is too long, it may not be possible to synthesize the resources required for the utterance. There are some models that can synthesize long sentences. Although it varies from ai to ai, it is generally recommended that sentences be cut to an appropriate length in Korean, usually within 30 to 40 characters, and at a similar level in English. In addition, if special characters, lists of incomplete characters, numbers, formulas, symbols, characters or abbreviations in other languages are included, they may or may not be uttered differently than expected.

<img src="/img/aihuman/windows/speak_1.4.x.png" />

```csharp
// using pure-text
_aiPlayer.Send(new[] {"this is sample sentence."});
// using AIClipSet
AIClipSet clip = AIAPI.CreateClipSet("this is sample sentence.");
_aiPlayer.Send(new[] {clip});
```

### Speaking related Monitoring

After the Send method is called, you can listen to the operation status feedback in the registered listener. This feedback is returned by calling the method (OnAIPlayerEvent) of the listener(IAIPlayerCallback). OnAIPlayerEvent sequentially returns the following AIState values. 

- AICLIPSET_PLAY_PREPARE_STARTED 
- AICLIPSET_PLAY_PREPARE_COMPLETED
- AICLIPSET_PLAY_STARTED
- AICLIPSET_PLAY_COMPLETED

```csharp
string message;

// Speaking related Callback example
public void OnAIPlayerEvent(AIEvnet aiEvent)
{
    switch (aiEvent.EventType)
    {
        case AIState.Type.AICLIPSET_PLAY_PREPARE_STARTED:
            message = "AI started preparation to speak.";
            break;
        case AIEvent.Type.AICLIPSET_PLAY_PREPARE_COMPLETED:
            message = "AI finished preparation to speak.";
            break;
        case AIEvent.Type.AICLIPSET_PLAY_STARTED:
            message = "AI started speaking.";
            break;
        case AIEvent.Type.AICLIPSET_PLAY_COMPLETED:
            message = "AI finished speaking.";
            break;
            
        ...

    }
}

// AI error Callback example
public void OnAIPlayerError(AIError error)
{
    switch (error.ErrorCode)
    {
        case AIError.Code.AICLIPSET_PLAY_ERR:
            // TODO: impl error handling
            break;
        
        ...

        default:
            message = error.ToString();
            break;
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
