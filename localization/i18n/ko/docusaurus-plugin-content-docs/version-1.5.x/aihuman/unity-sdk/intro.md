---
displayed_sidebar: aihumanunitySidebar
sidebar_position: 1
slug: /aihuman/unity-sdk
---

# 개요

AI Human의 기본 개념과 함께 AI Human SDK를 소개합니다.

AI Human SDK(이하 SDK)를 이용하면 딥러닝(학습)을 통해 만들어진 AI를 원하는 시점과 위치에 실시간(Real-Time)으로 표현할 수 있습니다. 특정 손짓이나 몸짓 등의 제스처를 수행하기도 하고, 챗봇과 연계해 실제 사람처럼(Face to Face) 자연스러운 대화가 가능한(Conversational) AI Human 서비스를 구현할 수 있게 합니다.

<p align="center">
<img src="/img/aihuman/unity/introduction.png" style={{zoom: "30%"}} /> 
</p>

SDK를 이용해 AI Human 서비스를 구현할 때는 핵심 요소인 AIPlayer(or AI3DPlayer)를 사용하게 됩니다.
AIPlayer는 UnityEngine.MonoBehaviour 클래스를 상속 받아서 구현된 컴포넌트이므로, 자유롭게 게임오브젝트에 Add Component 하여 사용할 수 있습니다. AI 모델은 **실제 사람의 목소리와 얼굴을 학습하여 만들어져서** 기존의 TTS(Text to Speech)가 가진 기계적인 느낌이 없으며, 말만하는 것이 아닌 실제 모델이 나옴으로써 더욱 친숙하고 자연스러운 애플리케이션을 구현할 수 있습니다. 

AIPlayer는 위의 모델뿐만 아니라 다른 여러 AI 모델들 중 하나를 선택할 수 있으며, 일련의 과정(사용자 인증과 리소스 로딩)이후에 선택한 AI 모델이 나타나고 대기 상태(Idle)로 초기화됩니다.

AI의 **대기 상태**란 AI가 말을 하기 전 상대방의 말을 듣고 있는 상태라고 할 수 있습니다. 이 대기 상태는 사진처럼 정지된 상태가 아니라 실제 사람처럼 눈을 깜빡인다든가 고개를 살짝 끄덕인다든지 등의 행동을 하며 실제 사람처럼 자연스럽게 대기하도록 구현되어 있습니다. 이러한 모든 과정이 간단한 설정만으로 자동으로 이루어지는 심플한 구조를 가지고 있습니다.

또한 서비스 사용자는 클라이언트(AIPlayer)에게 **어떤 말(발화)과 행동(제스처)을 수행하도록 명령**할 수 있습니다. (예: 손을 흔들며 "Hello, world!"라고 말하기). 이 명령을 받아 AI는 자연스럽게 말을 하기 시작하고 발화를 마치면 **자연스럽게** 다시 대기 상태로 돌아가게 됩니다.

발화나 제스처 기능 이외에도 AI의 **크기 및 위치를 조정한다든가 말하기 속도 등도 바꿀수 있으며** 일시중지, 재시작, 중지 기능 등이 제공되어 이를 활용해서 다양한 화면과 시나리오를 구성할 수 있습니다. 또한 **한국어 뿐 아니라 영어, 일본어, 중국어 등**의 외국어를 구사하는 AI 모델들도 있으며, 다국어 기능을 이용하면 다른 여러 다국어 서비스도 구현이 가능합니다. 

보다 자세한 내용은 SDK를 기반으로 제작된 [샘플 프로젝트](../category/sample-project-description-4)와 [AIPlayer](../category/aiplayer-description-4) 설명 챕터를 참고 바랍니다.
