---
sidebar_position: 5
---

# Google Dialogflow 연동

:::note Sample Project에서 아래 파일들을 참고하세요.

- DialogFlowView.xaml
- DialogFlowViewModel.cs

:::

이번 Demo는 AI Human + Google Dialogflow(챗봇)를 연동한 대화형 AI 서비스로써, 다른 Chatbot 등 기타 서비스와 AI Human이 함께 활용될 수 있다는 것을 보여주는 또하나의 예시입니다. (실제로 동작하는 것은 Google Dialogflow의 설정이 완료된 이후에 가능합니다. 이 장의 아래에서 설명합니다.)

<img src="/img/aihuman/windows/GoogleDialogflowDemo.png" />

### AI + Google Dialogflow 함께 사용하기

해당 Demo에서 말하는 대화형 AI 서비스를 사용해 보려면, 아래와 같이 일련의 과정이 필요합니다.

- Dialogflow Credential 파일 준비하기: https://cloud.google.com/dotnet/docs/reference/Google.Cloud.Dialogflow.V2/latest
  - https://cloud.google.com/docs/authentication/getting-started
  - 위 공식 사이트에서 언급하고 있듯이 환경변수에 Credential Json 파일의 경로를 등록해 주어야 합니다.

DialogFlowViewModel.cs 파일의 class 정의 상단부에 선언된 DF_PROJECT_ID 변수에 Credential Json파일 > project_id 값을 지정합니다.

`Google.Cloud.Dialogflow.V2.SessionsClient.Create()`를 이용하여 Chatbot client를 생성할 수 있습니다. 이는 `SessionName.FromProjectSession(DF_PROJECT_ID, DF_SESSION_ID)`를 통해 session을 생성하고 client.DetectIntent 혹은 client.DetectIntentAsync 함수 호출 시 사용하게 됩니다.

자세한 내용은 해당 Sample의 Solution 파일을 열어 DialogFlowView.xaml, DialogFlowViewModel.cs 파일을 참고하시기 바랍니다.
