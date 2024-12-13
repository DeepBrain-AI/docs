---
sidebar_position: 1
---

# AIPlayer Method

| Method            | Description                                       |
| ----------------- | ------------------------------------------------- |
| `init(json)`      | Initialize the AIPlayer with desired ai |
| `getState()`      | Get AIPlayer's current State (AIPlayerState) |
| `setter(json)`    | Set AIPlayer's settings |
| `getter(string)`  | Get AIPlayer's AIsettings  |
| `preload(json)`   | Pre-load for AI Speaking. Check example below section |               
| `send(json)`      | Make AI Speak. Check example below section|
| `pause()`         | Pause speaking while speaking |
| `resume()`        | Resume speaking from pause |
| `stopSpeak()`     | Stop speaking and reset all data. (cannot resume) |
| `release()`       | Release resource (terminate AIPlayer) |
| `getGestures()`   | Get the list of available AI |
| `getGender()`     | Get the current ai's gender|
| `getSpeakableLanguages(gender)` | Get the current ai's speakable language with gender |
| `getCustomVoice()`   | Get the current customVoice of set ai|
| `getCustomVoicesWith(language, gender)` | Get the current customVoice of set ai with language and gender |
| `findCustomVoice(voiceId) `   | Get the CustomVoice object corresponding to id |
| `setCustomVoice(customVoice) `   | Set the voice of AI with specific customVoice|
| `setCustomVoiceForLanguage(language, gender)`   | Set the voice of AI by language and gender |
| `reconnect(callback)`   | Try reconnect when AI_DISCNNECTED |
| `isConnected()`   | Can send to speak if true |
| `canPreload(callback)`   | Check if preload is possible |
| `setVolme(volume)`   | Volume Control. |
| `getVolme()`   | Get Current Volume. |
| `setMute(isMute)`   | Mute Control. 3D model not supported|
| `getMute()`   | Get Mute state. 3D model not supported|
| `generateToken()` | AIAPI - Generate authentication token using clientToken|
| `getAIList()`     | AIAPI - Get the list of available AI models |
| `getSampleTextList()` | AIAPI - Get the list of sample text |


<br/>

### 1. AIPlayer.init(json)

Initialize AI Player object with the given AI model parameters

- Parameter

  | Param          | Type     | Description                                                       |
  | -------------- | -------- | ----------------------------------------------------------------- |
  | `json`         | `Object` | parameters of the init function |
  | `json.ai_name` | `String` | AI model name |
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

## 5. AIPlayer.preload(...)

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

## 6. AIPlayer.send(...)

Command used for making the AI speak or perform gesture actions. (If there exists a preloaded data, this data is reused)
To make the AI speak multiple sentences, send an Array of String or AIClipSet Object.

- You may choose from four parameter types depending on use case.

  | Param        | Type             | Description                                                     |
  | ------------ | ---------------- | --------------------------------------------------------------- |
  | `text`       | `String`         | A single sentence. Used for single sentence speaking. |
  | `texts`      | `Array<String>` | A list of sentences.. Used for multiple sentences speaking. |
  | `AIClipSet`  | `Object`         | A gesture sentence. Used for single gesture action. |
  | `AIClipSets` | `Array<Object>` | A list of gesture sentences. Used for multiple gesture actions. |

- Example

```javascript
//Case1. One Sentence Speak (text)
AI_PLAYER.send("Nice to meet you");
//Case2. Multi Sentences Speak (String Array)
AI_PLAYER.send(["Nice to meet you", "How are you?"]);
//Case3. One Gesture Speak (json)
AI_PLAYER.send({ text: "Nice to meet you", gst: "hi" });
//Case4. Multi Gestures Speak (json Array)
AI_PLAYER.send([{ text: "Nice to meet you", gst: "hi" }, { text: "How are you?" }]);
```


<br/>

### 7. AIPlayer.pause()

Temporarily pause AI speech.


<br/>

### 8. AIPlayer.resume()

Resume speech if the AI state was paused previously.


<br/>

### 9. AIPlayer.stopSpeak()

Stop AI speech and reset all data on stack. (cannot resume)


<br/>

### 10. AIPlayer.release()

Used to release system resources in use. (Not reusable)


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

### 13. AIPlayer.getSpeakableLanguages(gender)

Gets the language list of currently loaded voices, valid after loadCustomVoice() or generateToken() method calls.

- Return Parameter: `Array<String>`

- Examples

```javascript
  const languages = AI_PLAYER.getSpeakableLanguages(gender);
```


<br/>

### 14. AIPlayer.getCustomVoice()

Gets the currently set voice and returns null if there is no set value or default voice.

- Return Parameter: `CustomVoice` || `null`

- Examples

```javascript
  const customVoice = AI_PLAYER.getCustomVoice();
```


<br/>

### 15. AIPlayer.getCustomVoicesWith(language, gender)

Gets the list of custom voices that correspond to the language and gender of the input among the loaded voices
If you type null in language, you get all languages, and if you type null in gender, you get values that correspond to all genders.  
Valid after calling loadCustomVoice() or generateToken() methods.

- Return Parameter: `Array<CustomVoice>`

- Examples

```javascript
  const customVoices = AI_PLAYER.getCustomVoicesWith(language, gender);
```


<br/>

### 16. AIPlayer.findCustomVoice(voiceId)

Gets the CustomVoice object corresponding to id in the voice list, and returns null if there is no value.

- Return Parameter: `CustomVoice` || `null`

- Examples

```javascript
  const customVoice = AI_PLAYER.findCustomVoice(voiceId);
```


<br/>

### 17. AIPlayer.setCustomVoice(customVoice)

It sets the voice of AI and returns true on success and false on failure. Also, when null is entered, it is set to the original voice.

- Return Parameter: `true` || `false`

- Examples

```javascript
  const isSuccess = AI_PLAYER.setCustomVoice(customVoice);
```


<br/>

### 18. AIPlayer.setCustomVoiceForLanguage(language, gender)

Voice is set by desired language and gender, and when null is entered in language, it is set as the original voice.  
If you enter the language value and enter null in the gender, it is set as the first voice in the voice list of the language.

- Return Parameter: `true` || `false`

- Examples

```javascript
  const isSuccess = AI_PLAYER.setCustomVoiceForLanguage(language, gender);
```


<br/>

### 19. AIPlayer.reconnect(callback)
```javascript
AIPlayer.reconnect(callback = () => { })
```


<br/>

### 20. AIPlayer.isConnected()
```javascript
const isConnected = AI_PLAYER.isConnected();
```


<br/>

### 21. AIPlayer.canPreload()
```javascript
const canPreload = AI_PLAYER.canPreload(callback = () => { });
```


<br/>

### 22. AI_PLAYER.setVolume(volume)
```javascript
AI_PLAYER.setVolume(volume);

const curVolume = AI_PLAYER.getVolume();
```


<br/>

### 23. AI_PLAYER.setMute(isMute)
```javascript
AI_PLAYER.setMute(true)

const isMuted = AI_PLAYER.getMute();
```
