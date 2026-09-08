---
sidebar_position: 2
---

# Getting Started

Get a talking AI avatar running in your web app in a few minutes.

:::info Prerequisites
- An **`appId`** and **`userKey`** issued from the
  [API Key page](https://account.aistudios.com/user/api-key?service=aistudios)
  (see [Get appId and userKey](#get-appid-and-userkey)). Keep `userKey` on **your server**, never in
  the browser.
- Node.js and a bundler (Vite, webpack, Next.js, …) so you can install the SDK from npm.
- A modern browser (latest Chrome, Edge, or Safari).
:::

## Install the SDK

```bash
npm install @deepbrainai/aihuman-web-sdk
```

```javascript
import AIPlayer from "@deepbrainai/aihuman-web-sdk";
```

The package is a browser bundle. `AIPlayer` is the same class used in the rest of this guide.

## Get appId and userKey

:::warning Use the Interactive Avatar API key
The API Key page has two tabs, and they issue **different keys**. The Web SDK works only with the
**Interactive Avatar API** key. The **AI Video API** key on the other tab is for video generation and
will fail authentication here.
:::

1. Open the **[API Key page](https://account.aistudios.com/user/api-key?service=aistudios)** and sign
   in (or create an account: top right → Login / Sign in).
2. Select the **Interactive Avatar API** tab — not **AI Video API**, which is selected by default.
3. Click **Issue key** on that tab. A dialog shows **App ID (Client ID)** and **User Key (Secret)** —
   these are the `appId` and `userKey` used below.
4. Copy the **User Key** before closing the dialog. It is shown only once and cannot be retrieved
   later (the table **Copy** button copies App ID only). If you lose the User Key, issue a new key.
5. If **Issue key** is disabled and the page says key issuance is being prepared, ask
   [support](https://www.aistudios.com/company/contact) to enable it for your account.

`userKey` is a long‑lived secret. Only your backend should read it.

## Mint a ClientToken on your server

The browser must not see `userKey`. Your server signs a short‑lived JWT (**ClientToken**) and the
page exchanges it with `generateToken()`.

```bash
npm install jsonwebtoken
```

```javascript title="server (Node.js)"
import jwt from "jsonwebtoken";

const userKey = process.env.AIHUMAN_USER_KEY; // never ship this to the client
const payload = {
  appId: process.env.AIHUMAN_APP_ID,
  platform: "web",
};
const options = {
  header: { typ: "JWT", alg: "HS256" },
  expiresIn: 60 * 5, // 5 minutes
};

export function generateJWT(req, res) {
  const token = jwt.sign(payload, userKey, options);
  res.json({ appId: payload.appId, token });
}
```

Expose that as `GET` (or `POST`) `/api/generateJWT`. The page calls it when it needs a ClientToken
(including after error `1402`).

## Complete example

Put a wrapper and a button in the page, then run this after install. Replace `getClientToken()` with
a `fetch` to your `/api/generateJWT`.

```html
<div id="AIPlayerWrapper" style="width: 480px; height: 720px;"></div>
<button id="speakBtn">Speak</button>
```

```javascript
import AIPlayer from "@deepbrainai/aihuman-web-sdk";

async function main() {
  const AI_PLAYER = new AIPlayer(document.getElementById("AIPlayerWrapper"));

  const { appId, token: clientToken } = await getClientToken();
  const auth = await AI_PLAYER.generateToken({ appId, token: clientToken });
  if (auth.status !== "success") throw new Error(auth.message);

  const list = await AI_PLAYER.getAIList();
  const aiName = list.data.ai[0].ai_name; // not model_id
  await AI_PLAYER.init({ aiName });

  document.getElementById("speakBtn").onclick = () =>
    AI_PLAYER.send("Hello! Nice to meet you.");
}
main();
```

:::warning Audio needs a user gesture
Browsers block audio until the user interacts with the page. Trigger the **first** `send()` from a
click (or tap). Calling `send()` on page load will render the avatar but stay silent.
:::

## Step by step

### 1. Create the player

```javascript
const wrapper = document.getElementById("AIPlayerWrapper");
const AI_PLAYER = new AIPlayer(wrapper);
```

The avatar fills the container — size it with CSS.

### 2. Authenticate

1. **On your server**, mint a ClientToken (`appId` + `userKey`, `platform: "web"`).
2. **In the browser**, exchange it with `generateToken()`.

```javascript
const { appId, token: clientToken } = await getClientToken();
const result = await AI_PLAYER.generateToken({ appId, token: clientToken });
// result.status === "success"
// result.data.token / result.data.token_expire — JWT is stored inside the SDK
// there is no defaultAI; pick ai_name from getAIList()
```

:::danger Never expose your userKey
Generate the ClientToken on your server. Send only the short‑lived ClientToken to the client.
:::

### 3. Look up `aiName` and load

There is no separate “search avatar by display name” API. After `generateToken()`, call
**`getAIList()`**. v2 returns the human API envelope as-is (no camelCase remap):

```javascript
const list = await AI_PLAYER.getAIList();
// list.status === "success"
// list.data.ai = [{ ai_name, ai_type, ai_display_name?, model_id?, language?, thumb_url? }, ...]

const aiName =
  list.data.ai.find((m) => m.ai_display_name === "My Avatar")?.ai_name ??
  list.data.ai[0].ai_name;

await AI_PLAYER.init({ aiName });
```

`init({ aiName })` needs **`ai_name`**. Do not pass `model_id`. `ai_display_name` is UI-only.
`language` and `thumb_url` may be omitted. `init()` resolves when the avatar is ready to speak.

New accounts typically see **`sample-sage-v2`** in this list. That is the sample avatar used in
the rest of these docs.

### 4. Speak

```javascript
AI_PLAYER.send("Nice to meet you");
AI_PLAYER.send(["Nice to meet you", "How are you?"]);
```

## Handle events (optional)

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

| Event | Fires when |
| ----- | ---------- |
| `LOADING_PROGRESS` | Resources are downloading (`r.loading` = %) |
| `LOAD_COMPLETED` | The avatar is ready |
| `SPEECH_STARTED` / `SPEECH_COMPLETED` | A `send()` begins / finishes playing |

See [Troubleshooting](./troubleshooting) for `1402` / `1407`. Do not call `release()` on those
errors — reconnect after `generateToken()` to keep the same session.

## Next steps

<div className="doc-cards">
  <a className="doc-card" href="./configuration">
    <div className="doc-card__title">Configuration <span className="doc-card__arrow">→</span></div>
    <div className="doc-card__desc">Tune playback, including v2‑only options.</div>
  </a>
  <a className="doc-card" href="./apis/aiplayer">
    <div className="doc-card__title">AIPlayer API <span className="doc-card__arrow">→</span></div>
    <div className="doc-card__desc">The full method and callback reference.</div>
  </a>
</div>
