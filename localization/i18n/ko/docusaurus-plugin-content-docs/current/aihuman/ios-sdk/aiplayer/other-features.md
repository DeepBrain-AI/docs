---
sidebar_position: 6
---

# 발화 이외 기능들
(주로 AI 설정과 관련)

리소스 로딩이 완료되면 실제 동작이 가능한 상태가 된다.

실제 동작이 가능한 상태에서 AIPlayer의 일부 설정들은 변경이 가능하다.

아래 사진은 샘플 프로젝트에서 변경이 가능한 부분을 보여준다.

<p align="center">
<img src="/img/aihuman/ios/aisample_ss_002.jpg" style={{zoom: "30%"}} />
</p>

### AI 크기 바꾸기: 0.5~1.5 사이 값

```swift
aiPlayer.scale = scale
```

### 볼륨 조절하기

: AI의 볼륨을 설정합니다. 설정값 범위는 0.0 ~ 1.0 입니다.

```swift
aiPlayer.volume = value;
```

: 음소거를 설정 및 해제합니다.

```swift
aiPlayer.isMute = value;
```