---
sidebar_position: 4
---

# 발화 관련 기본 기능

### 1. Send  

AIPlayer의 초기화가 완료된 후(`AIEventType.AIPLAYER_STATE_CHANGED`에서 State가 INITIALIZE에서 IDLE로 변화를 체크), send 함수를 호출할수 있습니다.

문자열을 입력하면 AI가 발화할 수 있지만 json 형식(AIClipSet 객체)도 사용할 수 있습니다. AIClipSet을 사용하면 AI가 제스처와 함께 말하도록 할 수 있습니다. 예를 들어, 당신은 AI에게 손을 흔들며 "안녕하세요!"라고 말할 수 있습니다. 이것을 제스처 스피치라고 합니다. 자세한 내용은 [Gesture](../aiplayer/advanced-features.md#1-제스처) 파트에 설명되어 있습니다.

말하는 텍스트가 너무 길면 말하는 데 필요한 리소스를 합성하지 못할 수 있습니다. 긴 문장을 합성할 수 있는 모델이 있습니다. AI마다 합성할수 있는 길이는 다르지만 일반적으로 문장은 한국어로 보통 100자 이내, 영어도 비슷한 수준으로 자르는 것이 좋습니다.

```javascript
//Case1. One Gesture Speak
const AIClipSet = { text: "Nice to meet you", gst: "hi" };
AI_PLAYER.send(AIClipSet);

//Case2. One Sentence Speak
AI_PLAYER.send("Nice to meet you");
```

SDK demo page에서도 테스트해볼수 있습니다. 

<img src="/img/aihuman/web/sdk_demo_03_r1.png" />

<br/>

### 2. 발화 동작의 모니터링
'send' 함수를 호출한 후, 등록된 콜백에서 동작 이벤트에 대한 피드백을 확인할 수 있습니다. 이 피드백은 이벤트 관련 콜백 메서드('onAIPlayerEvent')를 호출하여 반환됩니다. 예를 들어 'send' 메서드를 호출하면 다음 이벤트가 'onAIPlayerEvent'로 순차적으로 호출됩니다. 

- AIEventType.AICLIPSET_PLAY_PREARE_STARTED
- AIEventType.AICLIPSET_PLAY_PREARE_COMPLETED
- AIEventType.AICLIPSET_PLAY_STARTED
- AIEventType.AICLIPSET_PLAY_COMPLETED
- AIEventType.AICLIPSET_PLAY_FAILED //실패가 있는 경우,

'send' 중에 오류가 발생하면 'onAIPlayerErrorV2'로 AIError와 함께 호출됩니다.

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


### 3. AIPLAYER_STATE_CHANGED 이벤트로 반응하는 UI 만들기

AI 플레이어에는 사용자가 알아차리고 응답할 수 있는 여러 상태가 있습니다. 상태가 변경되면 'onAIPlayerEvent' 콜백은 AIEventType.AIPLAYER_STATE_CHANGED를 인수로 호출되며 이 때 AIPlayer의 상태는 AI_PLAYER.getState() 메서드를 통해 알수 있습니다.

AI가 초기화되기 전에는, AIPlayer의 상태는 AIPlayerState.NONE입니다. 'AI_PLAYER.init()' 메서드가 호출되면 INITIALIZE로 변경됩니다. AI 초기화가 완료되면 IDLE 상태가 됩니다. 이 상태에서는 AIClipSet를 전송할 수 있으며 상태는 'PLAY'가 됩니다. 마지막으로 'release'를 호출하여 AI 플레이어를 해제하면 상태는 RELEASE 상태가 됩니다. [here](../apis/aiplayer-data#5-aiplayerstate)의 전체 정의를 참조하십시오.

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

### 4. Pause 

```javascript
AI_PLAYER.pause();
```

<br/>

### 5. Resume (Pause로부터 Resume)

```javascript
AI_PLAYER.resume();
```

<br/>

### 6. Stop Speaking

발화를 멈추고 모든 데이터 리셋시킵니다. 리줌이 안됩니다. 

```javascript
AI_PLAYER.stopSpeak();
```

<br/>
