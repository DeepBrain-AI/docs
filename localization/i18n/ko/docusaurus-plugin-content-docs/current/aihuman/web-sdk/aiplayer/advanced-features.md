---
sidebar_position: 5
---

# 발화 관련 추가 기능

### 1. 제스처

앞서 간략하게 언급한 바와 같이 AIClipSet을 이용하여 발화를 할 수 있습니다. AIClipSet이란 하나의 발화 단위를 의미합니다. 이때 발화 종류는 말하기만 하는 일반 발화와 제스처를 포함한 발화인 제스처 발화, 그리고 어떤 동작만 하는 제스처가 있습니다. AI 모델에 따라 사용할 수 있는 제스처가 정해져 있으며 AIPlayer의 getGestures 함수를 이용하여 사용 가능한 제스처 목록을 가져올 수 있습니다.

아래와 같은 클립셋의 타입이 존재합니다.

AIClipSet.ClipType

- CLIP_SPEECH: 제스처가 없는 일반 발화만 가능한 Clip
- CLIP_GESTURE: 제스처만 가능한 Clip
- CLIP_SPEECH_GESTURE: 제스처가 포함된 발화가 가능한 Clip

아래 샘플 스크린샷에서는 Jonathan이라는 AI 모델이 "twohand"라는 제스처를 하면서 발화를 하고 있습니다.

<img src="/img/aihuman/web/sdk_demo_gesture_r1.png" />

<br/>
<br/>
<br/>

아래와 같이 제스처를 하는 AIClipSet을 생성합니다. 또한 제스처를 설정하였지만, 발화 문장을 셋팅하지 않고 send를 호출하면 발화는 하지않고 제스처만 동작됩니다.

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

### 2. 음성 및 언어 변경

일부 AI는 기본 음성 외에 다른 음성으로 발화를 할 수 있습니다. 여러 음성을 사용하기 위해서는 먼저 `AIPlayer.generateToken(...)` 함수나 `AIPlayer.loadCustomVoices(...)` 메소드를 호출한 후 사용할 수 있습니다.

Demo 페이지에서 선택할수 있는 customVoice 리스트를 확인할수 있습니다.

<img src="/img/aihuman/web/sdk_demo_04_r1.png" />

#### AIPlayer의 언어 및 음성 변경 방법

먼저 현재 AI가 발화할수 있는 언어의 리스트는 다음의 메소드를 통해 확인할 수 있습니다.

```javascript
const languages = AI_PLAYER.getSpeakableLanguages(AI_PLAYER.getGender());
```

다음으로 해당하는 언어와 성별에 맞는 음성 리스트는 다음의 메소드로 확인 가능합니다. CustomVoice는 id, name, language, gender 프로퍼티를 가지고 있습니다.

```javascript
const customVoices = AI_PLAYER.getCustomVoicesWith(language, gender);
```

원하는 음성의 id를 알고 있는 경우, 다음 메소드를 이용해 원하는 음성을 찾을 수 있습니다. 없으면 null을 리턴합니다. 여기서 customVoiceId 값은 CustomVoice의 id값입니다.

```javascript
const customVoice = AI_PLAYER.findCustomVoice(voiceId);
```

원하는 음성으로 aiplayer에 직접 변경은 다음과 같이 설정하며, null 입력시 기본 음성으로 설정됩니다. 성공시 true를 리턴합니다.

```javascript
const customVoice = AI_PLAYER.findCustomVoice(voiceId);

const isSuccess = AI_PLAYER.setCustomVoice(customVoice);
```

CustomVoice 인스턴스를 직접사용하지 않고, 언어만으로 설정하려면 다음과 같이 언어와 성별만으로 설정할 수 있고 이때는 해당 음성 리스트 중에 첫번째로 설정됩니다.

```javascript
const isSuccess = AI_PLAYER.setCustomVoiceForLanguage(language, gender);
```

현재 설정된 CustomVoice는 아래의 메소드로 확인합니다. 현재 설정된 음성이 없으면 null을 리턴합니다.

```javascript
const customVoice = AI_PLAYER.getCustomVoice();
```

#### AICLipSet 이용 방법

기본 음성 외에 다른 음성을 설정하기 위해 setCustomVoice 메소드를 사용하는 방법 외에, AIClipSet을 이용하여 다음과 같이 원하는 음성으로 발화할 수 있습니다. 이 방법은 기존에 AIPlayer에 설정된 customVoice 중간에 임시로 다른 음성으로 발화 시킬 수 있는 장점이 있습니다.

