---
sidebar_position: 5
---

# 발화 관련 추가 기능

The following describes features unrelated to AI Speech.
Even after the resource is loaded(playerLoadComplete) and the AI is ready to speak, some settings can be adjusted. On the demo screen shown below, you can adjust the AI's **padding, size, speed**.

<img src="/img/aihuman/web/sdk_demo_speak.png" />

<br/>

### 1. Adjust AI Speech Rate

- You can choose AI's speech rate.
- The range of possible values are from 0.5 to 1.5 . The default size is 1.0.
- value type: float

```javascript
AI_PLAYER.setter({ speed: 1.0 }); // float
```

<br/>

### 2. Gesture

As briefly mentioned earlier, you can use [Clipset](#42-aiclipset) to make the AI speak. Clipset represents a single speech which can be played with a gesture.

This feature is available for AI models that have [Gesture](#43-aigesture) features. getGestures() returns available list of gestures that the AI can use. AI models without gestures can also be run with the Clipsets.

The screenshot below shows AI Model Yoonsubin opening its arms according to "twohand" gesture command.

<img src="/img/aihuman/web/sdk_demo_gesture.png" />

```javascript
function sendText() {
  const aiName = "jonathan_black";
  const gestures = AI_PLAYER.getGestures();
  /* gestures = [{
		   "gst": "hi",
		   "enableSpeech": true
        }, {
		   "gst": "bow",
		   "enableSpeech": false
        }] */
  const AIClipSet = { text: "nice to meet you.", gst: "twohand" };
}
```

<br/>

### 3. Change the Voice or Language

Some AIs can speak with other voices besides basic voices. To use other voices, you should call AIModelInfoManager.generateToken(...) or AIModelInfoManager.loadCustomVoices(...) method before using them. 

<img src="/img/aihuman/web/sdk_demo_04.png" />

#### Set the custom voice using AIPlayer's method

First, the list of languages that AI can currently speak can be checked through the following method.

```javascript
const languages = AIModelInfoManager.getSpeakableLanguages(aiPlayer.getGender());
```

Next, the voice list suitable for the corresponding language and gender can be checked by the following method. CustomVoice has properties of id, name, language, and tag.

```javascript
const customVoices = AIModelInfoManager.getCustomVoicesWith(String language, String gender);
```

If you know the id of the desired voice, you can find the desired voice using the following method. If there is none, return null.

```javascript
const customVoice = AI_PLAYER.findCustomVoice(voiceId);
```

Direct change to the desired voice on the aplayer is set as follows, and is set to the default voice when null is entered. Returns true when success.

```javascript
const customVoice = AI_PLAYER.findCustomVoice(voiceId);

const isSuccess = AI_PLAYER.setCustomVoice(customVoice);
```

Instead of using CustomVoice instance directly, you can set CustomVoice with language and gender. In this case, the first customVoice of the filtered list is set. 

```javascript
const isSuccess = AI_PLAYER.setCustomVoiceForLanguage(language, gender);
```

Check current CustomVoice with following method. It returns null if customVoice is not set.

```javascript
const isSuccess = AI_PLAYER.getCustomVoice();
```

#### Set the custom voice using AIClipSet

In addition to the method of using the setCustomVoice method to set a voice other than the default voice, AIClipSet can be used to speak the desired voice as follows.

```javascript
const customVoice = AI_PLAYER.findCustomVoice(voiceId);
const AIClipSet = { text: "Nice to meet you", gst: "hi", voice: customVoice };

AI_PLAYER.send(AIClipSet);
``` 

<br/>

### 4. Preload

Preload is used when you want to make the AI speak the next sentence without delay by loading sentences in advance. You could think of it as a caching process. In the sample project below, preload is automatically executed from the time the sentence button is shown.

<img src="/img/aihuman/web/sdk_demo_preload.png" />

```javascript
AI_PLAYER.preload("Nice to meet you");
```

<br/>

### 5. Multiple Sentence Consecutive Speech.

You can provide AIPlayer several sentences at once and make them speak sequentially.

```javascript
// Case1. Multi Sentences Speak
AI_PLAYER.send(["Nice to meet you", "How are you?"]);

// Case2. Multi Gestures Speak
AI_PLAYER.send([{ text: "Nice to meet you", gst: "hi" }, { text: "How are you?" }]);
```

**Multiple Sentence Consecutive Speech Related Callback Monitoring**

`onAIPlayerStateChanged(state)` is called for each sentence. The possible state values are shown below.

- `speakingStarted`:  on speech start
- `speakingComplete`: on speech end

If you send several sentences, it automatically preloads if possible. You can see that the delay between speaking is reduced if preload was successful.
