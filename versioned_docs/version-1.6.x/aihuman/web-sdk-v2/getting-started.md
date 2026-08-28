---
sidebar_position: 2
---

# Getting Started

Get a talking AI avatar running in your web page in a few minutes. This guide walks you from an
empty HTML file to your first spoken sentence.

:::info Prerequisites
- An **`appId`** and **`userKey`** issued by DeepBrain AI. The `userKey` is a long‑lived secret —
  keep it on **your server**, never in the browser.
- A modern browser (latest Chrome, Edge, or Safari).
- The DeepBrain AI Web SDK v2 file (`aiPlayer-2.x.obf.js`) — provided for your deployment.
:::

## Complete example

Copy this into a single `index.html`, replace the `<script src>` and the token step, and open it in
a browser. Each part is explained in [Step by step](#step-by-step) below.

```html title="index.html"
<!doctype html>
<html>
  <body>
    <!-- 1. A container for the avatar -->
    <div id="AIPlayerWrapper" style="width: 480px; height: 720px;"></div>

    <!-- 2. A button — the first speech must start from a user action (see note below) -->
    <button id="speakBtn">Speak</button>

    <!-- 3. Load the SDK (use the file/URL provided for your deployment) -->
    <script src="aiPlayer-2.1.0.obf.js"></script>
    <script>
      async function main() {
        const AI_PLAYER = new AIPlayer(document.getElementById("AIPlayerWrapper"));

        // Exchange a ClientToken (issued by YOUR server) for a session token.
        const clientToken = await getClientToken(); // <- your backend call
        await AI_PLAYER.generateToken({ appId: "<your-appId>", token: clientToken });

        // Load the AI model you want to render.
        await AI_PLAYER.getAIList();
        await AI_PLAYER.init({ aiName: "<ai_name>" });

        // Speak — triggered by a click so the browser allows audio.
        document.getElementById("speakBtn").onclick = () =>
          AI_PLAYER.send("Hello! Nice to meet you.");
      }
      main();
    </script>
  </body>
</html>
```

:::warning Audio needs a user gesture
Browsers block audio until the user interacts with the page. Trigger the **first** `send()` from a
click (or tap) — as in the example above. Calling `send()` on page load will render the avatar but
stay silent.
:::

## Step by step

### 1. Include the SDK

```html
<script src="aiPlayer-2.1.0.obf.js"></script>
```

Once loaded, the `AIPlayer` class is available globally.

:::note
Use the exact file or CDN URL provided for your deployment in place of the relative path shown here.
:::

### 2. Create the player

```javascript
const wrapper = document.getElementById("AIPlayerWrapper");
const AI_PLAYER = new AIPlayer(wrapper);
```

The avatar is drawn to fill the container element — size and position it with CSS.

### 3. Authenticate

Authentication is a two‑step flow:

1. **On your server**, create a JWT **ClientToken** from your `appId` and `userKey`.
2. **In the browser**, exchange it with `generateToken()`.

```javascript
const clientToken = await getClientToken(); // your backend endpoint
const result = await AI_PLAYER.generateToken({ appId: appId, token: clientToken });
// result: { status: "success", data: { token_expire, ... } }
```

:::danger Never expose your userKey
The `userKey` is a long‑lived secret. Generate the ClientToken on your server and send only the
short‑lived ClientToken to the browser.
:::

### 4. Load an AI

```javascript
await AI_PLAYER.getAIList();               // available AI models
await AI_PLAYER.init({ aiName: "<ai_name>" }); // resolves when the avatar is ready
```

`init()` resolves once the avatar has loaded. After it resolves, the avatar is ready to speak.

### 5. Speak

```javascript
AI_PLAYER.send("Nice to meet you");                 // plain text
AI_PLAYER.send({ text: "Nice to meet you", gst: "hi" }); // with a gesture
```

## Handle events (optional)

```javascript
AI_PLAYER.onAIPlayerLoadingProgressed = (r) => console.log("loading", r?.loading);
AI_PLAYER.onAIPlayerEvent = (e) => console.log("event", e?.type);
AI_PLAYER.onAIPlayerErrorV2 = (err) => console.error(err?.code, err?.message);
```

| Event | Fires when |
| ----- | ---------- |
| `LOADING_PROGRESS` | Resources are downloading (`r.loading` = %) |
| `LOAD_COMPLETED` | The avatar is ready |
| `SPEECH_STARTED` / `SPEECH_COMPLETED` | A `send()` begins / finishes playing |

## Next steps

- **[Configuration](./configuration)** — tune playback, including v2‑only options.
- **[AIPlayer API](./apis/aiplayer)** — the full method and callback reference.
