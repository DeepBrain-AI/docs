---
sidebar_position: 3
---

# AI Human 데모
:::note related files

- demo1.html

:::

이 페이지는 AIPlayer의 다양한 기능을 간단한 UI를 통해 보여줍니다. 다른 AI 모델을 선택하고, AI의 스케일을 변경하고, 음성 속도를 변경하고, AI가 여러 문장을 말하게 하고, 프리로드 등의 기능을 사용해 볼 수 있습니다.

**1. 먼저 AIPlayer(AI_PLAYER)를 생성하고, 인증을 완료후 셋업을 진행합니다.**

```javascript
const wrapper = document.getElementById("AIPlayerWrapper");
const AI_PLAYER = new AIPlayer(wrapper);

const DATA = { /* ... */ };

async function generateClientToken() { /* ... */ }

async function generateVerifiedToken() {
  // ...

  const result = await AI_PLAYER.generateToken({ appId: DATA.appId, token: DATA.clientToken });
  if (result?.succeed) {
    DATA.verifiedToken = result?.token;
    DATA.tokenExpire = result?.tokenExpire;
  } else DATA.verifiedToken = "";
}
```
<br/>

**2. 사용가능한 AI 리스트를 불러오고 그중 하나의 AI를 시작시킵니다.**

```javascript
async function getAIList() {
  if (!DATA.appId || !DATA.verifiedToken) return;
  await refreshTokenIFExpired();

  const result = await AI_PLAYER.getAIList();
  /*
  {"succeed":true,
    "ai":[{"aiName":"vida","aiDisplayName":"Vida","language":"en"},
          {"aiName":"bret","aiDisplayName":"Bret","language":"en"},
          {"aiName":"danny","aiDisplayName":"Danny","language":"en"},
          {"aiName":"samh","aiDisplayName":"Samh","language":"en"},
          {"aiName":"kang","aiDisplayName":"Kang","language":"ko"}]}
  */
  if (result?.succeed) {
    if (result.ai.length === 0) $("#AIPlayerStateText").text("There is no AI model available.");
    else await makeAIList(result.ai);
  }
}
```

<br/>

**3. 선택한 AI 이름으로 AIPlayer의 init 함수 호출**

원하는 AI를 해당 the AI의 name, size, left, top and speech speed와 함께 초기화(init)합니다.

```javascript
// ai model select
async function selectModel() {
  const value = selected.val();
  const type = selected.attr("type");
  await startAI(value, aiType);
}

async function startAI(aiName, aiType) {
  if (!DATA.appId || !DATA.verifiedToken) return;
  await refreshTokenIFExpired();
  initUI(aiType);

  await AI_PLAYER.init({
    aiName: aiName, size: 1.0, left: 0, top: 0, speed: 1.0
  });
}
```

<br/>

**4.  AIPlayer의 콜백을 구현하여 이벤트와 에러를 모니터합니다.**

AIPlayer는 3개의 callback 함수를 가지고 있습니다. 그것은 각각 onAIPlayerEvent, onAIPlayerLoadingProgressed 그리고 onAIPlayerErrorV2입니다. 더 자세한 사항은 여기 [Page](../apis/aiplayer-callback.md)와 여기 [Page](../apis/aiplayer-data.md)를 참조하여주십시오.


