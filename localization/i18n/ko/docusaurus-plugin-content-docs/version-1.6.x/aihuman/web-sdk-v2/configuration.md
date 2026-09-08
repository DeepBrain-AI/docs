---
sidebar_position: 3
---

# 설정

`init()` **호출 전에** `AI_PLAYER.setConfig(json)`으로 플레이어를 설정합니다. 모든 옵션은 선택입니다.
전체 목록은 [setConfig](./apis/aiplayer)를 참고하세요.

## v2 전용 옵션

| 옵션 | 타입 | 설명 |
| ---- | ---- | ---- |
| `enableEarlyStart` | `Boolean` | idle 배경의 앞부분을 먼저 로드해 더 일찍 렌더링을 시작합니다. 첫 화면까지의 시간을 줄입니다. (default: `false`) |

```javascript
AI_PLAYER.setConfig({
  enableEarlyStart: false,
});
```

## 모바일 자동 최적화

모바일 기기에서는 idle 배경 다운로드를 자동으로 줄여 아바타가 더 빨리 나타나고 메모리도 적게
씁니다. 기기에 따라 **자동 적용**되며 설정 옵션은 없습니다. 데스크톱 동작은 변하지 않습니다.

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
