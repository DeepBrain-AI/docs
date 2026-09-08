---
sidebar_position: 2
---

# API 기반 AIPlayer 메소드

v2는 human API 응답을 그대로 돌려줍니다(snake_case). `succeed`, `defaultAI`, camelCase 변환은
없습니다.

### 1. AIPlayer.generateToken(json)

단명 ClientToken을 세션 JWT로 교환합니다. 성공하면 SDK 안에 JWT가 저장되고 `getAIList()` /
`init()`을 호출할 수 있습니다.

- Parameter

  | Param        | Type     | Description                              |
  | ------------ | -------- | ---------------------------------------- |
  | `json`       | `Object` | generateToken 파라미터 |
  | `json.appId` | `String` | AppId                                    |
  | `json.token` | `String` | JWT Client Token                         |

- Return Parameter

  | Param                      | Type     | Description |
  | -------------------------- | -------- | ----------- |
  | `return`                   | `Object` | human API 응답 그대로 |
  | `return.status`            | `String` | 성공 시 `"success"` |
  | `return.code`             | `Number` | 성공 시 `2000` |
  | `return.message`           | `String` | 예: `"Success"` |
  | `return.data.token`        | `String` | 세션 JWT (SDK 내부에도 저장됨) |
  | `return.data.token_expire`| `Number` | Unix timestamp (초) |
  | `return.timestamp`        | `String` | ISO-8601 |

`defaultAI`는 없습니다. 아바타는 `getAIList()`에서 고릅니다.

- Example

```javascript
const result = await AI_PLAYER.generateToken({ appId: "...", token: "..." });
if (result.status !== "success") {
  throw new Error(result.message ?? "generateToken 실패");
}
// result.data.token / result.data.token_expire 가 있고, SDK가 이미 저장했습니다
```

검증된 응답 형태:

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

현재 세션이 사용할 수 있는 아바타 목록입니다. `generateToken()` 성공 뒤에 호출하세요.

- Return Parameter

  | Param             | Type     | Description |
  | ----------------- | -------- | ----------- |
  | `return`          | `Object` | human API 응답 그대로 |
  | `return.status`   | `String` | 성공 시 `"success"` |
  | `return.code`     | `Number` | 성공 시 `2000` |
  | `return.data.ai` | `Array`  | 아바타 객체 배열 (아래 필드) |

각 `data.ai[]` 항목:

  | Field             | 필수 | Description |
  | ----------------- | ---- | ----------- |
  | `ai_name`         | 예   | `init({ aiName })`에 넣는 값 |
  | `ai_type`         | 예   | `"2D"` |
  | `ai_display_name` | 선택 | UI 라벨 전용 |
  | `model_id`        | 선택 | 카탈로그 id. `ai_name`과 같더라도 `init()`에는 `ai_name`을 넣으세요 |
  | `language`        | 선택 | 예: `"ko"`. 없으면 필드 자체를 생략할 수 있음 |
  | `thumb_url`       | 선택 | 썸네일 URL. 없으면 생략할 수 있음 |

- Example

```javascript
const result = await AI_PLAYER.getAIList();
if (result.status !== "success") {
  throw new Error(result.message ?? "getAIList 실패");
}

const aiName = result.data.ai[0].ai_name;
await AI_PLAYER.init({ aiName });
```

검증된 응답 형태:

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

현재 적용된 언어로 샘플 문장을 가져옵니다.

- Return Parameter: `Array<String>`

- Examples

```javascript
const texts = await AI_PLAYER.getSampleTextList();
```
