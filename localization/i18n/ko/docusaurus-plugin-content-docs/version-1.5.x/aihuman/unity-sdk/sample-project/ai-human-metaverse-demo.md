---
sidebar_position: 8
---

# AI Human Metaverse 데모

:::note related files

- 6.AIHuman & Metaverse.scene

:::

이번 데모는 AI Human SDK를 활용한 메타버스 서비스의 예제입니다. 해당 데모를 통해 3D 공간에서 AIPlayer를 활용한 2D 컨텐츠와 AI3DPlayer를 활용한 3D 캐릭터와의 대화형 서비스를 살펴볼 수 있습니다. 

- **Built-in, URP 지원**
- **TextMeshPro 패키지 필요**


<br/>

### 3D 공간에서 AIPlayer 사용하기

<p align="center">
<img src="/img/aihuman/unity/metaverse_aiplayer.png" style={{zoom: "60%"}} />
</p>

위 이미지와 같이 해당 데모에서는 3D 공간에서 AIPlayer를 활용하여 TV 뉴스를 구현한 모습을 볼 수 있습니다. 간략한 구현 과정은 아래와 같습니다.

- TV 속 UI 만들기 (자막, 뉴스 이미지) 
- 2D AI 모델을 그릴 AIPlayer View 만들기 
- AIPlayer만을 위한 카메라 생성 후 해당 카메라를 통해 RenderTexture에 TV 이미지 랜더링
- TV 오브젝트에 Plane 생성 후 RenderTexture를 Plane Material에 적용
- AI 모델 발화, OnAIPlayerEvent()를 활용해서 상황에 맞는 뉴스 자막 및 이미지 띄우기

:::tip related scripts
자세한 내용은 해당 스크립트들과 Scene의 Hierarchy 구성을 참고하기 바랍니다.
- DemoMetaverse.cs
- MetaverseAIPlayer.cs
- MetaversePlayerCallback.cs
- MetaverseFrameImageProvider.cs
:::


<br/>

### 3D 공간에서 AI3DPlayer 사용하기

<p align="center">
<img src="/img/aihuman/unity/metaverse_ai3dplayer.png" style={{zoom: "60%"}} />
</p>

위 이미지와 같이 해당 데모에서는 3D 공간에서 AI3DPlayer를 활용하여 간단한 대화형 서비스를 구현한 모습을 볼 수 있습니다. 간략한 구현 과정은 아래와 같습니다.

- 채팅 UI 만들기
- 대화를 위한 Chatbot 구성하기
- AI3DPlayer를 사용하여 3D 모델 로드하기
- AI3DPlayer.onAIPlayerEvent와 ChatbotManager를 활용해서 AI 모델 발화 및 립싱크 하기

:::tip related scripts
자세한 내용은 해당 스크립트들과 Scene의 Hierarchy 구성을 참고하기 바랍니다.
- MetaverseAI3DPlayer.cs
- UIMetaverseChat.cs
- ChatbotManager.cs
:::


<br/>

### 메타버스 구현을 위한 다른 기능들

중점적으로 다루지는 않았지만 해당 데모에는 메타버스를 위한 몇가지 기능들이 구현되어 있습니다.

- 1인칭 시점의 플레이어 조작
- 특정 오브젝트와 상호작용 하기