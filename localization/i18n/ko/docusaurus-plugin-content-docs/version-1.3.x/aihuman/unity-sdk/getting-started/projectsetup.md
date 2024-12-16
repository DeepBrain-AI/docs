---
sidebar_position: 2
---

# 프로젝트 셋업하기

AI Human SDK를 이용해 인증에 필요한 UserKey, AppId 등을 생성하고 등록하는 방법에 대해 알아봅니다.

## 1. 계정 생성

해당 사이트에서 계정을 생성한다. **[AI Human SDK Website](https://aihuman.aistudios.com)**.

## 2. 워크스페이스에 프로젝트 추가

**[My workspace](https://aihuman.aistudios.com/aihuman/sdk)** 에서 플랫폼(Android, iOS, Windows)의 App Id를 입력하고 confirm을 클릭하면 사용자 키가 발급된다.

<img src="/img/aihuman/unity/SDK_WebPage_UserKey.png" />

appId, userKey, platform 정보는 인증 기능인 Authenticate() 함수의 전달인자로 사용된다.

:::info

- appId는 프로젝트의 고유한 Id로 일반적으로 "com.example.project.appname" 과 같이 생성해준다.
- userkey는 AI Human 웹사이트에서 프로젝트를 만들고, 상기 appId를 등록하면서 받을 수 있다.
- platform 값은 App Platform에 맞는 것을 설정한다. (Android, iOS, Windows)
:::

## 3. Unity Hub에서 새 프로젝트를 생성한다.

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

<br/>

### 4. Unity 프로젝트 셋업

AI Human SDK의 Import Package 과정을 수행한다.

#### 4.1. AI Human SDK 웹사이트에서 Unity AI Human SDK를 다운로드 받는다.

#### 4.2. Unity Editor 메뉴에서 Assets > Import Package > Custom Package을 통해 다운로드 받은 Unity AI Human SDK(.unitypackage)를 가져온다.

<img src="/img/aihuman/unity/import_package.png" />

#### 4.3. AI Human SDK의 Sample UI는 9:16 종횡비 이상의 해상도로 제작 되었으므로 Game 뷰의 Free Aspect 항목을 선택하여 해상도를 9:16 종횡비 이상으로 설정한다.

<img src="/img/aihuman/unity/aspect.png" />

#### 4.4. Sample 실행을 위해서는 Unity Editor 메뉴에서 File > Build Settings을 선택 후 Build Settings 창의 Scenes In Build 영역으로 Project창의 Assets/DeepBrainAI/Demo/Scenes/ 경로의 모든 scene을 드래그앤드롭을 통해 추가해야 한다.

<img src="/img/aihuman/unity/build_setting.png" />

#### 4.5. 예외 사항

Unity Editor 2021.2.x 버전 사용자는 SDK에 포함 된 Newtonsoft.Json.dll의 참조 에러가 발생 할 수 있다. 에러 발생 시 다음과 같은 일련의 과정을 통해 참조 에러를 해결 할 수 있다.

##### 4.5.1. Unity Editor 메뉴에서 Window > Package Manager 선택
##### 4.5.2. Package Manager창의 Packages - Unity 항목에서 Version Control 선택
##### 4.5.3. Package Manager창 오른쪽 하단의 Update 실행

<img src="/img/aihuman/unity/Newtonsoft_Json.png" />
