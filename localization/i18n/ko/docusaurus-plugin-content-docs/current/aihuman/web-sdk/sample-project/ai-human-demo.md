---
sidebar_position: 3
---

# AI Human 데모
:::note related files

- demo1.html

:::

You can try ouy various funcrionalities of AI Player through the Demo UI page. The functionalities include changing AI models, making it speak multiple sentences, and updating AI model state.

**1. After creating the AIPlayer object(AI_PLAYER), a token(verified token) for authentication is issued and setup**

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
    // ...

    // update verifiedToken to AIPlayer instance token
    AI_PLAYER.setter({ token: result?.token });
  } else DATA.verifiedToken = "";
}
```

**2. Get a list of available AI models and SelectUI setup**

```javascript
async function getAIList() {
  if (!DATA.appId || !DATA.verifiedToken) return;
  await refreshTokenIFExpired();

  const result = await AI_PLAYER.getAIList();
  if (result?.succeed) {
    DATA.ai = result.ai;

    // create ai select options
    // ...
  }
}

// ai model select onchange function
async function selectModel() {
  const value = '...' // ai select option value
  await startAI(value);
}
```

**3. AIPlayer object AI Init**

Bring the list of speaking of the corresponding AI, the maximum length of speaking that can be synthesized at once

```javascript
async function startAI(aiName) {
  if (!DATA.appId || !DATA.verifiedToken) return;
  await refreshTokenIFExpired();

  // ...

  await AI_PLAYER.init({
    aiName: "...", zIndex: 0, size: 1.0, left: 0, top: 0, speed: 1.0
  });

  // select ai speak text list
  // const texts = await AI_PLAYER.getSampleTextList();
  // ...

  // get select ai gestures
  // const gsts = AI_PLAYER.getGestures();
  // ...

  // select ai speark text max length
  DATA.maxTextLength = AI_PLAYER.getter("maxTextLength");
}
```

**4. Implement callback based on the state of AI behavior**

```javascript
function initAIPlayerEvent() {
  AI_PLAYER.onAIPlayerError = function (err) {
    // TODO: error handling
    // err => { errorCode: 1400, error: "...", description: "...", detail: "..." }
  };
  AI_PLAYER.onAIPlayerStateChanged = async function (state) {
    // TODO: change state handling
    if (state === "playerLoadComplete") {
      // ...
    }

    // ...

  };
  AI_PLAYER.onAIPlayerLoadingProgressed = function (result) {
    // TODO: loading handling
    // ...
  };
}
```

**5. Examples of AI Speaking (prepare, send, pauses, resume, stop and release)**

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

**6. 3D AI Model Application Example**

Unlike 2D, 3D requires Unity Webgl build results (`Build` folder). Store them in the desired location (local storage, S3, etc.) according to the needs of the user. When creating an AIPlayer object, put the UI element where the AIPlayer will be drawn as the first argument. The second argument is json, which assigns a local path or URL to the 'BuildUrl' key.

Second Factor Format and Examples

| Param            | Type     | Description                          |
| ---------------- | -------- | ------------------------------------ |
| `json`           | `Object` | UI element for creating AIPlayer
| `json.buildUrl`  | `String` | 3d Build folder url

```javascript
const wrapper = document.getElementById("AIPlayerWrapper");
const AI_PLAYER = new AIPlayer(wrapper, {
   buildUrl: "..." // TODO: Customer Build folder url
});
```

<img src="/img/aihuman/web/sdk_demo_02.png" />
