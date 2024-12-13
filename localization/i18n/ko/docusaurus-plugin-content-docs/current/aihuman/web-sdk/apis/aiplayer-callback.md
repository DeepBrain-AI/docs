---
sidebar_position: 3
---

# AIPlayer 콜백

### 1. onAIPlayerError

해당 [콜백 함수](../../../1.3.x/aihuman/web-sdk/apis/aiplayer-callback)
는 더 이상 지원하지 않습니다.
onAIPlayerErrorV2 사용을 권장합니다.

### 2. onAIPlayerErrorV2

AIPlayer 동작중 발생하는 에러를 리턴하는 콜백입니다. AIError의 자세한 사항은 여기 [here](../apis/aiplayer-data)를 참조하십시오. 

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

### 3. onAIPlayerStateChanged

해당 [콜백 함수](../../../1.3.x/aihuman/web-sdk/apis/aiplayer-callback)는 더 이상 지원하지 않습니다.
onAIPlayerEvent 사용을 권장합니다.

### 4. onAIPlayerEvent

AIPlayer 동작중 발생하는 이벤트를 리턴하는 콜백입니다. AIEvent의 자세한 사항은 여기 [here](../apis/aiplayer-data)를 참조하십시오. 

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

### 5. onAIPlayerLoadingProgressed

AIPlayer 리소스 로딩 진행율을 리턴하는 콜백입니다.

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
