---
sidebar_position: 4
---

# AIPlayer Basic Speaking Features

### 1. Send Speaking

After the aiPlayer resource loading is completed(`AIEventType.RES_LOAD_COMPLETED`), call the send method.

You can input just string to make AI speak but json format (AIClipSet object)is also available. When using AIClipSet, you can make AI speak with some gestures. For example, you can order AI to wave and say "hello!" This is called gesture speech. Details are described in the [Gesture](../aiplayer/advanced-features#2-gesture) part.

If the text to speak is too long, it may not be possible to synthesize the resources required for the speaking. There are some models that can synthesize long sentences. Although it varies from AI to AI, it is generally recommended that sentences be cut to an appropriate length in Korean, usually within 30 to 40 characters, and at a similar level in English.

<br/>

```javascript
//Case1. One Gesture Speak
const AIClipSet = { text: "Nice to meet you", gst: "hi" };
AI_PLAYER.send(AIClipSet);

//Case2. One Sentence Speak
AI_PLAYER.send("Nice to meet you");
```

You can test it from the SDK demo page if you want to.

<img src="/img/aihuman/web/sdk_demo_03_r1.png" />

<br/>

### 2. Monitoring of speaking behavior
After calling the `send` method, you can check the feedback on the operation event in the registered listener. This feedback is returned by calling the event related method (`onAIPlayerEvent`) of the listener. For example, when you call 'send' method, the following events will be sent as an argument of `onAIPlayerEvent` sequencially.

- AIEventType.AICLIPSET_PLAY_PREPARE_STARTED
- AIEventType.AICLIPSET_PLAY_PREPARE_COMPLETED
- AIEventType.AICLIPSET_PLAY_STARTED
- AIEventType.AICLIPSET_PLAY_COMPLETED 
- AIEventType.AICLIPSET_PLAY_FAILED //if there is a failure,

If there are some errors while 'send', the `onAIPlayerErrorV2` will be called with AIError that contains which error has occured. When AICLIPSET_PLAY_ERR or AI_SERVER_ERR occur, `stopSpeak()` will be called internally which means the speech queue will be cleared.

```javascript
AI_PLAYER.onAIPlayerEvent = function (aiEvent) {
    // TODO: event handling 

    //example
    switch (aiEvent.type) {
      case AIEventType.AIPLAYER_STATE_CHANGED:
        onAIStateChange()
        console.log("AI AIPLAYER_STATE_CHANGED :", aiEvent);
        break;
      case AIEventType.AICLIPSET_PLAY_PREPARE_STARTED:
        console.log("AI started preparing to speak. speech :", aiEvent);
        break;
      case AIEventType.AICLIPSET_PLAY_PREPARE_COMPLETED:
        console.log("AI finished preparing to speak. speech :", aiEvent);
        break;
      case AIEventType.AICLIPSET_PLAY_STARTED:
        console.log("AI started speaking. normal state: ", aiEvent);
        break;
      case AIEventType.AICLIPSET_PLAY_COMPLETED:
        console.log("AI finished speaking. normal state: ", aiEvent);
        break;
      case AIEventType.AICLIPSET_PLAY_FAILED:
        console.log("AI AICLIPSET_PLAY_FAILED: ", aiEvent);
        break;
      case AIEventType.AICLIPSET_PRELOAD_FAILED:
        console.log("AI AICLIPSET_PRELOAD_FAILED: ", aiEvent);
        break;
      //...
      }
  };

AI_PLAYER.onAIPlayerErrorV2 = function (aiError) {
    // TODO: error handling

    if (aiError.code >= AIError.RESERVED_ERR) {
      //You've got reserved error. Check up the error list!
      console.log("RESERVED_ERR :" , aiError.message);
    } else if (aiError.code >= AIErrorCode.AICLIPSET_PLAY_ERR) {
      console.log("AICLIPSET_PLAY_ERR :" , aiError.message);
    } else if (aiError.code >= AIErrorCode.INVALID_AICLIPSET_ERR) {
      console.log("INVALID_AICLIPSET_ERR :" , aiError.message);
    } else if (aiError.code >= AIErrorCode.AI_SERVER_ERR) {
      console.log("AI_SERVER_ERR :" , aiError.message);
    } else if (aiError.code > AIErrorCode.UNKNOWN_ERR) { //0 ~ 9999
      console.log("BACKEND_ERR :" , aiError.message);

      if (aiError.code == 1402) { //refresh token
        refreshTokenIFExpired();
      }
    } else {
      console.log("UNKNOWN_ERR :" , aiError.message);
    }
  };
```

### 3. Make resposive UI with AIPLAYER_STATE_CHANGED event

The AIPlayer has serveral states that a user can notice and response. When the state is changed, the 'onAIPlayerEvent' callback is called with AIEventType.AIPLAYER_STATE_CHANGED and AIPlayer.getState() method return the current state.

Before an AI initialized, the state is AIPlayerState.NONE and it changes to INITIALIZE when the 'AIPlayer.init()' method called. If the AI initialization is done, IDLE state will come. In this state, one can send AIClipSet and the state will be 'PLAY'. Finally, if the AIPlayer is released by calling 'release', the state will be RELEASE state. Please refer the full definition in [here](../apis/aiplayer-data#5-aiplayerstate).

```javascript
AI_PLAYER.onAIPlayerEvent = function (aiEvent) {
    // TODO: event handling 

    //example
    switch (aiEvent.type) {
      case AIEventType.AIPLAYER_STATE_CHANGED:
        onAIStateChange()
        console.log("AI AIPLAYER_STATE_CHANGED :", aiEvent);
        break;
      //...
      }
  };

function onAIStateChange() {
   //make resonsive app by enable or disble UI or etc...
   console.log('onAIStateChange state:', AI_PLAYER.getState())
} 
``` 

### 4. Pause Speaking

```javascript
AI_PLAYER.pause();
```

<br/>

### 5. Resume Speaking (Resume from Pause)

```javascript
AI_PLAYER.resume();
```

<br/>

### 6. Stop Speaking (Resets all the data you have. No resume allowed)

Stop speaking and reset all data. (cannot resume)

```javascript
AI_PLAYER.stopSpeak();
```

<br/>