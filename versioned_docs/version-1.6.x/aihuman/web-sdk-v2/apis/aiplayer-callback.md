---
sidebar_position: 3
---

# AIPlayer Callback

### 1. onAIPlayerErrorV2

Callback for errors during AIPlayer operation. See [AIError](../apis/aiplayer-data).
For token errors `1402` / `1407`, see [Troubleshooting](../troubleshooting) — call `generateToken()`
then `reconnect()`; do not `release()`.

```javascript
AI_PLAYER.onAIPlayerErrorV2 = function (aiError) {
  console.log("onAIPlayerErrorV2", aiError.code, aiError.message);
};
```

<br/>

### 2. onAIPlayerEvent

Callback for AIPlayer events. See [AIEvent](../apis/aiplayer-data).

```javascript
AI_PLAYER.onAIPlayerEvent = function (aiEvent) {
  console.log("event", aiEvent.type);
};
```

<br/>

### 3. onAIPlayerLoadingProgressed

Callback for resource loading progress.

```javascript
AI_PLAYER.onAIPlayerLoadingProgressed = function (result) {
  console.log(`loading process: ${result.loading || 0}%`);
};
```
