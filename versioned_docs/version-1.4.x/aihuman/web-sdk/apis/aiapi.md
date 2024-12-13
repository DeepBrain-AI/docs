---
sidebar_position: 2
---

# AIPlayer API Method

### 1 AIPlayer.generateToken(json)

Get JWT Verified Token

- Parameter

  | Param        | Type     | Description                              |
  | ------------ | -------- | ---------------------------------------- |
  | `json`       | `Object` | parameters of the generateToken function |
  | `json.appId` | `String` | AppId
  | `json.token` | `String` | JWT Client Token

- Return Parameter

  | Param                | Type      | Description                          |
  | -------------------- | --------- | ------------------------------------ |
  | `return`             | `Object`  | generateToken return
  | `return.succeed`     | `Boolean` | true: Success, false: Fail
  | `return.defaultAI`   | `Object`  | default AI({ "ai_name": "..." })
  | `return.token`       | `String`  | JWT Verified Token
  | `return.tokenExpire` | `Number`  | JWT Verified Token Expire

- Example

```javascript
  const result = await AI_PLAYER.generateToken({ appId: "...", token: "..." });
```

### 2. AIPlayer.getAIList()

Get a list of available AI models

- Return Parameter

  | Param            | Type              | Description                |
  | -----------------| ----------------- | -------------------------- |
  | `return`         | `Object`          | getAIList return
  | `return.succeed` | `Boolean`         | True: Success, False: Fail 
  | `return.ai`      | `Array<AIModel>` | AI Model List

- Example

```javascript
  const result = await AI_PLAYER.getAIList();
```

### 3. AIPlayer.getSampleTextList()

Gets the sample text list of AI's default language or set voice language

- Return Parameter: `Array<String>`

- Examples

```javascript
  const texts = await AI_PLAYER.getSampleTextList();
```
