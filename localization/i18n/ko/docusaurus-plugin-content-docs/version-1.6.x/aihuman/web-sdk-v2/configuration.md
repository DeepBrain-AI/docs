---
sidebar_position: 3
---

# 설정

`init()` **호출 전에** `AI_PLAYER.setConfig(json)`으로 플레이어를 설정합니다. 모든 옵션은 선택입니다.

v2 SDK는 이전 SDK와 동일한 기본 설정 옵션을 받으며([setConfig 레퍼런스](./apis/aiplayer)),
아래 v2 전용 옵션이 추가됩니다.

## v2 전용 옵션

| 옵션 | 타입 | 설명 |
| ---- | ---- | ---- |
| `continuousBackground` | `Boolean` | **(Beta)** true이면 발화 시작 시 배경이 첫 프레임부터 다시 시작하지 않고 idle 모션에서 자연스럽게 이어져, 발화가 시작되는 순간 배경이 튀지 않습니다. (default: `false`) |
| `enableEarlyStart` | `Boolean` | **(Beta)** idle 배경의 앞부분을 먼저 로드해 더 일찍 렌더링을 시작합니다. 첫 화면까지의 시간을 줄입니다. (default: `false`) |

```javascript
AI_PLAYER.setConfig({
  continuousBackground: false,
  enableEarlyStart: false,
});
```

## 모바일 자동 최적화

모바일 기기에서는 idle 배경 다운로드를 자동으로 줄여 아바타가 더 빨리 나타나고 메모리도 적게
씁니다. 기기에 따라 **자동 적용**되며 설정 옵션은 없습니다. 데스크톱 동작은 변하지 않습니다.

:::note Beta
`continuousBackground`와 `enableEarlyStart`는 **beta**이며 기본값은 꺼짐입니다. 연동별로 테스트 후
활성화하세요.
:::

## 다음 단계

<div className="doc-cards">
  <a className="doc-card" href="./apis/aiplayer">
    <div className="doc-card__title">AIPlayer API <span className="doc-card__arrow">→</span></div>
    <div className="doc-card__desc">전체 메서드·콜백 레퍼런스.</div>
  </a>
  <a className="doc-card" href="./troubleshooting">
    <div className="doc-card__title">문제 해결 <span className="doc-card__arrow">→</span></div>
    <div className="doc-card__desc">재생·설정 관련 흔한 문제 해결.</div>
  </a>
</div>
