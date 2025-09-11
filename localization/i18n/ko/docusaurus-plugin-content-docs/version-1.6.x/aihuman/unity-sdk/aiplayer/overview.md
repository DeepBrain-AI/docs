---
sidebar_position: 1
---

# 개요

본 장에서는 AI Human을 실제 등장시켜 특정 동작을 수행할 수 있는 AIPlayer 객체를 셋업하고 사용하는 방법에 대해 알아봅니다.


:::tip Dev Tips!

- 기본적으로 AIPlayer는 UnityEngine.MonoBehaviour을 상속 받으므로 게임오브젝트에 Add Component하여 사용할 수 있습니다.
- AIPlayer의 동작 상태를 모니터링 하기 위해서는 AIPlayerCallback 상속을 통한 구현이 필요합니다. AIPlayerCallback 또한 AIPlayer와 마찬가지로 UnityEngine.MonoBehaviour을 상속 받으므로 게임오브젝트에 Add Component하여 사용할 수 있습니다.
- AIPlayer에서 AI 이미지를 공급 받기 위해서는 AIFrameImageProvider 상속을 통한 구현이 필요합니다. AIFrameImageProvider 또한 AIPlayer와 마찬가지로 UnityEngine.MonoBehaviour을 상속 받으므로 게임오브젝트에 Add Component하여 사용할 수 있습니다.
- AIPlayer에서 공급 받은 AI 이미지의 랜더링(UI 오브젝트 구성, position, scale)은 QuickStart, AIHuman 데모 Scene을 참고하여 구현할 수 있습니다. 

:::
