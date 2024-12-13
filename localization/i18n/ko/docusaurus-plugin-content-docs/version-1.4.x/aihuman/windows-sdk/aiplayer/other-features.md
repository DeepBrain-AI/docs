---
sidebar_position: 6
---

# 발화 이외 기능들
다음은 주로 AI 설정 관련 기능들입니다.

리소스가 로드되면 AIPlayer의 설정들을 변경할 수 있습니다. 예를들어 **스케일, 여백, 볼륨** 등을 조절할 수 있습니다.

### 스케일 조절하기
<img src="/img/aihuman/windows/scale_1.4.x.png" />

: AI의 스케일을 설정합니다. 설정값 범위는 0.5 ~ 1.5 입니다.

```csharp
// set Property(float)
_aiPlayer.Scale = value;
```

### 여백 조절하기
<img src="/img/aihuman/windows/margin_1.4.x.png" />

: AI의 여백을 설정합니다. X축(가로)과 Y축(세로)을 기준으로 Image control의 Margin을 설정합니다.

```csharp
AIHuman.Common.Margin _aiMargin;
_aiMargin.X = 64;
_aiMargin.Y = 8;
// set Property(int, int)
_aiPlayer.Margin = _aiMargin;
```

<br/>

### 볼륨 조절하기

<img src="/img/aihuman/windows/volumecontrol_1.4.x.png" />

: AI의 볼륨을 설정합니다. 설정값 범위는 0.0 ~ 1.0 입니다.

```csharp
// set Property(double)
_aiPlayer.Volume = value;
```

: 음소거를 설정 및 해제합니다.

```csharp
// set Property(bool)
_aiPlayer.IsMute = value;
```
