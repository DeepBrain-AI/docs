---
displayed_sidebar: aihumaniosSidebar
sidebar_position: 1
slug: /aihuman/ios-sdk
---

# 소개

AI Human(이전의 AI 라이브) SDK는 실제 인간과 유사한 훈련된 AI 모델을 실시간으로 화면에 표시할 수 있다. 그러나, 그것은 단지 인공지능 모델을 실시간으로 보여주는 것을 넘어, **AI가 마치 영상통화를 하는 것처럼 자연스럽게 말할 수 있게 해준다**. SDK의 가장 중요한 구성 요소는 AIPlayer이다.


<p align="center">
<img src="/img/aihuman/ios/aisample_intro_2d.png" style={{zoom: "25%"}} />
</p>

AI 레이어는 AI 모델이 실시간으로 표시되는 View로써, 자유롭게 위치를 정할 수 있다. AIPlayer는 **실제 사람의 목소리와 얼굴을 학습하여 만들어져서** 기계적인 느낌이 없으며, 기존의 TTS 보다 자연스럽다. 

또한 AIPlayer를 통해 다양한 모델을 선택할 수 있다. AI 모델을 선택하면 위 이미지와 같이 로딩 프로세스(사용자 인증 및 리소스 로딩) 후 선택한 AI 모델이 대기 상태로 화면에 표시됩니다. 

AI의 **대기 상태**는 인공지능이 말하기전 상대방의 말을 듣고 있는 상태이다. 이 상태에서 AI 모델은 위 그림처럼 정적인 것이 아니라 눈을 깜빡이거나 끄덕이는 등의 동작을 보여줌으로써 최대한 자연스러운 인간의 움직임을 닮도록 설계됐다. AIPlayer는 이러한 모든 프로세스가 간단한 설정으로 자동으로 수행되는 단순한 구조를 가지고 있다.

사용자는 대기 상태의 클라이언트(AIPlayer)에게 '안녕하세요.', '반갑습니다.' 등과 같이 **말하기(발화)**를 명령할 수 있습니다. 이 명령을 받으면 AI가 자연스럽게 말하기 시작하고, 완료되면 **자연스럽게** 다시 대기 상태로 돌아갈 것이다.

사용자는 AI의 **크기, 위치 및 음성 속도**를 조정할 수도 있다. 또한 일시 중지, 재개 및 중지 기능이 제공되어 화면에서 다양한 조작을 지원할 수 있습니다. **한국어 뿐 아니라 영어, 일본어, 중국어** AI모델도 있어 이를 이용해 다국어 지원도 가능하다.

AI를 선택할때 3D 캐릭터를 선택 할 수도 있다.


<p align="center">
<img src="/img/aihuman/ios/aisample_sample_choose_ai.jpg" style={{zoom: "25%"}} />
</p>


3D 캐릭터 또한 동일한 기능이 구현되어 있다.

<p align="center">
<img src="/img/aihuman/ios/aisample_intro_3d.png" style={{zoom: "25%"}} />
</p>
