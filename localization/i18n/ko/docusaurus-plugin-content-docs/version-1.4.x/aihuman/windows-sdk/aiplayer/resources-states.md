---
sidebar_position: 3
---

# 이벤트 확인하기

### Start loading resources 

When AIPlayer is created after authentication is completed, resource loading starts according to the input **AIName**, and the resource loading status is reported to the listener (IAIPlayerCallback) registered in the constructor. (Initially, it may take a few minutes for the resource to complete loading.)

<br/>

### Monitoring player state through IAIPlayerCallback implementation

The values for the parameter AIState.state in the listener method OnAIPlayerEvent(AIEvent aiEvent) are shown below. You can also implement loading progress with OnAIPlayerResLoadingProgressed(int current, int total).

- AIEvent.Type.RES_LOAD_STARTED : resource loading is started.
- AIEvent.Type.RES_LOAD_COMPLETED : resource loading is completed.

If there is any problem during this process, the OnAIPlayerError() method is called. Typically, a response from the OnAIPlayerError() may be notifying the expiration of the authentication token. An appropriate response is required depending on the situation.

- AIError.Code.AI_API_ERR : Notifies error in authentication process API.

:::info  
e.g.) 1402 error (value token expired): Token refresh required -> Call Authenticate or GenerateToken method again
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
    message = string.Format("AI Resource Loading... {0}%", (int)progress);
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
