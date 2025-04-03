---
sidebar_position: 6
---

# 발화 이외 기능들
다음은 주로 발화 이외의 AI 설정 관련 기능들입니다.

리소스가 로드되면 AIPlayer의 설정들을 변경할 수 있습니다. 예를들어 **스케일, 여백, 볼륨** 등을 조절할 수 있습니다.

<br/>

### 스케일 조절하기

<img src="/img/aihuman/windows/scale_1.5.x.png" />

: AI의 스케일을 설정합니다. 설정값 범위는 0.5 ~ 1.5 입니다.

```csharp
// set Property(float)
_aiPlayer.Scale = value;
```

<br/>

### 여백 조절하기

<img src="/img/aihuman/windows/margin_1.5.x.png" />

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

<img src="/img/aihuman/windows/volumecontrol_1.5.x.png" />

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

<br/>

### AI와 접속 해제하기

<img src="/img/aihuman/windows/disconnect_1.5.x.png" />

: AI와 접속 해제를 통해 네트워크 통신이 없는 유휴 상태를 구현할 수 있습니다.

접속 해제 성공 시 `OnAIPlayerEvent(AIEvent)`를 통해 `AI_DISCONNECTED` 이벤트 콜백을 전달합니다. AIPlayer.Disconnect(callback) 함수 호출 시 매개변수에 콜백 함수를 전달하면 `AI_DISCONNECTED` 이벤트 콜백은 전달하지 않습니다.

```csharp
// void Disconnect(Action<bool> callback = null)
_aiPlayer.Disconnect((result) => {
    MessageBox.Show($"Disconnect result: {result}");
});
```

<br/>

### AI와 재접속 하기

<img src="/img/aihuman/windows/reconnect_1.5.x.png" />

: AI와 네트워크 연결이 끊긴 상태에서 명시적으로 재접속을 시도할 수 있습니다.

재접속 성공 시 `OnAIPlayerEvent(AIEvent)`를 통해 `AI_CONNECTED` 이벤트 콜백을 전달합니다. AIPlayer.Reconnect(5, 3000, callback) 함수 호출 시 매개변수에 콜백 함수를 전달하면 `AI_CONNECTED` 이벤트 콜백은 전달하지 않습니다.

Reconnect 함수의 인자를 선택적으로 첫번째는 재접속 시도 횟수 이며 두번째는 간격(밀리초) 그리고 세번째는 콜백을 전달할 수 있습니다.

```csharp
// void Reconnect(int attempts = 5, int delay = 3000, Action<bool> callback = null)
_aiPlayer.Reconnect(1, 1000, (result) => {
    MessageBox.Show($"reconnect result: {result}");
});
```

