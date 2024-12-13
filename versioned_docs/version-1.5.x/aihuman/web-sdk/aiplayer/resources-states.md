---
sidebar_position: 3
---

# AIPlayer Resources and States

### 1. Start loading resources

When AIPlayer is created and `init({...})` function is called, it starts loading resource according to **aiName** parameter. The loading status can be checked through the registered listener(`onAIPlayerLoadingProgressed(result)`). (Initially, it may take a few minutes for the resources to complete loading.)

### 2. Monitor AIPlayer loading state with callback

After calling the `init` method, the listener's `onAIPlayerEvent(aiEvent)` method will be called with AIEvent. The AIEvent.type indicated which event are occurred(Check below list). You can also implement loading progress with `onAIPlayerResLoadingProgressed({loading})` while loading. (Full list is [here](../apis/aiplayer-data#7-aievent))

- AIEventType.AIPLAYER_STATE_CHANGED : when AIPlayer's state changed. (Check `AIPlayerState` and getState() method)
- AIEventType.RES_LOAD_STARTED : when the resource loading starts
- AIEventType.AI_CONNECTED : when the AI is connected to the service
- AIEventType.AI_DISCONNECTED : when ai is disconnected from the service and not able to `send` or `preload`
- AIEventType.RES_LOAD_COMPLETED : when the resource loading completes
- AIEventType.AI_RECONNECT_ATTEMPT : when the AI is reconnecting to the service (after disconnected)
- AIEventType.AI_RECONNECT_FAILED : when the reconnect try has failed. should call AIPlayer.reconnect(...) to try again.

When you monitor the AIEventType.AIPLAYER_STATE_CHANGED event above, you are able to check when the AIPlayer’s state changes from AIPlayerState.INITIALIZE to AIPlayerState.IDLE and this means the initialization completes so that you can start send or preload. (Please check out the SDK sample)

If there is any problem during this process, the `onAIPlayerErrorV2(aiError)` method is called. For example, the expiration of the authentication token could be an example. An appropriate action is required depending on the situation. The aiError.code values can be categorized by range. Check the sample code below.

- AIErrorCode.AI_INIT_ERR : Error while initializing an AI.
- AIErrorCode.AI_API_ERR : Error in API part receiving information such as authentication process.
- AIErrorCode.AI_RES_ERR : Error while downloading resource for AI.

  **ex) 1402 error (token expired): Token refresh required -> `generateToken({ appId, token })` method again**

```javascript
let curAIState = AIPlayerState.NONE;
AI_PLAYER.onAIPlayerEvent = function (aiEvent) {
  // TODO: event handling
  let typeName = "";
  switch (aiEvent.type) {
    case AIEventType.AIPLAYER_STATE_CHANGED:
      typeName = "AIPLAYER_STATE_CHANGED";
      let newAIState = AI_PLAYER.getState();
      if (curAIState == AIPlayerState.INITIALIZE && newAIState == AIPlayerState.IDLE) {
        $("#aiList").removeAttr("disabled");
        $("#AIPlayerStateText").text("AI initialization completed.");

        console.log("AI initialization completed.");
      }
      curAIState = newAIState;
      break;
    case AIEventType.AI_CONNECTED:
      console.log("AI AI_CONNECTED :", aiEvent);
      break;
    case AIEventType.AI_DISCONNECTED:
      console.log("AI AI_DISCONNECTED ", aiEvent);
      break;
    case AIEventType.RES_LOAD_STARTED:
      console.log("AI RES_LOAD_STARTED ", aiEvent);
      break;
    case AIEventType.RES_LOAD_COMPLETED:
      console.log("AI RES_LOAD_COMPLETED ", aiEvent);
      break;
    //...
  }
};

AI_PLAYER.onAIPlayerLoadingProgressed = function (result) {
  // TODO: loading handling
  console.log("AI Resource Loading... ${result.loading || 0}%");
};

AI_PLAYER.onAIPlayerErrorV2 = function (aiError) {
  // TODO: error handling
  console.log("onAIPlayerErrorV2:", aiError.code, aiError.message);

  if (aiError.code >= AIError.RESERVED_ERR) {
    //You've encountered a reserved error. Please check the error list!
    console.log("RESERVED_ERR :", aiError.message);
  } else if (aiError.code >= AIErrorCode.AI_INIT_ERR) {
    console.log("AI_INIT_ERR :", aiError.message);
  } else if (aiError.code >= AIErrorCode.AI_RES_ERR) {
    console.log("AI_RES_ERR :", aiError.message);
  } else if (aiError.code >= AIErrorCode.AI_SERVER_ERR) {
    console.log("AI_SERVER_ERR :", aiError.message);
  } else if (aiError.code >= AIErrorCode.AI_API_ERR) {
    console.log("AI_API_ERR :", aiError.message);
  } else if (aiError.code > AIErrorCode.UNKNOWN_ERR) {
    //0 ~ 9999
    console.log("BACKEND_ERR :", aiError.message);
    if (error.code == 1402) {
      //refresh token
      refreshTokenIFExpired();
    }
  } else {
    console.log("UNKNOWN_ERR :", aiError.message);
  }
};
```
