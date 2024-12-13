---
sidebar_position: 3
---

# 이벤트 확인하기

### 1. 리소스 로드 시작

AI 플레이어가 생성되고 `init({...}}` 함수가 호출되면 **aiName** 매개 변수에 따라 리소스 로드를 시작합니다. 로딩 상태는 등록된 callback을 통해 확인할 수 있습니다(`onAIPlayerLoadingProgressed(result)`). (처음에는 리소스 로드를 완료하는 데 몇 분 정도 걸릴 수 있습니다.)

### 2. 콜백을 사용하여 AIPlayer 로드 상태 모니터링

init 메서드를 호출한 후 등록한 `onAIPlayerEvent(aiEvent)` callback 메서드가 [AIEvent](../apis/aiplayer-data.md#7-aievent)와 함께 호출됩니다. AIEvent.type은 발생한 이벤트를 나타냅니다(아래 목록 확인). 또한 `onAIPlayerResLoadingProgressed({loading})`를 사용하여 로드 진행률을 구현할 수 있습니다. 전체 목록은 [here](../apis/aiplayer-data#7-aievent)입니다

- AIEventType.AIPLAYER_STATE_CHANGED : AIPlayer 상태가 변경된 경우(`AIPlayerState` 클래스 및 getState() 메서드 확인). 
- AIEventType.RES_LOAD_STARTED : AI가 필요로하는 이미지, 비디오 등의 리소스 로드가 시작되었을 때 
- AIEventType.AI_CONNECTED : AI가 서비스에 연결되었을때.
- AIEventType.AI_DISCONNECTED : AI가 서비스에서 분리되었을때. `send` 또는 `preload`가 불가능.
- AIEventType.RES_LOAD_COMPLETED : AI가 필요로하는 이미지, 비디오 등의 리소스 로드가 완료되었을 때.
- AIEventType.AI_RECONNECT_ATTEMPT : AI가 서비스에 분리된후 재연결 시도 중일때.
- AIEventType.AI_RECONNECT_FAILED : AI가 서비스에 분리된후 재연결 시도 실패했을 때. 수동으로 연결하려면 AIPlayer.reconnect(...)를 호출한다. 

위의 AIEventType.AIPLAYER_STATE_CHANGED 이벤트를 관찰하면, 그 상태가 AIPlayerState.INITIALIZE 에서 AIPlayerState.IDLE 으로 변합니다. 이 때가 바로 AI의 초기화가 완료된 시점이며, 이후로 send 또는 preload를 호출할수 있습니다.(SDK 샘플 참조)

이 과정에서 문제가 발생하면 `onAIPlayerErrorV2(aiError)` 메서드가 호출되며 상황에 따라 적절한 조치를 필요로합니다. 예를 들어 인증 토큰의 만료의 경우 generateToken을 재호출 하여 토큰을 리프레쉬해야합니다. aiError.code 값은 범위별로 분류할 수 있습니다. 아래 샘플 코드를 확인하십시오.

- AIErrorCode.AI_INIT_ERR : AI를 초기화하는 중 오류가 발생.
- AIErrorCode.AI_API_ERR : 인증 프로세스와 같은 정보를 수신하는 API 부분에서 오류가 발생.
- AIErrorCode.AI_RES_ERR : AI에 대한 리소스를 다운로드하는 중 오류가 발생.

**ex) 1402 오류(token 만료): 토큰 새로 고침이 필요함 -> `generateToken({ appId, token })` 메서드 다시 호출**

```javascript
let curAIState = AIPlayerState.NONE
AI_PLAYER.onAIPlayerEvent = function (aiEvent) {
    // TODO: event handling 

    //example
    let typeName = ""
    switch (aiEvent.type) {
      case AIEventType.AIPLAYER_STATE_CHANGED:
        typeName = 'AIPLAYER_STATE_CHANGED';
        let newAIState = AI_PLAYER.getState()
        if (curAIState == AIPlayerState.INITIALIZE && newAIState == AIPlayerState.IDLE) {
          $("#aiList").removeAttr("disabled");
          $("#AIPlayerStateText").text("AI initialization completed.");

          console.log('AI initialization completed.')
        }
        curAIState = newAIState
        break
      case AIEventType.AI_CONNECTED:
        console.log("AI AI_CONNECTED :", aiEvent);
        break;
      case AIEventType.AI_DISCONNECTED:
        console.log("AI AI_DISCONNECTED ", aiEvent);
        break;
      case AIEventType.RES_LOAD_STARTED:
        console.log("AI RES_LOAD_STARTED ", aiEvent);
        break;
      case AIEventType.RES_LOAD_COMPLETED:
        console.log("AI RES_LOAD_COMPLETED ", aiEvent);
        break;
      //...
      }
  };

  AI_PLAYER.onAIPlayerLoadingProgressed = function (result) {
    // TODO: loading handling
    console.log('AI Resource Loading... ${result.loading || 0}%')
  };

  AI_PLAYER.onAIPlayerErrorV2 = function (aiError) {
    // TODO: error handling
    console.log('onAIPlayerErrorV2:', aiError.code, aiError.message)

    if (aiError.code >= AIError.RESERVED_ERR) {
      //You've encountered a reserved error. Please check the error list!
      console.log("RESERVED_ERR :" , aiError.message);
    } else if (aiError.code >= AIErrorCode.AI_INIT_ERR) {
      console.log("AI_INIT_ERR :" , aiError.message);
    } else if (aiError.code >= AIErrorCode.AI_RES_ERR) {
      console.log("AI_RES_ERR :" , aiError.message);
    } else if (aiError.code >= AIErrorCode.AI_SERVER_ERR) {
      console.log("AI_SERVER_ERR :" , aiError.message);
    } else if (aiError.code >= AIErrorCode.AI_API_ERR) {
      console.log("AI_API_ERR :" , aiError.message);
    } else if (aiError.code > AIErrorCode.UNKNOWN_ERR) { //0 ~ 9999
      console.log("BACKEND_ERR :" , aiError.message);
      if (error.code == 1402) { //refresh token
        refreshTokenIFExpired();
      }
    } else {
      console.log("UNKNOWN_ERR :" , aiError.message);
    } 
  };
```