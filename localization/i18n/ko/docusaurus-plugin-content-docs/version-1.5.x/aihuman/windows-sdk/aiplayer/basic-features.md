---
sidebar_position: 4
---

# 발화 관련 기본 기능

### AIPlayer로 AI Human 발화 동작하기

`AIPlayer` 리소스 로딩 완료 후 **`Send` 함수**를 이용해 발화 요청을 할 수 있습니다. 아래 샘플 프로젝트에서 중간에 드롭다운 메뉴를 통해 특정 문장을 선택하고 오른쪽에 플레이 버튼을 누르면 발화 기능이 동작합니다.

일반적으로 순수 텍스트로 발화를 시킬 수 있지만, [AIHuman.Common.Model.AIClipSet](../../../aihuman/windows-sdk/apis/aiclipset)을 이용하여 발화를 수행할 수 있습니다. 또한 특정 제스처와 함께 발화하기를 수행할 수도 있다. 예를 들어 AI에게 손을 흔들며 "안녕하세요!"라고 인사말을 하도록 명령할 수 있습니다. 이를 제스처 발화라고 합니다. 자세한 내용은 [제스처 발화 관련 파트](../../../aihuman/windows-sdk/aiplayer/advanced-features#제스처-발화)에서 설명하고 있습니다.

발화할 텍스트가 너무 길면 발화에 필요한 리소스 합성에 문제가 있을 수도 있습니다. AI Human 모델에 따라 합성 가능한 텍스트 길이가 상이할 수 있습니다. 일반적으로 120자 이내에서 의미 있는 문장 단위로 잘라서 보내기를 권고하고 있습니다. 이와 관련하여 지속적으로 연구개발을 진행하고 있으며, 최근에는 300자 이상의 긴문장 합성도 서비스한 사례가 있습니다.

<img src="/img/aihuman/windows/speak_1.5.x.png" />

```csharp
// using pure-text
_aiPlayer.Send(new[] {"this is sample sentence."});
// using AIClipSet
AIClipSet clip = AIAPI.CreateClipSet("this is sample sentence.");
_aiPlayer.Send(new[] {clip});
```

### 발화 동작 모니터링

`Send` 함수 호출 이후 등록된 콜백 객체에서 동작 이벤트에 대한 피드백을 확인할 수 있습니다. 이 피드백은 콜백(`IAIPlayerCallback`)의 이벤트 관련 함수(`OnAIPlayerEvent`)를 통해 가능합니다. 아래와 같은 이벤트 타입들이 `OnAIPlayerEvent`의 인자 `AIEvnet`를 통해 순차적으로 전달 받습니다.

- `AICLIPSET_PLAY_PREPARE_STARTED` : 발화 문장 준비(합성) 시작
- `AICLIPSET_PLAY_PREPARE_COMPLETED` : 발화 시간 조건 완료
- `AICLIPSET_PLAY_STARTED` : 발화 시작
- `AICLIPSET_PLAY_COMPLETED` : 발화 종료
- `AICLIPSET_PLAY_FAILED` : 발화 실패

```csharp
string message;

// Speaking related CallBack example
public void OnAIPlayerEvent(AIEvnet aiEvent)
{
    switch (aiEvent.EventType)
    {
        case AIState.Type.AICLIPSET_PLAY_PREPARE_STARTED:
            message = "AI started preparation to speak.";
            break;
        case AIEvent.Type.AICLIPSET_PLAY_PREPARE_COMPLETED:
            message = "AI finished preparation to speak.";
            break;
        case AIEvent.Type.AICLIPSET_PLAY_STARTED:
            message = "AI started speaking.";
            break;
        case AIEvent.Type.AICLIPSET_PLAY_COMPLETED:
            message = "AI finished speaking.";
            break;
            
        ...

    }
}

// AI error CallBack example
public void OnAIPlayerError(AIError aiError)
{
    switch (aiError.ErrorCode)
    {
        case AIError.Code.AICLIPSET_PLAY_ERR:
            // TODO: impl error handling
            break;
        
        ...

        default:
            message = error.ToString();
            break;
    }
}
```

<br/>

다음은 AIPlayer 발화 중에 수행할 수 있는 동작들입니다.

### 발화 일시정지

: 발화를 일시정지 시킵니다.
```csharp
// pause method
_aiPlayer.Pause()
```

### 발화 재계

: 발화 일시정지 상태에서 다시 시작할 수 있습니다.
```csharp
// resume method
_aiPlayer.Resume()
```

### 발화 정지

: 발화를 중단하고 발화 대기 큐도 모두 리셋합니다. (발화 재계 불가)
```csharp
// stop method
_aiPlayer.StopSpeaking()
```
