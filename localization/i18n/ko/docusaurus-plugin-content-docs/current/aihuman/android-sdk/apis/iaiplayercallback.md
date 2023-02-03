---
sidebar_position: 8
---

# Interface IAIPlayerCallback

| Modifier and Type | Method and Description                                       |
| ----------------- | ------------------------------------------------------------ |
| `void`            | `onAIPlayerError(AIError error)` AIPlayer 동작중 에러 발생시 호출  |
| `void`            | `onAIPlayerResLoadingProgressed(int current, int total)` AI 리소스 로딩 상태 업데이트 |
| `void`            | `onAIPlayerEvent(AIEvent event)` AIPlayer 동작중 이벤트 발생시 호출 |
