---
displayed_sidebar: aifrontUISidebar
sidebar_position: 2
slug: /aifront/desktop
---

# Desktop


![Desktop guide](/img/aifront/desktop-guide.png)


```javascript
  useEffect(() => {
    document.body.style.overscrollBehaviorY = 'none';
    document.documentElement.style.setProperty(
      '--primeColor',
      data?.uiInfo?.color?.mainColor
    );
    document.documentElement.style.setProperty(
      '--subColor',
      data?.uiInfo?.color?.subColor
    );
    document.documentElement.style.setProperty(
      '--gradColor1',
      data?.uiInfo?.color?.gradColor[0]
    );
    document.documentElement.style.setProperty(
      '--gradColor2',
      data?.uiInfo?.color?.gradColor[1]
    );
    document.documentElement.style.setProperty(
      '--backgroundUrl',
      data?.uiInfo?.images?.background
    );
    document.documentElement.style.setProperty(
      '--defaultPanelUrl',
      data?.uiInfo?.images?.defaultPanel
    );
  }, [])
```

페이지 컴포넌트가 마운트될 경우 `projectInfo.uiInfo` 값에 따라 도큐먼트의 스타일 정보가 세팅됩니다.

해당 값에 따라 버튼 컬러 등이 변경됩니다. (모든 디바이스 공통)

<br />

### DesktopGNB

데스크톱 페이지의 상단 영역입니다. 좌측의 기업 로고, 우측의 사이드 메뉴 버튼으로 구성됩니다.

![DesktopGNB](/img/aifront/desktop-gnb.png)


```html
  <DesktopGNB
    isShowLogo={projectData?.uiInfo?.components?.logo}
    logo={projectData?.uiInfo?.images?.logo}
    isShowMenu={projectData.uiInfo?.components?.menuBtn}
    setOpenSideMenu={setOpenSideMenu}
    menuImg={projectData?.uiInfo?.images?.menu}
  />
```

| 속성            | 설명                           | 타입      | 디폴트                                    |
|-----------------|--------------------------------|-----------|-------------------------------------------|
| isShowLogo      | 로고 표시 여부                 | `boolean` | `true`                                    |
| logo            | 로고 이미지 소스               | `string`  | `/img/aifront/template/deepbrainLogo.svg` |
| isShowMenu      | 메뉴 버튼 표시 여부            | `boolean` | `true`                                    |
| setOpenSideMenu | 사이드메뉴 오픈 상태 관리 함수 |           |                                           |
| menuImg         | 메뉴 버튼 이미지 소스          | `string`  | `/img/aifront/template/Menu.svg`          |


<br />

### DesktopSideMenu

데스크톱 상단 영역의 사이드 메뉴 버튼 클릭 시 표시되는 영역입니다.

AI Human의 모드와 말하기 속도를 설정할 수 있습니다.

![DesktopSideMenu](/img/aifront/desktop-sidemenu.png)

```html
  <DesktopSideMenu
    openSideMenu={openSideMenu}
    setOpenSideMenu={setOpenSideMenu}
    defaultSpeed={projectData?.defaultSetting?.speed}
    modeState={modeState}
    setModeState={setModeState}
    ttsAvail={projectData?.defaultSetting?.mode === 'tts'}
  />
```

| 속성            | 설명                                                                          | 타입                                     | 디폴트           |
|-----------------|-------------------------------------------------------------------------------|------------------------------------------|------------------|
| openSideMenu    | 사이드메뉴 오픈 상태                                                          | `boolean`                                | `false`          |
| setOpenSideMenu | 사이드메뉴 오픈 상태 관리 함수                                                |                                          |                  |
| defaultSpeed    | 초기 설정될 AI Human의 말하기 속도                                            | `number`                                 | `1`              |
| modeState       | AI Human 모드                                                                 | <code>'conversation' &#124; 'tts'</code> | `'conversation'` |
| setModeState    | AI Human 모드 상태 관리 함수                                                  |                                          |                  |
| ttsAvail        | TTS Mode 선택 가능 여부. `false`일 경우 TTS Mode 라디오 버튼이 표시되지 않음. | `boolean`                                | `false`          |



<br />

### DesktopAILive

AI Human이 화면에 표시되는 영역입니다.

```html
  <DesktopAiLive
    isReady={isReady}
    setIsReady={setIsReady}
    startModel={startModel}
    setStartModel={setStartModel}
    isMicReady={isMicReady}
    setIsMicReady={setIsMicReady}
  />
```

