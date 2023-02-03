---
sidebar_position: 5
---

# 발화 관련 추가 기능

## 제스처
앞서 간략하게 언급한 바와 같이 AIClipSet을 이용하여 발화를 할수 있다. AIClipSet이란 하나의 발화 단위를 의미한다. 이때 발화 종류는 말하기만하는  일반 발화와 제스처를 포함한 발화인 제스처 발화, 그리고 어떤 동작만 수행하는 제스처가 있다. AI 모델에 따라 사용할수 있는 제스처가 정해져 있으며 AIPlayer의 getGestures 함수를 이용하여 사용가능한 제스처 목록을 가져올 수 있다.

아래와 같은 클립셋의 타입이 존재한다.

- AIClipSet.ClipType
  - CLIP_SPEECH: 제스처가 없는 일반 발화만 가능한 Clip
  - CLIP_GESTURE: 제스처만 가능한 Clip
  - CLIP_SPEECH_GESTURE: 제스처가 포함된 발화가 가능한 Clip

아래 샘플 스크린샷에서는 Jonathan이라는 AI 모델이 "hi"(손을 흔든다)라는 제스처를 하면서 발화를 하고 있다.

<p align="center">
<img src="/img/aihuman/android/Screenshot_20221107-120334_AIHumanSDKDemo.jpg" style={{zoom: "25%"}} />
</p>

AIClipSetFactory.CreateClip 함수를 이용하여 제스처를 하는 AIClipSet을 아래와 같이 생성한다. 제스처를 설정하였지만, 발화 문장을 셋팅하지 않고 send를 호출하면 발화는 하지않고 제스처만 동작된다. 

```java
if (selectedSpeech != null) {
    
    if (selectedAIGesture != null) {
        aiPlayer.send(AIClipSetFactory.CreateClip(
                selectedAIGesture.getName(), selectedSpeech, null));
    } else {
        aiPlayer.send(AIClipSetFactory.CreateClip(
                null, selectedSpeech, null));
    }
}
```

### 제스처 동작의 콜백 모니터링
발화동작과 동일하게 IAIPlayerCallback.onAIPlayerEvent(AIEvent)가 호출된다. AIEvent의 type값은 다음과 같이 호출되어 상태를 알수 있다. 단, 여기서 aiEvent.clipset.getClipType(), getGesture(), getSpeechText()를 알수 있으므로 제스처 동작인지, 그냥 발화동작인지 알수 있다. 

- AIEvent.AICLIPSET_PLAY_PREPARE_STARTED 
- AIEvent.AICLIPSET_PLAY_PREPARE_COMPLETED 
- AIEvent.AICLIPSET_PLAY_STARTED
- AIEvent.AICLIPSET_PLAY_COMPLETED
- AIEvent.AICLIPSET_PLAY_BUFFERING
- AIEvent.AICLIPSET_RESTART_FROM_BUFFERING
  
<br/>

## 언어 및 음성 변경
일부 AI는 기본 음성 외에 다른 음성으로 발화를 할수 있다. 여러 음성을 사용하기 위해서는 먼저 AIModelInfoManager.generateToken(...) 함수나 AIModelInfoManager.loadCustomVoices(...) 메소드를 호출한 후 사용할수 있다. 

<p align="center">
<img src="/img/aihuman/android/Screenshot_20221107-120630_AIHumanSDKDemo.jpg" style={{zoom: "25%"}} />
</p>

### AIPlayer의 언어 및 음성 변경 방법
먼저 현재 AI가 발화할수 있는 언어의 리스트는 다음의 메소드를 통해 확인할수 있다.

```java
String[] languages = AIModelInfoManager.getSpeakableLanguages(aiPlayer.getGender());
``` 

다음으로 해당하는 언어와 성별에 맞는 음성 리스트는 다음의 메소드로 확인 가능하다. CustomVoice는 id, name, language, gender, tag의 프로퍼티를 가지고 있다. 

```java
CustomVoice[] customVoices = AIModelInfoManager.getCustomVoicesWith(String language, String gender);
``` 

원하는 음성의 id를 알고 있는 경우, 다음 메소드를 이용해 원하는 음성을 찾을수 있다. 없으면 null을 리턴한다.
여기서 customVoiceId 값은 CustomVoice의 id값이다. (customVoice.getId() 메소드 호출로 얻을수 있다.)

```java
CustomVoice myVoice = AIModelInfoManager.findCustomVoice(String customVoiceId);
``` 

원하는 음성으로 aiplayer에 직접 변경은 다음과 같이 설정하며, null 입력시 기본 음성으로 설정된다. 성공시 true를 리턴한다. 

```java
CustomVoice[] customVoices = AIModelInfoManager.getCustomVoicesWith(String language, String gender);
CustomVoice myVoice = customVoices[2]; 
boolean isSuccess = aiPlayer.setCustomVoice(myVoice);
```

CustomVoice 인스턴스를 직접사용하지 않고, 언어만으로 설정하려면 다음과 같이 언어와 성별만으로 설정할수 있고 이때는 해당 음성 리스트 중에 첫번째로 설정된다. 

