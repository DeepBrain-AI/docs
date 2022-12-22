---
sidebar_position: 4
---

# AIPlayer Basic Speaking Features

## Basic speaking using AIClipSet and Monitor AI Speaking
**Make AI speak a sentence**

After the aiPlayer resource loading is completed, call the **send method**. Input a sentence into a textbox as shown below and press the **SPEAK** button to make the AI speak.

You can input just string to make AI speak but AIClipSet is also able to do it. When using AIClipSet, you can make AI speak with some gestures. For example, you can order AI to wave and say "hello!" This is called gesture speech. Details are described in the Gesture part.

If the text to speak is too long, it may not be possible to synthesize the resources required for the utterance. There are some models that can synthesize long sentences. Although it varies from ai to ai, it is generally recommended that sentences be cut to an appropriate length in Korean, usually within 30 to 40 characters, and at a similar level in English.

```js

//using AIClipSet
AIClipSet clip = AIClipSetFactory.CreateClip(null, "Nice to meet you", null)
aiPlayer.send(clip); 

//using text
aiPlayer.send(new String[]{"Nice to meet you"}); 

```

## Monitoring of speaking behavior

After calling the send method, you can check the feedback on the operation status in the registered listener. This feedback is returned by calling the state related method (onAIStateChanged) of the listener(IAIPlayerCallback). AIState received as an argument of onAIStateChanged is called sequentially with the following state values.

- SPEAKING_PREPARE_STARTED //3d not support 
- SPEAKING_PREPARE_COMPLETED //3d not support 
- SPEAKING_STARTED
- SPEAKING_COMPLETED

```js
private IAIPlayerCallback iAIPlayerCallback = new IAIPlayerCallback() {

    @Override
    public void onAIStateChanged(AIState state) {
        switch (state.state) {
						//...
            case AIState.SPEAKING_PREPARE_STARTED: //3d not support 
                binding.aiStateTxt.setText("AI prepares to speak");
                break;
            case AIState.SPEAKING_PREPARE_COMPLETED: //3d not support 
                binding.aiStateTxt.setText("AI finishs preparing to speak");
                break;
            case AIState.SPEAKING_STARTED:
                binding.aiStateTxt.setText("AI starts speaking");
                break;
            case AIState.SPEAKING_COMPLETED:
                binding.aiStateTxt.setText("AI finishs speaking");
                break;
        }
    }

    @Override
    public void onAIPlayerError(AIError error) {
        switch (error.errorType) {
            case AIError.SOCKET_ERR:
                binding.aiStateTxt.setText("socket error :" + error.exInfo);
                break;
            case AIError.RES_LOAD_ERR:
                binding.aiStateTxt.setText("resource error :" + error.exInfo);
                break;
            case AIError.SPEAK_SEND_ERR:
                binding.aiStateTxt.setText("speaking error :" + error.exInfo);
                break;
            //...
        }
    }
};
```

## Pause Speaking

```js
aiPlayer.pause()
// mAI3DPlayer.pausePlay() for 3d 
```

## Resume Speaking
Resume from pause

```js
aiPlayer.resume()
// mAI3DPlayer.resumePlay() for 3d 
```

## Stop Speaking
Stop the speaking and also clear all data in the queue. (Resume is not possible)

```js
aiPlayer.stopSpeaking();
```
