---
sidebar_position: 3
---

# Own your first AI Human

In this chapter, we will quickly look at AIHuman(AIPlayer) setup process and make the default AI say a sentence. When running AIPlayer for the first time, it may take several minutes to load resources depending on the network condition. The progress of this loading process can be monitored.

<img src="/img/aihuman/web/quick_start.png" />

<br/>
<br/>

**1. Include the SDK and Ready the AIPlayer in the web page**

```html
<script src="https://cdn-aihuman.deepbrainai.io/sdk/web/aiPlayer-1.4.1.min.js"></script>

<div id="AIPlayerWrapper"></div>
```

```javascript
const wrapper = document.getElementById("AIPlayerWrapper");
const AI_PLAYER = new AIPlayer(wrapper);
```

<br/>


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

const jwt = require("jsonwebtoken");

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

- After the `requestClientToken` call is succeeded, then call AIPlayer's `generateToken` function with appId and clientToken. It responds with JSON containing information such as verifiedToken, tokenExpire, and defaultAI. The `generateToken` call succeeds means the authication is completed. For more info, refer to [API](../apis/aiapi.md)section.

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
  zIndex: 0,
  size: 1.0,
  left: 0,
  top: 0,
  speed: 1.0,
});
```

<br/>

**4. Let's make AIPlayer's callback and monitor the event of AIPlayer**

You can set AIPlayer's listener for AI events like below. And notice that you can call `send` function when resource-loading is completed(AIEventType.RES_LOAD_COMPLETED).

```javascript
function initAIPlayerEvent() {
  AI_PLAYER.onAIPlayerEvent = function (aiEvent) {
    switch (aiEvent.type) {
      //...
      case AIEventType.RES_LOAD_COMPLETED:
        //AI_PLAYER.send({text:"Nice to meet you."})
        document.getElementById("AIPlayerTexts").style.display = "grid";
        break;
    }
  };
}
```

<br/>

**5. Full Client Sample Source Code**

```html
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
  </style>
  <body style="height:100%">
    <div style="display: none; width: fit-content;" id="AIPlayerTexts">
      <button onclick="speak(this.innerHTML)">How are you?</button>
      <button onclick="speak(this.innerHTML)">Nice to see you!</button>
    </div>
    <div id="AIPlayerWrapper"></div>
  </body>

  <script src="https://cdn-aihuman.deepbrainai.io/sdk/web/aiPlayer-1.4.1.min.js"></script>
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

async function generateClientToken() {
  const result = await makeRequest("GET", "..."); // TODO: Server generateJWT request address input

  // if Success
  DATA.appId = result.appId;
  DATA.clientToken = result.token;
  // ...
}

async function generateVerifiedToken() {
  const result = await AI_PLAYER.generateToken({ appId: DATA.appId, token: DATA.clientToken });
  if (result?.succeed) {
    DATA.verifiedToken = result.token;
    DATA.tokenExpire = result.tokenExpire;
    DATA.defaultAI = result.defaultAI;
  }
}

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
  AIPLAYER_STATE_CHANGED: 14,
  UNKNOWN: -1,
});

function initAIPlayerEvent() {
  AI_PLAYER.onAIPlayerEvent = function (aiEvent) {
    switch (aiEvent.type) {
      case AIEventType.RES_LOAD_COMPLETED:
        //AI_PLAYER.send({text:"Nice to meet you."})
        document.getElementById("AIPlayerTexts").style.display = "grid";
        break;
    }
  };
}

function speak(text) {
  AI_PLAYER.send(text);
}

// sample Server request function
async function makeRequest(method, url, params) {
  const options = { method, headers: { "Content-Type": "application/json; charSet=utf-8" } };

  if (method === "POST") options.body = JSON.stringify(params || {});

  return fetch(url, options)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error("** An error occurred during the fetch", error);
      showPop("Generate Client Token Error", `no client token can be generated.`);
      return undefined;
    });
}
```

<br/>

**6. Full Server Sample Source Code**

```javascript
// generateJWT.js(Server)

const jwt = require("jsonwebtoken");

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
