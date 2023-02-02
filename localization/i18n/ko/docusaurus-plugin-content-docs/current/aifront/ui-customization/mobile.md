---
displayed_sidebar: aifrontUISidebar
sidebar_position: 3
slug: /aifront/ui-customization/mobile
---

# Mobile


![Mobile](/img/aifront/mobile-guide.png)

### GNB

모바일 페이지의 상단 영역입니다. 좌측의 기업 로고, 우측의 사이드 메뉴 버튼으로 구성됩니다.

![MobileGNB](/img/aifront/mobile-gnb.png)

```javascript
  <GNB
    setOpenSideMenu={setOpenSideMenu}
    logo={projectData?.uiInfo?.images?.logo}
  />
```

| 속성            | 설명             | 타입     | 디폴트                                     |
|-----------------|------------------|----------|--------------------------------------------|
| setOpenSideMenu |                  |          |                                            |
| logo            | 로고 이미지 소스 | `string` | `//img/aifront/template/deepbrainLogo.svg` |

`DesktopGNB`와 다르게 로고와 사이드 메뉴 버튼이 항상 표시됩니다.

로고의 경우 `DesktopGNB`와 동일하게 `projectInfo.uiInfo.images.logo`에 이미지 소스가 있을 경우 커스텀 이미지가, 없을 경우 기본 딥브레인 로고가 표시됩니다.

### SideMenu

![MobileSideMenu](/img/aifront/mobile-sidemenu.png)

```javascript
  <SideMenu
    openSideMenu={openSideMenu}
    setOpenSideMenu={setOpenSideMenu}
    logo={projectData?.uiInfo?.images?.logo}
    defaultSpeed={projectData?.defaultSetting?.speed}
    modeState={modeState}
    setModeState={setModeState}
    ttsAvail={projectData?.defaultSetting?.mode === 'tts'}
  />
```

하단에 `logo`가 표시되는 점을 제외하고 `DesktopSideMenu` 컴포넌트와 동일하게 동작합니다.


<br />


### TTSBar

![MobileTTS](/img/aifront/mobile-tts.png)

```javascript
  <TTSBar
    isLoading={isLoading}
    setIsLoading={setIsLoading}
    inputState={inputState}
  />
```

<br />


### InputBar

챗봇에게 질문할 수 있는 예시 질문과 채팅창을 포함하는 컴포넌트입니다.

![MobileInputBar](/img/aifront/mobile-inputbar.png)

![MobileInputBar](/img/aifront/mobile-inputbar-open.png)


```javascript
  <InputBar
    isReady={isReady}
    hint={projectData?.uiInfo?.hintPanel?.contents}
    isMicReady={isMicReady}
    inputState={inputState}
    setInputState={setInputState}
  />
```

`hint` 배열의 길이가 1 이상일 경우 힌트 패널 영역이 표시되고, 길이가 3 이상일 경우 5초마다 화면에 표시되는 힌트 순서가 변경됩니다.

<br />
