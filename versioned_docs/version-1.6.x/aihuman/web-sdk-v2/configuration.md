---
sidebar_position: 3
---

# Configuration

Configure the player with `AI_PLAYER.setConfig(json)` **before** `init()`. All options are optional.
See [setConfig](./apis/aiplayer) for the full list.

## v2-specific options

| Option | Type | Description |
| ------ | ---- | ----------- |
| `enableEarlyStart` | `Boolean` | Loads the first part of the idle background first and starts earlier, reducing time-to-first-render. (default: `false`) |

```javascript
AI_PLAYER.setConfig({
  enableEarlyStart: false,
});
```

## Automatic mobile optimization

On mobile devices the player automatically shortens the idle background download so the avatar
appears faster and uses less memory. This is applied **automatically** based on the device — there
is no option to set. Desktop behavior is unchanged.

## Next steps

<div className="doc-cards">
  <a className="doc-card" href="./apis/aiplayer">
    <div className="doc-card__title">AIPlayer API <span className="doc-card__arrow">→</span></div>
    <div className="doc-card__desc">The full method and callback reference.</div>
  </a>
  <a className="doc-card" href="./troubleshooting">
    <div className="doc-card__title">Troubleshooting <span className="doc-card__arrow">→</span></div>
    <div className="doc-card__desc">Fix common playback and setup issues.</div>
  </a>
</div>
