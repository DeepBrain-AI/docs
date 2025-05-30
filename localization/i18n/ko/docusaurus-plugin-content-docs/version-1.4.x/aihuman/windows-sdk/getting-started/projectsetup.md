---
sidebar_position: 2
---

# 프로젝트 셋업하기

이번 장에서는 AI Human SDK 구동을 위한 인증 절차에 필요한 userKey, App ID 등을 생성하고 설정하는 방법에 대해 알아봅니다.

## 1. 계정 생성하기

**[AI Human 웹사이트](https://aihuman.aistudios.com/)**에서 계정을 생성합니다.

- 우측 상단 > Sign In > Create an account


<br/>

### 2. My Workspace에 Project 추가하기

**[My workspace](https://aihuman.aistudios.com//aihuman/sdk)**에서 Project를 만들고, Windows App ID 부분에 SDK를 사용하는 Windows Application 명을 입력하고 확인을 클릭합니다. 해당 App ID에서 사용할 수 있는 User Key가 발급됩니다.

<img src="/img/aihuman/windows/SDK_WebPage_UserKey.png" />

위에 서 준비한 App ID와 User Key를 각각 Authenticate 함수의 첫번째, 두번째 인자로 입력하고 인증 과정을 수행합니다. 세번째 인자에 등록한 콜백을 통해 결과를 받아 볼 수 있습니다.

자세한 사항은 API 편람 혹은 Sample Project 내용을 참고하세요.

:::info 정보

- App ID는 해당 프로젝트에서 유일한(Unique) 값이어야 합니다. (예 "com.example.project.appname")
- User Key는 AI Human 웹사이트에서 프로젝트를 생성하고 App ID를 입력하면 발급받을 수 있습니다.
:::

<br/>

### 3. Visual Studio에서 새 프로젝트 생성하기

Visual Studio에서 솔루션 및 프로젝트를 생성하고 AI Human SDK를 사용합니다.

#### : Create New Project > WPF Application > Target Framework > .NET 5.0 (혹은 .NET Core 3.1 이상의 WPF 개발 가능 Target)

#### 여기서는 기본 프로젝트명인 WpfApp1를 사용하겠습니다.

### 요구사항

#### AIHuman.SDK.Core

- [.NET Standard 2.0](https://learn.microsoft.com/en-us/dotnet/standard/net-standard?tabs=net-standard-2-0)

#### AIHuman.SDK.WPF

- [.NET Core 3.1](https://dotnet.microsoft.com/en-us/download/dotnet/3.1)

AIHuman.SDK.WPF.dll을 사용하여 Application을 개발하거나 실행하려면 .NET Core 3.1 혹은 그 이상 버전을 설치해야 합니다.

AIHuman.SDK.Core.dll만을 사용할 수도 있습니다. AIHuman.SDK.Core.dll를 이용하여 .NET Standard 2.0을 지원하는 환경에서 WPF 이외의 Target Framework 혹은 UI 개발할 수 있습니다.
이 경우 View(UserControl 등)를 직접 구현해야 합니다. 개발 난이도가 높아질 수 있습니다.

:::info 정보

- WPF를 Target으로 개발하는 경우: AIHuman.SDK.Core와 AIHuman.SDK.WPF 참조 필요
- .NET Standard 2.0을 지원하는 환경에서 다른 UI Framework 등을 사용하는 경우: AIHuman.SDK.Core만 참조 후 View 구현
:::

### 라이브러리 종속성 안내

SDK를 포함한 아래의 어셈블리들을 프로젝트에 참조 추가하거나, Nuget을 이용해 아래 패키지들을 설치해야 합니다.

#### 어셈블리

- AIHuman.SDK.Core.dll (1.4.2)
- AIHuman.SDK.WPF.dll (1.4.2)
- JWT.dll (9.0.3)
- Newtonsoft.Json.dll (13.0.2)
- SocketIOClient.dll (3.0.3)
- SocketIOClient.Newtonsoft.Json.dll (3.0.0)

#### 패키지

- [JWT](https://github.com/jwt-dotnet/jwt) (9.0.3)
- [Newtonsoft.Json](https://www.newtonsoft.com/json) (13.0.2)
- [SocketIOClient](https://github.com/doghappy/socket.io-client-csharp) (3.0.3)

## 4. 프로젝트 셋업하기

AIHuman.SDK.Core.dll 참조 등 프로젝트의 초기 설정을 수행합니다.

#### 4.1. AI Human 웹사이트에서 Windows용 SDK를 다운로드 받습니다.

#### 4.2. 앞서 만든 프로젝트 경로에 다운받은 SDK 및 관련 파일들을 위치시킵니다.

#### 4.3. 솔루션 탐색기에서 프로젝트 > 우클릭 > 추가 > 새폴더 를 생성하고 적당한 이름을 부여합니다.

생성한 폴더 > 우클릭 > 추가 > 기존항목을 통해 솔루션에서 참조할 라이브러리들을 구성할 수 있습니다.

:::info 주의
스크린샷과 실제 제공되는 어셈블리들은 상이할 수 있습니다. 다운로드한 SDK 압축파일의 README.md 파일을 참고해 주세요.
:::

<img src="/img/aihuman/windows/NewProject_Add_Sdk.png" />

#### 4.4. 솔루션 항목에 다운로드 받은 AIHuman SDK 구동에 필요한 라이브러리들을 추가합니다.

솔루션 탐색기에서 상단의 프로젝트를 우클릭 > 추가 > 프로젝트 참조 > 참조 관리자 > 찾아보기 > AIHuman.SDK.Core.dll과 Newtonsoft.Json.dll 등을 추가합니다. 프로젝트 트리의 종속성 > 어셈블리에 참조가 추가된 것을 확인할 수 있습니다.

(다운로드 받은 SDK와 함께 포함되어 있는 라이브러리들을 모두 추가하면 됩니다.)

<img src="/img/aihuman/windows/NewProject_Add_Ref.png" />

<img src="/img/aihuman/windows/NewProject_Init.png" />

<br/>
