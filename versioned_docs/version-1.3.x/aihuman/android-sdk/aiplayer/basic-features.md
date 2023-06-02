---
sidebar_position: 4
---

# AIPlayer Basic Speaking Features

## Basic speaking using AIClipSet and Monitor AI Speaking

### Make AI speak a sentence

After the aiPlayer resource loading is completed(AIEvent.RES_LOAD_COMPLETED), call the **send method**. 

You can input just string to make AI speak but AIClipSet is also able to do it. When using AIClipSet, you can make AI speak with some gestures. For example, you can order AI to wave and say "hello!" This is called gesture speech. Details are described in the [Gesture](advanced-features.md#gestures) part.

If the text to speak is too long, it may not be possible to synthesize the resources required for the utterance. There are some models that can synthesize long sentences. Although it varies from ai to ai, it is generally recommended that sentences be cut to an appropriate length in Korean, usually within 30 to 40 characters, and at a similar level in English.

```java

//using AIClipSet
AIClipSet clip = AIClipSetFactory.CreateClip(null, "Nice to meet you", null)
aiPlayer.send(clip); 

//using text
aiPlayer.send(new String[]{"Nice to meet you"}); 

```

### Monitoring of speaking behavior

After calling the send method, you can check the feedback on the operation event in the registered listener. This feedback is returned by calling the event related method (onAIPlayerEvent) of the listener(IAIPlayerCallback). AIEvent received as an argument of onAIPlayerEvent is called with the following event values when called 'send' method. 

- AIEvent.AICLIPSET_PLAY_PREPARE_STARTED 
- AIEvent.AICLIPSET_PLAY_PREPARE_COMPLETED 
- AIEvent.AICLIPSET_PLAY_STARTED
- AIEvent.AICLIPSET_PLAY_COMPLETED
- AIEvent.AICLIPSET_PLAY_BUFFERING 
- AIEvent.AICLIPSET_RESTART_FROM_BUFFERING
- AIEvent.AICLIPSET_PLAY_FAILED

If there are some errors while 'send', the 'onAIPlayerError' will be called with AIError that contains which error has occured. When AICLIPSET_PLAY_ERR or AI_SERVER_ERR occur, 'stopSpeaking()' will be called internally which means the speech queue will be cleared. 

```java
private IAIPlayerCallback iAIPlayerCallback = new IAIPlayerCallback() {

    @Override
    public void onAIPlayerEvent(AIEvent event) {
        Log.d(TAG, "onAIPlayerEvent: " + event);

        switch (event.type) {
            case AIPLAYER_STATE_CHANGED:
                onAIStateChanged();
                break;
            case AICLIPSET_PLAY_PREPARE_STARTED:
                binding.aiStateTxt.setText(getString(R.string.ai_started_preparation_to_speak));
                break;
            case AICLIPSET_PLAY_PREPARE_COMPLETED:
                binding.aiStateTxt.setText(getString(R.string.ai_finished_preparation_to_speak));
                break;
            case AICLIPSET_PLAY_STARTED:
                binding.aiStateTxt.setText(getString(R.string.ai_started_speaking));
                break;
            case AICLIPSET_PLAY_COMPLETED:
                binding.aiStateTxt.setText(getString(R.string.ai_finished_speaking));
                break;
            case AICLIPSET_PLAY_BUFFERING:
                binding.aiStateTxt.setText(getString(R.string.buffering));
                break;
            case AICLIPSET_RESTART_FROM_BUFFERING:
                binding.aiStateTxt.setText(getString(R.string.restart_from_buffering));
                break;
            case AICLIPSET_PLAY_FAILED:
                binding.aiStateTxt.setText(getString(R.string.ai_failed_to_play));
                break;
            case AICLIPSET_PRELOAD_FAILED:
                binding.aiStateTxt.setText(getString(R.string.ai_failed_to_preload));
                break;
        }
    }

    @Override
    public void onAIPlayerError(AIError error) {
        Log.d(TAG, "onAIPlayerError: " + error);

        if (error.code >= AIError.RESERVED_ERR) {
            binding.aiStateTxt.setText("RESERVED_ERR :" + error.message);
        } else if (error.code >= AIError.AICLIPSET_PLAY_ERR) {
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

## Make resposive UI with AIPLAYER_STATE_CHANGED event 
The AIPlayer has serveral states that a user can notice and response. When the state is changed, the 'onAIPlayerEvent' callback is called with AIEvent.AIPLAYER_STATE_CHANGED and AIPlayer.getState() method return the current state. 

Before an AI initialized, the state is AIPlayerState.NONE and it changes to INITIALIZE when the 'AIPlayer.init()' method called. If the AI initialization is done, IDLE state will come. In this state, one can send AIClipSet and the state will be 'PLAY'. Finally, if the AIPlayer is released by calling 'release', the state will be RELEASE state. 

```java
private IAIPlayerCallback iAIPlayerCallback = new IAIPlayerCallback() {

    @Override
    public void onAIPlayerEvent(AIEvent event) {
        Log.d(TAG, "onAIPlayerEvent: " + event);

        switch (event.type) {
            case AIPLAYER_STATE_CHANGED:
                onAIStateChanged();
                break;
        }
    }
};

private void onAIStateChanged() {
    AIPlayerState newState = aiPlayer.getState();
    Log.d(TAG, "onAIStateChanged: AIPLAYER_STATE_CHANGED :" + newState);

    switch (newState) {
        case NONE:
        case RELEASE:
            enableAllUI(false);
            break;
        case INITIALIZE:
            enableAllUI(false);
            binding.aiSelectSpinner.setEnabled(true);
            break;
        case IDLE:
            enableAllUI(true);
            break;
        case PLAY:
            enableAllUI(false);
            binding.pauseBtn.setEnabled(true);
            binding.stopBtn.setEnabled(true);
            break;
        case PAUSE:
            enableAllUI(false);
            binding.resumeBtn.setEnabled(true);
            binding.stopBtn.setEnabled(true);
            break;
    }
}
```

<br/>

## Pause Speaking
AIPlayer's state will be changed to PAUSE.

```java
aiPlayer.pause()
// mAI3DPlayer.pausePlay() for 3d 
```

<br/>

## Resume Speaking
Resume from pause. AIPlayer's state will be changed to PLAY.

```java
aiPlayer.resume()
// mAI3DPlayer.resumePlay() for 3d 
```

<br/>

## Stop Speaking
Stop the speaking and also clear all data in the queue(Resume is not possible). AIPlayer's state will be changed to IDLE. 

```java
aiPlayer.stopSpeaking();
```
