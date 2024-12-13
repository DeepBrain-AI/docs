---
sidebar_position: 1
---

# AIPlayer 데이터

### 1. AIModel

| Param                | Type     | Description                                   |
| -------------------- | -------- | --------------------------------------------- |
| `json`               | `Object` | getAiList return
| `json.aiName`        | `String` | AI name
| `json.aiDisplayName` | `String` | AI display name
| `json.aiType`        | `String` | AI type(`'2D', '3D'`)
| `json.language`      | `String` | AI available Language(`'kr'`, `'en'`, `'zh'`)
| `json.thumbUrl`      | `String` | AI thumbnail image url

### 2. AIClipSet

| Param       | Type     | Description                                             |
| ----------- | -------- | ------------------------------------------------------- |
| `json`      | `Object` | AIClipset json object used for GesturePlay
| `json.text` | `String` | A sentence to be synthesized
| `json.gst`  | `String` | Gesture name. 
| `json.voice` | `CustomVoice` | A Custom Voice to be synthesized

### 3. AIGesture

| Param               | Type      |Description                                     |
| --------------------|-----------|----------------------------------------------- |
| `json`              | `Object`  | AIClipset json object used for GesturePlay
| `json.enableSpeech` | `Boolean` | A boolean indicating whether speech can be performed simultaneously to the gesture
| `json.gst`          | `String`  | Gesture's name

### 4. CustomVoice

| Param               | Type              | Description                            |
| ------------------- | ------------------| -------------------------------------- |
| `json`              | `Object`          | CustomVoice
| `json.id`           | `String`          | CustomVoice id
| `json.language`     | `String`          | CustomVoice supported languages
| `json.name`         | `String`          | CustomVoice name
| `json.gender`       | `String`          | CustomVoice gender(`MALE`, `FEMALE`, `UNI`)

### 5. AIPlayerState
| Param               | Type              | Description                            |
| ------------------- | ------------------| -------------------------------------- |
| `state`             | `Number`          | AIPlayerState(`NONE: 0`, `INITIALIZE: 1`, `IDLE: 2`, `PLAY: 3`, `PAUSE: 4`, `RELEASE: 5`)

### 6. AIError
| Param               | Type              | Description                            |
| ------------------- | ------------------| -------------------------------------- |
| `json`              | `Object`          | AIError
| `json.code`         | `AIErrorCode`     | AIError code number
| `json.message`      | `String`          | AIError message

#### 6.1. AIErrorCode
| Param               | Type              | Description                            |
| ------------------- | ------------------| -------------------------------------- |
| `code`              | `Number`          | AIErrorCode(`AI_API_ERR: 10000`, `AI_SERVER_ERR: 11000`, `AI_RES_ERR: 12000`, `AI_INIT_ERR: 13000`, `INVALID_AICLIPSET_ERR: 14000`, `AICLIPSET_PRELOAD_ERR: 15000`, `AICLIPSET_PLAY_ERR: 16000`, `RESERVED_ERR: 17000`, `UNKNOWN_ERR:-1`,)

### 7. AIEvent
| Param               | Type              | Description                            |
| ------------------- | ------------------| -------------------------------------- |
| `json`              | `Object`          | AIEvent
| `json.type`         | `AIEventType`     | AIEvent type number
| `json.clipSet`      | `AIClipSet`       | AIClipSet related with this AIEvent

#### 7.1. AIEventType
| Param               | Type              | Description                            |
| ------------------- | ------------------| -------------------------------------- |
| `type`              | `Number`          | AIEventType( `RES_LOAD_STARTED: 0`, `RES_LOAD_COMPLETED: 1`, `AICLIPSET_PLAY_PREPARE_STARTED: 2`, `AICLIPSET_PLAY_PREPARE_COMPLETED: 3`, `AICLIPSET_PRELOAD_STARTED: 4`, `AICLIPSET_PRELOAD_COMPLETED: 5`, `AICLIPSET_PRELOAD_FAILED: 6`, `AICLIPSET_PLAY_STARTED: 7`, `AICLIPSET_PLAY_COMPLETED: 8`, `AICLIPSET_PLAY_FAILED: 9`, `AI_CONNECTED: 10`, `AI_DISCONNECTED: 11`, `AICLIPSET_PLAY_BUFFERING: 12`, `AICLIPSET_RESTART_FROM_BUFFERING: 13`, `AIPLAYER_STATE_CHANGED: 14`, `AI_RECONNECT_ATTEMPT: 15`, `AI_RECONNECT_FAILED: 16`, `UNKNOWN: -1`,)