```javascript
const customVoice = AI_PLAYER.findCustomVoice(voiceId);
const AIClipSet = { text: "Nice to meet you", gst: "hi", voice: customVoice };

AI_PLAYER.send(AIClipSet);
```

<br/>

### 3. 여러 문장 연속 발화

aiPlayer에게 여러 문장을 한꺼번에 주고 차례로 발화하게 할 수 있습니다. 방법은 다음과 같고 주의할 점은 프리로드와 마찬가지로 일부 AI 모델만 가능합니다.

```javascript
// Case1. Multi Sentences Speak
AI_PLAYER.send(["Nice to meet you", "How are you?"]);

// Case2. Multi Gesture Speak and just speak
AI_PLAYER.send([{ text: "Nice to meet you", gst: "hi" }, { text: "How are you?" }]);
```

### 4. 프리로드

프리로드는 다음에 할 말들을 먼저 로드시켜놓고 빠르게 다음 발화를 하고 싶을 때 사용합니다. 이는 일종의 캐싱이라고 생각할 수 있습니다. 'preload(...)' 메소드를 호출하면 프리로드가 동작됩니다. 아래 샘플에서 Preload speak 버튼을 누르면 해당 행동이 구현되어 있습니다.

**3d character는 현재 이 기능을 지원하지 않습니다.**

<img src="/img/aihuman/web/sdk_demo_preload_r1.png" />

```javascript
AI_PLAYER.preload("Nice to meet you");
```

<br/>

### 5. 프리로드 동작의 콜백 모니터링

발화동작과 마찬가지로 프리로드 동작시에도 onAIPlayerEvent(AIevent)가 호출됩니다. AIEvent 값은 다음과 같이 호출되어 상태를 알 수 있습니다.

- AIEventType.AICLIPSET_PRELOAD_STARTED
- AIEventType.AICLIPSET_PRELOAD_COMPLETED
- AIEventType.AICLIPSET_PRELOAD_FAILED

프리로드 동작은 캐시가 필요할 경우 유용합니다. AI가 할말이 여러 문장있을 때, 첫번째 문장을 send합니다. 이후 onAIPlayerEvent()에서 AICLIPSET_PLAY_STARTED 이벤트가 보고 되면, 즉 AI가 첫문장을 말을 하기 시작할 때 다음 할말을 프리로드 시킬 수 있습니다. AICLIPSET_PLAY_COMPLETED 이벤트가 호출될 때 대게는 프리로드 시킨 말이 플레이 준비 완료되어 있으며, 이때 발화 시키면 빠르게 발화 시킬 수 있습니다.

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

### 6. 재연결(reconnect)

Reconnect는 네트워크가 연결되지 않은 경우 사용될 수 있습니다. 네트워크를 사용할 수 없는 경우 AI_DISCONNECTED 이벤트가 발생합니다. reconnect을 호출하면 결과가 등록된 콜백으로 반환됩니다.

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

### 7. 전송하기 전에 'isConnected'를 확인하기

AI가 연결되어 있는지 확인합니다. 연결이 되어있다면 send를 할 수 있습니다. false일 때 전송하는 경우 AIErrorCode.AICLIPSET_PLAY_ERR 및 AIEventType.AICLIPSET_PLAY_FAILED가 onAIPlayerErrorV2 및 onAIPlayerEvent 콜백으로 각각 값이 전달됩니다.

```javascript
const isConnected = AI_PLAYER.isConnected();
```

### 8. 프리로드하기 전에 'canPreload' 확인하기

프리로드가 가능한지 확인합니다. true라면 preload를 할 수 있습니다. false일 때 preload하는 경우에는 AIErrorCode.AICLIPSET_PRELOAD_ERR 및 AIEventType.AICLIPSET_PRELOAD_FAILED가 각각 onAIPlayerErrorV2와 onAIPlayerEvent 메소드로 전송됩니다.

```javascript
const canPreload = AI_PLAYER.canPreload((callback = () => {}));
```

### 9. AI 말하기 속도를 변경합니다.

변경 가능한 값은 0.5~1.5 범위입니다.

```javascript
AI_PLAYER.setter({ speed: 1.0 }); // float
```

<br/>
