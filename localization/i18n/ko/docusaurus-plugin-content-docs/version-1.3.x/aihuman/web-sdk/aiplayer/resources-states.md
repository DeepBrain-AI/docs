---
sidebar_position: 3
---

# 이벤트 확인하기

### 1. Start loading resources

When AIPlayer is initialized and `init({AIModelInfo, AppInfo})` function is called, resource loading starts according to the input **ai_name**. The loading status can be checked through the registered listener(`onAIPlayerStateChanged(state)`). (Initially, it may take a few minutes for the resources to complete loading.)

### 2. Monitor AIPlayer loading state with onAIPlayerStateChanged

When `onAIPlayerStateChanged(state)` method is called within the listener, the following AI loading state values are returned.

- `playerLoadStarted`: resource loading is started.
- `playerLoadComplete`: resource loading is completed.

If there is any problem during this process, the `onAIPlayerError({error, errorCode})` method is called. Typically, a response from the onAIPlayerError(err) may be notifying the expiration of the authentication token. An appropriate response is required depending on the situation.

- TokenExpiredError : Notifies error in authentication process API.

  **e.g.) 401 error (value token expired): Token refresh required -> `generateToken({ appId, token })` method again**

You can also implement loading progress with `onAIPlayerLoadingProgressed({loading})`.

```javascript
AI_PLAYER.onAIPlayerError = function (err) {
  /* err = {
		   "error": "Invalid App Info",
		   "errorCode": 1400,
       "description": "Invalid App Info.",
    } */
};
AI_PLAYER.onAIPlayerStateChanged = async function (state) {
  if (state === "playerLoadStarted") {
    // TODO: AI load started handling 
  }

  if (state === "playerLoadComplete") {
    // TODO: AI load complete handling
  }

  // ...
};
AI_PLAYER.onAIPlayerLoadingProgressed = function (result) {
  // result = { loading: 0.5 || undefined }
  // TODO: AI loading progress handling
};
```
