---
sidebar_position: 3
---

# AI Human Demo
:::note related files

- demo.html, demo.js, demo.css

:::

This page explains various functionalities of AIPlayer through simple UI. You can select an AI model, change the scale, speech speed of AI, and let the AI speak multiple sentences and take advantage of the preload function, etc.

**1. First, create the AIPlayer object(AI_PLAYER), complete authentication and set up the AIPlayer**

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

**2. Get the list of available AI models and start an AI from the list**

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

**3. Call AIPlayer's init function with the selected AI name**

Initialize the corresponding AI with the AI's name, size, left, top and speech speed.

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

**4. Implement callback of AIPlayer to monitor the event and error**

The AIPlayer has 3 callback functions for you. They are onAIPlayerEvent, onAIPlayerLoadingProgressed and onAIPlayerErrorV2. For detail info about the callback, please refer this [Page](../apis/aiplayer-callback.md) and [Page](../apis/aiplayer-data.md).

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

**5. Examples of AI Speaking related (preload, send, pauses, resume, stop and release) features**

```javascript
async function preload(clipSet) {
  await refreshTokenIFExpired();

  AI_PLAYER.preload(clipSet);
}

async function speak(clipSet) {
  await refreshTokenIFExpired();
  
  AI_PLAYER.send(clipSet);
}

function pause() {
  AI_PLAYER.pause();
}

function resume() {
  AI_PLAYER.resume();
}

function stop() {
  AI_PLAYER.stopSpeak();
}

function release() {
  AI_PLAYER.release();
}
```

**6. 3D AI Model Application Example**

Unlike 2D, 3D AI model requires Unity Webgl build results (files in `Build` folder of the SDK zip). 

To show the 3D AI, 
- Store the `Build` folder's files in the location you want(local storage, S3, etc.). 
- When creating an AIPlayer object, 
  + Put the UI element where the AIPlayer will be drawn as the first argument(wrapper).
  + The second argument is json, which assigns a local path or URL to the 'buildUrl' key.

Second argument info. 

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
