---
sidebar_position: 4
---

# Basic Features

### AI Human utterance (action) with AIPlayer

After AIPlayer resource is loaded, call `Send()` method. To activate the function, in the sample below, select the sentence to speak through the drop-down menu and click the **Play** button on the right.

In general, speech can be performed using pure text, but speech can also be performed using [AIClipSet](../../../aihuman/windows-sdk/apis/aiclipset). Also, speech can be performed along with a specific gesture. For example, you could instruct the AI to say hello by waving his hand. This is called gesture speech. Details are explained in [Gesture speech related parts](../../../aihuman/windows-sdk/aiplayer/advanced-features#gestures).

If the text to speak is too long, it may not be possible to synthesize the resources required for the utterance. There are some models that can synthesize long sentences. Although it varies from AI to AI, it is generally recommended that sentences be cut to an appropriate length in Korean, usually within 30 to 40 characters, and at a similar level in English. In addition, if special characters, lists of incomplete characters, numbers, formulas, symbols, characters or abbreviations in other languages are included, they may or may not be uttered differently than expected.

<img src="/img/aihuman/windows/speak_1.4.x.png" />

```csharp
// using pure-text
_aiPlayer.Send(new[] {"this is sample sentence."});
// using AIClipSet
AIClipSet clip = AIAPI.CreateClipSet("this is sample sentence.");
_aiPlayer.Send(new[] {clip});
```


<br/>

### Local Caching

Local caching refers to the ability to store utterance (clipset) data internally in storage, and to reuse existing data when requesting the same utterance (AIClipSet) again without communication with the server.

- Caching data is stored in the storage of the SDK-enabled device.
- Local caching reuses data once uttered (AIClipSet) and does not consume network traffic.
- Caching data is stored in the ai_data directory of the application's Base Directory.
- Local caching is managed by AI.
- [AIPlayerOptions.AICachingStrategy](../../../aihuman/windows-sdk/aiplayer/setup#aicachingstrategy) can be used to select caching strategy.

:::info What is a caching strategy?

- AIPlayerCachingStrategy.V1 deletes caching data for that AI at the time of AIPlayer creation.
  - The AI's speech data is equal to the life cycle of the AIPlayer object.
  - However, when a new AIPlayer object is initialized at the time of deletion, the caching data of that AI is cleared.
- AIPlayerCachingStrategy.V2 deletes cached data for that AI based on the CacheLimit of AIPlayerOptions set when AIPlayer is created.
  - It is deleted in the order of 1) oldest and 2) lowest cache hit.
  - If the CacheLimit is not exceeded, the caching data remains in the local area.

:::


<br/>

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


<br/>

### Pause Speaking

: Pause speaking.

```csharp
// pause method
_aiPlayer.Pause()
```


<br/>

### Resume Speaking

: Resume speaking. (resume from pause)

```csharp
// resume method
_aiPlayer.Resume()
```


<br/>

### Stop Speaking

: Stop speaking and reset all data. (cannot resume)

```csharp
// stop method
_aiPlayer.StopSpeaking()
```

Even if the utterance is stopped, it naturally returns to standby (IDLE) state with area of activity, just like a real person.  
It is unnatural but can be forced into an immediate standby (IDLE) state, which is a non-recommended use.

```csharp
// forced stop
_aiPlayer.StopSpeaking(true);
```
