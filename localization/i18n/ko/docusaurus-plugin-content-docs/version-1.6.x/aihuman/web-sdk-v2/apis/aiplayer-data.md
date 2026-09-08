---
sidebar_position: 1
---

# AIPlayer 데이터

### 1. AIModel

`getAIList()` → `data.ai[]` 항목입니다. 키는 snake_case입니다. **`ai_name`** 을 `init({ aiName })`에
넣습니다.

| Param               | Type     | Description |
| ------------------- | -------- | ----------- |
| `ai_name`           | `String` | 필수. `init({ aiName })`에 넣는 값 |
| `ai_type`           | `String` | 필수. `'2D'` |
| `ai_display_name`   | `String` | 선택. UI 라벨 전용 |
| `model_id`          | `String` | 선택. 카탈로그 id — `init` 인자가 아님 |
| `language`          | `String` | 선택. 예: `'ko'`, `'en'` |
| `thumb_url`         | `String` | 선택. 썸네일 URL |


<br/>

### 2. AIClipSet

| Param       | Type     | Description                                             |
| ----------- | -------- | ------------------------------------------------------- |
| `json`      | `Object` | AIClipset json object used for GesturePlay
| `json.text` | `String` | A sentence to be synthesized
| `json.gst`  | `String` | Gesture name. 


<br/>

### 3. AIGesture

| Param               | Type      |Description                                     |
| --------------------|-----------|----------------------------------------------- |
| `json`              | `Object`  | AIClipset json object used for GesturePlay
| `json.enableSpeech` | `Boolean` | A boolean indicating whether speech can be performed simultaneously to the gesture
| `json.gst`          | `String`  | Gesture's name


<br/>

### 4. AIPlayerState
| Param               | Type              | Description                            |
| ------------------- | ------------------| -------------------------------------- |
| `state`             | `Number`          | AIPlayerState(`NONE: 0`, `INITIALIZE: 1`, `IDLE: 2`, `PLAY: 3`, `PAUSE: 4`, `RELEASE: 5`)


<br/>

### 5. AIError
| Param               | Type              | Description                            |
| ------------------- | ------------------| -------------------------------------- |
| `json`              | `Object`          | AIError
| `json.code`         | `AIErrorCode`     | AIError code number
| `json.message`      | `String`          | AIError message

#### 5.1. AIErrorCode
| Param               | Type              | Description                            |
| ------------------- | ------------------| -------------------------------------- |
| `code`              | `Number`          | SDK 대역: `AI_API_ERR: 10000`, `AI_SERVER_ERR: 11000`, `AI_RES_ERR: 12000`, `AI_INIT_ERR: 13000`, `INVALID_AICLIPSET_ERR: 14000`, `AICLIPSET_PRELOAD_ERR: 15000`, `AICLIPSET_PLAY_ERR: 16000`, `RESERVED_ERR: 17000`, `UNKNOWN_ERR: -1`. 서버 코드는 **0–9999**이며 위 SDK 대역이 아닙니다. 자주 쓰는 값: `1402` 토큰 만료, `1407` 토큰 무효. `1402`는 `INVALID_AICLIPSET_ERR`(`14000`)가 아닙니다. [트러블슈팅](../troubleshooting)을 참고하세요. |


<br/>

### 6. AIEvent
| Param               | Type              | Description                            |
| ------------------- | ------------------| -------------------------------------- |
| `json`              | `Object`          | AIEvent
| `json.type`         | `AIEventType`     | AIEvent type number
| `json.clipSet`      | `AIClipSet`       | AIClipSet related with this AIEvent

#### 6.1. AIEventType
| Param               | Type              | Description                            |
| ------------------- | ------------------| -------------------------------------- |
| `type`              | `Number`          | AIEventType( `RES_LOAD_STARTED: 0`, `RES_LOAD_COMPLETED: 1`, `AICLIPSET_PLAY_PREPARE_STARTED: 2`, `AICLIPSET_PLAY_PREPARE_COMPLETED: 3`, `AICLIPSET_PRELOAD_STARTED: 4`, `AICLIPSET_PRELOAD_COMPLETED: 5`, `AICLIPSET_PRELOAD_FAILED: 6`, `AICLIPSET_PLAY_STARTED: 7`, `AICLIPSET_PLAY_COMPLETED: 8`, `AICLIPSET_PLAY_FAILED: 9`, `AI_CONNECTED: 10`, `AI_DISCONNECTED: 11`, `AICLIPSET_PLAY_BUFFERING: 12`, `AICLIPSET_RESTART_FROM_BUFFERING: 13`, `AIPLAYER_STATE_CHANGED: 14`, `AI_RECONNECT_ATTEMPT: 15`, `AI_RECONNECT_FAILED: 16`, `UNKNOWN: -1`,)