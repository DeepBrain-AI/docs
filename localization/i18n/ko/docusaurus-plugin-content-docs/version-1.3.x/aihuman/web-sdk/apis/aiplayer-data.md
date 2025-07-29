---
sidebar_position: 1
---

# AIPlayer DATA

### 1. AIModel

| Param                | Type     | Description                                   |
| -------------------- | -------- | --------------------------------------------- |
| `json`               | `Object` | getAiList return
| `json.aiName`        | `String` | AI name
| `json.aiDisplayName` | `String` | AI display name
| `json.aiType`        | `String` | AI type(`'2D'`)
| `json.language`      | `String` | AI available Language(`'kr'`, `'en'`, `'zh'`)
| `json.thumbUrl`      | `String` | AI thumbnail image url


<br/>

### 2. AIClipSet

| Param       | Type     | Description                                                                                                                                              |
| ----------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `json`      | `Object` | AIClipset json object used for GesturePlay
| `json.text` | `String` | A sentence to be synthesized
| `json.gst`  | `String` | Gesture name can be obtained from [AIPlayer.getGestures()](../apis/aiplayer#10-aiplayergetgestures), If there is no gst value, the function performs like normal speech


<br/>

### 3. AIGesture

| Param               | Type      | Description                                                                        |
| ------------------- | --------- | ---------------------------------------------------------------------------------- |
| `json`              | `Object`  | AIClipset json object used for GesturePlay
| `json.enableSpeech` | `Boolean` | A boolean indicating whether speech can be performed simultaneously to the gesture
| `json.gst`          | `String`  | Gesture's name


<br/>

### 4. CustomVoice

| Param               | Type              | Description                            |
| ------------------- | ------------------| -------------------------------------- |
| `json`              | `Object`          | CustomVoice
| `json.id`           | `String`          | CustomVoice id
| `json.language`     | `String`          | CustomVoice supported languages
| `json.name`         | `String`          | CustomVoice name
| `json.gender`       | `String`          | CustomVoice gender("MALE", "FEMALE", "UNI")
