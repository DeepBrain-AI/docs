---
sidebar_position: 2
---

# AIPlayerCallback

[Details](../../../aihuman/windows-sdk/aiplayer/resources-states#implement-callback-with-iaiplayercallback)

## IAIPlayerCallback

- assembly: AIHuman.SDK.Core  
- namespace: AIHuman.Interface  

| Modifier and Type | Method and Description                                       |
| ----------------- | ------------------------------------------------------------ |
| `void`            | `OnAIPlayerError(AIError error)` Receive a callback for errors that have occurred in AIPlayer. |
| `void`            | `OnAIPlayerResLoadingProgressed(int current, int total)` Receive callback for AIPlayer resource loading progress. |
| `void`            | `OnAIPlayerEvent(AIEvent aiEvent)` Receive a callback for events that have occurred in AIPlayer. |
