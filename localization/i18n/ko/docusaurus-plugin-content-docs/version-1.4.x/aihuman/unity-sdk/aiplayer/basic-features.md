---
sidebar_position: 4
---

# 발화 관련 기본 기능

### AIClipSet을 이용한 발화 기본 기능 및 AIPlayer 동작 모니터링

AIPlayer 리소스 로딩 완료 후 **Send 메소드**를 호출한다. AIHuman 데모 Scene에서는 Dropdown UI에서 발화 문장을 선택한 후 **발화** 버튼을 누르면 해당 기능이 동작한다.  

기본적으로 AIPlayer로 string 타입의 텍스트를 전달해 발화를 시킬 수 있지만, [AIHuman.Model.AIClipSet](/aihuman/unity-sdk/apis/aiclipset)를 이용하여 발화를 수행할 수도 있다. 또한 특정 제스처와 함께 발화를 수행할 수도 있다. 예를 들어 AI에게 손을 흔들며 "안녕하세요."라고 인사말을 하도록 명령할 수 있다. 이를 제스처 발화라고 한다. 자세한 내용은 [제스처 발화 관련 파트](/aihuman/unity-sdk/aiplayer/advanced-features#gestures)에서 설명한다.

발화할 텍스트가 너무 길면 발화에 필요한 리소스 합성에 문제가 있을 수 있다. 긴 문장을 합성할 수 있는 모델은 따로 있다. AI마다 다르지만 일반적으로 한글의 경우 대게 30 ~ 40자 이내, 영어도 비슷한 수준에서 적절한 길이로 문장을 잘라보내기를 권고한다. 이 외에도 특수 문자, 온전하지 못한 문자의 나열, 숫자, 수식, 기호, 다른 언어의 문자 또는 약어 등이 포함된 경우 기대한 것과 다르게 발화하거나 발화 못하는 경우가 있을 수 있다.

```csharp
// using pure-text
_aiPlayer.Send(new[] {"this is sample sentence."});
// using AIClipSet
AIClipSet clip = AIAPI.CreateClipSet("this is sample sentence.");
_aiPlayer.Send(new[] {clip});
```

### 발화 동작 모니터링
AIPlayer.Send 함수 호출 이후 등록된 listener(AIPlayerCallback)에서 동작에 대한 상태를 확인할 수 있다. 이 상태는 listener(AIPlayerCallback)의 상태 관련 함수(OnAIPlayerEvent)를 통해 가능하다. 아래와 같은 상태값들이 OnAIPlayerEvent 인자 AIEvent를 통해 순차적으로 전달 받는다.

- AICLIPSET_PLAY_PREPARE_STARTED 
- AICLIPSET_PLAY_PREPARE_COMPLETED
- AICLIPSET_PLAY_STARTED
- AICLIPSET_PLAY_COMPLETED

```csharp
// 발화 동작에 따른 Callback 활용 예
public void OnAIPlayerEvent(AIEvent @event)
{
    if (@event.EventType == AIEvent.Type.AICLIPSET_PLAY_PREPARE_STARTED)
    {
        _statusText.text = "AI started preparation to speak.";
    } 
    else if (@event.EventType == AIEvent.Type.AICLIPSET_PLAY_PREPARE_COMPLETED)
    {
        _statusText.text = "AI finished preparation to speak.";
    }
    else if (@event.EventType == AIEvent.Type.AICLIPSET_PLAY_STARTED)
    {
        _statusText.text = "AI started speaking.";
    }
    else if (@event.EventType == AIEvent.Type.AICLIPSET_PLAY_COMPLETED)
    {
        _statusText.text = "AI finished speaking.";
    }
}

// AI 에러 발생 시 Callback 활용 예
public void OnAIPlayerError(AIError error) 
{
    if (error.ErrorCode == (int)AIError.Code.AI_API_ERR)
    {
		_statusText.text = "API Error: " + error.ToString();
    }
    else if (error.ErrorCode == (int)AIError.Code.AI_SERVER_ERR)
    {
        _statusText.text = "Server Error: " + error.ToString();
    }
	else if (error.ErrorCode == (int)AIError.Code.AI_RES_ERR)
    {
		_statusText.text = "Resource Error: " + error.ToString();
    }
}
```
<br/>

다음은 AIPlayer 발화 중에 할수 있는 동작들이다. 

### 발화 일시정지

: 발화를 일시정지 시킨다.
```csharp
// 일시정지 method
_aiPlayer.Pause()
```

### 발화 재시작

: 발화 일시정지 상태에서 다시 시작할 수 있다.
```csharp
// 재개 method
_aiPlayer.Resume()
```

### 발화 정지

: 발화(현재 말하기)를 중단하고 데이터를 모두 리셋한다. (resume 불가)
```csharp
// 정지 method
_aiPlayer.StopSpeaking()
```
