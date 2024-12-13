---
sidebar_position: 6
---

# 발화 이외 기능들

다음은 AIPlayer의 발화 이외의(주로 AI 설정 관련) 동작들이다.

### AI 크기(스케일) 변경

: AI의 크기(스케일)을 설정할 수 있다. 설정값 범위는 소수 0.5 ~ 1.5 입니다.

```csharp
// set Property
_aiPlayer.Scale = value;
```

<br/>

### 볼륨 조절하기

: AI의 볼륨을 설정할 수 있다. 설정값 범위는 소수 0.0 ~ 1.0 이다.

```csharp
// set Property(float)
_aiPlayer.Volume = value;
```

: 음소거를 설정 및 해제한다.

```csharp
// set Property(bool)
_aiPlayer.IsMute = value;
```