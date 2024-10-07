---
sidebar_position: 1
---

# 개요

본 장에서는 AI Human을 실제 등장시켜 특정 동작을 수행할 수 있는 AIPlayer 객체를 셋업하고 사용하는 방법에 대해 알아봅니다.

AIPlayer는 UserControl 형태의 View와 시스템 로직과 관련된 동작들을 제어하는 ViewModel로 구성되어 있습니다. 다음 페이지와 주요 클래스 API 편람에서 보다 자세히 알아보겠습니다.


:::tip 개발 팁!

- AI Human SDK 및 Sample에는 MVVM, Dependency Injection, Data Binding의 개념을 사용하고 있습니다.
- Custom Application 혹은 Service를 개발할 시에는 AIHuman.Media.AIPlayer 객체를 생성하고 화면을 구성하기 위해 AIPlayer의 GetObject() 함수를 이용해 View 객체를 얻어다가 배치시킵니다.
- AIPlayer에서 여백, 크기, 속도 등의 Data는 Control과 Binding 시키는 형태의 구현 방식을 권장합니다.
- SDK와 관계된 ViewModel의 경우 AIHuman.Common.Base.ViewModelBase, AIHuman.Interface.IAIPlayerCallback를 상속받아 구현하기를 권장합니다.
- AIPlayer를 소멸 혹은 종료전 해당 객체의 Dispose() 함수를 반드시 호출하기를 권장합니다. (AIPlayerViewModel은 Dispoable 객체입니다.)

:::
