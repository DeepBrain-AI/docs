---
sidebar_position: 3
---

# AIPlayer 콜백

### 1. onAIPlayerErrorV2

AIPlayer 동작 중 에러 콜백입니다. [AIError](../apis/aiplayer-data)를 참고하세요.
토큰 에러 `1402` / `1407`은 [트러블슈팅](../troubleshooting)을 참고하세요 — `generateToken()` 후
`reconnect()`하고 `release()`하지 마세요.

```javascript
AI_PLAYER.onAIPlayerErrorV2 = function (aiError) {
  console.log("onAIPlayerErrorV2", aiError.code, aiError.message);
};
```

<br/>

### 2. onAIPlayerEvent

AIPlayer 이벤트 콜백입니다. [AIEvent](../apis/aiplayer-data)를 참고하세요.

```javascript
AI_PLAYER.onAIPlayerEvent = function (aiEvent) {
  console.log("event", aiEvent.type);
};
```

<br/>

### 3. onAIPlayerLoadingProgressed

리소스 로딩 진행률 콜백입니다.

```javascript
AI_PLAYER.onAIPlayerLoadingProgressed = function (result) {
  console.log(`loading process: ${result.loading || 0}%`);
};
```
