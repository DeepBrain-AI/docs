---
sidebar_position: 1
---

# 개요

본 문서에서 다루는 샘플은 AI Human SDK를 사용한 예시로, 이 가이드를 따라 AI Human 샘플 애플리케이션의 기능을 구현하여 AI Human SDK의 다양한 기능을 하나씩 시도해 볼 수 있다. 샘플 앱을 실행하면 아래의 4가지 메뉴가 나온다. (샘플 앱을 실행하기 전에 cocoapods를 업데이트해야 합니다.)

:::info
1. aiSample.xcworkspace를 두 번 클릭하거나 IDE(Xcode)로 프로젝트 열기.
2. AIPlayer의 setAppId, setUserKey 함수에 AppDelegate.swift에서 준비한 appId 및 userKey를 입력한다.
3. IDE(Xcode)의 상단 메뉴 모음에서 [Product] - [Build]를 클릭하여 빌드를 수행한다.
:::
<p align="center">
<img src="/img/aihuman/ios/aisample_ss_menu.PNG" style={{zoom: "25%"}} />
</p>

#### ViewController's menu

- AI Quick sample (AIQuickSampleViewController.swift)
- AI Player sample (AISampleViewController.swift)
- AI Human + PlayChat (ChatbotSampleViewController.swift)
- AI Human + PlayChat + Google STT (STTSampleViewController.swift)