```javascript
function initAIPlayerEvent() {
  
  /**
   * @event AIPlayer#onAIPlayerEvent
   * @description AIPlayer event callback 
   * @example
   * AIPlayer.onAIPlayerEvent = function (aiEvent) {
   *  if (aiEvent.type === AIEventType.RES_LOAD_STARTED) showLoadingProcess();
   *  if (aiEvent.type === AIEventType.RES_LOAD_COMPLETED) hideLoadingProcess();
   * };
   * @property {AIEvent} aiEvent
   * @property {Number} aiEvent.type 
   * @property {AIClipSet} aiEvent.clipSet
   */
  AI_PLAYER.onAIPlayerEvent = function (aiEvent) {
    // TODO: event handling 

    //example
    switch (aiEvent.type) {
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
      //...
      }
  };

  /**
   * @event AIPlayer#onAIPlayerLoadingProgressed
   * @description AI loading progress report 
   * @example
   * AIPlayer.onAIPlayerLoadingProgressed = (result) => {
   *   console.log('AI Resource Loading... ${result.loading || 0}%')
   * };
   */
  AI_PLAYER.onAIPlayerLoadingProgressed = function (result) {
    // TODO: loading handling
  };

  /**
   * @event AIPlayer#onAIPlayerErrorV2
   * @description error report
   * @example
   * AIPlayer.onAIPlayerErrorV2 = function (aiError) {
   *  console.log('aiError: ', aiError.code, aiError.message);
   * };
   * @property {AIError} aiError 
   * @property {Number} aiError.code - error code 
   * @property {String} aiError.message - error message
   */
  AI_PLAYER.onAIPlayerErrorV2 = function (aiError) {
    // TODO: error handling

    if (aiError.code >= AIError.RESERVED_ERR) {
      //You've encountered a reserved error. Please check the error list!
      console.log("RESERVED_ERR :" , aiError.message);
    } else if (aiError.code >= AIErrorCode.AICLIPSET_PLAY_ERR) {
      console.log("AICLIPSET_PLAY_ERR :" , aiError.message);
    } else if (aiError.code >= AIErrorCode.AICLIPSET_PRELOAD_ERR) {
      console.log("AICLIPSET_PRELOAD_ERR :" , aiError.message);
    } else if (aiError.code >= AIErrorCode.INVALID_AICLIPSET_ERR) {
      console.log("INVALID_AICLIPSET_ERR :" , aiError.message);
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

      if (aiError.code == 1402) { //refresh token
        refreshTokenIFExpired();
      }
    } else {
      console.log("UNKNOWN_ERR :" , aiError.message);
    }
  };

}
```

<br/>

**5. AI 발화 관련 함수들 (preload, send, pauses, resume, stop and release)**

```javascript
async function preload(clipSet) {
  await refreshTokenIFExpired();
  // ...

  AI_PLAYER.preload(clipSet);
}

async function speak(clipSet) {
  await refreshTokenIFExpired();
  // ...
  
  AI_PLAYER.send(clipSet);
}

function pause() {
  AI_PLAYER.pause();
}

function resume() {
  AI_PLAYER.resume();
}

function stop() {
  // ...
  AI_PLAYER.stopSpeak();
}

function release() {
  // ...
  AI_PLAYER.release();
}
```

<br/>


**6. 3D AI Model Application 예제**

 2D와는 달리, 3D AI model은 Unity Webgl build 결과물 (SDK zip 파일의 `Build` 폴더와 그 파일들)이 필요합니다. 

3D AI를 표시하기 위해서는, 
- 'Build' 폴더의 파일을 원하는 위치(로컬 저장소, S3 등)에 저장합니다.
- AIPlayer 개체를 생성할 때,
  + AIPlayer가 그려질 UI 요소를 첫 번째 인수(wrapper)로 지정합니다.
  + 두번째 인수는 json으로, 'buildUrl' 키에 로컬 경로 또는 URL을 할당합니다.

두번째 인수 정보. 

| Param           | Type     | Description                      |
| --------------- | -------- | -------------------------------- |
| `json`          | `Object` | UI element for creating AIPlayer |
| `json.buildUrl` | `String` | 3d Build folder url              |


<br/>

```javascript
const wrapper = document.getElementById("AIPlayerWrapper");
const AI_PLAYER = new AIPlayer(wrapper, {
   buildUrl: "..." // TODO: Customer Build folder url
});
```

<br/>

<img src="/img/aihuman/web/sdk_demo_02_r1.png" />
