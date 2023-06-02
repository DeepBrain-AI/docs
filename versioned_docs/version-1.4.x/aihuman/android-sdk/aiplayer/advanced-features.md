---
sidebar_position: 5
---

# AIPlayer Advanced Speaking Features


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

AIClipSetFactory.CreateClip can create AIClipset with gesture like below. Only gesture will play if the gesture set witout speech text.

```java
if (selectedSpeech != null) {
    
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

### Monitor the gesture's event
IAIPlayerCallback.onAIPlayerEvent(AIEvent) will be called like normal 'send' method. AIEvent'type valued will be like below so that we can check out. Also we can access the AIEvent.clipset.getClipType(), getGesture(), getSpeechText(). That means we can distinguish that it is a gesture or just speaking.

- AIEvent.AICLIPSET_PLAY_PREPARE_STARTED 
- AIEvent.AICLIPSET_PLAY_PREPARE_COMPLETED 
- AIEvent.AICLIPSET_PLAY_STARTED
- AIEvent.AICLIPSET_PLAY_COMPLETED
- AIEvent.AICLIPSET_PLAY_BUFFERING
- AIEvent.AICLIPSET_RESTART_FROM_BUFFERING

<br/>

## Change the voice or language
Some AIs can speak with other voices besides basic voices. To use other voices, you should call AIModelInfoManager.generateToken(...) or AIModelInfoManager.loadCustomVoices(...) method before using them. 

<p align="center">
<img src="/img/aihuman/android/Screenshot_20221107-120630_AIHumanSDKDemo.jpg" style={{zoom: "25%"}} />
</p>

### Set the custom voice using AIPlayer's method
First, the list of languages that AI can currently speak can be checked through the following method.

```java
String[] languages = AIModelInfoManager.getSpeakableLanguages(aiPlayer.getGender());
``` 

Next, the voice list suitable for the corresponding language and gender can be checked by the following method. CustomVoice has properties of id, name, language, and tag.

```java
CustomVoice[] customVoices = AIModelInfoManager.getCustomVoicesWith(String language, String gender);
``` 

If you know the id of the desired voice, you can find the desired voice using the following method. If there is none, return null.

```java
CustomVoice myVoice = AIModelInfoManager.findCustomVoice(voiceId);
``` 

Direct change to the desired voice on the aplayer is set as follows, and is set to the default voice when null is entered. Returns true when success.


```java
CustomVoice[] customVoices = AIModelInfoManager.getCustomVoicesWith(String language, String gender);
CustomVoice myVoice = customVoices[2]; 
boolean isSuccess = aiPlayer.setCustomVoice(myVoice);
``` 

Instead of using CustomVoice instance directly, you can set CustomVoice with language and gender. In this case, the first customVoice of the filtered list is set. 

```java
boolean isSuccess = aiPlayer.setCustomVoiceForLanguage(language, gender);
```

Check current CustomVoice with following method. It returns null if customVoice is not set.

```java
CustomVoice customVoice = aiPlayer.getCustomVoice();
```

### Set the custom voice using AIClipSet
In addition to the method of using the setCustomVoice method to set a voice other than the default voice, AIClipSet can be used to speak the desired voice as follows.


```java
CustomVoice myVoice = AIModelInfoManager.getCustomVoicesWith(String language, String gender)[0];
AIClipSet aiClipset = AIClipSetFactory.CreateClip(null, speech, null, myVoice);
aiPlayer.send(aiClipSet);
``` 


<br/>

## Speak Multiple Sentences Consecutively
You can send several sentences at once and the AI will speak sequentially. In the sample below, the corresponding action is performed when the Multi Speak button is pressed.

<p align="center">
<img src="/img/aihuman/android/Screenshot_20221107-120334_AIHumanSDKDemo.jpg" style={{zoom: "25%"}} />
</p>

```java
aiPlayer.send([texts]); //array

