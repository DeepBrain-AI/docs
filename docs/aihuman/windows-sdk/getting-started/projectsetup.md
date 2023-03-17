---
sidebar_position: 2
---

# Project Set up

In this chapter, you will learn how to create and register UserKey and AppId, etc. required for authentication for using AI Human SDK.

## 1. Create an account
Create an account on the **[AI Human SDK Website](https://aihuman.deepbrain.io/)**.

## 2. Add a project to My workspace
Create a project in **[My workspace](https://aihuman.deepbrain.io/aihuman/sdk)**, enter App Id of Windows and click confirm. Then User Key will be issued.

<img src="/img/aihuman/windows/SDK_WebPage_UserKey.png" />

The appId, userKey, uuid, and platform information will be used as arguments for AuthStart(), an authentication function.

:::info
- appId is a unique Id of the project, and is generally created like "com.example.project.appname".
- userkey can be obtained by creating a project on the AIHuman website and registering the appId.
- uuid refers to the unique ID of the device where the application is installed. It is created by calling Guid.NewGuid(), and saved and reused after initial creation so that it does not change each time it is called.
- platform argument uses "wnds", which means windows.
:::

## 3. Create a new project in Visual Studio.

Create solutions and projects to use the AI Human SDK in the Visual Studio.

#### 	: Create New Project > WPF Application > Target Framework > .NET 5.0 (or .NET Core 3.1 or later WPF support target)
####		We will use the default project name, WpfApp1.

### Requirements

#### AIHuman.SDK.Core
- [.NET Standard 2.0](https://learn.microsoft.com/en-us/dotnet/standard/net-standard?tabs=net-standard-2-0)

#### AIHuman.SDK.WPF
- [.NET Core 3.1](https://dotnet.microsoft.com/en-us/download/dotnet/3.1)

Use the corresponding WPF-based SDK to develop or run custom applications.NET Core 3.1 or later must be installed.
This is not the case if you want to develop a different target framework or UI using only the core.

#### Using Packages

- [JWT](https://github.com/jwt-dotnet/jwt) (9.0.3)
- [Newtonsoft.Json](https://www.newtonsoft.com/json) (13.0.2)
- [SocketIOClient](https://github.com/doghappy/socket.io-client-csharp) (3.0.3)
- [System.Drawing.Common](https://github.com/dotnet/runtime) (6.0.0)
- [System.Configuration.ConfigurationManager](https://github.com/dotnet/runtime) (4.4.1)

<br/>

## 4. Set up the project.

Prepare library files necessary for the use of AI Human SDK in the previously created project.

#### 4-1. Download the SDK for Windows from the AI Human SDK website.

#### 4-2. Move the downloaded SDK and related files to the previously created project path.

#### 4-3. In Solution Explorer, right-click Project > Right-click > Add > Create a new folder with a name.

You can configure the libraries referenced in the solution through the created folder > right-click > Add > Existing item.

<img src="/img/aihuman/windows/NewProject_Add_Sdk.png" />

#### 4-4. Add the downloaded AIHuman SDK library to the solution item.

 In Solution Explorer, right-click on "project" at the top > Add > Project Reference > Reference Manager > Browse > Add AIHumanSDK.dll and Newtonsoft.Json.dll. You will then be able to see that AIHuman SDK is registered in Dependencies > Assembly in the project tree.

<img src="/img/aihuman/windows/NewProject_Add_Ref.png" />

<img src="/img/aihuman/windows/NewProject_Init.png" />

<br/>
