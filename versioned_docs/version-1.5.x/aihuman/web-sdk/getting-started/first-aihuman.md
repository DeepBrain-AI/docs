---
sidebar_position: 3
---

# Own your first AI Human

In this chapter, we will quickly go over AIHuman(AIPlayer) setup process and make the default AI say a sentence. When running AIPlayer for the first time, it may take several minutes to load resources depending on the network condition. The progress of this loading process can be monitored.

<img src="/img/aihuman/web/quick_start.png" />

<br/>
<br/>

**1. Include the SDK and Ready the AIPlayer in the web page**

```html
<script src="https://cdn-aihuman.deepbrainai.io/sdk/web/aiPlayer-1.5.2.min.js"></script>

<div id="AIPlayerWrapper"></div>
```

```javascript
const wrapper = document.getElementById("AIPlayerWrapper");
const AI_PLAYER = new AIPlayer(wrapper);
```

<br/>

**2. Authenticate the SDK**

**2.1. Enter appId and get userKey from SDK website**

Create an account on the **[AI Human SDK Website](https://www.aistudios.com/aihuman/)**.

- Top right > Login(Sign In) > Create account
- After you log in, you can create a project in the SDK category.
- If you are not allowed access to SDK categories after logging in, please contact our customer center. [Contact](https://www.aistudios.com/company/contact)

<img src="/img/aihuman/web/project.png" />

**2.2. Create ClientToken API on your Server**

- Next, for SDK authentication, clientToken is needed.
- The clientToken generation api should be implemented on your server, so that the client can request when it needs.
- Below is how to install jsonwebtoken lib for JWT on your server.(Note: [JWT](https://jwt.io/))

```
npm install jsonwebtoken
```

- Below is an example of creating clientToken from nodejs.

```javascript
// generateJWT.js(Server)

import jwt from "jsonwebtoken";

const userKey = "..."; // TODO: userKey input
const payload = {
  appId: "...", // TODO: appId input
  platform: "web",
};
const options = {
  header: { typ: "JWT", alg: "HS256" },
  expiresIn: 60 * 5, // expire time: 5 mins
};

function generateJWT(req, res) {
  try {
    const clientToken = jwt.sign(payload, userKey, options);

    res.json({ appId: payload.appId, token: clientToken });
  } catch (e) {
    console.log("jwt generate err ", e.name, e.message);
  }
}
```

- Below is an example of routing the generateJWT function for next.js.

```javascript
// generateJWT.js(Server) append
export default (req, res) => {
  if (req.method === "GET") return generateJWT(req, res);

  // if (req.method === "POST") return generateJWT(req, res);
};
```

- And Below is an example of routing the generateJWT function for express.

```javascript
// generateJWT.js(Server)
module.export = generateJWT;
```

```javascript
const express = require("express");
const app = express();
const generateJWT = require("..."); // TODO: generateJWT.js access path

app.get("/generateJWT", generateJWT);
// app.post('/generateJWT', generateJWT);
```

**2.3. Request generateJWT (requestClientToken) from Client to Server**

```javascript
// quickStart.js(Client)

async function requestClientToken() {
  // TODO: Server generateJWT request address input
  // for example : const result = await makeRequest("GET", "/api/generateJWT");
  const result = await makeRequest("GET", "...");

  // Success
  DATA.appId = result.appId;
  DATA.clientToken = result.token;
  // ...
}
```

**2.4. generateToken request**

- After the `requestClientToken` call is succeeded, then call AIPlayer's `generateToken` function with appId and clientToken. It responds with JSON containing information such as verifiedToken, tokenExpire, and defaultAI. The `generateToken` call succeeds means the authication is completed. For more info, refer to [API](../apis/aiapi.md) section.

```javascript
// quickStart.js(Client)

async function generateVerifiedToken() {
  const result = await AI_PLAYER.generateToken({ appId: DATA.appId, token: DATA.clientToken });

  if (result?.succeed) {
    DATA.verifiedToken = result.token;
    DATA.tokenExpire = result.tokenExpire;
    DATA.defaultAI = result.defaultAI;
  }
}
```

<br/>

**3. Initialize AIPlayer**

After successful authentication, the AIPlayer needs to be initialized using the `init` function. At this time, it can be set with defaultAI. If you want to use other AIs, you can get a list of available AIs through the getAIList function. For details, please refer to [AIPlayer](../apis/aiplayer.md) section.

```javascript
// quickStart.js(Client)

await AI_PLAYER.init({
  aiName: DATA.defaultAI.ai_name,
  size: 1.0,
  left: 0,
  top: 0,
  speed: 1.0,
});
```

<br/>

**4. Let's make AIPlayer's callback and monitor the event of AIPlayer**

You can set AIPlayer's listener for AI events like below. And notice that you can call `send` function after the AI initialization has completed.

```javascript
const AIPlayerState = Object.freeze({
  NONE: 0,
  INITIALIZE: 1,
  IDLE: 2,
  PLAY: 3,
  PAUSE: 4,
  RELEASE: 5,
});

let curAIState = AIPlayerState.NONE;
function initAIPlayerEvent() {
  AI_PLAYER.onAIPlayerEvent = function (aiEvent) {
    switch (aiEvent.type) {
      //...
      case AIEventType.AIPLAYER_STATE_CHANGED:
        let newAIState = AI_PLAYER.getState();
        if (curAIState == AIPlayerState.INITIALIZE && newAIState == AIPlayerState.IDLE) {
          console.log("AI initialization completed.");
          // you can send now!
          // AI_PLAYER.send("Hello!")
        }
        curAIState = newAIState;
        break;
      //...
    }
  };
}
```

<br/>

### 5. Full Client Sample Source Code

```html
<!-- quickStart.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>AIPlayer JavaScript SDK Quick Start</title>
  </head>
  <style>
    html,
    body,
    #AIPlayerWrapper {
      height: 100%;
    }

    .RightLayout {
      width: 20vw;
      height: 100%;
      min-width: 300px;
      position: fixed;
      bottom: 0;
      right: 5%;
    }

    .InfoContainer {
      height: 27vh;
      min-height: 150px;
      padding-bottom: 3vh;
    }

    .demoList {
      width: 100%;
      margin-top: 5vh;
      height: 3vh;
      min-height: 20px;
      display: flex;
      justify-content: space-between;
    }

    .demoList > button {
      width: 6vw;
      min-width: 90px;
    }
  </style>

  <body style="height: 100%">
    <div id="AIPlayerWrapper"></div>

    <div style="display: grid; position: fixed; top:2%; left:2%; width: fit-content" id="AIPlayerTexts">
      <button onclick="speak(this.innerHTML)">How are you?</button>
      <button onclick="speak(this.innerHTML)">Nice to see you!</button>
    </div>

    <div class="RightLayout">
      <div class="InfoContainer">
        <div id="demoListInQuickstart" class="demoList">
          <button style="background-color: gold">QuickStart</button>
          <button onclick="javascript:location.href='./demo1.html'">SDK Demo</button>
          <button onclick="javascript:location.href='./demo2.html'">STT Demo</button>
        </div>
      </div>
    </div>
  </body>

  <!-- add JavaScript SDK -->
  <script src="https://cdn-aihuman.deepbrainai.io/sdk/web/aiPlayer-1.5.2.min.js"></script>
  <script src="./quickStart.js"></script>
</html>
```

<br/>

```javascript
const wrapper = document.getElementById("AIPlayerWrapper");
const AI_PLAYER = new AIPlayer(wrapper);

const DATA = {};

initSample();

async function initSample() {
  initAIPlayerEvent();

  await generateClientToken();
  await generateVerifiedToken();

  await AI_PLAYER.init({
    aiName: DATA.defaultAI.ai_name,
    size: 1.0,
    left: 0,
    top: 0,
    speed: 1.0,
  });
}

// =========================== AIPlayer Setup ================================ //

async function generateClientToken() {
  // const result = await makeRequest("GET", "..."); // TODO: Server generateJWT request address input
  // TODO: response handling
  const result = await makeRequest("GET", "/api/generateJWT"); // TODO: e.g.
  console.log("generateClientToken", result);

  // Success
  DATA.appId = result.appId;
  DATA.clientToken = result.token;
  // ...
}

async function generateVerifiedToken() {
  const result = await AI_PLAYER.generateToken({
    appId: DATA.appId,
    token: DATA.clientToken,
  });
  console.log("generateVerifiedToken", result);

  if (result?.succeed) {
    // TODO: response data handling
    DATA.verifiedToken = result.token;
    DATA.tokenExpire = result.tokenExpire;
    DATA.defaultAI = result.defaultAI;
  } else {
    // TODO: error handling
    console.log("generateVerifiedToken error", result);
  }
}

// =========================== AIPlayer Callback ================================ //

function initAIPlayerEvent() {
  //AIError & callback
  const AIErrorCode = Object.freeze({
    AI_API_ERR: 10000,
    AI_SERVER_ERR: 11000,
    AI_RES_ERR: 12000,
    AI_INIT_ERR: 13000,
    INVALID_AICLIPSET_ERR: 14000,
    AICLIPSET_PRELOAD_ERR: 15000,
    AICLIPSET_PLAY_ERR: 16000,
    RESERVED_ERR: 17000,
    UNKNOWN_ERR: -1,
  });

  // TODO: AIPlayer error handling
  AI_PLAYER.onAIPlayerErrorV2 = function (aiError) {
    let codeName = "UNKNOWN_ERR";
    if (aiError.code >= AIErrorCode.RESERVED_ERR) {
      codeName = "RESERVED_ERR";
    } else if (aiError.code >= AIErrorCode.AICLIPSET_PLAY_ERR) {
      codeName = "AICLIPSET_PLAY_ERR";
    } else if (aiError.code >= AIErrorCode.AICLIPSET_PRELOAD_ERR) {
      codeName = "AICLIPSET_PRELOAD_ERR";
    } else if (aiError.code >= AIErrorCode.INVALID_AICLIPSET_ERR) {
      codeName = "INVALID_AICLIPSET_ERR";
    } else if (aiError.code >= AIErrorCode.AI_INIT_ERR) {
      codeName = "AI_INIT_ERR";
    } else if (aiError.code >= AIErrorCode.AI_RES_ERR) {
      codeName = "AI_RES_ERR";
    } else if (aiError.code >= AIErrorCode.AI_SERVER_ERR) {
      codeName = "AI_SERVER_ERR";
    } else if (aiError.code >= AIErrorCode.AI_API_ERR) {
      codeName = "AI_API_ERR";
    } else if (aiError.code > AIErrorCode.UNKNOWN_ERR) {
      //0 ~ 9999
      codeName = "BACKEND_ERR";

      if (aiError.code == 1402) {
        //invalid or token expired
        refreshTokenIFExpired();
      }
    }

    console.log("onAIPlayerErrorV2", aiError.code, codeName, aiError.message);
  };

  //AIEvent & callback
  const AIEventType = Object.freeze({
    RES_LOAD_STARTED: 0,
    RES_LOAD_COMPLETED: 1,
    AICLIPSET_PLAY_PREPARE_STARTED: 2,
    AICLIPSET_PLAY_PREPARE_COMPLETED: 3,
    AICLIPSET_PRELOAD_STARTED: 4,
    AICLIPSET_PRELOAD_COMPLETED: 5,
    AICLIPSET_PRELOAD_FAILED: 6,
    AICLIPSET_PLAY_STARTED: 7,
    AICLIPSET_PLAY_COMPLETED: 8,
    AICLIPSET_PLAY_FAILED: 9,
    AI_CONNECTED: 10,
    AI_DISCONNECTED: 11,
    AICLIPSET_PLAY_BUFFERING: 12,
    AICLIPSET_RESTART_FROM_BUFFERING: 13,
    AIPLAYER_STATE_CHANGED: 14,
    AI_RECONNECT_ATTEMPT: 15,
    AI_RECONNECT_FAILED: 16,
    UNKNOWN: -1,
  });

  const AIPlayerState = Object.freeze({
    NONE: 0,
    INITIALIZE: 1,
    IDLE: 2,
    PLAY: 3,
    PAUSE: 4,
    RELEASE: 5,
  });

  let curAIState = AIPlayerState.NONE;
  AI_PLAYER.onAIPlayerEvent = function (aiEvent) {
    let typeName = "";
    switch (aiEvent.type) {
      case AIEventType.AIPLAYER_STATE_CHANGED:
        typeName = "AIPLAYER_STATE_CHANGED";

        let newAIState = AI_PLAYER.getState();
        if (curAIState == AIPlayerState.INITIALIZE && newAIState == AIPlayerState.IDLE) {
          console.log("AI initialization completed.");
        }
        curAIState = newAIState;
        break;
      case AIEventType.AI_CONNECTED:
        typeName = "AI_CONNECTED";
        break;
      case AIEventType.RES_LOAD_STARTED:
        typeName = "RES_LOAD_STARTED";
        break;
      case AIEventType.RES_LOAD_COMPLETED:
        typeName = "RES_LOAD_COMPLETED";
        break;
      case AIEventType.AICLIPSET_PLAY_PREPARE_STARTED:
        typeName = "AICLIPSET_PLAY_PREPARE_STARTED";
        // $('#AIPlayerStateText').text('AI started preparation to speak.');
        break;
      case AIEventType.AICLIPSET_PLAY_PREPARE_COMPLETED:
        typeName = "AICLIPSET_PLAY_PREPARE_COMPLETED";
        // $("#AIPlayerStateText").text("AI finished preparation to speak.");
        break;
      case AIEventType.AICLIPSET_PRELOAD_STARTED:
        typeName = "AICLIPSET_PRELOAD_STARTED";
        // $("#AIPlayerStateText").text("AI started preparation to preload.");
        break;
      case AIEventType.AICLIPSET_PRELOAD_COMPLETED:
        typeName = "AICLIPSET_PRELOAD_COMPLETED";
        // $("#AIPlayerStateText").text("AI finished preparation to preload.");
        break;
      case AIEventType.AICLIPSET_PLAY_STARTED:
        typeName = "AICLIPSET_PLAY_STARTED";
        // $("#AIPlayerStateText").text("AI started speaking.");
        break;
      case AIEventType.AICLIPSET_PLAY_COMPLETED:
        typeName = "AICLIPSET_PLAY_COMPLETED";
        //$("#AIPlayerStateText").text("AI finished speaking.");
        break;
      case AIEventType.AI_DISCONNECTED:
        typeName = "AI_DISCONNECTED";
        // $("#AIPlayerStateText").text("AI Disconnected. Please wait or reconnect");
        break;
      case AIEventType.AICLIPSET_PRELOAD_FAILED:
        typeName = "AICLIPSET_PRELOAD_FAILED";
        // $("#AIPlayerStateText").text("AI preload failed.");
        break;
      case AIEventType.AICLIPSET_PLAY_FAILED:
        typeName = "AICLIPSET_PLAY_FAILED";
        // $("#AIPlayerStateText").text("AI play failed.");
        break;
      case AIEventType.AICLIPSET_PLAY_BUFFERING:
        typeName = "AICLIPSET_PLAY_BUFFERING";
        // $("#AIPlayerStateText").text("AI is buffering.");
        break;
      case AIEventType.AICLIPSET_RESTART_FROM_BUFFERING:
        typeName = "AICLIPSET_RESTART_FROM_BUFFERING";
        // $("#AIPlayerStateText").text("AI is restarted from buffering.");
        break;
      case AIEventType.UNKNOWN:
        typeName = "UNKNOWN";
        break;
    }

    console.log("onAIPlayerEvent:", aiEvent.type, typeName, "clipSet:", aiEvent.clipSet);
  };

  AI_PLAYER.onAIPlayerLoadingProgressed = function (result) {
    console.log(`AI Resource Loading... ${result.loading || 0}%`);
  };
}

// =========================== AIPlayer Function ================================ //

function speak(text) {
  AI_PLAYER.send(text);
}

// =========================== ETC ================================ //

// sample Server request function
async function makeRequest(method, url, params) {
  const options = {
    method,
    headers: { "Content-Type": "application/json; charSet=utf-8" },
  };

  if (method === "POST") options.body = JSON.stringify(params || {});

  return fetch(url, options)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error("** An error occurred during the fetch", error);
      // showPop(
      //   "Generate Client Token Error",
      //   `no client token can be generated.`
      // );
      return undefined;
    });
}
```

<br/>

**6. Full Server Sample Source Code**

```javascript
// generateJWT.js(Server)

import jwt from "jsonwebtoken";

const userKey = "..."; // TODO: userKey input
const payload = {
  appId: "...", // TODO: appId input
  platform: "web",
};
const options = {
  header: { typ: "JWT", alg: "HS256" },
  expiresIn: 60 * 5, // expire time: 5 mins
};

function generateJWT(req, res) {
  try {
    const clientToken = jwt.sign(payload, userKey, options);

    res.json({ token: clientToken, appId: payload.appId });
  } catch (e) {
    console.log("jwt generate err ", e.name, e.message);
  }
}

// next.js
export default (req, res) => {
  if (req.method === "GET") return generateJWT(req, res);
};
```
