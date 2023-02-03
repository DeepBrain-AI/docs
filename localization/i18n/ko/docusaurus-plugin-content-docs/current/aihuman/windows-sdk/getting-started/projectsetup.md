---
sidebar_position: 2
---

# 프로젝트 셋업하기

In this chapter, you will learn how to create and register UserKey and AppId, etc. required for authentication for using AI Human SDK.

## 1. Create an account
Create an account on the **[AI Human SDK Website](https://aitalk.deepbrainai.io)**.

## 2. Add a project to My workspace
Create a project in **[My workspace](https://aitalk.deepbrainai.io/aihuman/sdk)**, enter App Id of Windows and click confirm. Then User Key will be issued.

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

#### 	: Create New Project > WPF Application > Target Framework > .NET 5.0
####		WpfApp1 is the default when creating a project.

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
