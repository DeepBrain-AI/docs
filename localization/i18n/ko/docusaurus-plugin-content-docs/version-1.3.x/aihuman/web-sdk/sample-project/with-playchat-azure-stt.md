---
sidebar_position: 4
---

# Google STT와 PlayChat 연동

:::note related files

- demo2.html

:::

[PlayChat](https://aichat.deepbrainai.io/)은 DeepBrain AI의 ChatBot 솔루션입니다.

AIPlayer + PlayChat(Webview based Chatbot) is a Conversational AI service provided by Deepbrain AI. In this menu, you will be able to have conversation with the AI on screen.
Playchat is a chatbot service in which users can have conversation with a bot through text messages.
In this Demo, Playchat is fully integrated with the AI Models and the AI will speak out sentences coming from the chatbot. In other words, users will be able to have conversation with the AI
through both text and speech.

<img src="/img/aihuman/web/stt_demo_02.png" />

## 1. Chatbot (Wrapper Class in PlayChat) settings

**1.1. Include the chatbot.js file in a web page**

```html
<script src="https://cdn-aihuman.deepbrainai.io/sdk/web/chatbot.js"></script>
```

**1.2. Creates an object CHATBOT of the Deepbrain Chatbot**

```javascript
const CHATBOT = new DeepbrainChatbot();
```

**1.3. Implementing the CHATBOT callback**

```javascript
function initChatBotEvent() {
  CHATBOT.onChatbotMessage = async (json) => {
    // ...

    await speak(json?.text); // Making CHATBOT speak to AI about the text it receives
  };
  CHATBOT.onChatbotStateChanged = (json) => {
    if (json?.kind == "postUserInput" && json?.state == "complete") {
      onUserInput = true;
    }

    if (json?.kind == "dialog" && json?.state == "complete") {
      // ... 
      onUserInput = false;
      onEnd = true;
    }
  };
  CHATBOT.onChatbotError = (json) => {
    showPop("IChatbot Error", `[${err.errorCode}] ${err.error}\n${err.description}\n${err.detail || ""}`);
  };
}
```

**1.4. Start CHATBOT**

```javascript
function startChat(obj) {
  // ...

  CHATBOT.init({ ChatbotSettings: { botId: DATA.botId } });
}
```

**1.5. Send Message to Chatbot and Release**

```javascript
function sendMessage(message) {
  //...

  await refreshTokenIFExpired();

  CHATBOT.send({ cmd: "postUserInput", args: { text: message } });
}

function stop() {
  // ...

  AI_PLAYER.stopSpeak();
}
```

## 2. Set up Google STT

- And when talking to AI, voice recognition (STT) uses Google STT, and the client side communicates with the server side through the websocket. The relevant settings are as follows.

**2.1. Server socket source**

```javascript
const speech = require("@google-cloud/speech");
const speechClient = new speech.SpeechClient(); // Creates a client

// ...

/*****
 * google-stt start
 * ******/
let recognizeStream = null;
// =========================== GOOGLE CLOUD SETTINGS ================================ //

// The encoding of the audio file, e.g. 'LINEAR16'
// The sample rate of the audio file in hertz, e.g. 16000
// The BCP-47 language code to use, e.g. 'en-US'
const encoding = "LINEAR16";
const sampleRateHertz = 16000;
let languageCode = "en-US"; //en-US, ko-KR

const request = {
  config: {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
    profanityFilter: false,
    enableWordTimeOffsets: true,
  },
  interimResults: true, // If you want interim results, set this to true
};

socket.on("startGoogleCloudStream", function (data) {
  // start recognition
  if (data.phrases && data.phrases.length > 0) request.config.speechContexts = [{ phrases: data.phrases }];
  else delete request.config.speechContexts;

  startRecognitionStream(this, data);
});

socket.on("setRecognizeLanguage", function (language) {
  // set the lang
  languageCode = language;
  request.config.languageCode = languageCode;
});

socket.on("endGoogleCloudStream", function (data) {
  // end recognition
  stopRecognitionStream();
});

socket.on("binaryData", function (data) {
  //log binary data
  if (recognizeStream !== null) {
    recognizeStream.write(data);
  }
});

function startRecognitionStream(socket, data) {
  recognizeStream = speechClient
    .streamingRecognize(request)
    .on("error", console.error)
    .on("data", (data) => {
      socket.emit("speechData", data); // send to client

      // if end of speaking, let's restart stream
      // this is a small hack. After 65 seconds of silence, the stream will still throw an error for speech length limit
      if (data.results[0] && data.results[0].isFinal) {
        stopRecognitionStream();
        startRecognitionStream(socket);
      }
    });
}

function stopRecognitionStream() {
  if (recognizeStream) {
    recognizeStream.end();
  }
  recognizeStream = null;
}
/*****
 * google-stt end
 * ******/
```

**2.2. Client socket source**

- Google STT socket client setup

```javascript
  // ...
  
  const socket = io("socket server address",{ transports: ["websocket"] });

  // ...

  function initSocketEvent() {
    socket.on("connect", function (data) {});

    socket.on("speechData", function (data) {
      const dataFinal = undefined || data.results[0].isFinal;

      if (dataFinal === false) {
        if (removeLastSentence) googleSttText = "";
        removeLastSentence = true;
      } else if (dataFinal === true && isFinal) {
        isFinal = false;
    
        googleSttText = "";
        googleSttText = capitalize(addTimeSettingsFinal(data));
        
        removeLastSentence = false;
        stopRecording(true);
      }
    });
  }
```

- Start, Stop speech recognition

```javascript
  function startRecording(_stringArray) {
    // start recognition
    socket.emit("startGoogleCloudStream", { phrases: _stringArray || [] }); //init socket Google Speech Connection
    streamStreaming = true;

    // Web API init
    context = new (window.AudioContext || window.webkitAudioContext)({
      // if Non-interactive, use 'playback' or 'balanced' // https://developer.mozilla.org/en-US/docs/Web/API/AudioContextLatencyCategory
      latencyHint: "interactive",
    });
    processor = context.createScriptProcessor(bufferSize, 1, 1);
    processor.connect(context.destination);
    context.resume();

    const handleSuccess = function (stream) {
      globalStream = stream;
      input = context.createMediaStreamSource(stream);
      input.connect(processor);
      processor.onaudioprocess = function (e) {
        microphoneProcess(e);
      };
    };

    // Older browsers might not implement mediaDevices at all, so we set an empty object first
    if (navigator.mediaDevices === undefined) navigator.mediaDevices = {};

    // Some browsers partially implement mediaDevices. We can't just assign an object
    // with getUserMedia as it would overwrite existing properties.
    // Here, we will just add the getUserMedia property if it's missing.
    if (navigator.mediaDevices.getUserMedia === undefined) {
      navigator.mediaDevices.getUserMedia = function (constraints) {
        // First get ahold of the legacy getUserMedia, if present
        const getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

        // Some browsers just don't implement it - return a rejected promise with an error
        // to keep a consistent interface
        if (!getUserMedia) return Promise.reject(new Error("getUserMedia is not implemented in this browser"));

        // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
        return new Promise(function (resolve, reject) {
          getUserMedia.call(navigator, constraints, resolve, reject);
        });
      };
    }

    navigator.mediaDevices.getUserMedia(constraints)
      .then(handleSuccess)
      .catch(function (err) {
        console.log("media devices err", err);
      });
  }

  function stopRecording(hasUserInput) {
    // hasUserInput is true: run userInput, false: end recognition
    if (!streamStreaming) return;
    streamStreaming = false;

    // end recognition
    if (socket) socket.emit("endGoogleCloudStream", "");

    const track = globalStream?.getTracks() ? globalStream.getTracks()[0] : false;
    if (track) track.stop();

    if (input && processor) input.disconnect(processor);
    if (processor && context.destination) processor.disconnect(context.destination);
    if (context) {
      context.close().then(function () {
        input = null;
        processor = null;
        context = null;
      });
    }

    const userVoiceInput = googleSttText?.trim();

    // ...

    if (hasUserInput) sendMessage(userVoiceInput);
    else {
      // ...
    }
  }

  function microphoneProcess(e) {
    const left = e.inputBuffer.getChannelData(0);
    const left16 = downsampleBuffer(left, 44100, 16000);

    socket.emit("binaryData", left16);
  }

  function capitalize(s) {
    if (s.length < 1) return s;

    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  function downsampleBuffer(buffer, sampleRate, outSampleRate) {
    if (outSampleRate == sampleRate) return buffer;
    if (outSampleRate > sampleRate) throw "downsampling rate show be smaller than original sample rate";

    const sampleRateRatio = sampleRate / outSampleRate;
    const newLength = Math.round(buffer.length / sampleRateRatio);
    const result = new Int16Array(newLength);
    let offsetResult = 0;
    let offsetBuffer = 0;

    while (offsetResult < result.length) {
      let nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);
      let accum = 0,
        count = 0;
      for (let i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
        accum += buffer[i];
        count++;
      }

      result[offsetResult] = Math.min(1, accum / count) * 0x7fff;
      offsetResult++;
      offsetBuffer = nextOffsetBuffer;
    }

    return result.buffer;
  }

  function addTimeSettingsFinal(speechData) {
    return speechData.results[0].alternatives[0].transcript;
  }
```
