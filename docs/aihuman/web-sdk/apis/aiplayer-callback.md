---
sidebar_position: 3
---

# AIPlayer Callback

### 1. onAIPlayerError

This [Callback function](../../../1.3.x/aihuman/web-sdk/apis/aiplayer-callback) is obsolete.
Recommend to use a onAIPlayerErrorV2.


<br/>

### 2. onAIPlayerErrorV2

Callback for Errors during AIPlayer operation. Check out the AIError details [here](../apis/aiplayer-data)

- Example

```javascript
  /**
   * @event AIPlayer#onAIPlayerErrorV2
   * @description error report
   * @example
   * AIPlayer.onAIPlayerErrorV2 = function (aiError) {
   *  console.log('aiError: ', aiError.code, aiError.message);
   * };
   * @property {AIError} aiError
   * @property {Number} aiError.code - error code
   * @property {String} aiError.message - error message
   */
  AI_PLAYER.onAIPlayerErrorV2 = function (aiError) {
    console.log("onAIPlayerErrorV2" aiError.code, aiError.message);
  };
```


<br/>

### 3. onAIPlayerStateChanged

This [Callback function](../../../1.3.x/aihuman/web-sdk/apis/aiplayer-callback) is obsolete.
Recommend to use a onAIPlayerEvent.


<br/>

### 4. onAIPlayerEvent

Callback for AIPlayer's Event. Check out the AIEvent details [here](../apis/aiplayer-data)

- Example

```javascript
/**
 * @event AIPlayer#onAIPlayerEvent
 * @description AIPlayer event callback
 * @example
 * AIPlayer.onAIPlayerEvent = function (aiEvent) {
 *  if (aiEvent.type === AIEventType.RES_LOAD_STARTED) showLoadingProcess();
 *  if (aiEvent.type === AIEventType.RES_LOAD_COMPLETED) hideLoadingProcess();
 * };
 * @property {AIEvent} aiEvent
 * @property {Number} aiEvent.type
 * @property {AIClipSet} aiEvent.clipSet
 */
AI_PLAYER.onAIPlayerEvent = function (aiEvent) {
  if (aiEvent.type === AIEventType.RES_LOAD_STARTED) showLoadingProcess();
  if (aiEvent.type === AIEventType.RES_LOAD_COMPLETED) hideLoadingProcess();
};
```


<br/>

### 5. onAIPlayerLoadingProgressed

Callback for AIPlayer Loading Progress

- Example

```javascript
/**
 * @event AIPlayer#onAIPlayerLoadingProgressed
 * @description AI loading progress report
 * @example
 * AIPlayer.onAIPlayerLoadingProgressed = (result) => {
 *   console.log('AI Resource Loading... ${result.loading || 0}%')
 * };
 */
AI_PLAYER.onAIPlayerLoadingProgressed = function (result) {
  console.log(`loading process: ${result.loading || 0}%`);
};
```
