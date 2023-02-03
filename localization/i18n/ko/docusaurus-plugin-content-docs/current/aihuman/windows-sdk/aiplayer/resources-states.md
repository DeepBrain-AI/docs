---
sidebar_position: 3
---

# 이벤트 확인하기

### Start loading resources 

When AIPlayer is created after authentication is completed, resource loading starts according to the input **AIName**, and the resource loading status is reported to the listener (IAIPlayerCallback) registered in the constructor. (Initially, it may take a few minutes for the resource to complete loading.)

<br/>

### Monitoring player state through IAIPlayerCallback implementation

The values for the parameter AIState.state in the listener method onAIStateChanged(AIStatePublisher.AIState state) are shown below. You can also implement loading progress with onAIPlayerResLoadingProgressed(int current, int total).

- AIState.Type.RES_LOAD_STARTED : resource loading is started.
- AIState.Type.RES_LOAD_COMPLETED : resource loading is completed.

If there is any problem during this process, the onAIPlayerError() method is called. Typically, a response from the onAIPlayerError() may be notifying the expiration of the authentication token. An appropriate response is required depending on the situation.

- AIError.SDK_API_ERR : Notifies error in authentication process API.

:::info  
e.g.) 1402 error (value token expired): Token refresh required -> Call AuthStart() method again
:::

```csharp
string message;
// AI resource related status CallBack
public void onAIStateChanged(AIState state)
{
    if (state.state == AIState.Type.RES_LOAD_STARTED)
    {
        message = "AI Resource loading started.";
    }
    else if (state.state == AIState.Type.RES_LOAD_COMPLETED)
    {
        message = "AI Resource loading completed.";
    }
}

// AI resource loading progress CallBack
public void onAIPlayerResLoadingProgressed(int current, int total)
{
    float progress = ((float) current / (float) total) * 100;
    message = string.Format("AI Resource Loading... {0}%", (int)progress);
}

// AI error CallBack
public void onAIPlayerError(AIError error)
{
  if (error.Type.SDK_API_ERR == error.errorType) 
  {
    string errorDesc = error.exInfo;
    if (string.IsNullOrEmpty(errorDesc))
    {
        JSONObject json = null;
        try
        {
            json = new JSONObject(errorDesc);
        }
        catch (JsonException ex)
        {
        }

        if (json != null && json.optInt(Constants.KEY_ERRORCODE, -1) ==
            Constants.API_ERRORCODE_TOKEN_EXPIRED)
        {
            // refresh token
        }
    }
  }
}
```
