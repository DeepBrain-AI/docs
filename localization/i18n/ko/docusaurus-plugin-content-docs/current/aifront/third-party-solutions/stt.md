---
displayed_sidebar: aifrontThirdPartySidebar
sidebar_position: 3
slug: /aifront/third-party-solutions/stt
---

# STT

외부 STT 연동을 위해서는 `sttResources` 객체의 `startRecording` 함수가 호출될 때 실행할 함수를 구현해야 합니다.

Microsoft Azure STT를 예시로 들겠습니다.

```javascript
  // components/_common/stt/Azure.js

  import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

  startRecording: function () {
    const projectContext = ProjectContext.getProjectContext();
    let config = projectContext.projectInfo.stt.info;
    let SpeechSDK = sdk;

    ...


    let audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
    let recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);
    const stopRec = () => {
      if (recognizer) recognizer.close();
      recognizer = undefined;
    };

    recognizer.speechStartDetected = function (s, e) {
      InputStateContext.setInputStateContext('guest');
      InputStateContext.render();
    };
    recognizer.canceled = function (s, e) {
      var str = '(cancel) Reason: ' + sdk.CancellationReason[e.reason];
      if (e.reason === sdk.CancellationReason.Error) {
        str += ': ' + e.errorDetails;
      }
      InputStateContext.setInputStateContext('wait');
      InputStateContext.render();
    };

    ...

  }

```

`config` 정보를 `ProjectContext`를 통해 직접 가져오기 때문에 `init` 함수를 생략하고 `startRecording` 함수만 구현되어 있습니다.

사용자의 발화가 인식되고 있을 때 `InputStateContext`를 적절하게 변경해주세요.

<br />

발화 인식이 실패했을 경우 `sttResources.failSTT`를 호출하고, 성공했을 경우에는 연결된 챗봇으로 질문을 보내기 위해 다음과 같이 `ChatbotResources.sendMessage` 함수를 호출해주세요.

화면에 인식된 텍스트를 나타내기 위해 `DisplayTextContext` 값도 변경해주세요.

```javascript
  if (!text) {
    sttResources.failSTT(); // 실패한 경우
  } else {
    DisplayTextContext.setDisplayTextContext(text, duration, type); // 인식된 텍스트 표출
    DisplayTextContext.render();
    ChatbotResources.sendMessage(text); // 성공한 경우
  }
  stopRec();
```