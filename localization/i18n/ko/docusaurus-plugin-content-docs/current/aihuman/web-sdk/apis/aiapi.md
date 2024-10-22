---
sidebar_position: 2
---

# API 기반 AIPlayer 메소드

## 1 AIPlayer.generateToken(json)

발급받은 userKey로 인증을 시도합니다(JWT Verified Token). 성공하면 기본 AI 모델 정보가 셋팅됩니다.

- Parameter

  | Param        | Type     | Description                              |
  | ------------ | -------- | ---------------------------------------- |
  | `json`       | `Object` | parameters of the generateToken function |
  | `json.appId` | `String` | AppId                                    |
  | `json.token` | `String` | JWT Client Token                         |

- Return Parameter

  | Param                | Type      | Description                      |
  | -------------------- | --------- | -------------------------------- |
  | `return`             | `Object`  | generateToken return             |
  | `return.succeed`     | `Boolean` | true: Success, false: Fail       |
  | `return.defaultAI`   | `Object`  | default AI({ "ai_name": "..." }) |
  | `return.token`       | `String`  | JWT Verified Token               |
  | `return.tokenExpire` | `Number`  | JWT Verified Token Expire        |

- Example

```javascript
const result = await AI_PLAYER.generateToken({ appId: "...", token: "..." });
```

## 2. AIPlayer.getAIList()

SDK 인증 성공한 상태에서 사용가능한 ai 리스트를 가져옵니다.

- Return Parameter

  | Param            | Type              | Description                |
  | ---------------- | ----------------- | -------------------------- |
  | `return`         | `Object`          | getAIList return           |
  | `return.succeed` | `Boolean`         | True: Success, False: Fail |
  | `return.ai`      | `Array<AIModel/>` | AI Model List              |

- Example

```javascript
const result = await AI_PLAYER.getAIList();
```

## 3. AIPlayer.getSampleTextList()

현재 적용된 언어로 샘플 문장을 가져옵니다.

- Return Parameter: `Array<String>`

- Examples

```javascript
const texts = await AI_PLAYER.getSampleTextList();
```
