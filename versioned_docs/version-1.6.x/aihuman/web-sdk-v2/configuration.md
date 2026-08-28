---
sidebar_position: 3
---

# Configuration

Configure the player with `AI_PLAYER.setConfig(json)` **before** `init()`. All options are optional.

The v2 SDK accepts the same base configuration options as the previous SDK (see the
[setConfig reference](./apis/aiplayer)), plus the v2-specific options below.

## v2-specific options

| Option | Type | Description |
| ------ | ---- | ----------- |
| `continuousBackground` | `Boolean` | **(Beta)** When enabled, the avatar's background continues seamlessly from the idle motion into speech instead of restarting from the first frame, so there is no visible jump when speech begins. (default: `false`) |
| `enableEarlyStart` | `Boolean` | **(Beta)** Loads the first part of the idle background first and starts earlier, reducing time-to-first-render. (default: `false`) |

```javascript
AI_PLAYER.setConfig({
  continuousBackground: false,
  enableEarlyStart: false,
});
```

## Automatic mobile optimization

On mobile devices the player automatically shortens the idle background download so the avatar
appears faster and uses less memory. This is applied **automatically** based on the device — there
is no option to set. Desktop behavior is unchanged.

:::note Beta
`continuousBackground` and `enableEarlyStart` are in **beta** and disabled by default. Enable them
per integration after testing.
:::

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
