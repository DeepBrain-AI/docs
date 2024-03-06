---
sidebar_position: 2
---

# IAIPlayerCallback

- assembly: AIHuman.SDK.Core  
- namespace: AIHuman.Interface  

| Modifier and Type | Method and Description                                       |
| ----------------- | ------------------------------------------------------------ |
| `void`            | `OnAIPlayerError(AIError error)` AIPlayer에서 발생한 에러를 보고합니다. |
| `void`            | `OnAIPlayerResLoadingProgressed(int current, int total)` AIPlayer에서 AI 리소스 로딩 상태를 보고합니다. |
| `void`            | `OnAIPlayerEvent(AIEvent aiEvent)` AIPlayer에서 발생한 이벤트를 보고합니다.  |
