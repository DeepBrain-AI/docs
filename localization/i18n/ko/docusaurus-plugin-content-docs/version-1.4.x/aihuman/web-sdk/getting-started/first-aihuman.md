---
sidebar_position: 3
---

# 나의 AI Human 만들기

이 장에서는 신속하게 AIHuman(AIPlayer)를 셋업하고 기본 AI에게 한문장 발화까지 시키는 과정을 알아 봅니다. AIPlayer를 최초 셋업시에는 네트워크 상태에 따라 수분 정도의 로딩이 걸릴 수 있습니다. 이 로딩 과정은 진행율을 모니터링 할수 있습니다.

<img src="/img/aihuman/web/quick_start.png" />

<br/>
<br/>

**1. 웹 페이지에 SDK 및 AIPlayer를 추가합니다.**

```html
<script src="https://cdn-aihuman.deepbrainai.io/sdk/web/aiPlayer-1.4.1.min.js"></script>

<div id="AIPlayerWrapper"></div>
```

```javascript
const wrapper = document.getElementById("AIPlayerWrapper");
const AI_PLAYER = new AIPlayer(wrapper);
```

<br/>

**2. SDK 인증하기**

**2.1. SDK 웹사이트에 appId를 입력하고 userKey를 발급받기**

**[AI Human 웹사이트](https://www.aistudios.com/aihuman)**에서 계정을 생성하고 로그인 합니다.

- 우측 상단 > Login(Sign In) > Create account
- 로그인 이후에 [SDK](https://aihuman.aistudios.com/aihuman/sdk) 카테고리에서 프로젝트를 생성할 수 있습니다.
- [SDK](https://aihuman.aistudios.com/aihuman/sdk) 카테고리 접근이 불가하다면 [고객센터](https://www.aistudios.com/ko/company/contact)로 문의해 주세요.

<img src="/img/aihuman/web/project.png" />

**2.2. 당신의 서버에 ClientToken API를 생성하십시오.**

- 다음으로 인증을 위한 clientToken 생성 API를 만듭니다.
- clientToken 생성 api는 여러분의 서버에 구현되어야하며, 이를 통해 client는 필요할때 호출하여 사용합니다.
- 아래는 jsonwebtoken lib for JWT를 여러분의 서버에 설치하는 방법입니다.(Note: [JWT](https://jwt.io/))

```
npm install jsonwebtoken
```

- 아래는 node.js를 사용한 clientToken을 생성하는 방법입니다.

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

- generateJWT 함수(API)의 next.js routing입니다.

```javascript
// generateJWT.js(Server) append
export default (req, res) => {
  if (req.method === "GET") return generateJWT(req, res);

  // if (req.method === "POST") return generateJWT(req, res);
};
```

- 그리고 generateJWT function의 express 버전입니다.

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

**2.3. Client에서 Server의 generateJWT(requestClientToken)를 호출합니다.**

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

**2.4. generateToken 호출**

- `requestClientToken` 호출이 성공한 후 AIPlayer의 `generateToken` 함수(appId, clientToke 사용)를 호출합니다. 응답은 JSON이며 그 내용은 verifiedToken, tokenExpire 및 defaultAI 값입니다. 'generateToken'의 호출 성공은 인증이 완료되었음을 의미합니다. 더 자세한 설명은 [API](../apis/aiapi.md) 문서를 참조해주십시오.

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

**3. AIPlayer 초기화**

인증이 성공한 후에는 `init` 함수를 사용하여 AIPlayer를 초기화해야 합니다. 이때 기본AI로 설정할 수 있습니다. 다른 AI를 사용하고 싶다면, 당신은 `getAIList`를 통해 이용 가능한 AI의 목록을 얻을 수 있습니다. 자세한 설명은 [AIPlayer](../apis/aiplayer.md)를 참조해주십시오.

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

**4. AIPlayer의 콜백을 만들고 그 이벤트를 모니터링합니다**

아래와 같이 AIPlayer의 callback(Listener)을 설정할 수 있습니다. 그리고 리소스 로딩이 완료되면 'send'를 호출할 수 있습니다(AIEventType.RES_LOAD_COMPLETED).

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
