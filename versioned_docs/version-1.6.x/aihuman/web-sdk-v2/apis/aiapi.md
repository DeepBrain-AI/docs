---
sidebar_position: 2
---

# AIPlayer method using API

v2 returns the human API envelope as-is (snake_case). There is no `succeed`, `defaultAI`, or
camelCase remap.

### 1. AIPlayer.generateToken(json)

Exchange a short-lived ClientToken for a session JWT. On success the SDK stores the JWT internally;
then you can call `getAIList()` and `init()`.

- Parameter

  | Param        | Type     | Description                              |
  | ------------ | -------- | ---------------------------------------- |
  | `json`       | `Object` | parameters of the generateToken function |
  | `json.appId` | `String` | AppId                                    |
  | `json.token` | `String` | JWT Client Token                         |

- Return Parameter

  | Param                   | Type     | Description |
  | ----------------------- | -------- | ----------- |
  | `return`                | `Object` | human API envelope |
  | `return.status`         | `String` | `"success"` on OK |
  | `return.code`          | `Number` | `2000` on OK |
  | `return.message`        | `String` | e.g. `"Success"` |
  | `return.data.token`     | `String` | session JWT (also stored inside the SDK) |
  | `return.data.token_expire` | `Number` | Unix timestamp (seconds) |
  | `return.timestamp`      | `String` | ISO-8601 |

There is no `defaultAI`. Pick an avatar from `getAIList()`.

- Example

```javascript
const result = await AI_PLAYER.generateToken({ appId: "...", token: "..." });
if (result.status !== "success") {
  throw new Error(result.message ?? "generateToken failed");
}
// result.data.token / result.data.token_expire exist; the SDK already stored them
```

Verified shape:

```json
{
  "status": "success",
  "code": 2000,
  "message": "Success",
  "data": {
    "token": "<session JWT>",
    "token_expire": 1788854164
  },
  "timestamp": "2026-09-08T05:56:04.131Z"
}
```

<br/>

### 2. AIPlayer.getAIList()

List avatars the current session is allowed to use. Call after a successful `generateToken()`.

- Return Parameter

  | Param              | Type     | Description |
  | ------------------ | -------- | ----------- |
  | `return`           | `Object` | human API envelope |
  | `return.status`    | `String` | `"success"` on OK |
  | `return.code`     | `Number` | `2000` on OK |
  | `return.data.ai`  | `Array`  | avatar objects (see fields below) |

Each `data.ai[]` item:

  | Field              | Required | Description |
  | ------------------ | -------- | ----------- |
  | `ai_name`          | yes      | Pass this to `init({ aiName })` |
  | `ai_type`          | yes      | `"2D"` |
  | `ai_display_name`  | optional | UI label only |
  | `model_id`         | optional | Catalog id. Do **not** pass this to `init()` unless it equals `ai_name` |
  | `language`         | optional | e.g. `"ko"`. Omitted or unused when empty |
  | `thumb_url`        | optional | Thumbnail URL. Omitted when empty |

- Example

```javascript
const result = await AI_PLAYER.getAIList();
if (result.status !== "success") {
  throw new Error(result.message ?? "getAIList failed");
}

const aiName = result.data.ai[0].ai_name;
await AI_PLAYER.init({ aiName });
```

Verified shape:

```json
{
  "status": "success",
  "code": 2000,
  "message": "Success",
  "data": {
    "ai": [
      {
        "model_id": "sample-sage-v2",
        "ai_name": "sample-sage-v2",
        "ai_display_name": "Sample-sage-v2",
        "language": "ko",
        "thumb_url": "https://cdn.aistudios.com/thumbnail/default.png",
        "ai_type": "2D"
      }
    ]
  },
  "timestamp": "2026-09-08T05:56:04.162Z"
}
```

<br/>

### 3. AIPlayer.getSampleTextList()

Gets the sample text list for the current AI language.

- Return Parameter: `Array<String>`

- Examples

```javascript
const texts = await AI_PLAYER.getSampleTextList();
```
