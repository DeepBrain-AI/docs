---
sidebar_position: 2
---

# 시작하기

몇 분 만에 웹 앱에 말하는 AI 아바타를 붙입니다.

:::info 사전 준비물
- [API 키 페이지](https://account.aistudios.com/user/api-key?service=aistudios)에서 발급받은
  **`appId`** 와 **`userKey`** ([appId와 userKey 받기](#appid와-userkey-받기) 참고).
  `userKey`는 **고객사 서버**에만 두고 브라우저에 넣지 마세요.
- npm으로 SDK를 설치할 수 있는 Node.js와 번들러(Vite, webpack, Next.js 등).
- 최신 브라우저(Chrome, Edge, Safari 최신 버전).
:::

## SDK 설치

```bash
npm install @deepbrainai/aihuman-web-sdk
```

```javascript
import AIPlayer from "@deepbrainai/aihuman-web-sdk";
```

패키지는 브라우저 번들입니다. 이후 예제의 `AIPlayer`가 이 클래스입니다.

## appId와 userKey 받기

:::warning Interactive Avatar API 키를 발급하세요
API 키 페이지에는 탭이 두 개 있고, **서로 다른 키**를 발급합니다. Web SDK는 **Interactive Avatar
API** 키로만 동작합니다. 옆 탭의 **AI Video API** 키는 영상 생성용이라 여기서는 인증에 실패합니다.
:::

1. **[API 키 페이지](https://account.aistudios.com/user/api-key?service=aistudios)** 에
   로그인합니다(또는 우측 상단 Login / Sign in에서 계정 생성).
2. **Interactive Avatar API** 탭을 선택합니다. 기본으로 열려 있는 **AI Video API** 탭이 아닙니다.
3. 그 탭에서 **Issue key** 를 누르면 **App ID (Client ID)** 와 **User Key (Secret)** 가 뜹니다.
   아래 예제의 `appId`, `userKey`가 이 값입니다.
4. 창을 닫기 전에 **User Key** 를 복사해 두세요. 한 번만 보여주고 다시 조회할 수 없습니다(표의
   **복사**는 App ID만 복사합니다). 잃어버리면 키를 새로 발급해야 합니다.
5. **Issue key** 가 비활성이고 발급 준비 중이라는 안내가 보이면
   [문의](https://www.aistudios.com/company/contact)로 계정에 권한을 요청하세요.

`userKey`는 장기 시크릿입니다. 백엔드만 읽어야 합니다.

## 서버에서 ClientToken 발급

브라우저는 `userKey`를 보면 안 됩니다. 서버가 단명 JWT(**ClientToken**)에 서명하고, 페이지는
`generateToken()`으로 교환합니다.

```bash
npm install jsonwebtoken
```

```javascript title="server (Node.js)"
import jwt from "jsonwebtoken";

const userKey = process.env.AIHUMAN_USER_KEY; // 클라이언트로 보내지 마세요
const payload = {
  appId: process.env.AIHUMAN_APP_ID,
  platform: "web",
};
const options = {
  header: { typ: "JWT", alg: "HS256" },
  expiresIn: 60 * 5, // 5분
};

export function generateJWT(req, res) {
  const token = jwt.sign(payload, userKey, options);
  res.json({ appId: payload.appId, token });
}
```

`GET`(또는 `POST`) `/api/generateJWT`로 열어 두고, 페이지가 ClientToken이 필요할 때(에러 `1402`
포함) 호출하게 하세요.

## 완전 예제

페이지에 래퍼와 버튼을 두고, 설치 후 아래를 실행하세요. `getClientToken()`은 `/api/generateJWT`에
대한 `fetch`로 바꾸면 됩니다.

```html
<div id="AIPlayerWrapper" style="width: 480px; height: 720px;"></div>
<button id="speakBtn">말하기</button>
```

```javascript
import AIPlayer from "@deepbrainai/aihuman-web-sdk";

async function main() {
  const AI_PLAYER = new AIPlayer(document.getElementById("AIPlayerWrapper"));

  const { appId, token: clientToken } = await getClientToken();
  const auth = await AI_PLAYER.generateToken({ appId, token: clientToken });
  if (auth.status !== "success") throw new Error(auth.message);

  const list = await AI_PLAYER.getAIList();
  const aiName = list.data.ai[0].ai_name; // model_id가 아님
  await AI_PLAYER.init({ aiName });

  document.getElementById("speakBtn").onclick = () =>
    AI_PLAYER.send("안녕하세요! 만나서 반갑습니다.");
}
main();
```

:::warning 오디오는 사용자 동작이 필요합니다
브라우저는 사용자가 페이지와 상호작용하기 전까지 오디오를 막습니다. **첫** `send()`는 클릭(또는
탭)에서 호출하세요. 페이지 로드 시 바로 `send()`를 부르면 아바타는 나타나지만 무음입니다.
:::

## 단계별 설명

### 1. 플레이어 생성

```javascript
const wrapper = document.getElementById("AIPlayerWrapper");
const AI_PLAYER = new AIPlayer(wrapper);
```

아바타는 컨테이너를 채웁니다. CSS로 크기를 정하세요.

### 2. 인증

1. **고객사 서버**에서 ClientToken 발급 (`appId` + `userKey`, `platform: "web"`).
2. **브라우저**에서 `generateToken()`으로 교환.

```javascript
const { appId, token: clientToken } = await getClientToken();
const result = await AI_PLAYER.generateToken({ appId, token: clientToken });
// result.status === "success"
// result.data.token / result.data.token_expire — JWT는 SDK 안에 저장됩니다
// defaultAI는 없습니다. 아바타는 getAIList()의 ai_name으로 고릅니다
```

:::danger userKey를 절대 노출하지 마세요
ClientToken은 서버에서 만들고, 브라우저에는 단명 ClientToken만 전달하세요.
:::

### 3. `aiName` 조회 후 로드

표시 이름으로 아바타를 검색하는 별도 API는 없습니다. `generateToken()` 다음에
**`getAIList()`** 를 호출하세요. v2는 human API 응답을 그대로 돌려줍니다(camelCase 변환 없음).

```javascript
const list = await AI_PLAYER.getAIList();
// list.status === "success"
// list.data.ai = [{ ai_name, ai_type, ai_display_name?, model_id?, language?, thumb_url? }, ...]

const aiName =
  list.data.ai.find((m) => m.ai_display_name === "내 아바타")?.ai_name ??
  list.data.ai[0].ai_name;

await AI_PLAYER.init({ aiName });
```

`init({ aiName })`에는 **`ai_name`** 이 필요합니다. `model_id`를 넣지 마세요. `ai_display_name`은
UI용입니다. `language`와 `thumb_url`은 없을 수 있습니다. `init()`은 아바타가 발화 가능해지면
resolve됩니다.

처음 쓰는 계정은 목록에 **`sample-sage-v2`** 가 보이는 것이 일반적입니다. 이후 문서 예제가 이
샘플 아바타를 기준으로 합니다.

### 4. 발화

```javascript
AI_PLAYER.send("만나서 반갑습니다");
AI_PLAYER.send(["만나서 반갑습니다", "잘 지내세요?"]);
```

## 이벤트 수신 (선택)

```javascript
AI_PLAYER.onAIPlayerLoadingProgressed = (r) => console.log("loading", r?.loading);
AI_PLAYER.onAIPlayerEvent = (e) => console.log("event", e?.type);
AI_PLAYER.onAIPlayerErrorV2 = async (err) => {
  if (err?.code === 1402) {
    const { appId, token: clientToken } = await getClientToken();
    await AI_PLAYER.generateToken({ appId, token: clientToken });
    AI_PLAYER.reconnect();
    return;
  }
  if (err?.code === 1407) {
    console.error(err.code, err.message);
    return;
  }
  console.error(err?.code, err?.message);
};
```

| 이벤트 | 발생 시점 |
| ----- | -------- |
| `LOADING_PROGRESS` | 리소스 다운로드 중 (`r.loading` = %) |
| `LOAD_COMPLETED` | 아바타 준비 완료 |
| `SPEECH_STARTED` / `SPEECH_COMPLETED` | `send()` 재생 시작 / 완료 |

`1402` / `1407`은 [트러블슈팅](./troubleshooting)을 참고하세요. 이 에러에서 `release()`하지 마세요.
`generateToken()` 후 `reconnect()`하면 같은 세션이 이어집니다.

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
