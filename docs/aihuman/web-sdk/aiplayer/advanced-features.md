---
sidebar_position: 5
---

# AIPlayer Advanced Speaking Features

### 1. Gesture

As briefly mentioned before, speech may be performed using AIClipSet(object). AIClipSet refers to one speech unit. The types of speech are basic speech, gesture speech including gesture and speech, and gestures that perform only certain actions.

The available gestures differ according to AI model, and the list of available gestures can be obtained using the getGestures() function of AIPlayer.

The followings are ClipTypes.

- CLIP_SPEECH: normal speech without gesture
- CLIP_GESTURE: only gesture
- CLIP_SPEECH_GESTURE: normal speech with gesture

The screenshot below shows AI Model Jonathan opening his hands according to "twohand" gesture.

<img src="/img/aihuman/web/sdk_demo_gesture_r1.png" />

<br/>
<br/>
<br/>

You can create AIClipset with gesture like below. Only the gesture will play if the gesture is set without speech text.

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
  const AIClipSet = { text: "nice to meet you.", gst: gestures[0].gst }; //hi
  AI_PLAYER.send(AIClipSet);
}
```

<br/>

### 2. Change the Voice or Language

Some AIs can speak with other voices besides basic voices. To use other voices, you should call `AIPlayer.generateToken(...)` or `AIPlayer.loadCustomVoices(...)` method before using them.

Check out the custom voice list that you can select on the Demo page.

<img src="/img/aihuman/web/sdk_demo_04_r1.png" />

##### Set the custom voice using AIPlayer's method

First, the list of languages that AI can currently speak can be checked through the following method.

```javascript
const languages = AI_PLAYER.getSpeakableLanguages(AI_PLAYER.getGender());
```

Next, the voice list suitable for the corresponding language and gender can be checked by the following method. CustomVoice has properties of id, name, language.

```javascript
const customVoices = AI_PLAYER.getCustomVoicesWith(language, gender);
```

If you know the id of the desired voice, you can find the desired voice using the following method. If there is none, null will be returned.

```javascript
const customVoice = AI_PLAYER.findCustomVoice(voiceId);
```

Direct change to the desired voice on the AIPlayer is set as follows, and is set back to the default voice when null is entered. It will return true when success.

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
const customVoice = AI_PLAYER.getCustomVoice();
```

##### Set the custom voice using AIClipSet

In addition to the method of using the setCustomVoice method to set a voice other than the default voice, AIClipSet can be used to speak the desired voice as follows.

```javascript
const customVoice = AI_PLAYER.findCustomVoice(voiceId);
const AIClipSet = { text: "Nice to meet you", gst: "hi", voice: customVoice };

AI_PLAYER.send(AIClipSet);
```

<br/>

### 3. Speak Multiple Sentences Consecutively

You can send multiple sentences at once and make them speak sequentially.

```javascript
// Case1. Multi Sentences Speak
AI_PLAYER.send(["Nice to meet you", "How are you?"]);

// Case2. Multi Gesture Speak and just speak
AI_PLAYER.send([{ text: "Nice to meet you", gst: "hi" }, { text: "How are you?" }]);
```


<br/>

### 4. Preload

Preload is used when you want to make the AI speak the next sentence without delay by loading sentences in advance. You could think of it as a caching process. Select a sentence and press the Preload button in the sample below to perform the corresponding action.

**3D character does not support this.**

<img src="/img/aihuman/web/sdk_demo_preload_r1.png" />

```javascript
AI_PLAYER.preload("Nice to meet you");
```

<br/>

#### Monitor the preload function and utilize

Like the send function, onAIPlayerEvent(AIEvent) is called during the preload. The value of AIEvent can be called as follows.

- AIEventType.AICLIPSET_PRELOAD_STARTED
- AIEventType.AICLIPSET_PRELOAD_COMPLETED
- AIEventType.AICLIPSET_PRELOAD_FAILED

The preload function can be utilized when there is a need to cache. When AI has several sentences to speak, send the first sentence. When the AICLIPSET_PLAY_STARTED event is reported in onAIPlayerEvent(), you can call preload for the next speech. And the first sentence's AICLIPSET_PLAY_COMPLETED event will be called. At this event, the next sentence(preloaded) is usually ready to play so that it can be spoken almost with no delay.

```javascript
AI_PLAYER.onAIPlayerEvent = function (aiEvent) {
  // TODO: event handling

  //example
  switch (aiEvent.type) {
    case AIEventType.AICLIPSET_PRELOAD_STARTED:
      console.log("AI AICLIPSET_PRELOAD_STARTED: ", aiEvent);
      break;
    case AIEventType.AICLIPSET_PRELOAD_COMPLETED:
      console.log("AI AICLIPSET_PRELOAD_STARTED: ", aiEvent);
      break;
    case AIEventType.AICLIPSET_PRELOAD_FAILED:
      console.log("AI AICLIPSET_PRELOAD_FAILED: ", aiEvent);
      break;
    //...
  }
};
```


<br/>

### 5. Try reconnect

Reconnect might be used when the network is not connected. When the network is not available, the AI_DISCONNECTED event will be fired and SDK will try reconnect one time internally. You can call reconnect as you need and the result will be returned the registered callback.

```javascript
AI_PLAYER.onAIPlayerEvent = function (aiEvent) {
  // TODO: event handling

  //example
  switch (aiEvent.type) {
    case AIEventType.AI_DISCONNECTED:
      console.log("AI AI_DISCONNECTED: ", aiEvent);
      //reconnect if you want
      callback = (isSuccess) => {
        /*...*/
      };
      AI_PLAYER.reconnect(callback);
      break;
    //...
  }
};
```


<br/>

### 6. Check before send, 'isConnected'

Check if AI is connected. You can send if it is true.

```javascript
const isConnected = AI_PLAYER.isConnected();
```


<br/>

### 7. Check before preload, 'canPreload'

Check if it is able to preload now. You can preload if it is true.

```javascript
const canPreload = AI_PLAYER.canPreload((callback = () => {}));
```


<br/>

### 8. Adjust AI Speech Rate

You can set AI's speech rate. The range of possible values are from 0.5 to 1.5 . The default is 1.0.

```javascript
AI_PLAYER.setter({ speed: 1.0 }); // float
```

<br/>
