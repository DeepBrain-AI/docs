---
sidebar_position: 2
---

# 시작하기

빈 HTML에서 시작해 몇 분 만에 말하는 AI 아바타를 웹 페이지에 띄웁니다. 아래는 첫 발화까지의 전 과정입니다.

:::info 사전 준비물
- DeepBrain AI가 발급한 **`appId`** 와 **`userKey`**. `userKey`는 장기 시크릿이므로 **고객사 서버**에만
  두고 브라우저에 절대 노출하지 마세요.
- 최신 브라우저(Chrome, Edge, Safari 최신 버전).
- DeepBrain AI Web SDK v2 파일(`aiPlayer-2.x.obf.js`) — 배포용으로 전달받은 파일.
:::

## 완전 예제

아래를 `index.html` 하나로 복사하고, `<script src>` 와 토큰 단계만 바꿔 브라우저에서 열어보세요.
각 부분은 아래 [단계별 설명](#단계별-설명)에서 다룹니다.

```html title="index.html"
<!doctype html>
<html>
  <body>
    <!-- 1. 아바타를 담을 컨테이너 -->
    <div id="AIPlayerWrapper" style="width: 480px; height: 720px;"></div>

    <!-- 2. 버튼 — 첫 발화는 사용자 동작에서 시작해야 함(아래 주의 참고) -->
    <button id="speakBtn">말하기</button>

    <!-- 3. SDK 로드 (배포용으로 전달받은 파일/URL 사용) -->
    <script src="aiPlayer-2.1.0.obf.js"></script>
    <script>
      async function main() {
        const AI_PLAYER = new AIPlayer(document.getElementById("AIPlayerWrapper"));

        // 고객사 서버가 발급한 ClientToken을 세션 토큰으로 교환.
        const clientToken = await getClientToken(); // <- 고객사 백엔드 호출
        await AI_PLAYER.generateToken({ appId: "<your-appId>", token: clientToken });

        // 렌더링할 AI 모델 로드.
        await AI_PLAYER.getAIList();
        await AI_PLAYER.init({ aiName: "<ai_name>" });

        // 발화 — 클릭에서 시작해야 브라우저가 오디오를 허용.
        document.getElementById("speakBtn").onclick = () =>
          AI_PLAYER.send("안녕하세요! 만나서 반갑습니다.");
      }
      main();
    </script>
  </body>
</html>
```

:::warning 오디오는 사용자 동작이 필요합니다
브라우저는 사용자가 페이지와 상호작용하기 전까지 오디오를 막습니다. **첫** `send()`는 위 예제처럼
클릭(또는 탭)에서 호출하세요. 페이지 로드 시 바로 `send()`를 부르면 아바타는 나타나지만 소리가 안 납니다.
:::

## 단계별 설명

### 1. SDK 포함

```html
<script src="aiPlayer-2.1.0.obf.js"></script>
```

로드되면 `AIPlayer` 클래스가 전역에서 사용 가능합니다.

:::note
여기 표기된 상대 경로 대신, 배포용으로 전달받은 실제 파일/CDN URL을 사용하세요.
:::

### 2. 플레이어 생성

```javascript
const wrapper = document.getElementById("AIPlayerWrapper");
const AI_PLAYER = new AIPlayer(wrapper);
```

아바타는 컨테이너 요소를 채우도록 그려집니다 — CSS로 크기·위치를 지정하세요.

### 3. 인증

인증은 2단계입니다:

1. **고객사 서버**에서 `appId`와 `userKey`로 JWT **ClientToken**을 생성.
2. **브라우저**에서 `generateToken()`으로 교환.

```javascript
const clientToken = await getClientToken(); // 고객사 백엔드 엔드포인트
const result = await AI_PLAYER.generateToken({ appId: appId, token: clientToken });
// result: { status: "success", data: { token_expire, ... } }
```

:::danger userKey를 절대 노출하지 마세요
`userKey`는 장기 시크릿입니다. ClientToken은 서버에서 생성하고, 브라우저에는 단명 ClientToken만 전달하세요.
:::

### 4. AI 로드

```javascript
await AI_PLAYER.getAIList();               // 사용 가능한 AI 모델
await AI_PLAYER.init({ aiName: "<ai_name>" }); // 아바타 준비 완료 시 resolve
```

`init()`는 아바타 로드가 끝나면 resolve됩니다. resolve 이후 발화 가능 상태입니다.

### 5. 발화

```javascript
AI_PLAYER.send("만나서 반갑습니다");                       // 한 문장
AI_PLAYER.send(["만나서 반갑습니다", "잘 지내세요?"]);      // 여러 문장
```

## 이벤트 수신 (선택)

```javascript
AI_PLAYER.onAIPlayerLoadingProgressed = (r) => console.log("loading", r?.loading);
AI_PLAYER.onAIPlayerEvent = (e) => console.log("event", e?.type);
AI_PLAYER.onAIPlayerErrorV2 = (err) => console.error(err?.code, err?.message);
```

| 이벤트 | 발생 시점 |
| ----- | -------- |
| `LOADING_PROGRESS` | 리소스 다운로드 중 (`r.loading` = %) |
| `LOAD_COMPLETED` | 아바타 준비 완료 |
| `SPEECH_STARTED` / `SPEECH_COMPLETED` | `send()` 재생 시작 / 완료 |

## 다음 단계

<div className="doc-cards">
  <a className="doc-card" href="./configuration">
    <div className="doc-card__title">설정 <span className="doc-card__arrow">→</span></div>
    <div className="doc-card__desc">v2 전용 옵션을 포함한 재생 튜닝.</div>
  </a>
  <a className="doc-card" href="./apis/aiplayer">
    <div className="doc-card__title">AIPlayer API <span className="doc-card__arrow">→</span></div>
    <div className="doc-card__desc">전체 메서드·콜백 레퍼런스.</div>
  </a>
</div>