| 속성          | 설명                              | 타입      | 디폴트  |
|---------------|-----------------------------------|-----------|---------|
| isReady       | AI Human 로딩 완료 상태           | `boolean` | `false` |
| setIsReady    | AI Human 로딩 완료 상태 관리 함수 |           |         |
| startModel    | AI Human 사용 시작 상태           | `boolean` | `false` |
| setStartModel | AI Human 사용 시작 상태 관리 함수 |           |         |
| isMicReady    | 마이크 사용 준비 상태             | `boolean` | `false` |
| setIsMicReady | 마이크 사용 준비 상태 관리 함수   |           |         |


```javascript
  const startAI = (projectInfo, aiName) => {
    const selectedAI = '';
    const config = projectInfo.operationInfo;
    AIResources.initAILive(
      projectInfo,
      aiName,
      selectedAI,
      projectInfo.uiInfo.position,
      config,
      deviceType,
      'sdk',
      onAILoadProgress
    );
  };
```
`DesktopAILive` 컴포넌트 내부의 `startAI` 함수가 호출되면 SDK 구동이 시작됩니다.

AI Human SDK와 관련된 코드는 `components/_common/aiResources.js`를 참조하세요.

<br />

### DesktopTTSBar

  AI Human의 Interactive Mode가 `tts`로 설정되었을 때 표시되는 영역입니다.

  ![DesktopTTSBar](/img/aifront/desktop-tts.png)

  텍스트를 입력하고 엔터 키를 입력하거나 우측 버튼을 클릭할 경우 AI Human이 입력된 텍스트를 발화합니다.

  ```html
    <DesktopTTSBar
      isLoading={isLoading}
      setIsLoading={setIsLoading}
      language={projectData.defaultSetting.language}
    />
  ```

| 속성         | 설명                            | 타입       | 디폴트  |
|--------------|---------------------------------|------------|---------|
| isLoading    | AI Human 로딩 중 상태           | `boolean`  | `false` |
| setIsLoading | AI Human 로딩 중 상태 관리 함수 | `function` |         |
| language     |                                 | `string`   |         |


<br />

### DesktopInputBar

AI Human의 Interactive Mode가 `conversation`으로 설정되었을 때 표시되는 AI Human의 하단과 우측에 위치한 영역입니다.

- DesktopInfoBase
  
  해당 영역은 AI Human이 발화 중일 때 발화하는 텍스트를 보여주거나, 유저가 마이크 아이콘을 클릭해 STT가 활성화되었을 때 인식되고 있는 텍스트를 보여주는 영역입니다.

![DesktopInputBar](/img/aifront/desktop-inputbar-infoBase.png)


![DesktopInputBar](/img/aifront/desktop-inputbar-listening.png)

<br />

![DesktopInputBar](/img/aifront/desktop-inputbar-panels.png)

상단부터 정보 패널을 나타내는 부분은 `DesktopPanelBox`, Ask me like this 힌트 영역은 `DesktopHintBox`, 채팅 입력과 관련된 부분은 `DesktopChat` 및 `DesktopInputBase` 입니다.

- DesktopPanelBox

  우측 패널 영역 중 최상단에 위치한 정보 패널 영역입니다.

  챗봇 답변에 포함된 이미지나 날씨 정보, 외부 동영상 등의 콘텐츠를 표시할 수 있습니다.

  ```html
    <DesktopPanelBox
      recentChat={aiRecentChat}
      panel={panel}
      degree={degree}
    />
  ```

  | 속성       | 설명                  | 타입                                   | 디폴트                                        |
  |------------|-----------------------|----------------------------------------|-----------------------------------------------|
  | recentChat |                       |                                        |                                               |
  | panel      | 패널 기본 이미지 소스 | `string`                               | `/img/aifront/template/panelContentLarge.svg` |
  | degree     |                       | <code>Celsius &#124; Fahrenheit</code> | `Celsius`                                     |

  <br />

- DesktopHintBox

  AI Human과 연결된 챗봇에게 전달 가능한 질문 예시를 보여주는 영역입니다.

  ```html
    {hasHint && isShowHintBox && (
      <div className={styles.hintBox}>
        <DesktopHintBox
          hint={hint}
          language={language}
          clickHint={clickHint}
        />
      </div>
    )}
  ```

  | 속성      | 설명      | 타입       | 디폴트 |
  |-----------|-----------|------------|--------|
  | hint      | 질문 예시 | `string[]` |        |
  | language  |           | `string`   |        |
  | clickHint |           | `function` |        |

  `projectInfo.uiInfo.hintPanel.contents` 값이 있고, 해당 값(배열)의 길이가 0이 아닐 때 `hasHint` 값이 `true`가 됩니다.

  힌트 개수가 3개를 초과할 경우 5초마다 화면에 표시되는 힌트 순서가 변경됩니다.

  힌트를 클릭할 경우 `ChatbotResources.sendMessage` 함수가 호출됩니다.

<br />