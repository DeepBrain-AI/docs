---
sidebar_position: 1
---

# 개요

제공된 샘플은 예제를 통해 AIPlayer의 기능을 보여줍니다. 이를 통해 SDK를 실제로 사용하고 작동하는 방법을 자세히 살펴볼 수 있습니다. 기본 액티비티는 MainActivity.java이며, 시작하면 다음 4개의 메뉴 버튼이 나타납니다.

<p align="center">
<img src="/img/aihuman/android/Screenshot_20220530-201302-3909315-3915724.png" style={{zoom: "25%"}} />
</p>

MainActivity에는 **AIHuman SDK 인증 기능이 포함됩니다(onStart()에 generateToken(,) 메서드**. 앱을 실행하려면 [여기](../getting-started/first-aihuman.md))와 같이 appId와 userkey를 generateToken 함수에 넣어야 합니다.


**MainActivity의 메뉴**

- AIHuman 퀵스타트 (AILiveQuickStart.java)
- AIHuman 데모 (AIPlayerDemo.java)
- AIHuman + DialogFlow (AIPlayerWithDialogFlowDemo.java)
- AIHuman + PlayChat + STT (AILiveWithMBPlayChatWithSTTDemo.java)
- AIHuman 3d 캐릭터 (UnityActivity.java)


