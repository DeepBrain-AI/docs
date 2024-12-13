---
sidebar_position: 3
---

# AIPlayer Resources and States

#### Start loading resources 

When AIPlayer is created after authentication is completed, resource loading starts according to the input **AIName**, and the resource loading status is reported to the listener (AIPlayerCallback) registered in the constructor. (Initially, it may take a few minutes for the resource to complete loading.)

<br/>

### Monitoring player state through AIPlayerCallback implementation

First, the listener's OnAIPlayerEvent(AIEvent @event) method is called, and the related event. event values are as follows. In addition, loading progress can be implemented with OnAIPlayerResLoadingProgressed(int current, int total).

- AIEvent.Type.RES_LOAD_STARTED : resource loading is started.
- AIEvent.Type.RES_LOAD_COMPLETED : resource loading is completed.

If there is any problem during this process, the OnAIPlayerError() method is called. Typically, a response from the OnAIPlayerError() may be notifying the expiration of the authentication token. An appropriate response is required depending on the situation.

- AIError.Code.AI_API_ERR : Notifies error in authentication process API.

```csharp
// AI resource related event Callback
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

// AI resource loading progress Callback
public void OnAIPlayerResLoadingProgressed(int current, int total)
{
    float progress = ((float)current / (float)total) * 100;
    UnityEngine.Debug.Log(string.Format("AI Resource Loading... {0} %", (int)progress));
}

// AI error Callback
public void OnAIPlayerError(AIError error)
{
    if (error.ErrorCode == (int)AIError.Code.AI_API_ERR)
    {
        UnityEngine.Debug.LogError(string.Format("sdk_ai_api error : {0}", error.ToString()));          
    }
}
```
