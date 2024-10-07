---
sidebar_position: 4
---

# 발화 관련 기본 기능

### AIPlayer로 AI Human 발화 동작하기

AIPlayer 리소스 로딩 완료 후 `Send`함수를 이용해 발화 요청을 할 수 있습니다. AIHuman 데모 Scene에서는 Dropdown UI에서 발화 문장을 선택한 후 `SPEAK` 버튼을 누르면 해당 기능의 동작을 볼수 있습니다.  

일반적으로 순수 텍스트로 발화를 시킬 수 있지만, [AIClipSet](/aihuman/unity-sdk/apis/aiclipset)를 이용하여 발화를 수행할 수도 있습니다. 또한 특정 제스처와 함께 발화를 수행할 수도 있습니다. 예를 들어 AI에게 손을 흔들며 "안녕하세요!"라고 인사말을 하도록 명령할 수 있습니다. 이를 제스처 발화라고 합니다. 자세한 내용은 [제스처 발화 관련 파트](/aihuman/unity-sdk/aiplayer/advanced-features#gestures)에서 설명합니다.

```csharp
// using pure-text
_aiPlayer.Send(new[] {"this is sample sentence."});
// using AIClipSet
AIClipSet clip = AIAPI.CreateClipSet("this is sample sentence.");
_aiPlayer.Send(new[] {clip});
```

### 발화 동작 모니터링
AIPlayer.Send 함수 호출 이후 등록된 listener(AIPlayerCallback)에서 동작에 대한 상태를 확인할 수 있습니다. 아래와 같이 정의된 AIEvent를 순차적으로 전달 받을수 있습니다.

- AICLIPSET_PLAY_PREPARE_STARTED 
- AICLIPSET_PLAY_PREPARE_COMPLETED
- AICLIPSET_PLAY_STARTED
- AICLIPSET_PLAY_COMPLETED

```csharp
// 발화 동작에 따른 CallBack 활용 예
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

// AI 에러 발생 시 CallBack 활용 예
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

다음은 AIPlayer 발화 중에 할수 있는 동작들입니다. 

### 발화 일시정지

: 발화를 일시정지 시킵니다.
```csharp
// 일시정지 method
_aiPlayer.Pause()
```

### 발화 재시작

: 발화 일시정지 상태에서 재개합니다.
```csharp
// 재개 method
_aiPlayer.Resume()
```

### 발화 정지

: 발화(현재 말하기)를 중단하고 데이터를 모두 초기화합니다. (resume 불가)
```csharp
// 정지 method
_aiPlayer.StopSpeaking()
```
