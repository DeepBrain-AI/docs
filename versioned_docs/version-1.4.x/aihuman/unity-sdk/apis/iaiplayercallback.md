---
sidebar_position: 2
---

# AIHuman.Interface.IAIPlayerCallback

| Modifier and Type | Method and Description                                       |
| ----------------- | ------------------------------------------------------------ |
| `void`            | `OnAIPlayerError(AIError error)` Reporting an error occurred in AIPlayer |
| `void`            | `OnAIPlayerResLoadingProgressed(int current, int total)` Reporting the resource loading progress of AIPlayer |
| `void`            | `OnAIPlayerEvent(AIEvent @event)` Reporting the changed event of AI |
