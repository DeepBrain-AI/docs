---
displayed_sidebar: aifrontThirdPartySidebar
sidebar_position: 2
slug: /aifront/third-party-solutions/chatbot
---

# Chatbot

외부 챗봇을 연동하려면 우선 `init` 함수와 `sendMessage` 함수를 구현하고, 외부 챗봇에 질문을 보내고 답변을 받기 위한 api를 작성해야 합니다.

Google Dialogflow를 연동하기 위한 `chatbot/google.js` 파일을 예로 들겠습니다.

<br />

다음은 `GoogleDialogflow` 객체가 가지는 함수입니다.

```javascript
  // components/_common/chatbot/google.js

  init: function ({ config, language }) {
    this.config = { ...config };
    this.projectId = config?.project_id;
    this.languageCode = language;
  },
```
<br />

해당 함수는 `chatbotResources.initChatbot` 함수가 실행될 때 호출됩니다.
```javascript
  // components/_common/chatbotResources.js

  import GoogleDialogflow from './chatbot/google';

  switch (botType) {
    case 'google':
      GoogleDialogflow.init({
        config: botInfo?.key,
        language: projectData.projectInfo.defaultSetting.language,
      });
      break;
  }
```
`botType`은 `projectInfo.defaultSetting.chatbot.type` 값을 사용합니다.

`botType`에 따라 `init`할 챗봇이 정해지고 `projectInfo` 내의 `config` 정보와 함께 해당 챗봇을 `init` 합니다.

<br />

`chatbotResources.sendMessage` 함수가 호출될 때 역시 `botType`에 따라 해당 챗봇 객체의 함수가 호출됩니다.
```javascript
  // components/_common/chatbotResources.js

  switch (botType) {
    case 'google':
      GoogleDialogflow.sendMessage(message);
      break;
  }
```

<br />

`GoogleDialogflow` 객체 내에서는 사용자가 입력한 메세지를 전달 받아 `Dialogflow` 답변을 받기 위한 api를 호출한 뒤, 반환된 답변을 다시 `ChatbotResources.onMessage` 함수를 호출하여 전달합니다.

`ChatbotResources.onMessage`로 답변 텍스트가 전달되면 AI Human SDK로 전해져 AI Human이 답변 텍스트를 발화하게 됩니다.

```javascript
  // components/_common/chatbot/google.js

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
      ChatbotResources.onMessage({ text: returnMessage });
    } catch (err) {}
  }
```

`Dialogflow`로 질문을 전달하는 `api` 구현은 다음과 같습니다.
```javascript
// api/google/sendMessage.js
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

<br />

