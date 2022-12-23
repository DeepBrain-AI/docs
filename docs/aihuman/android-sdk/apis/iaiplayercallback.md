---
sidebar_position: 8
---

# Interface IAIPlayerCallback

| Modifier and Type | Method and Description                                       |
| ----------------- | ------------------------------------------------------------ |
| `void`            | `onAIPlayerError(AIError error)` called when an error occurs while running aiplayer |
| `void`            | `onAIPlayerResLoadingProgressed(int current, int total)`called when resource loading progress is updated |
| `void`            | `onAIStateChanged(AIState state)`called when aiplayer's state changes |
