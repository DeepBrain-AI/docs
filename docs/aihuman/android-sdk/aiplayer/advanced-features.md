---
sidebar_position: 5
---

# AIPlayer Advanced Speaking Features

## Change AI Speech Rate
Change AI Speech Rate between 0.5 and 1.5

```js
aiPlayer.setSpeed(speed);
```

## Gestures
As briefly mentioned above, speech may be performed using AIClipSet. AIClipSet refers to one utterance unit. The types of speech are basic speech, gesture speech including gesture and speech, and gestures that perform only certain actions. The available gestures differs according to AI model, and the list of available gestures can be obtained using the getGestures() function of AIPlayer.


The following are ClipType 

- AIClipSet.ClipType
  - CLIP_SPEECH: normal speech without gesture
  - CLIP_GESTURE: only gesture
  - CLIP_SPEECH_GESTURE: normal speech with gesture 

The AI jonathan is speaking with gesture called "hi"(waving hand).

<p align="center">
<img src="/img/aihuman/android/Screenshot_20221107-120334_AIHumanSDKDemo.jpg" style={{zoom: "25%"}} />
</p>

AIClipSetFactory.CreateClip can create AIClipset like below. Only gesture will play if the gesture set witout speech text.

```js
if (selectedSpeech != null) {
    // aiPlayer.send(new String[]{selectedSpeech});
    if (selectedAIGesture != null) {
        aiPlayer.send(AIClipSetFactory.CreateClip(
                selectedAIGesture.getName(), selectedSpeech, null));
    } else {
        aiPlayer.send(AIClipSetFactory.CreateClip(
                null, selectedSpeech, null
        ));
    }
}
```

### Monitor the gesture's State
IAIPlayerCallback.onAIStateChanged(AIState) will be called like normal 'send' method. AIState'state valued will be like below so that we can check out. Also we can access the aistate.clipset.getClipType(), getGesture(), getSpeechText(). That means we can distinguish that it is a gesture or  just speaking.

- SPEAKING_PREPARE_STARTED //3d not supprot 
- SPEAKING_PREPARE_COMPLETED //3d not supprot 
- SPEAKING_STARTED
- SPEAKING_COMPLETED


## Change the voice or language
Some AIs can speak with other voices besides basic voices. To use other voices, you should call AIModelInfoManager.generateToken(...) or AIModelInfoManager.loadCustomVoices(...) method before using them. 

<p align="center">
<img src="/img/aihuman/android/Screenshot_20221107-120630_AIHumanSDKDemo.jpg" style={{zoom: "25%"}} />
</p>

### Set the custom voice using AIPlayer's method
First, the list of languages that AI can currently speak can be checked through the following method.

```js
String[] languages = AIModelInfoManager.getSpeakableLanguages(aiPlayer.getGender());
``` 

Next, the voice list suitable for the corresponding language and gender can be checked by the following method. CustomVoice has properties of id, name, language, and tag.

```js
CustomVoice[] customVoices = AIModelInfoManager.getCustomVoicesWith(String language, String gender);
``` 

If you know the id of the desired voice, you can find the desired voice using the following method. If there is none, return null.

```js
CustomVoice myVoice = AIModelInfoManager.findCustomVoice(voiceId);
``` 

Direct change to the desired voice on the aplayer is set as follows, and is set to the default voice when null is entered. Returns true when success.


```js
CustomVoice[] customVoices = AIModelInfoManager.getCustomVoicesWith(String language, String gender);
CustomVoice myVoice = customVoices[2]; 
boolean isSuccess = aiPlayer.setCustomVoice(myVoice);
``` 

Instead of using CustomVoice instance directly, you can set CustomVoice with language and gender. In this case, the first customVoice of the filtered list is set. 

```js
boolean isSuccess = aiPlayer.setCustomVoiceForLanguage(language, gender);
```

Check current CustomVoice with following method. It returns null if customVoice is not set.

```js
CustomVoice customVoice = aiPlayer.getCustomVoice();
```

### Set the custom voice using AIClipSet
In addition to the method of using the setCustomVoice method to set a voice other than the default voice, AIClipSet can be used to speak the desired voice as follows.


```java
CustomVoice myVoice = AIModelInfoManager.getCustomVoicesWith(String language, String gender)[0];
AIClipSet aiClipset = AIClipSetFactory.CreateClip(null, speech, null, myVoice);
aiPlayer.send(aiClipSet);
``` 

## Preload

Preload is used when you want to make the AI speak the next sentence without delay by loading sentences in advance. You could think of it as a caching process. Select a sentence and press the **Preload** button in the sample below to perform the corresponding action.

**3D character does not support this.** 

<p align="center">
<img src="/img/aihuman/android/Screenshot_20221107-120334_AIHumanSDKDemo.jpg" style={{zoom: "25%"}} />
</p>

```js
aiPlayer.preload([text]);
```

### Monitor the preload function

Like the send function, IAIPlayerCallback.onAIStateChanged(AIState) is called during the preload. The value of AIState can be called as follows.

- SPEAKING_PREPARE_PRELOAD_STARTED
- SPEAKING_PREPARE_PRELOAD_COMPLETED

The preload function can be utilized as show below. When AI has several sentences to speak, it speaks the first sentence. When the SPEAKING_STARTED state is reported in onAIStateChanged(), the next speech can be preloaded and then SPEAKING_COMPLETED is reported. At this time, the next sentence(preloaded) is usually ready to play so that it can be spoken almost with no delay.

```js
@Override
public void onAIStateChanged(AIState state) {
    switch (state.state) {
        case AIState.SPEAKING_PREPARE_PRELOAD_STARTED:
            Log.i(TAG, "preload started :" + state.request.getSpeech());
            break;
        case AIState.SPEAKING_PREPARE_PRELOAD_COMPLETED:
            Log.i(TAG, "preload completed:" + state.request.getSpeech());
            break;
        case AIState.SPEAKING_STARTED:
            aiPlayer.preload(getNextSpeech());
            break;
        case AIState.SPEAKING_COMPLETED:
            aiPlayer.send(getNextSpeech());
            break;
    }
}
```


## Speak Multiple Sentences Consecutively
You can send several sentences at once and the AI will speak sequentially. In the sample below, the corresponding action is performed when the Multi Speak button is pressed.

<p align="center">
<img src="/img/aihuman/android/Screenshot_20221107-120334_AIHumanSDKDemo.jpg" style={{zoom: "25%"}} />
</p>

```js
aiPlayer.send([texts]); //array of lenght >= 2 
```
<br/>

### Monitor sending multiple sentences

IAIPlayerCallback.onAIStateChanged(AIState) is called for each statement. The value of AIState can be called as follows.

- SPEAKING_PREPARE_STARTED
- SPEAKING_PREPARE_COMPLETED

 If you send several sentences, it automatically preloads if possible. In this case, you will be able to see that the delay between sentences is reduced.
