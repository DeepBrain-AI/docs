---
sidebar_position: 2
---

# Project Set up

In this chapter, you will learn how to create and register UserKey and AppId, etc. required for authentication for using AI Human SDK.

### 1. Create an account

Create an account on the **[AI Human SDK Website](https://www.aistudios.com/aihuman/)**.

- Top right > Login(Sign In) > Create account
- After you log in, you can create a project in the SDK category.
- If you are not allowed access to SDK categories after logging in, please contact our customer center.

### 2. Add a project to My workspace

Create a project in **[My workspace](https://aihuman.aistudios.com/aihuman/sdk)**, enter App Id of Windows and click confirm. Then User Key will be issued.

<img src="/img/aihuman/windows/SDK_WebPage_UserKey.png" />

You can authenticate the App ID and userKey prepared above with the first and second parameters of the Authenticate function. You can get the results through the callback of the third parameter.

:::info

- appId is a unique Id of the project, and is generally created like "dev.aihuman.yourappname".
- userkey can be obtained by creating a project on the AIHuman website and registering the appId.
:::

### 3. Create a new project in Visual Studio

Create solutions and projects to use the AI Human SDK in the Visual Studio.

#### : Create New Project > WPF Application > Target Framework > .NET 6.0 (or .NET Framework 4.6.2 or later WPF support target)

#### We will use the default project name, WpfApp1.

### Requirements

#### AIHuman.SDK.Core

- [.NET Standard 2.0](https://learn.microsoft.com/en-us/dotnet/standard/net-standard?tabs=net-standard-2-0) or higher

#### AIHuman.SDK.WPF

- Supported Framework
  - [.NET Framework 4.6.2](https://dotnet.microsoft.com/en-us/download/dotnet-framework/net462) or higher
  - [.NET 6](https://dotnet.microsoft.com/en-us/download/dotnet/6.0) or higher

<img src="/img/aihuman/windows/projectsetup_frameworks_1.5.x.png" />

To develop or run an application using AIHuman.SDK.WPF.dll, you must install .NET Framework 4.6.2 or .NET 6.0 or higher.

You can also use AIHuman.SDK.Core.dll only. You can use AIHuman.SDK.Core.dll to develop a target framework or UI other than WPF in an environment that supports .NET Standard 2.0. In this case, you need to implement View (such as UserControl) yourself. This can increase the difficulty of development.

:::info

- Case of developing WPF as target: AIHuman.SDK.Core and AIHuman.SDK.WPF reference required
- In an environment that supports .NET Standard 2.0, other UI Frameworks are used: Implement View after referring to AIHuman.SDK.Core only
:::

### Library Dependencies Guide

You should refer to the below assemblies with SDK in your project or install Packages from nuget.

#### Nuget Packages (Recommended)

- [AIHuman.SDK.WPF](https://www.nuget.org/packages/AIHuman.SDK.WPF)
  - Dependencies: [AIHuman.SDK.Core](https://www.nuget.org/packages/AIHuman.SDK.Core/)

#### Assemblies

- AIHuman.SDK.Core.dll (1.5.x)
- AIHuman.SDK.WPF.dll (1.5.x)
- JWT.dll (10.1.1)
- Newtonsoft.Json.dll (13.0.3)
- SocketIOClient.dll (3.1.1)
- SocketIO.Serializer.NewtonsoftJson.dll (3.1.1)
- SocketIOClient.Newtonsoft.Json.dll (3.0.7)
- System.Configuration.ConfigurationManager (7.0.0)
- System.Drawing.Common (7.0.0)
- Note: Depending on the project, additional settings such as config may be required

Install the above Nuget package (recommended) AIHuman.SDK.WPF (the dependent package, AIHuman.SDK.Core, is automatically installed) and you are done setting up the project here.

### 4. Set up the project

Prepare library files necessary for the use of AI Human SDK in the previously created project.

#### 4.1. Download the SDK for Windows from the AI Human SDK website.

#### 4.2. Move the downloaded SDK and related files to the previously created project path.

#### 4.3. In Solution Explorer, right-click Project > Right-click > Add > Create a new folder with a name.

You can configure the libraries referenced in the solution through the created folder > right-click > Add > Existing item.

:::warning Caution
The screenshot and the actual assemblies provided may be different. Please refer to the README.md file in the SDK archive file you downloaded.
:::

<img src="/img/aihuman/windows/NewProject_Add_Sdk.png" />

#### 4.4. Add the downloaded AIHuman SDK library to the solution item.

Right-click the project at the top of the Solution Explorer > Add > Project Reference > Reference Manager > Browse > AIHuman.Add SDK.Core.dll and Newtonsoft.Json.dll, etc. You can see that references have been added to the Dependencies > Assembly in the project tree.

(Add all the libraries included in the downloaded file.)

<img src="/img/aihuman/windows/NewProject_Add_Ref.png" />

<img src="/img/aihuman/windows/NewProject_Init.png" />
