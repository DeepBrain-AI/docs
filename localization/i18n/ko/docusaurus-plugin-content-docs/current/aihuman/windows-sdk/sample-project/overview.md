---
sidebar_position: 1
---

# 개요

The WPF-based sample covered in this document is an example of using the AI Human SDK. Following this guide, you will be able to try out every functionalities in the AI Human SDK one-by-one through implementing the features in AI Human Sample Application. 

You can open AIHuman_WPF_Sample.sln from the sample received from the path where you received the document and run the Sample App below after building the solution.

:::info
1. Open the solution with AIHuman_WPF_Sample.sln double-click or IDE (Visual Studio).
2. Enter the appId and userKey prepared by [AIHuman Quick Start](#aihuman-quick-start) as the AIAPI.Instance.AuthStart function argument in the App.xaml.cs file.
3. Click [Build] - [Solution Build] on the top menu bar of IDE (Visual Studio) to perform the build.
4. Click [Debug] - [Start Without Debugging] on the top menu bar of IDE (Visual Studio) to launch the Sample App.
:::

<br/>

<img src="/img/aihuman/windows/SampleApp_main.png" />

**The SDK authentication is enabled automatically on this page**. When the screen appears, the authentication action is automatically called, so there is no need to take any other action. All you need to do is input the appId, userkey, uuid, and target platform obtained above. Once authenticated, authentication is maintained until the app is closed, so there is no need to authenticate again. If the menu still doesn't work, check if there is an error in the authentication function(AuthStart) callback. Most of the time, token refresh is the problem.

#### Menu on HomeView(HomeView.xaml)

Each menu is as follows.

- Quick Start: Quickly see AI Human in action (QuickStartView.xaml)
- AI Human Demo: An example of using AI Human SDK (DemoView.xaml)
- with Playchat & Azure STT: Conversational AI example using AI Human, Playchat, and Azure STT (PlaychatView.xaml)
- with Google Dialogflow: Conversational AI example using AI Human and Google Dialogflow (DialogFlowView.xaml)
- Exit: Exit the App (NavigationBar.xaml)
