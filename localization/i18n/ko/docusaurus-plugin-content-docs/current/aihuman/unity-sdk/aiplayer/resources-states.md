---
sidebar_position: 3
---

# 이벤트 확인하기

### Start loading resources 

When AIPlayer is created after authentication is completed, resource loading starts according to the input **AIName**, and the resource loading status is reported to the listener (AIPlayerCallback) registered in the constructor. (Initially, it may take a few minutes for the resource to complete loading.)

<br/>

### Monitoring player state through AIPlayerCallback implementation

TFirst, the listener's OnAIStateChanged(AIState state) method is called, and the related state._state values are as follows. In addition, loading progress can be implemented with OnAIPlayerResLoadingProgressed(int current, int total).

- AIState.Type.RES_LOAD_STARTED : resource loading is started.
- AIState.Type.RES_LOAD_COMPLETED : resource loading is completed.

If there is any problem during this process, the OnAIPlayerError() method is called. Typically, a response from the OnAIPlayerError() may be notifying the expiration of the authentication token. An appropriate response is required depending on the situation.

- AIError.Type.SDK_API_ERR : Notifies error in authentication process API.

:::info  
e.g.) 1402 error (value token expired): Token refresh required -> Call AuthStart() method again
:::

```js
// AI resource related status CallBack
public void OnAIStateChanged(AIState state)
{
    if (state._state == AIState.RES_LOAD_STARTED)
    {
        UnityEngine.Debug.Log("AI Resource loading started.");
    }
    else if (state._state == AIState.RES_LOAD_COMPLETED)
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
    if (error.errorType == AIError.Type.SDK_API_ERR)
    {
        UnityEngine.Debug.LogError(string.Format("sdk_ai_Info error : {0}", error.GetMessage()));          
    }
}
```