```java
boolean isSuccess = aiPlayer.setCustomVoiceForLanguage(language, gender);
```

현재 설정된 CustomVoice는 아래의 메소드로 확인한다. 현재 설정된 음성이 없으면 null을 리턴한다.

```java
CustomVoice customVoice = aiPlayer.getCustomVoice();
```

### AICLipSet 이용 방법
기본 음성 외에 다른 음성을 설정하기위해 setCustomVoice 메소드를 사용하는 방법 외에, AIClipSet을 이용하여 다음과 같이 원하는 음성으로 발화할수 있다. 이 방법은 기존에 AIPlayer에 설정된 customVoice 중간에 임시로 다른 음성으로 발화시킬수 있는 장점이 있다. 

```java
CustomVoice myVoice = AIModelInfoManager.getCustomVoicesWith(String language, String gender)[0];
AIClipSet aiClipset = AIClipSetFactory.CreateClip(null, speech, null, myVoice);
aiPlayer.send(aiClipSet);
``` 

<br/>

## 여러 문장 연속 발화
aiPlayer에게 여러 문장을 한꺼번에 주고 차례로 발화하게 할수 있다. 방법은 다음과 같고 주의할 점은 프리로드와 마찬가지로 일부 ai 모델만 가능하다. 아래 샘플에서 Multi Speak 버튼을 누르면 해당 행동이 구현되어있다.

<p align="center">
<img src="/img/aihuman/android/Screenshot_20221107-120334_AIHumanSDKDemo.jpg" style={{zoom: "25%"}} />
</p>

```java
aiPlayer.send([texts]); //array

//or 
aiPlayer.send([aiClipSets]); //array
```

<br/>

## 프리로드

프리로드는 다음에 할 말들을 먼저 로드시켜놓고 빠르게 다음 발화를 하고 싶을 때 사용한다. 이는 일종의 캐싱이라고 생각할 수 있다. 다음 메소드를 호출하면 프리로드가 동작된다. 아래 샘플에서 Preload speak 버튼을 누르면 해당 행동이 구현되어 있다. 

**3d character는 현재 이 기능을 지원하지 않는다.** 

<p align="center">
<img src="/img/aihuman/android/Screenshot_20221107-120334_AIHumanSDKDemo.jpg" style={{zoom: "25%"}} />
</p>

```java
aiPlayer.preload([text]);
```

### 프리로드 동작의 콜백 모니터링 

발화동작과 마찬가지로 프리로드 동작시에도 IAIPlayerCallback.onAIPlayerEvent(AIevent)가 호출된다. AIevent 값은 다음과 같이 호출되어 상태를 알수 있다. 

- AIevent.AICLIPSET_PRELOAD_STARTED
- AIevent.AICLIPSET_PRELOAD_COMPLETED
- AIevent.AICLIPSET_PRELOAD_FAILED

프리로드 동작은 캐시가 필요할 경우 유용하다. ai가 할말이 여러 문장있을 때, 첫번째 문장을 send한다. 이후 onAIPlayerEvent()에서 AICLIPSET_PLAY_STARTED 이벤트가 보고 되면, 즉 ai가 첫문장을 말을 하기 시작할 때 다음 할말을 프리로드 시킬수 있다. AICLIPSET_PLAY_COMPLETED 이벤트가 호출될때 대게는 프리로드 시킨 말이 플레이 준비 완료되어있으며, 이때 발화시키면 빠르게 발화시킬수 있다. 

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

## 재연결(reconnect) 

**Reconnect**는 네트워크가 연결되지 않은 경우 사용될 수 있다. 네트워크를 사용할 수 없는 경우 AI_DISCONNECTED 이벤트가 발생하고 SDK 내부적으로 한 번 재연결을 시도한다. reconnect을 호출하면 결과가 등록된 콜백(IAIReconnect Callback)으로 반환된다.


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

## 전송하기 전에 'isConnected'를 확인하기 
AI가 연결되어 있는지 확인한다. 연결이 되어있다면 send를 할 수 있다. false일 때 전송하는 경우 AIError.AICLIPSET_PLAY_ERR 및 AIEvent.AICLIPSET_PLAY_FAILED가 onAIPlayerError 및 onAIPlayerEvent 콜백으로 각각 값이 전달된다.

```java
boolean isConnected = aiPlayer.isConnected();
```

<br/>

## 프리로드하기 전에 'canPreload' 확인하기 
프리로드가 가능한지 확인한다. true라면 preload를 할 수 있다. false일 때 preload하는 경우에는 AIError.AICLIPSET_PRELOAD_ERR 및 AIEvent.AICLIPSET_PRELOAD_FAILED가 각각 onAIPlayerError와 onAIPlayerEvent 메소드로  전송된다.

```java
boolean canPreload = aiPlayer.canPreload();
```

<br/>

## AI 말하기 속도 변경
변경 가능한 값은 0.5~1.5 범위이다. 

```java
aiPlayer.setSpeed(speed);
```

<br/>