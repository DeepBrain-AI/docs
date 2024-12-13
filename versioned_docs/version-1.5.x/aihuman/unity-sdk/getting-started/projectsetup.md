---
sidebar_position: 2
---

# Project Set up

In this chapter, you will learn how to create and register UserKey and AppId, etc. required for authentication for using AI Human SDK.

### 1. Create an account

Create an account on the **[AI Human SDK Website](https://www.aistudios.com/aihuman)**.


<br/>

### 2. Add a project to My workspace

Create a project in **[My workspace](https://aihuman.aistudios.com/aihuman/sdk)**, enter App Id of Platform(Android, iOS, Windows) and click confirm. Then User Key will be issued.

<img src="/img/aihuman/unity/SDK_WebPage_UserKey.png" />

The appId, userKey, and platform information will be used as arguments for Authenticate(), an authentication function.

:::info

- The appId is the project's unique Id, which is usually generated as "com.example.project.appname".
- Userkey can create a project on the AI Human website and receive it while registering the appId.
- The platform value is set to match the App Platform. (Android, iOS, Windows)
:::


<br/>

### 3. Create a new project in Unity Hub

Support information

<table>
	<tr>
		<td width="200" align="center" bgcolor="#eeeeee">Unity Version</td>	
		<td width="200" align="center" bgcolor="#ffffff">2020.3.x or later</td>		
	</tr>
	<tr>
		<td width="200" align="center" bgcolor="#eeeeee">Support Platform</td>
		<td width="200" align="center" bgcolor="#ffffff">Android, iOS, Windows</td>
	</tr>	
</table>

Render pipeline compatibility

<table>
	<tr>
		<td width="200" align="center" bgcolor="#eeeeee"></td>	
		<td width="200" align="center" bgcolor="#eeeeee">Built-in</td>	
		<td width="200" align="center" bgcolor="#eeeeee">URP</td>
		<td width="200" align="center" bgcolor="#eeeeee">HDRP</td>		
	</tr>
	<tr>
		<td width="200" align="center" bgcolor="#eeeeee">2D Model</td>
		<td width="200" align="center" bgcolor="#ffffff">Compatible</td>
		<td width="200" align="center" bgcolor="#ffffff">Compatible</td>
		<td width="200" align="center" bgcolor="#ffffff">Compatible</td>
	</tr>
	<tr>
		<td width="200" align="center" bgcolor="#eeeeee">3D Model</td>
		<td width="200" align="center" bgcolor="#ffffff">Compatible</td>
		<td width="200" align="center" bgcolor="#ffffff">Compatible</td>
		<td width="200" align="center" bgcolor="#ffffff">Not compatible</td>
	</tr>	
</table>


<br/>

### 4. Set up the project

Perform the import package process of the AI Human SDK.

#### 4.1. Download the SDK for Unity from the AI Human SDK website.

#### 4.2. Install the following packages through Assets > Package Manager in the Unity Editor menu.

- Burst : Used in lipsync of 3D characters
- Mathematics : Used in lipsync of 3D characters
- TextMeshPro : Using in the UI of the Metaverse demo

<img src="/img/aihuman/unity/package_manager.png" />

#### 4.3. Import the Unity AI Human SDK (.unitypackage) downloaded from the Unity Editor menu via Assets > Import Package > Custom Package.

<img src="/img/aihuman/unity/import_package.png" />

#### 4.4. Since the Sample UI of the AI Human SDK is made with a resolution of 9:16 or higher, select the Free Aspect item in the Game View and set the resolution to 9:16 or higher. As an exception, the AIHuman & Metaverse Sample is made based on a 16:9 aspect ratio, so the resolution is set to 16:9 aspect ratio or Free Aspect.

<img src="/img/aihuman/unity/aspect.png" />

#### 4.5. To run Sample, you must select File > Build Settings from the Unity Editor menu and then drag and drop all scenes in the Asset/DeepBrainAI/Demo/Scenes/ path in the Project window to the Scenes In Build area of the Build Settings window.

<img src="/img/aihuman/unity/build_setting.png" />

#### 4.5.1. (optional) When using the DeepbrainAI 3D Model, we recommend changing the Edit > Project Settings > Player > Other Settings > Color Space entry to Linear in the Unity Editor menu.

#### 4.5.2. (Android target) For projects on Android targets, set the Edit > Project Settings > Player > Other Settings > Scripting Backend entry to IL2CPP in the Unity Editor menu.

#### 4.6. Exceptions

Users of the Unity Editor 2021.2.x version may encounter reference errors in Newtonsoft.Json.dll included in the SDK. When an error occurs, a reference error may be solved through a series of processes as follows.

##### 4.6.1. Select Window > Package Manager from the Unity Editor menu
##### 4.6.2. Select Version Control from the Package - Unity entry in the Package Manager window
##### 4.6.3. Enable Update in the lower right corner of the Package Manager window

<img src="/img/aihuman/unity/Newtonsoft_Json.png" />


<br/>

### 5. Sample project build guide

To build a sample project, perform the following steps on a platform-by-platform basis.

#### 5.1. In the sample project, the plugin of the Speech SDK for Azure STT includes only the Standalone plugin. If you want to build as an Android or iOS target, you must download the Speech SDK for Unity via the following link and then include the Android or iOS plugin in your project. (https://learn.microsoft.com/ko-kr/azure/ai-services/speech-service/quickstarts/setup-platform?tabs=windows%2Cubuntu%2Cdotnetcli%2Cunity%2Cjre%2Cmaven%2Cnodejs%2Cmac%2Cpypi&pivots=programming-language-csharp)
