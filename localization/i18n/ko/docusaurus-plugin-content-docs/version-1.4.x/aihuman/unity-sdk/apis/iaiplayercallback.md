---
sidebar_position: 2
---

# AIHuman.Interface.IAIPlayerCallback

| Modifier and Type | Method and Description                                       |
| ----------------- | ------------------------------------------------------------ |
| `void`            | `OnAIPlayerError(AIError error)` AIPlayer에서 발생한 에러 보고 |
| `void`            | `OnAIPlayerResLoadingProgressed(int current, int total)` AI 리소스 로딩 상태 보고 |
| `void`            | `OnAIPlayerEvent(AIEvent @event)` AI의 상태 변화 보고 |
