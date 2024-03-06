---
sidebar_position: 1
---

# 개요

본 문서에서 다루는 샘플 프로젝트는 AI Human SDK 구현 가이드로 제공되며 WPF 기반의 Windows 응용 프로그램입니다. 문서와 샘플 프로젝트를 토대로 AI Human SDK의 모든 기능을 하나씩 구현해 볼 수 있습니다.

앞서 언급한 AI Human 웹사이트에서 다운로드 받은 Sample의 AIHuman_WPF_Sample.sln 솔루션 파일을 열고 아래와 같이 실행해 볼 수 있습니다.

:::info
1. AIHuman_WPF_Sample.sln 더블클릭 또는 IDE(Visual Studio)로 솔루션을 엽니다.
2. [나의 AI Human 만들기](../getting-started/first-aihuman)에서 사용한 appId와 userKey를 App.xaml.cs 파일의 AIAPI.Instance.Authenticate 함수 인자로 입력합니다.
3. IDE(Visual Studio)의 상단 메뉴바에서 [빌드] - [솔루션 빌드]를 클릭하여 빌드를 수행합니다.
4. IDE(Visual Studio)의 상단 메뉴바에서 [디버깅] - [디버깅 없이 시작]을 클릭하여 샘플 앱을 실행합니다.
:::

<br/>

<img src="/img/aihuman/windows/SampleApp_main.png" />

**샘플 프로젝트에서의 SDK 인증은 해당 페이지 초기화 시 자동으로 수행하게 됩니다**. 화면이 나타나면 App.xaml.cs 파일의 AIAPI.Instance.Authenticate함수가 자동으로 호출되므로 추가 인증을 수행할 필요는 없습니다. 위에서 언급한 appId, userKey는 SDK 최초 인증 시 앱이 종료될 때까지 유지되기 때문에 다시 인증할 필요는 없습니다. 만약 메뉴가 작동하지 않으면 인증(Authenticate)함수 콜백에 오류가 있는지 확인합니다. 오류가 있다면 대부분 appId, userKey, 토큰 새로 고침이 문제입니다. 인증 갱신을 위한 방법은 API 편람 혹은 샘플 프로젝트를 참고해 주세요.

#### HomeView(HomeView.xaml)의 메뉴

각 메뉴는 다음과 같습니다.

- AI Human QuickStart: 기본 AI 모델의 동작을 빠르게 확인합니다. (QuickStartView.xaml)
- AI Human Demo: 종합적인 AI Human SDK 사용 예제 입니다. (DemoView.xaml)
- with Playchat & Azure STT: AI Human(SDK)과 Playchat(ChatBot) 그리고 MS Azure Speech(STT)를 연동한 대화형 AI Human 구현 예제입니다. (PlaychatView.xaml)
- with Google Dialogflow: AI Human(SDK)과 Google Dialogflow(ChatBot)을 연동한 대화형 AI Human 구현 예제입니다. (DialogFlowView.xaml)
- Quit: 응용 프로그램을 종료합니다. (NavigationBar.xaml)
