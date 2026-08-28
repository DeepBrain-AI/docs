---
sidebar_position: 1
---

# AIPlayer Method

| Method            | Description                                       |
| ----------------- | ------------------------------------------------- |
| `init(json)`      | Initialize the AIPlayer with desired AI (async) |
| `getState()`      | Get AIPlayer's current State (AIPlayerState) |
| `setter(json)`    | Set AIPlayer's settings |
| `getter(string)`  | Get AIPlayer's AIsettings  |
| `preload(json)`   | Pre-load for AI Speaking. Check example below section |               
| `send(json)`      | Make AI Speak. Check example below section|
| `pause()`         | Pause speaking while speaking |
| `resume()`        | Resume speaking from pause |
| `stopSpeak()`     | Stop speaking and reset all data. (cannot resume) |
| `release()`       | Release resource (terminate AIPlayer, async) |
| `getGestures()`   | Get the list of available gestures |
| `getGender()`     | Get the current ai's gender|
| `reconnect(callback)`   | Try reconnect when AI_DISCNNECTED |
| `isConnected()`   | Can send to speak if true |
| `canPreload(callback)`   | Check if preload is possible |
| `setVolume(volume)`   | Volume Control. |
| `getVolume()`   | Get Current Volume. |
| `setMute(isMute)`   | Mute Control.|
| `getMute()`   | Get Mute state.|
| `generateToken()` | AIAPI - Generate authentication token using clientToken (async)|
| `getAIList()`     | AIAPI - Get the list of available AI models (async) |
| `getSampleTextList()` | AIAPI - Get the list of sample text (async) |
| `setConfig(json)` | AIAPI - Set configurations on AIPlayer |


<br/>

### 1. AIPlayer.init(json)

