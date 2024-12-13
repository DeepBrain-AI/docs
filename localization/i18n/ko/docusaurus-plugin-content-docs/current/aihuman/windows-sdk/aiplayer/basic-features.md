---
sidebar_position: 4
---

# 발화 관련 기본 기능

### AIPlayer로 AI Human 발화 동작하기

`AIPlayer` 리소스 로딩 완료 후 **`Send` 함수**를 이용해 발화 요청을 할 수 있습니다. 아래 샘플 프로젝트에서 중간에 드롭다운 메뉴를 통해 특정 문장을 선택하고 오른쪽에 플레이 버튼을 누르면 발화 기능이 동작합니다.

일반적으로 순수 텍스트로 발화를 시킬 수 있지만, [AIClipSet](../../../aihuman/windows-sdk/apis/aiclipset)을 이용하여 발화를 수행할 수 있습니다. 또한 특정 제스처와 함께 발화하기를 수행할 수도 있습니다. 예를 들어 AI에게 손을 흔들며 "안녕하세요!"라고 인사말을 하도록 명령할 수 있습니다. 이를 제스처 발화라고 합니다. 자세한 내용은 [제스처 발화 관련 파트](../../../aihuman/windows-sdk/aiplayer/advanced-features#제스처-발화)에서 설명하고 있습니다.

발화할 텍스트가 너무 길면 발화에 필요한 리소스 합성에 문제가 있을 수도 있습니다. AI Human 모델에 따라 합성 가능한 텍스트 길이가 상이할 수 있습니다. 일반적으로 120자 이내에서 의미 있는 문장 단위로 잘라서 보내기를 권고하고 있습니다. 이와 관련하여 지속적으로 연구개발을 진행하고 있으며, 최근에는 300자 이상의 긴문장 합성도 서비스한 사례가 있습니다.

<img src="/img/aihuman/windows/speak_1.5.x.png" />

```csharp
// using pure-text
_aiPlayer.Send(new[] {"this is sample sentence."});
// using AIClipSet
AIClipSet clip = AIAPI.CreateClipSet("this is sample sentence.");
_aiPlayer.Send(new[] {clip});
```

### 로컬 캐싱

로컬 캐싱은 발화(클립셋) 데이터를 내부적으로 저장하고, 같은 발화(AIClipSet)를 다시 요청할 때 기존 데이터를 재활용하여 서버와의 통신 없이 즉각 수행하도록 하는 기능을 말합니다.
- 캐싱 데이터는 SDK를 사용하는 기기의 스토리지에 저장됩니다.
- 로컬 캐싱을 이용하면 한번 발화(AIClipSet)한 데이터를 재사용하여 네트워크 트래픽을 발생시키지 않습니다.
- 응용 프로그램 `Base` 경로 아래에 `ai_data` 디렉토리에 저장됩니다.
- 로컬 캐싱은 AI별로 관리됩니다.
- [AIPlayerOptions.AICachingStrategy](../../../aihuman/windows-sdk/aiplayer/setup#aicachingstrategy)를 이용하여 캐싱 전략을 선택할 수 있습니다.

:::info 캐싱 전략 이란?

- AIPlayerCachingStrategy.V1은 AIPlayer 생성 시점에 해당 AI의 캐싱 데이터를 삭제합니다.
  + AI의 발화 데이터는 AIPlayer 객체의 생명 주기와 같습니다.
  + 다만 삭제 시점이 새로운 AIPlayer 객체가 생성될 때, 해당 AI의 발화 데이터를 초기화 합니다.
- AIPlayerCachingStrategy.V2는 AIPlayer 생성 시 설정된 AIPlayerOption의 CacheLimit을 토대로 해당 AI의 캐싱 데이터를 삭제합니다.
  + 1)가장 오래되고 2)캐시 적중률(Hit)이 낮은 순서대로 삭제하게 됩니다.
  + CacheLimit을 초과하지 않는 경우 캐싱 데이터는 로컬 영역에 그대로 유지됩니다.

:::

### 발화 동작 모니터링

`Send` 함수 호출 이후 등록된 콜백 객체에서 동작 이벤트에 대한 피드백을 확인할 수 있습니다. 이 피드백은 콜백(`IAIPlayerCallback`)의 이벤트 관련 함수(`OnAIPlayerEvent`)를 통해 가능합니다. 아래와 같은 이벤트 타입들이 `OnAIPlayerEvent`의 인자 `AIEvnet`를 통해 순차적으로 전달 받습니다.

- `AICLIPSET_PLAY_PREPARE_STARTED` : 발화 문장 준비(합성) 시작
- `AICLIPSET_PLAY_PREPARE_COMPLETED` : 발화 시간 조건 완료
- `AICLIPSET_PLAY_STARTED` : 발화 시작
- `AICLIPSET_PLAY_COMPLETED` : 발화 종료
- `AICLIPSET_PLAY_FAILED` : 발화 실패

```csharp
string message;

// Speaking related Callback example
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

// AI error Callback example
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

#### 발화 일시정지

: 발화를 일시정지 시킵니다.
```csharp
// pause method
_aiPlayer.Pause();
```

### 발화 재개

: 발화 일시정지 상태에서 다시 시작할 수 있습니다.
```csharp
// resume method
_aiPlayer.Resume();
```

#### 발화 정지

: 발화를 중단하고 발화 대기 큐도 모두 리셋합니다. (발화 재개 불가)
```csharp
// stop method
_aiPlayer.StopSpeaking();
```

기본적으로 발화를 중단하더라도 실제 사람과 같은 행동 반경으로 자연스럽게 대기 상태(IDLE)로 돌아 옵니다.  
부자연스럽지만 강제로 즉각 대기 상태(IDLE)로 전환을 할 수 있습니다. 이는 비권장 사용법입니다.
```csharp
// forced stop
_aiPlayer.StopSpeaking(true);
```