//or 
aiPlayer.send([aiClipSets]); //array
```
<br/>

## Preload

Preload is used when you want to make the AI speak the next sentence without delay by loading sentences in advance. You could think of it as a caching process. Select a sentence and press the **PRELOAD SPEAK** button in the sample below to perform the corresponding action.

**3D character does not support this.** 

<p align="center">
<img src="/img/aihuman/android/Screenshot_20221107-120334_AIHumanSDKDemo.jpg" style={{zoom: "25%"}} />
</p>

```java
aiPlayer.preload([text]);
```

### Monitor the preload function and utilize

Like the send function, IAIPlayerCallback.onAIPlayerEvent(AIEvent) is called during the preload. The value of AIEvent can be called as follows.

- AICLIPSET_PRELOAD_STARTED
- AICLIPSET_PRELOAD_COMPLETED
- AICLIPSET_PRELOAD_FAILED

The preload function can be utilized when there is a need to cache. When AI has several sentences to speak, send the first sentence. When the AICLIPSET_PLAY_STARTED event is reported in onAIPlayerEvent(), you can call preload for the next speech. And the first sentence's AICLIPSET_PLAY_COMPLETED event will be called. At this event, the next sentence(preloaded) is usually ready to play so that it can be spoken almost with no delay.

```java
private IAIPlayerCallback iAIPlayerCallback = new IAIPlayerCallback() {

    @Override
    public void onAIPlayerEvent(AIEvent event) {
        Log.d(TAG, "onAIPlayerEvent: " + event);

        switch (event.type) {
            case AICLIPSET_PLAY_STARTED:
                binding.aiStateTxt.setText(getString(R.string.ai_started_speaking));
                //String nextSpeech = getNextSentence()
                //aiplayer.preload(nextSpeech)
                break;
            case AICLIPSET_PRELOAD_STARTED:
                binding.aiStateTxt.setText(getString(R.string.ai_started_preparation_to_preload));
                //preload process started 
                break;
            case AICLIPSET_PRELOAD_COMPLETED:
                binding.aiStateTxt.setText(getString(R.string.ai_finished_preparation_to_preload));
                //preload process finished 
                break;
            case AICLIPSET_PLAY_COMPLETED:
                binding.aiStateTxt.setText(getString(R.string.ai_finished_speaking));
                //String nextSpeech = getNextSentence()
                //aiplayer.send(nextSpeech) //no delay
                break;
            case AICLIPSET_PLAY_FAILED:
                binding.aiStateTxt.setText(getString(R.string.ai_failed_to_play));
                break;
        }
    }

    @Override
    public void onAIPlayerError(AIError error) {
        Log.d(TAG, "onAIPlayerError: " + error);

        if (error.code >= AIError.RESERVED_ERR) {
            binding.aiStateTxt.setText("RESERVED_ERR :" + error.message);
        } else if (error.code >= AIError.AICLIPSET_PRELOAD_ERR) {
            binding.aiStateTxt.setText("AICLIPSET_PLAY_ERR :" + error.message);
        } else if (error.code >= AIError.INVALID_AICLIPSET_ERR) {
            binding.aiStateTxt.setText("INVALID_AICLIPSET_ERR :" + error.message);
        } else if (error.code >= AIError.AI_SERVER_ERR) {
            binding.aiStateTxt.setText("AI_SERVER_ERR :" + error.message);
        } else if (error.code > AIError.UNKNOWN_ERR) { //0 ~ 9999
            binding.aiStateTxt.setText("BACKEND_ERR :" + error.message);

            if (error.code == 1402) { //refresh token
                AIModelInfoManager.generateToken(AIPlayerDemo.this,
                        getString(R.string.appid),
                        getString(R.string.userkey),
                        (aiError, resp) -> binding.aiStateTxt.setText("Token ref finished " + resp));
            }
        } else {
            binding.aiStateTxt.setText("UNKNOWN_ERR :" + error.message);
        }
    }
};
```

<br/> 

## Try reconnect

**Reconnect** might be used when network is not connected. When the network is not available, the AI_DISCONNECTED event will be fired and SDK try reconnect one time internally. You can call reconnect as you need and the result will be returned the registered callback(IAIReconnectCallback).

```java
private IAIPlayerCallback iAIPlayerCallback = new IAIPlayerCallback() {

    @Override
    public void onAIPlayerEvent(AIEvent event) {
        Log.d(TAG, "onAIPlayerEvent: " + event);

        switch (event.type) {
            case AI_DISCONNECTED:
                binding.aiStateTxt.setText(getString(R.string.ai_has_a_problem_and_is_recovering));
                //reconnect if you want
                //aiPlayer.reconnect(isSuccess -> {
                //        Log.d(TAG, "reconnect result: " + isSuccess);
                //    });
                break;
        }
    }
};
```

<br/>

## Check before send, 'isConnected'
Check if AI is connected. You can send if it is true. AIError.AICLIPSET_PLAY_ERR and AIEvent.AICLIPSET_PLAY_FAILED will be sent on onAIPlayerError and onAIPlayerEvent respectively if you send when it is false.

```java
boolean isConnected = aiPlayer.isConnected();
```

<br/>

## Check before preload, 'canPreload'
Check if it is able to preload now. You can preload if it is true. AIError.AICLIPSET_PRELOAD_ERR and AIEvent.AICLIPSET_PRELOAD_FAILED will be sent on onAIPlayerError and onAIPlayerEvent respectively if you preload when it is false.

```java
boolean canPreload = aiPlayer.canPreload();
```

<br/>

## Change AI Speech Speed
Change AI Speech speed between 0.5 and 1.5

```java
aiPlayer.setSpeed(speed);
```

<br/>