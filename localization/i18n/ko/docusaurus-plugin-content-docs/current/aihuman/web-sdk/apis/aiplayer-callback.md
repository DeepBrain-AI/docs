---
sidebar_position: 3
---

# AIPlayer Callback

## 1. onAIPlayerError

Callback for Errors during AIPlayer operation

| Param              | Type     | Description                      |
| ------------------ | -------- | -------------------------------- |
| `json`             | `Object` | arguments of the onAIPlayerError
| `json.error`       | `String` | error information
| `json.errorCode`   | `Number` | error code
| `json.description` | `String` | Error Description
| `json.detail`      | `String` | Error Detail

- Example

```javascript
  AI_PLAYER.onAIPlayerError = function (err) {
    // err => { errorCode: 1400, error: "...", description: "...", detail: "..." }
  };
```

## 2. onAIPlayerStateChanged

Callback for AIPlayer State Change

- Callback Parameter

  | Param   | Type     | Value                                                                                                                                                                   | Description       |
  | --------|--------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
  | `state` | `String` | `'playerLoadStarted'` \| `'playerLoadComplete'` \| `'speakingPrepareStarted'` \| `'speakingPrepareComplete'` \| `'speakingStarted'` \| `'speakingComplete'` \| | AIPlayer
   state 

- Example

```javascript
  AI_PLAYER.onAIPlayerStateChanged = function (state) {
    if (state === "playerLoadStarted") {
      // ...
    }

    // ...
  };
```

## 3. onAIPlayerLoadingProgressed

Callback for AIPlayer Loading Progress

- Callback Parameter

  | Param          | Type     | Description                                          |
  | -------------- | -------- | ---------------------------------------------------- |
  | `json`         | `Object` | a callback response from onAIPlayerLoadingProgressed
  | `json.loading` | `Number` | loading process percent (1 ~ 100)

- Example

```javascript
  AI_PLAYER.onAIPlayerLoadingProgressed = function (result) {
    console.log(`loading process: ${result.loading || 0}%`);
  };
```
