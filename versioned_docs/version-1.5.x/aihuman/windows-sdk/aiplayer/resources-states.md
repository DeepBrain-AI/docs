---
sidebar_position: 3
---

# AIPlayer Callback

### Start loading resources 

When an `AIPlayer` object is created after authentication is completed, resource loading can begin according to the aiName that you set and the `IAIPlayerCallback` implementation can callback the resource loading progress. (The download time may initially depend on network conditions.)

The SDK downloads the required resources of the AI you set to the path where the process is located.


<br/>

### Implement callback with IAIPlayerCallback

First, the class that wants to receive the callback (monitoring) must inherit the `IAIPlayerCallback`.
As an event-related callback for the implementation, the `OnAIPlayerEvent(event)` function must be implemented, and the types of events, `AIEvent.Type`, are as follows.

:::info

- AIEvent.Type.RES_LOAD_STARTED: Started loading AI resources
- AIEvent.Type.RES_LOAD_COMPLETED: Completed loading AI resources
- AIEvent.Type.AICLIPSET_PLAY_PREPARE_STARTED: Started of preparation (synthesis) for utterance (action)
- AIEvent.Type.AICLIPSET_PLAY_PREPARE_COMPLETED: Completed of preparation (synthesis) for utterance (action)
- AIEvent.Type.AICLIPSET_PRELOAD_STARTED: Started preloading for utterance (action) data
- AIEvent.Type.AICLIPSET_PRELOAD_COMPLETED : Completed preloading for utterance (action) data
- AIEvent.Type.AICLIPSET_PRELOAD_FAILED: Failed preloading for utterance (action) data
- AIEvent.Type.AICLIPSET_PLAY_STARTED : Started utterance (action)
- AIEvent.Type.AICLIPSET_PLAY_COMPLETED : Completed utterance (action)
- AIEvent.Type.AICLIPSET_PLAY_FAILED : Failed utterance (action)
- AIEvent.Type.AI_CONNECTED: Connected to AI (network connection)
- AIEvent.Type.AI_DISCONNECTED: Disconnected from AI (network connection)
- AIEvent.Type.AICLIPSET_PLAY_BUFFERING: Buffering during utterance (action)
- AIEvent.Type.AICLIPSET_RESTART_FROM_BUFFERING: Restart from buffering
- AIEvent.Type.AIPLAYER_STATE_CHANGED: Changed AIPlayer's State

:::

If `RES_LOAD_COMPLETED` and `AI_CONNECTED` callbacks are received, all functions of the AIPlayer object can be operated normally. It is an Idle state that enables utterance (real-time synthesis) operation.  
In this way, the above event callback can be utilized to respond to various service flows.

You can also implement loading progress using the `OnAIPlayerResLoadingProgressed(int, int)` callback function.
If there is a problem in this process, `AIError.ErrorCode` is delivered to `AI_RES_ERR` through `OnAIPlayerError(error)` callback.
Additionally, for example, errors such as the expiration of an authentication token can occur.
It can be handled appropriately for various error cases.

- AIError.Code.AI_API_ERR : Notifies error in authentication process API.
- [Other Error Codes](../../../aihuman/windows-sdk/aiplayer/errors)

:::info  
e.g.) 1402 error (value token expired): Token refresh required -> Call Authenticate or GenerateToken method again
- [AIError](../../../aihuman/windows-sdk/apis/aierror) object can be found in API Reference!
:::

```csharp
string message;
// AI resource related status Callback
public void OnAIPlayerEvent(AIEvent aiEvent)
{
    switch (aiEvent.EventType)
    {
        case AIEvent.Type.RES_LOAD_STARTED:
            message = "AI Resource loading started.";
            break;
        case AIEvent.Type.RES_LOAD_COMPLETED:
            message = "AI Resource loading completed.";
            break;
        
        ...

    }
}

// AI resource loading progress Callback
public void OnAIPlayerResLoadingProgressed(int current, int total)
{
    float progress = ((float) current / (float) total) * 100;
    message = "AI Resource Loading... {progress}%";
}

// AI error Callback
public void OnAIPlayerError(AIError error)
{
    switch (error.ErrorCode)
    {
        case AIError.Code.AI_API_ERR:
            // TODO: impl error handling
            break;
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
