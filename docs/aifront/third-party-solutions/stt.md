---
displayed_sidebar: aifrontThirdPartySidebar
sidebar_position: 3
slug: /aifront/third-party-solutions/stt
---

# STT

## 솔루션 메서드 정의하기

외부 STT 연동을 위해 `stt` 폴더 하위에 파일을 생성합니다. <br />
아래는 Microsoft Azure STT를 연동하기 위한 `stt/Azure.js` 파일입니다.

![stt-solution](/img/aifront/stt-solution.png)

해당 파일 내에는 `sttResources.js`에 정의된 `startRecording` 함수가 실행될 때 호출될 메서드가 정의되어 있어야 합니다. 필요에 따라 `initSTT` 함수가 실행될 때 호출될 메서드를 추가로 정의해야 할 수도 있습니다.

:::caution

발화 인식을 시작하는 메서드는 `startRecording`이라는 변수명으로 지정해야 합니다.

:::

<br />

`Azure.js` 파일의 경우 다음과 같이 `startRecording` 메서드가 정의되어 있습니다. 여기에서는 `startRecording` 함수가 실행될 때마다 프로젝트 정보를 가져와 `config`를 세팅해주고 있는데, 이와 같은 초기 설정의 경우 연동하려는 솔루션에 따라 `initChatbot` 메서드로 분리할 수 있습니다.

발화 인식이 실패했을 경우 `sttResources.failSTT`를 호출하고, 성공했을 경우에는 연결된 챗봇으로 질문을 보내기 위해 `ChatbotResources.sendMessage` 함수를 호출해주세요.

```javascript
  startRecording: function () {
    // <-- config에 대한 부분
    const projectContext = ProjectContext.getProjectContext();
    let config = projectContext.projectInfo.stt.info;
    let SpeechSDK = sdk;
    if (!config.subscriptionKey) {
      console.log('STT ERROR: no subscriptionKey');
      InputStateContext.setInputStateContext('wait');
      InputStateContext.render();
    }
    if (!config.region) {
      console.log('STT ERROR: no Region');
      InputStateContext.setInputStateContext('wait');
      InputStateContext.render();
    }
    let speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
      config.subscriptionKey,
      config.region
    );
    speechConfig.speechRecognitionLanguage = config.language;
    if (config.endpoint) speechConfig.endpointId = config.endpoint;

    let audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
    let recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);
    // config에 대한 부분 -->

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
      console.log(str);
      InputStateContext.setInputStateContext('wait');
      InputStateContext.render();
    };

    recognizer.recognizeOnceAsync(
      function (result) {
        if (NowStepContext.getNowStepContext() !== 'stt') {
          stopRec();
          return;
        }
        console.log('input text', result.privText);
        let text = result.privText;
        let duration = result.privDuration / 10000;
        let type = 'guest';

        if (!text) {
          sttResources.failSTT(); // 실패한 경우
        } else {
          DisplayTextContext.setDisplayTextContext(text, duration, type);
          DisplayTextContext.render(); // 화면에 인식된 텍스트 표출
          ChatbotResources.sendMessage(text); // 성공한 경우 챗봇으로 인식된 메세지 전달
        }
        stopRec();
      },
      function (err) {
        console.log(err);
        stopRec();
        InputStateContext.setInputStateContext('wait');
        InputStateContext.render();
      }
    );
  }
```

:::info

상황에 따라 여러 `Context`들을 적절하게 변경해주세요.

| Context명          | 역할                                 |
|--------------------|--------------------------------------|
| DisplayTextContext | 인식된 텍스트를 화면에 표출          |
| InputStateContext  | `wait`, `ai`, `guest`                |
| NowStepContext     | `ai`, `chatbot`, `stt`, `disconnect` |

:::

## 리소스 파일 수정하기

솔루션 메서드 정의가 완료되었다면 `sttResources.js` 파일에 작성한 솔루션을 추가해야 합니다.

### initSTT

화면이 처음 로딩될 때 `initSTT` 함수가 호출되고 `sttType`에 따라 사용될 STT 솔루션이 정해집니다. 새롭게 추가한 솔루션을 추가하고 `config` 세팅 등이 필요한 경우 `sttInfo` 값을 전달해줍니다.

```javascript
  initSTT: function (sttType, sttInfo) {
    if (sttType === 'azure') {
      this.stt = AzureSTT;
    } else if (sttType === 'kt') {
      this.stt = GenieSTT;
      this.stt.setConfig(sttInfo);
    } else {
      this.stt = AzureSTT;
    }
  }
```

| 파라미터 | 설명                   |
|----------|------------------------|
| sttType  | `projectInfo.stt.type` |
| sttInfo  | `projectInfo.stt.info` |

<br />

`initSTT`가 정상적으로 실행된 경우 `sttResources.startRecording` 함수가 호출될 때 연동한 STT 솔루션의 `startRecording` 함수가 호출됩니다.