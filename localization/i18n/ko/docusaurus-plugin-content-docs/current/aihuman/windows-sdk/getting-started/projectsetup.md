---
sidebar_position: 2
---

# 프로젝트 셋업하기

이번 장에서는 AI Human SDK 구동을 위한 인증 절차에 필요한 User Key, App ID 등을 생성하고 설정하는 방법에 대해 알아봅니다.

## 1. 계정 생성하기
**[AI Human 웹사이트](https://aihuman.deepbrain.io/)**에서 계정을 생성합니다.
- 우측 상단 > Sign In > Create an account

## 2. My workspace에 Project 추가하기
**[My workspace](https://aihuman.deepbrain.io//aihuman/sdk)**에서 Project를 만들고, Windows App ID 부분에 SDK를 사용하는 Windows Application 명을 입력하고 확인을 클릭합니다. 해당 App ID에서 사용할 수 있는 User Key가 발급됩니다.

<img src="/img/aihuman/windows/SDK_WebPage_UserKey.png" />

위에 서 준비한 App ID와 User Key를 각각 Authenticate 함수의 첫번째, 두번째 인자로 입력하고 인증 과정을 수행합니다. 세번째 인자에 등록한 콜백을 통해 결과를 받아 볼 수 있습니다.

자사한 사항은 API 편람 혹은 Sample Project 내용을 참고하세요.

:::info 정보
- App ID는 해당 프로젝트에서 유일한(Unique) 값이어야 합니다. (예 "com.example.project.appname")
- User Key는 AI Human 웹사이트에서 프로젝트를 생성하고 App ID를 입력하면 발급받을 수 있습니다.
:::

## 3. Visual Studio에서 새 프로젝트 생성하기

Visual Studio에서 솔루션 및 프로젝트를 생성하고 AI Human SDK를 사용합니다.

#### 	: Create New Project > WPF Application > Target Framework > .NET 5.0 (혹은 .NET Core 3.1 이상의 WPF 개발 가능 Target)
####		여기서는 기본 프로젝트명인 WpfApp1를 사용하겠습니다.

### 요구사항

#### AIHuman.SDK.Core
- [.NET Standard 2.0](https://learn.microsoft.com/en-us/dotnet/standard/net-standard?tabs=net-standard-2-0)

#### AIHuman.SDK.WPF
- [.NET Core 3.1](https://dotnet.microsoft.com/en-us/download/dotnet/3.1)

해당 WPF 기반의 SDK를 사용하여 Custom Application을 개발하거나 실행시키려면 .NET Core 3.1 이상을 필수로 설치하셔야 됩니다.
Core만 사용하여 다른 Target Framework 혹은 UI를 개발하려는 경우에는 해당 제약은 없어집니다.

#### Using Packages

- [JWT](https://github.com/jwt-dotnet/jwt) (9.0.3)
- [Newtonsoft.Json](https://www.newtonsoft.com/json) (13.0.2)
- [SocketIOClient](https://github.com/doghappy/socket.io-client-csharp) (3.0.3)
- [System.Drawing.Common](https://github.com/dotnet/runtime) (6.0.0)
- [System.Configuration.ConfigurationManager](https://github.com/dotnet/runtime) (4.4.1)

<br/>

## 4. 프로젝트 셋업하기

AIHumanSDK.dll 참조 등 프로젝트의 초기 설정을 수행합니다.

#### 4-1. AI Human 웹사이트에서 Windows용 SDK를 다운로드 받습니다.

#### 4-2. 앞서 만든 프로젝트 경로에 다운받은 SDK 및 관련 파일들을 위치시킵니다.

#### 4-3. 솔루션 탐색기에서 프로젝트 > 우클릭 > 추가 > 새폴더 를 생성하고 적당한 이름을 부여합니다.

생성한 폴더 > 우클릭 > 추가 > 기존항목을 통해 솔루션에서 참조할 라이브러리들을 구성할 수 있습니다.

<img src="/img/aihuman/windows/NewProject_Add_Sdk.png" />

#### 4-4. 솔루션 항목에 다운로드 받은 AIHuman SDK 구동에 필요한 라이브러리들을 추가합니다.

솔루션 탐색기에서 상단의 프로젝트를 우클릭 > 추가 > 프로젝트 참조 > 참조 관리자 > 찾아보기 > AIHumanSDK.dll과 Newtonsoft.Json.dll 등을 추가합니다. 프로젝트 트리의 종속성 > 어셈블리에 AIHumanSDK가 등록되어있는 것을 확인할 수 있습니다.

(다운로드 받은 SDK와 함께 포함되어 있는 라이브러리들을 모두 추가하면 됩니다.)

<img src="/img/aihuman/windows/NewProject_Add_Ref.png" />

<img src="/img/aihuman/windows/NewProject_Init.png" />

<br/>
