---
displayed_sidebar: aifrontThirdPartySidebar
sidebar_position: 2
slug: /aifront/third-party-solutions/chatbot
---

# Chatbot

## 솔루션 메서드 정의하기

외부 챗봇 연동을 위해 `chatbot` 폴더 하위에 파일을 생성합니다. <br />
아래는 Google Dialogflow를 연동하기 위한 `chatbot/google.js` 파일입니다.

![chatbot-solution](/img/aifront/chatbot-solution.png)


해당 파일 내에는 `chatbotResources.js`에 정의된 `initChatbot`과 `sendMessage` 함수가 실행될 때 호출될 메서드가 정의되어 있어야 합니다.

`google.js` 파일의 경우 다음과 같이 `init` 메서드와 `sendMessage` 메서드가 정의되어 있습니다.

```javascript
  init: function ({ config, language }) {
    this.config = { ...config };
    this.projectId = config?.project_id;
    this.languageCode = language;
  }
```

`init` 함수가 실행될 경우 프로젝트의 설정값들을 넘겨 받아 `GoogleDialogflow` 객체의 프로퍼티로 저장합니다. <br />
저장된 프로퍼티 값은 아래 `sendMessage` 함수가 호출될 때 필요한 값들입니다.

<br />


```javascript
  sendMessage: async function (text) {
    if (!this.config || !this.projectId) return;
    try {
      const { data } = await axios.post('/api/google/sendMessage', {
        config: this.config,
        projectId: this.projectId,
        sessionId: this.sessionId,
        languageCode: this.languageCode,
        contexts: this.contexts,
        text,
      });
      const { contexts, returnMessage } = data;
      this.contexts = contexts;
      ChatbotResources.onMessage({ text: returnMessage }); // 필수적으로 호출해야 하는 부분
    } catch (err) {
      console.log('sendMessage error', err);
      ChatbotResources.onMessage({ text: 'Error occured.' });
    }
  }
```
`sendMessage` 함수는 `/api/google/sendMessage`라는 api를 호출하고 있는데, 해당 api는 외부 챗봇 솔루션을 호출해서 질문을 넘기고 답변을 받는 과정을 처리해줍니다. 추가하려는 솔루션에 따라 필요한 값을 적절히 넘겨주고, 넘겨받은 값을 통해 외부 솔루션을 사용하는 api를 작성해주면 됩니다.

api를 호출해 질문에 대한 답변을 넘겨받았다면 해당 메세지를 `ChatbotResources.onMessage` 함수를 호출해 넘겨줘야 합니다. 정상적으로 텍스트가 전달된 경우 AI Human이 해당 텍스트를 발화합니다.


:::info
`onMessage` 함수에 전달할 수 있는 `json` 정보는 다음을 참고하세요.

  ```typescript
    interface MessageType {
      buttons?: ButtonType[];
      image?: ImageType;
      contentTitle?: String; // image 값이 있을 경우 이미지와 함께 표시될 텍스트
      iframe?: IframeType;
      rawText?: String; // HTML 형식으로 답변 표현이 필요할 경우 사용
      text: String; // AI가 발화할 텍스트
    }
  ```

  ```javascript
    interface ButtonType {
      label: String; // 버튼에 표시될 텍스트, 버튼 선택 시 챗봇으로 해당 텍스트 전달 (sendMessage)
    }

    interface ImageType {
      url: String; // 이미지 소스 URL
    }

    interface IframeType {
      videoId: String; // YouTube 비디오 ID
    }

  ```
  
:::


## API 작성하기

추가하려는 솔루션의 개발자 문서를 참고해 질문을 보내고 답변을 받는 api를 작성해줍니다. <br />
아래는 위에서 호출한 api에 해당하는 `/api/google/sendMessage.js` 파일입니다.

```javascript
import dialogflow from '@google-cloud/dialogflow';

const handler = async (req, res) => {
  const { method } = req;

  if (method === 'POST') {
    try {
      const { config, projectId, sessionId, languageCode, contexts, text } =
        req.body;

      const sessionClient = new dialogflow.SessionsClient({
        credentials: config,
      });
      const sessionPath = sessionClient.projectAgentSessionPath(
        projectId,
        sessionId
      );
      const request = {
        session: sessionPath,
        queryInput: {
          text: {
            text,
            languageCode,
          },
        },
      };
      if (contexts.length) {
        request.queryParams = {
          contexts,
        };
      }
      const response = await sessionClient.detectIntent(request);
      const intentResponse = response[0];
      return res.status(200).json({
        contexts: intentResponse.queryResult.outputContexts,
        returnMessage: intentResponse.queryResult.fulfillmentText,
      });
    } catch (err) {
      console.log('Error occured while sending message...\n', err);
      return res.status(500).end();
    }
  } else {
    return res.status(405).end();
  }
};

export default handler;
```

## 리소스 파일 수정하기

솔루션 메서드 정의가 완료되고 필요한 api 작성까지 마쳤다면 `chatbotResources.js` 파일에 작성한 솔루션을 추가해야 합니다. <br />
`initChatbot`과 `sendMessage` 함수를 수정해봅시다.


### initChatbot

화면이 처음 로딩될 때 `initChatbot` 함수가 호출되고 `botType`에 따라 사용될 챗봇 솔루션이 정해집니다. 새롭게 추가한 솔루션을 `case`로 추가하고 메서드에 정의한 형식에 맞게 `botInfo`의 정보들을 넘겨줍니다.

```javascript
  initChatbot: function (botType, botInfo) {
    this.botType = botType;
    
    switch (botType) {
      // ...
      case 'google':
        GoogleDialogflow.init({
          config: botInfo?.key,
          language: projectData.projectInfo.defaultSetting.language,
        });
        break;
    }
  }
```

| 파라미터 | 설명                       |
|----------|----------------------------|
| botType  | `projectInfo.chatbot.type` |
| botInfo  | `projectInfo.chatbot.info` |

<br />

### sendMessage

사용자가 채팅이나 발화를 통해 질문을 입력한 경우 `sendMessage` 함수가 호출됩니다. 이때도 마찬가지로 `botType`에 따라 해당 챗봇 객체에서 메세지를 처리하는 함수를 호출해줍니다.


```javascript
  sendMessage: async function (message, type) {
      // ...
      case 'google':
        GoogleDialogflow.sendMessage(message);
      break;
  }
```

챗봇의 메서드 내에서 `ChatbotResources.onMessage`가 정상적으로 호출되어 AI Human이 답변 텍스트를 발화한 경우 챗봇 솔루션이 잘 연동된 것입니다.