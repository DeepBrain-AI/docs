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

## "Avatar not found" on `init`

- Verify the `aiName` exists in the list returned by `AI_PLAYER.getAIList()`.
- Confirm your account has access to that avatar.

## Speech starts but stops or stutters

- Check the browser console for network errors and confirm a stable connection.
- Listen for `onAIPlayerErrorV2` and inspect the error `code`/`message`.

## Nothing works and the console shows errors

Add the error/log hooks and share the output with support:

```javascript
AI_PLAYER.onAIPlayerErrorV2 = (err) => console.error(err?.code, err?.message);
```

Still stuck? Contact DeepBrain AI support with the console output and your `aiName`.
