---
sidebar_position: 2
---

# 프로젝트 셋업하기

AI Human SDK를 이용해 인증에 필요한 UserKey, AppId 등을 생성하고 등록하는 방법에 대해 알아봅니다.

## 1. 사이트 진입하기
**[AI Human 웹사이트](https://www.aistudios.com/aihuman)**에서 계정을 생성하고 로그인 합니다.
- 우측 상단 > Login(Sign In) > Create account  
- 로그인 이후에 [SDK](https://aihuman.deepbrain.io/aihuman/sdk) 카테고리에서 프로젝트를 생성할 수 있습니다.
- [SDK](https://aihuman.deepbrain.io/aihuman/sdk) 카테고리 접근이 불가하다면 [고객센터](https://www.aistudios.com/ko/company/contact)로 문의해 주세요.

## 2. My Workspace에 Project 추가하기
**[My workspace](https://aihuman.deepbrain.io/aihuman/sdk)** 에서 Project를 만들고, 플랫폼(Android, iOS, Windows)의 App Id를 입력하고 확인을 클릭합니다. (이때 App ID는 자동으로 중복체크를 수행합니다.)
해당 App ID에서 사용할 수 있는 User Key가 발급됩니다.

<img src="/img/aihuman/unity/SDK_WebPage_UserKey.png" />

appId, userKey, platform 정보는 인증 기능인 Authenticate() 함수의 전달인자로 사용됩니다.

:::info
- App ID는 프로젝트의 고유한 Id로 일반적으로 "com.example.project.appname" 과 같이 생성합니다.
- User key는 AI Human 웹사이트에서 프로젝트를 생성하고 App ID를 입력하면 발급받을 수 있습니다.
- platform 값은 App Platform에 맞는 것을 설정합니다. (Android, iOS, Windows)
:::

## 3. Unity Hub에서 새 프로젝트 생성하기

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


## 4. Unity 프로젝트 셋업

AI Human SDK의 Import Package 과정을 수행합니다.

#### 4-1. AI Human SDK 웹사이트에서 Unity AI Human SDK를 다운로드 받습니다.

#### 4-2. Unity Editor 메뉴의 Assets > Package Manager을 통해 다음의 패키지들을 인스톨합니다.

- Burst : 3D 캐릭터의 립싱크에서 사용
- Mathematics : 3D 캐릭터의 립싱크에서 사용
- TextMeshPro : Metaverse demo의 UI에서 사용

<img src="/img/aihuman/unity/package_manager.png" />

#### 4-3. Unity Editor 메뉴에서 Window > Import Package > Custom Package을 통해 다운로드 받은 Unity AI Human SDK(.unitypackage)를 가져옵니다.

<img src="/img/aihuman/unity/import_package.png" />

#### 4-4. AI Human SDK의 Sample UI는 9:16 종횡비 이상의 해상도로 제작 되었으므로 Game 뷰의 Free Aspect 항목을 선택하여 해상도를 9:16 종횡비 이상으로 설정합니다. 예외로 AIHuman & Metaverse Smaple은 16:9 종횡비를 기준으로 제작 되었으므로 해상도를 16:9 종횡비 또는 Free Aspect로 설정합니다.

<img src="/img/aihuman/unity/aspect.png" />

#### 4-5. Sample 실행을 위해서는 Unity Editor 메뉴에서 File > Build Settings을 선택 후 Build Settings 창의 Scenes In Build 영역으로 Project창의 Assets/DeepBrainAI/Demo/Scenes/ 경로의 모든 scene을 드래그앤드롭을 통해 추가해야 합니다.

<img src="/img/aihuman/unity/build_setting.png" />

#### 4-5-1. (optional) DeepbrainAI 3D Model을 사용할 경우 Unity Editor 메뉴에서 Edit > Project Settings > Player > Other Settings > Color Space 항목을 Linear로 변경하는 것을 권장합니다.

#### 4-5-2. (안드로이드) 안드로이드 타겟의 프로젝트라면 Unity Editor 메뉴에서 Edit > Project Settings > Player > Other Settings > Scripting Backend 항목을 IL2CPP로 설정합니다.

#### 4-6. 예외 사항

Unity Editor 2021.2.x 버전 사용자는 SDK에 포함 된 Newtonsoft.Json.dll의 참조 에러가 발생 할 수 있습니다. 에러 발생 시 다음과 같은 일련의 과정을 통해 참조 에러를 해결 할 수 있습니다.

##### 4-6-1. Unity Editor 메뉴에서 Window > Package Manager 선택
##### 4-6-2. Package Manager창의 Packages - Unity 항목에서 Version Control 선택
##### 4-6-3. Package Manager창 오른쪽 하단의 Update 실행

<img src="/img/aihuman/unity/Newtonsoft_Json.png" />

## 5. 샘플 프로젝트 빌드 가이드

샘플 프로젝트를 빌드하기 위해 해당 플랫폼에서 다음 과정을 수행해야 합니다.

#### 5-1. 샘플 프로젝트에서는 Azure STT를 위한 Speech SDK의 플러그인이 Standalone 플러그인만 포함되어 있습니다. Android 또는 iOS 타겟으로 빌드하려는 경우 다음 링크를 통해 Unity용 Speech SDK를 다운로드 받은 후 Android 또는 iOS 플러그인을 프로젝트에 포함시켜야 합니다. (https://learn.microsoft.com/ko-kr/azure/ai-services/speech-service/quickstarts/setup-platform?tabs=windows%2Cubuntu%2Cdotnetcli%2Cunity%2Cjre%2Cmaven%2Cnodejs%2Cmac%2Cpypi&pivots=programming-language-csharp)