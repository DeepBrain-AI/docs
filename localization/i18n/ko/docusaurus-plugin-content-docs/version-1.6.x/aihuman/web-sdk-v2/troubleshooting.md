---
sidebar_position: 5
---

# 트러블슈팅

Web SDK v2 연동 시 자주 겪는 문제와 해결법입니다.

## 아바타가 안 보입니다

컨테이너 요소의 크기가 없을 가능성이 큽니다. 아바타는 래퍼를 채우도록 그려지므로 `0 × 0` 래퍼는 아무것도
안 보입니다.

```html
<div id="AIPlayerWrapper" style="width: 480px; height: 720px;"></div>
```

또한 `init()`가 정상 resolve됐는지 확인하세요 — AI 로드에 실패하면 reject됩니다.

## 아바타는 보이는데 소리가 안 납니다

브라우저는 사용자가 페이지와 상호작용하기 전까지 오디오를 막습니다.

:::warning
**첫** `send()`는 사용자 동작(클릭/탭)에서 호출하세요. 페이지 로드 시 바로 `send()`를 부르면 아바타는
나타나지만 무음입니다.
:::

```javascript
button.onclick = () => AI_PLAYER.send("안녕하세요!");
```

## `generateToken`이 실패합니다

| 증상 | 원인 | 해결 |
| --- | --- | --- |
| `status`가 `"success"`가 아님 | ClientToken이 유효하지 않거나 만료됨 | **고객사 서버**에서 ClientToken을 재발급하고 `generateToken()` 재호출 |
| 즉시 거부됨 | `appId`가 틀리거나 `appId`/토큰 불일치 | ClientToken 발급에 쓴 `appId`와 동일한지 확인 |

:::danger
ClientToken을 브라우저에서 생성하지 마세요 — 장기 시크릿인 `userKey`가 필요합니다. 서버에서 생성해
단명 ClientToken만 클라이언트로 전달하세요.
:::

## `init`에서 "아바타를 찾을 수 없음"

- `AI_PLAYER.getAIList()` 결과에 해당 `aiName`이 있는지 확인하세요.
- 해당 아바타에 대한 계정 접근 권한이 있는지 확인하세요.

## 발화가 시작됐다가 멈추거나 끊깁니다

- 브라우저 콘솔의 네트워크 에러를 확인하고 연결이 안정적인지 보세요.
- `onAIPlayerErrorV2`를 수신해 에러 `code`/`message`를 확인하세요.

## 아무것도 안 되고 콘솔에 에러가 납니다

에러/로그 훅을 붙여 출력을 지원팀과 공유하세요:

```javascript
AI_PLAYER.onAIPlayerErrorV2 = (err) => console.error(err?.code, err?.message);
```

그래도 안 되면 콘솔 출력과 `aiName`을 첨부해 DeepBrain AI 지원팀에 문의하세요.

## 다음 단계

<div className="doc-cards">
  <a className="doc-card" href="./getting-started">
    <div className="doc-card__title">시작하기 <span className="doc-card__arrow">→</span></div>
    <div className="doc-card__desc">전체 설정 흐름 다시 보기.</div>
  </a>
  <a className="doc-card" href="./apis/aiplayer">
    <div className="doc-card__title">AIPlayer API <span className="doc-card__arrow">→</span></div>
    <div className="doc-card__desc">전체 메서드·콜백 레퍼런스.</div>
  </a>
</div>
