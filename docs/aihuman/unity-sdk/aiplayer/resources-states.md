---
sidebar_position: 3
---

# AIPlayer Callback

### Start loading resources 

When `AIPlayer` is created after authentication is completed, resource loading starts according to the input **AIName**, and the resource loading status is reported to the `AIPlayerCallback` registered in the constructor. (The download time may initially depend on network conditions.)

The SDK downloads the required resources of the AI you set to the path where the process is located.

<br/>

### Implement callback with IAIPlayerCallback

First, the class that wants to receive the callback (monitoring) must inherit the `AIPlayerCallback`. As an event-related callback for the implementation, the `OnAIPlayerEvent(AIEvent @event)` function must be implemented, and the types of events, `AIEvent.Type`, are as follows.

:::info

- AIEvent.Type.RES_LOAD_STARTED : Started loading AI resources
- AIEvent.Type.RES_LOAD_COMPLETED : Completed loading AI resources
- AIEvent.Type.AICLIPSET_PLAY_PREPARE_STARTED : Started of preparation (synthesis) for utterance (action)
- AIEvent.Type.AICLIPSET_PLAY_PREPARE_COMPLETED : Completed of preparation (synthesis) for utterance (action)
- AIEvent.Type.AICLIPSET_PRELOAD_STARTED : Started preloading for utterance (action) data
- AIEvent.Type.AICLIPSET_PRELOAD_COMPLETED : Completed preloading for utterance (action) data
- AIEvent.Type.AICLIPSET_PRELOAD_FAILED : Failed preloading for utterance (action) data
- AIEvent.Type.AICLIPSET_PLAY_STARTED : Started utterance (action)
- AIEvent.Type.AICLIPSET_PLAY_COMPLETED : Completed utterance (action)
- AIEvent.Type.AICLIPSET_PLAY_FAILED : Failed utterance (action)
- AIEvent.Type.AI_CONNECTED : Connected to AI (network connection)
- AIEvent.Type.AI_DISCONNECTED : Disconnected from AI (network connection)
- AIEvent.Type.AICLIPSET_PLAY_BUFFERING : Buffering during utterance (action)
- AIEvent.Type.AICLIPSET_RESTART_FROM_BUFFERING : Restart from buffering
- AIEvent.Type.AIPLAYER_STATE_CHANGED : Changed AIPlayer's State

:::

You can also implement loading progress using the `OnAIPlayerResLoadingProgressed(int current, int total)` callback function. If there is a problem in this process, `AIError.ErrorCode` is delivered to `AI_RES_ERR` through `OnAIPlayerError(AIError error)` callback. Additionally, for example, errors such as the expiration of an authentication token can occur. It can be handled appropriately for various error cases.

- AIError.Code.AI_API_ERR : Notifies error in authentication process API.

```csharp
// AI resource related event CallBack
public void OnAIPlayerEvent(AIEvent @event)
{
    if (@event.EventType == AIEvent.Type.RES_LOAD_STARTED)
    {
        UnityEngine.Debug.Log("AI Resource loading started.");
    }
    else if (@event.EventType == AIEvent.Type.RES_LOAD_COMPLETED)
    {
        UnityEngine.Debug.Log("AI Resource loading completed.");
    }
}

// AI resource loading progress CallBack
public void OnAIPlayerResLoadingProgressed(int current, int total)
{
    float progress = ((float)current / (float)total) * 100;
    UnityEngine.Debug.Log(string.Format("AI Resource Loading... {0} %", (int)progress));
}

// AI error CallBack
public void OnAIPlayerError(AIError error)
{
    if (error.ErrorCode == (int)AIError.Code.AI_API_ERR)
    {
        UnityEngine.Debug.LogError(string.Format("sdk_ai_api error : {0}", error.ToString()));          
    }
}
```
