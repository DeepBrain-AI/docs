---
sidebar_position: 5
---

# Google Dialogflow 연동

:::note related files

- DialogFlowView.xaml
- DialogFlowViewModel.cs

:::

This demo is a conversational AI service using AI Human and Google Dialogflow, and it is another example that shows that AI Human can be used together with other services such as Chatbot. (Actual operation is possible after Google Dialogflow is set up. It is explained below in this chapter.)

<img src="/img/aihuman/windows/GoogleDialogflowDemo.png" />

### Using AI Human and Google Chatbot

If you want to use the conversational AI service mentioned in the demo, you need to prepare as follows.

- Preparing the Dialogflow Credential File: https://cloud.google.com/dotnet/docs/reference/Google.Cloud.Dialogflow.V2/latest
  - https://cloud.google.com/docs/authentication/getting-started
  - As mentioned in the above official site, the path of the Credential Json file must be registered in the environment variable.

Assign the Credential Json file > project_id value to the DF_PROJECT_ID variable declared at the top of the class definition of the DialogFlowViewModel.cs file.

You can create a Chatbot client using Google.Cloud.Dialogflow.V2.SessionsClient.Create(). Create a session through SessionName.FromProjectSession(DF_PROJECT_ID, DF_SESSION_ID) and use it when calling client.DetectIntent or client.DetectIntentAsync.

For details, open the solution file of the sample and refer to the DialogFlowView.xaml and DialogFlowViewModel.cs files.