Initialize AI Player object with the given AI model parameters ([getAIList](../apis/aiapi#2-AIPlayer.getAIList))

- Parameter

  | Param          | Type     | Description                                                       |
  | -------------- | -------- | ----------------------------------------------------------------- |
  | `json`         | `Object` | parameters of the init function |
  | `json.aiName` | `String` | AI model name |
  | `json.size`    | `Float`  | AI model size (optional, default: 1.0) |
  | `json.left`    | `Number` | AI model left (optional, default: 0, pixel) |
  | `json.top`     | `Number` | AI model top (optional, default: 0, pixel) |
  | `json.speed`   | `Float`  | AI model speed (optional, step, 0.1, range : 0.5~1.5, default: 1) |

- Example

```javascript
  const result = await AI_PLAYER.init({
    aiName: "...", size: 1.0, left: 0, top: 0, speed: 1.0
  });
```


<br/>

### 2. AIPlayer.getState()

Get the AIPlayer's state. Check out [AIPlayerState](../apis/aiplayer-data#5-aiplayerstate)

- Return Parameter: `AIPlayerState`
 
- Example

```javascript
  const state = AI_PLAYER.getState());
```
  


<br/>

### 3. AIPlayer.setter(json)

Set AI object information

- Parameter

  | Param         | Type     | Description                                                               |
  | --------------| -------- | ------------------------------------------------------------------------- |
  | `json`        | `Object` | parameters of the setter function |
  | `json.size`   | `Float`  | AI model size (optional, range: 0 ~ 2.0, default: 1.0) |
  | `json.top`    | `Number` | AI model top (optional, default: 0) |
  | `json.left`   | `Number` | AI model left (optional, default: 0) |
  | `json.speed`  | `Float`  | AI model speech rate (optional, step, 0.1, range : 0.5 ~ 1.5, default: 1) |

- Example

```javascript
AI_PLAYER.setter({size: 1.2, top: 20, left: 20, speed: 1.2});
```


<br/>

### 4. AIPlayer.getter(key)

Get AI object information

- Return Parameter: AI model or AIPlayer information

  | Param | Type     | Value                                                                             | Description           |
  | ----- | -------- | --------------------------------------------------------------------------------- | --------------------- |
  | `key` | `String` | `'maxTextLength'` \| `'long_speech'` \| `'language'` \| `'size'` \| `'top'` \| `'left'` \| `'speed'` | AI model or AIPlayer information

- Example

```javascript
  AI_PLAYER.getter("key");
```


<br/>

### 5. AIPlayer.send(...)

Command used for making the AI speak. (If there exists a preloaded data, this data is reused)
To make the AI speak multiple sentences, send an Array of String.

- You may choose from two parameter types depending on use case.

  | Param        | Type             | Description                                                     |
  | ------------ | ---------------- | --------------------------------------------------------------- |
  | `text`       | `String`         | A single sentence. Used for single sentence speaking. |
  | `texts`      | `Array<String>` | A list of sentences.. Used for multiple sentences speaking. |

- Example

```javascript
//Case1. One Sentence Speak (text)
AI_PLAYER.send("Nice to meet you");
//Case2. Multi Sentences Speak (String Array)
AI_PLAYER.send(["Nice to meet you", "How are you?"]);
```


<br/>

### 6. AIPlayer.preload(...)

Pre-load function for AI Speech

- You may choose from four parameter types depending on use case.

  | Param        | Type             | Description                                                                  |
  | ------------ | ---------------- | ---------------------------------------------------------------------------- |
  | `text`       | `String`         | A sentence to preload. Used for preloading a single sentence. |
  | `texts`      | `Array<String>` | A list of sentences to preload. Used for preloading multiple sentences. |
  | `AIClipSet`  | `Object`         | A gesture sentence. Used for preloading a single gesture. |
  | `AIClipSets` | `Array<Object>` | A list of gesture sentences. Used for preloading multiple gesture sentences |

- Example

```javascript
// Case1. One Sentence Preload (text)
AI_PLAYER.preload("Nice to meet you");
// Case2. Multi Sentence Preload (String Array)
AI_PLAYER.preload(["Nice to meet you", "How are you?"]);
// Case3. One Gesture Preload (json)
AI_PLAYER.preload({ text: "Nice to meet you", gst: "hi" });
// Case4. Multi Gesture Preload (json Array)
AI_PLAYER.preload([{ text: "Nice to meet you", gst: "hi" }, { text: "How are you?" }]);
```


<br/>

### 7. AIPlayer.pause()

Temporarily pause AI speech.


<br/>

### 8. AIPlayer.resume()

Resume speech if the AI state was paused previously.


<br/>

### 9. AIPlayer.stopSpeak()

Stop AI speech and reset all data on queue. (cannot resume)


<br/>

### 10. AIPlayer.release()

Release system resources in use. (AIPlayer will not work properly after calling this method.)
- Examples

```javascript
  await AI_PLAYER.release();
```


<br/>

### 11. AIPlayer.getGestures()

Get a list of available gestures.

- Return Parameter: `Array<AIGesture>`

- Examples

```javascript
  const gestures = AI_PLAYER.getGestures();
```


<br/>

### 12. AIPlayer.getGender()

Gets the current AI gender ('MALE', 'FEMALE', 'UNI') and returns null if there is no value.

- Return Parameter: `MALE` || `FEMALE` || `UNI` || `null`

- Examples

```javascript
  const gender = AI_PLAYER.getGender();
```


<br/>

### 13. AIPlayer.reconnect(callback)
```javascript
AIPlayer.reconnect(callback = () => { })
```


<br/>

### 14. AIPlayer.isConnected()
```javascript
const isConnected = AI_PLAYER.isConnected();
```


<br/>

### 15. AIPlayer.canPreload()
```javascript
const canPreload = AI_PLAYER.canPreload(callback = () => { });
```


<br/>

### 16. AI_PLAYER.setVolume(volume)
```javascript
AI_PLAYER.setVolume(volume);

const curVolume = AI_PLAYER.getVolume();
```


<br/>

### 17. AI_PLAYER.setMute(isMute)
```javascript
AI_PLAYER.setMute(true)

const isMuted = AI_PLAYER.getMute();
```

<br/>

### 18. AI_PLAYER.setConfig(json)
Config AIPlayer object with the given parameters

- Parameter

  | Param           | Type     | Description |
  | --------------- | -------- | ----------- |
  | `json`          | `Object` | parameters of the function |
  | `json.logLevel` | `Number` | Console log's level (0 ~ 5, 0 min logs and 5 is full) |
  | `json.enableSpeechSplit`  | `Boolean` | Split the user input text with ".!?" then send them. And it processes them as if it is one sentence (default: false) |
  | `json.splitAPITimeout` | `Number` | Split API's timeout. If the split request failes, it just send the input text without split. (default: 4000, ms) |
  | `json.enableBGImgDB` | `Boolean`  | If enabled, the backgroud image resource is saved in the DB and will check the DB first when next time it needs. (default: false) |
  | `json.enableSpeechCache` | `Boolean`  | If enabled, when send text to speak it checks the browser cache DB first. When disabled, it request to server without checking the browser DB. (default: true) |
  | `json.enablePersistantSpeechCache` | `Boolean`  | If enabled, it does not initialize or delete the browser cache DB when the AIPlayer 'init' call. So that you can reduce the network traffic if the cache exists. But it can not be updated or renewed while the cache exists (default: false) |
  | `json.enableSkipErrorSpeech` | `Boolean`  | If enabled, it does not stop speaking even though there is an error occured from server(ex. "error: synth server is busy"). Also, if AIPlayer has speeches left in the  queue, it just send the next speech (default: false) |
  | `json.continuousBackground` | `Boolean`  | **(Beta)** If enabled, when the AI starts speaking, the background continues seamlessly from the idle motion instead of restarting from the first frame, so there is no visible jump at the moment speech begins. (default: false) |
  | `json.enableEarlyStart` | `Boolean`  | **(Beta)** Loads the first part of the idle background first and starts rendering earlier, reducing time-to-first-render. (default: false) |

- Example

```javascript
AI_PLAYER.setConfig({
  logLevel: 0
  enableSpeechSplit: false,
  splitAPITimeout: 4000,
  enableBGImgDB: false,
  enableSpeechCache: true,
  enablePersistantSpeechCache: false,
  enableSkipErrorSpeech: false,
  continuousBackground: false,
  enableEarlyStart: false
})
```
