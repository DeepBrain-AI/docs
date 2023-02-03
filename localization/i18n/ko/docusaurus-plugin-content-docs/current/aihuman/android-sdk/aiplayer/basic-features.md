---
sidebar_position: 4
---

# 발화 관련 기본 기능

## AIClipSet을 이용한 발화 기본 기능 및 AIPlayer 동작 모니터링

### AI에게 한문장 발화시키기 

AIPlayer 리소스 로딩 완료 후(AIEvent.RES_LOAD_COMPLETED), **send 메소드**를 호출한다. 

순수 텍스트로 발화를 시킬 수 있지만, AIClipSet을 이용하여 발화를 수행할 수 있다. AIClipSet 이용시에는 특정 제스처와 함께 발화할 수도 있다. 예를 들어 ai에게 손을 흔들며 "안녕하세요!"라고 인사말을 하도록 명령할 수 있다. 이를 제스처 발화라고 한다. 자세한 내용은 [제스처 동작](advanced-features.md#제스처) 파트에서 설명한다.

발화할 텍스트가 너무 길면 발화에 필요한 리소스를 합성 못할 수 있다. 긴 문장을 합성할 수 있는 모델은 따로 있다. ai마다 다르지만 일반적으로 한글의 경우 대게 30 ~ 40자 이내, 영어도 비슷한 수준에서 적절한 길이로 문장을 잘라보내기를 권고한다. 이 외에도 특수 문자, 온전하지 못한 문자의 나열, 숫자, 수식, 기호, 다른 언어의 문자 또는 약어 등이 포함된 경우 기대한 것과 다르게 발화하거나 발화 못하는 경우가 있을 수 있다.

```java

//using AIClipSet
AIClipSet clip = AIClipSetFactory.CreateClip(null, "Nice to meet you", null)
aiPlayer.send(clip); 

//using text
aiPlayer.send(new String[]{"Nice to meet you"}); 

```

### 발화 동작 모니터링

send 메소드 호출 이후 등록된 listener에서 동작 상태에 대한 피드백을 확인할수 있다. 이 피드백은 listener(IAIPlayerCallback)의 이벤트 관련 메소드(onAIPlayerEvent)가 호출됨으로 알수 있다. onAIPlayerEvent의 인자로 들어오는 AIEvent가 다음의 상태값으로  호출된다. 

- AIEvent.AICLIPSET_PLAY_PREPARE_STARTED 
- AIEvent.AICLIPSET_PLAY_PREPARE_COMPLETED 
- AIEvent.AICLIPSET_PLAY_STARTED
- AIEvent.AICLIPSET_PLAY_COMPLETED
- AIEvent.AICLIPSET_PLAY_BUFFERING
- AIEvent.AICLIPSET_RESTART_FROM_BUFFERING
- AIEvent.AICLIPSET_PLAY_FAILED

'send' 중에 오류가 발생하면 'onAIPlayerError'가 발생한 오류를 포함하는 AIError와 함께 호출됩니다. AICLIPSET_PLAY_ERR 또는 AI_SERVER_ERR 에러가 발생하면 내부적으로 'stopSpeaking()'이 호출되어 음성 대기열이 지워집니다.

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

## AIPLAYER_STATE_CHANGED 이벤트로 UI를 반응하도록 만들기

AIPlayer는 사용자가 인지하고 응답할 수 있는 몇가지 상태가 있습니다. 상태가 변경되면 'onAIPlayerEvent' 콜백으로 AIEvent가  넘어옵니다. 이때 AIEvent.AIPLAYER_STATE_CHANGED인 경우 AIPLAYER.getState() 메서드는 변화된 현재 상태를 반환합니다.

AI가 초기화되기 전 상태는 NONE입니다. 'AIPlayer.init()' 메서드가 호출되면 INITIALIZE로 변경됩니다. AI 초기화가 완료되면 IDLE 상태가 되며 이 상태에서 AIClipSet을 send할 수 있으며 상태는 send시 상태가 'PLAY'가 됩니다. 마지막으로 AIPlayer의 'release'를 호출하면 RELEASE 상태가 됩니다.

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

## 발화 일시정지
AIPlayer'의 상태는 PAUSE.

```java
aiPlayer.pause()
// mAI3DPlayer.pausePlay() for 3d 
```

<br/>

## 발화 재시작
일시정지 상태에서 다시 시작. AIPlayer의 상태는 PLAY.

```java
aiPlayer.resume()
// mAI3DPlayer.resumePlay() for 3d 
```

<br/>

## 발화 정지 
발화를 멈추고 가지고 있는 데이터를 모두 리셋한다(resume 불가). AIPlayer의 상태는 IDLE. 

```java
aiPlayer.stopSpeaking();
```
