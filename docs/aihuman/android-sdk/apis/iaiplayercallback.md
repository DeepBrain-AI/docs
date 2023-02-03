---
sidebar_position: 8
---

# Interface IAIPlayerCallback

| Modifier and Type | Method and Description                                       |
| ----------------- | ------------------------------------------------------------ |
| `void`            | `onAIPlayerError(AIError error)` called when an error occurs while running aiplayer |
| `void`            | `onAIPlayerResLoadingProgressed(int current, int total)`called when resource loading progress is updated |
| `void`            | `onAIPlayerEvent(AIEvent event)`called when an event occurs while running aiplayer|
