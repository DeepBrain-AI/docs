---
sidebar_position: 2
---

# 프로젝트 셋업하기

In this chapter, you will learn how to create and register UserKey and AppId, etc. required for authentication for using AI Human SDK.

## 1. Create an account
Create an account on the **[AI Human SDK Website](https://aitalk.deepbrainai.io)**.

## 2. Add a project to My workspace
Create a project in **[My workspace](https://aitalk.deepbrainai.io/aihuman/sdk)**, enter App Id of Platform(Android, iOS, Windows) and click confirm. Then User Key will be issued.

<img src="/img/aihuman/unity/SDK_WebPage_UserKey.png" />

The appId, userKey, uuid, and platform information will be used as arguments for AuthStart(), an authentication function.

:::info
- The appId is the project's unique Id, which is usually generated as "com.example.project.appname".
- Userkey can create a project on the AI Human website and receive it while registering the appId.
- Uuid refers to the unique ID of the device where the application is installed. Make it by calling Guide.NewGuid() and save and reuse it after initial creation so that it does not change every time you call it.
- The platform value is set to match the App Platform. (Android, iOS, Windows)
:::

## 3. Create a new project in Unity Hub.

<table>
	<tr>
		<td>Unity Editor Version</td>
		<td align="center">2019.1.x or later</td>		
	</tr>
	<tr>
		<td>Support Platform</td>
		<td align="center">Android, iOS, Windows</td>
	</tr>
</table>

## 4. Set up the project.

Perform the import package process of the AI Human SDK.

#### 4-1. Download the SDK for Unity from the AI Human SDK website.

#### 4-2. Import the Unity AI Human SDK (.unitypackage) downloaded from the Unity Editor menu via Assets > Import Package > Custom Package.

<img src="/img/aihuman/unity/import_package.png" />

#### 4-3. Since the Sample UI of the AI Human SDK is made with a resolution of 9:16 or higher, select the Free Aspect item in the Game View and set the resolution to 9:16 or higher.

<img src="/img/aihuman/unity/aspect.png" />

#### 4-4. To run Sample, you must select File > Build Settings from the Unity Editor menu and then drag and drop all scenes in the Asset/DeepBrainAI/Demo/Scenes/ path in the Project window to the Scenes In Build area of the Build Settings window.

<img src="/img/aihuman/unity/build_setting.png" />

#### 4-5. Exceptions

Users of the Unity Editor 2021.2.x version may encounter reference errors in Newtonsoft.Json.dll included in the SDK. When an error occurs, a reference error may be solved through a series of processes as follows.

##### 4-5-1. Select Window > Package Manager from the Unity Editor menu
##### 4-5-2. Select Version Control from the Package - Unity entry in the Package Manager window
##### 4-5-3. Enable Update in the lower right corner of the Package Manager window

<img src="/img/aihuman/unity/Newtonsoft_Json.png" />
