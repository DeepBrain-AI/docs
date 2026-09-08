---
sidebar_position: 5
---

# Troubleshooting

Common issues when integrating the Web SDK v2, and how to resolve them.

## The avatar doesn't appear

The container element likely has no size. The avatar fills its wrapper, so a `0 × 0` wrapper renders
nothing.

```html
<div id="AIPlayerWrapper" style="width: 480px; height: 720px;"></div>
```

Also confirm `init()` resolved successfully — it rejects if the AI failed to load.

## The avatar appears but there's no sound

Browsers block audio until the user interacts with the page.

:::warning
Trigger the **first** `send()` from a user action (a click or tap). Calling `send()` on page load
renders the avatar but stays silent.
:::

```javascript
button.onclick = () => AI_PLAYER.send("Hello!");
```

## `generateToken` fails

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| `status` is not `"success"` | ClientToken is invalid or expired | Re‑issue the ClientToken on **your server** and call `generateToken()` again |
| Rejected immediately | Wrong `appId`, or `appId`/token mismatch | Ensure the `appId` matches the one used to mint the ClientToken |

:::danger
Never generate the ClientToken in the browser — it requires your `userKey`, a long‑lived secret.
Mint it on your server and pass only the short‑lived ClientToken to the client.
:::

## Token expired (`1402`) or invalid (`1407`)

The SDK reports these codes on `onAIPlayerErrorV2`. It does **not** refresh the token or call
`release()`. Keep the avatar on screen and handle the code in your app.

Current v2 SDKs surface `1402` / `1407` as those numbers. Older builds may wrap the same failure as
`13000` (init) instead.

| Code | Meaning | What to do |
| --- | --- | --- |
| `1402` | Session JWT expired | Re‑issue a ClientToken on **your server**, call `generateToken()`, then `reconnect()`. Do **not** call `release()`. Do **not** reconnect with the old JWT. |
| `1407` | Token invalid (wrong secret, forged JWT, or ClientToken used as the session JWT) | Stop retrying. Fix how the token is minted or passed. |

```javascript
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

Calling `release()` on a brief disconnect or on `1402` ends the session. Reconnecting without
`release()` continues the same session. After `release()`, the next `init()` starts a new session.

## "Avatar not found" on `init`

- Verify the `aiName` exists in `AI_PLAYER.getAIList()` (`result.data.ai[].ai_name`). Use
  `ai_display_name` only for UI labels — `init({ aiName })` needs `ai_name`.
- Confirm your account has access to that avatar.

## `12000` — "The source image could not be decoded"

The SDK tried to decode a resource that is not an image (often an HTML/XML 404). Confirm you are on
the published npm package (`npm install @deepbrainai/aihuman-web-sdk`, latest) and that you did not
override `resourceServer` to a retired host. The default resource host is
`https://media.aistudios.com/sdk`.

## Speech starts but stops or stutters

- Check the browser console for network errors and confirm a stable connection.
- Listen for `onAIPlayerErrorV2` and inspect the error `code`/`message`.

## Nothing works and the console shows errors

Add the error/log hooks and share the output with support:

```javascript
AI_PLAYER.onAIPlayerErrorV2 = (err) => console.error(err?.code, err?.message);
```

Still stuck? Contact DeepBrain AI support with the console output and your `aiName`.

## Next steps

<div className="doc-cards">
  <a className="doc-card" href="./getting-started">
    <div className="doc-card__title">Getting Started <span className="doc-card__arrow">→</span></div>
    <div className="doc-card__desc">Revisit the full setup flow.</div>
  </a>
  <a className="doc-card" href="./apis/aiplayer">
    <div className="doc-card__title">AIPlayer API <span className="doc-card__arrow">→</span></div>
    <div className="doc-card__desc">The full method and callback reference.</div>
  </a>
</div>
