---
displayed_sidebar: aifrontUISidebar
sidebar_position: 4
slug: /aifront/ui-customization/kiosk
---

# Kiosk

![kiosk-guide](//img/aifront/kiosk-guide.png)

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

    document.getElementsByTagName('html')[0].style.fontSize =
      (screen.width * (1 / 900)).toFixed(1) + 'px';
  }, []);
```

키오스크의 경우 도큐먼트 스타일에 설정된 `fontSize` 값에 따라 패널 사이즈가 변경됩니다.

### KioskGNB

키오스크 페이지의 상단 영역입니다. 좌측의 기업 로고, 우측의 현재 시각 영역으로 구성됩니다.

![KioskGNB](/img/aifront/kiosk-gnb.png)

```html
  <KioskGNB projectData={projectData} />
```

`projectInfo.uiInfo.images.logo`에 이미지 소스가 들어 있을 경우 커스텀 이미지가, 없을 경우 기본 딥브레인 로고가 표시됩니다.

<br />

우측 현재 시각 영역은 `Datetime` 컴포넌트를 사용합니다.

```html
  <Datetime
    lang={projectData?.defaultSetting?.language}
    timeDiff={timeDiff}
  />
```

`Datetime` 컴포넌트에 사용되는 `timeDiff` 값은 UTC 오프셋 값을 의미합니다.

 `projectInfo.uiInfo.timeDiff` 값이 있을 경우 해당 값을, 없을 경우 `9`를 사용합니다.


<br />

### KioskAILive

`DesktopAILive`와 같은 컴포넌트를 사용합니다. `deviceType`으로 `kiosk`를 사용하는 점만 다릅니다.

```html
  <AiLive
    deviceType="kiosk"
    projectData={projectData}
    isReady={isReady}
    setIsReady={setIsReady}
    setCurrentModel={setCurrentModel}
    setLanguage={setLanguage}
    setStartModel={setStartModel}
    startModel={startModel}
    setIsMicReady={setIsMicReady}
    isMicReady={isMicReady}
    modeState={modeState}
    AIalign={AIalign}
  />
```

<br />

### KioskInputBar

키오스크 페이지 우측의 패널 영역을 나타내는 컴포넌트입니다. 위쪽부터 `Notice`, `KioskSTT`, `KioskPanelBox`, `KioskHintBox` 컴포넌트입니다.

![KioskInputBar](/img/aifront/kiosk-inputbar.png)

```html
  <KioskInputBar
    projectData={projectData}
    isReady={isReady}
    startModel={startModel}
    isMicReady={isMicReady}
  />
```
```javascript
  // components/InputBar/KioskInputBar.jsx
  isReady && (
    <div className={styles.kioskPanel}>
      {isShowNoticePanel && <Notice projectData={projectData} />}
      {isMicReady && (
        <KioskSTT
          inputState={inputState}
          directionPanel={projectData.uiInfo.directionPanel}
          disconnectPanel={disconnectPanel}
        />
      )}
      {startModel && (
        <KioskPanelBox projectData={projectData} recentChat={aiRecentChat} />
      )}
      {isShowHintPanel && (
        <KioskHintBox projectData={projectData} clickHint={clickHint} />
      )}
    </div>
  )
```

- Notice

  `Notice` 패널의 표시 여부를 결정하는 `isShowNoticePanel` 값은 `projectInfo.uiInfo.noticePanel.isDisplayed` 값이 `true`이고, `projectInfo.uiInfo.noticePanel.contents` 배열이 빈 배열이 아닌 경우 `true` 입니다.

  컴포넌트 내부에서 공지사항이 지나가는 속도를 조절할 수 있습니다.

  <br />

- KioskSTT
  
  `inputState` 값은  `wait`, `wait_panel`, `ai`, `guest`, `disconnect` 중 하나를 가질 수 있습니다.
  
  비전 센서 동작이나 STT 활성 여부, AI Human 발화 상태에 따라 값이 변경됩니다.

  <br />

- KioskPanelBox

  `DesktopPanelBox`와 비슷한 역할을 하는 영역입니다. 챗봇 답변에 포함되는 이미지 등을 표시합니다.

  키오스크 패널의 경우 `long` 타입과 `short` 타입이 있습니다.


  <br />

- KioskHintBox
  ```javascript
    <div className={styles.root}>
      <div className={styles.hintTitleBox}>
        <HintMic
          width="24rem"
          height="24rem"
          fill={projectData?.uiInfo?.color?.mainColor}
        />
        <div className={styles.hintTitle}>{title}</div>
      </div>
      <div className={styles.hintItemBox}>
        {arrangedHints.map((hint) => {
          return (
            <button
              key={hint}
              className={styles.hintItem}
              onClick={() => clickHint(hint)}
            >
              {hint && `"${hint}"`}
            </button>
          );
        })}
      </div>
    </div>
  ```

    `KioskHintBox` 컴포넌트의 표시 여부를 결정하는 `isShowHintBox` 값은 `projectInfo.uiInfo.hintPanel.isDisplayed` 값이 `true`이고, `projectInfo.uiInfo.hintPanel.contents` 배열이 빈 배열이 아닌 경우 `true` 입니다.

    `DesktopHintBox`와 마찬가지로 제공된 힌트가 4개 이상일 경우에만 5초마다 화면에 표시되는 힌트의 순서가 변경됩니다.

<br />