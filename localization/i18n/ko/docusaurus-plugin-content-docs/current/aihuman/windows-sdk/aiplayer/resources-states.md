---
sidebar_position: 3
---

# 이벤트 확인하기

### 리소스 로딩 시작하기

인증 완료 후 `AIPlayer` 객체가 생성되면, 전달한 `aiName`에 따라서 리소스 로딩이 시작되고 `IAIPlayerCallback` 콜백 객체에 의해 리소스 로딩 상태가 보고됩니다. (최초에는 네트워크 상태에 따라 리소스가 로드되는 시간이 다소 필요할 수 있습니다.)

기본적으로 구동에 필요한 리소스는 해당 SDK를 사용하는 프로세스가 위치한 경로에 다운로드가 됩니다.

### IAIPlayerCallback으로 모니터링 구현

먼저 콜백을 받으려는(모니터링) 클래스는 `IAIPlayerCallback`를 상속 받아 구현합니다. 구현체의 이벤트 관련 콜백으로는 `OnAIPlayerEvent(AIEvent)` 함수를 구현해야 하고 이벤트 종류인 `AIEvent.Type`값은 다음과 같습니다.

:::info

- `AIEvent.Type.RES_LOAD_STARTED` : AI 리소스 로드 시작  
- `AIEvent.Type.RES_LOAD_COMPLETED` : AI 리소스 로드 완료  
- `AIEvent.Type.AICLIPSET_PLAY_PREPARE_STARTED` : 발화 준비(합성) 시작  
- `AIEvent.Type.AICLIPSET_PLAY_PREPARE_COMPLETED` : 발화 시작 조건 달성 완료  
- `AIEvent.Type.AICLIPSET_PRELOAD_STARTED` : 프리로드 시작  
- `AIEvent.Type.AICLIPSET_PRELOAD_COMPLETED` : 프리로드 완료  
- `AIEvent.Type.AICLIPSET_PRELOAD_FAILED` : 프리로드 실패  
- `AIEvent.Type.AICLIPSET_PLAY_STARTED` : 발화 시작  
- `AIEvent.Type.AICLIPSET_PLAY_COMPLETED` : 발화 완료  
- `AIEvent.Type.AICLIPSET_PLAY_FAILED` : 발화 실패  
- `AIEvent.Type.AI_CONNECTED` : AI와 네트워크 연결 완료  
- `AIEvent.Type.AI_DISCONNECTED` : AI와 네트워크 연결 끊김  
- `AIEvent.Type.AICLIPSET_PLAY_BUFFERING` : 발화 중 버퍼링  
- `AIEvent.Type.AICLIPSET_RESTART_FROM_BUFFERING` : 버퍼링에서 다시 발화 재계  
- `AIEvent.Type.AIPLAYER_STATE_CHANGED` : AIPlayer 상태 변화 발생  

:::

`RES_LOAD_COMPLETED`와 `AI_CONNECTED` 콜백을 전달 받았다면 AIPlayer 객체의 모든 기능들이 정상 동작 가능한 상태, 즉 발화(실시간 합성) 가능한 상태라 할 수 있습니다.  
이와 같이 위의 이벤트 콜백을 활용하여 다양한 서비스 플로우에 대응이 가능합니다.

또한 `OnAIPlayerResLoadingProgressed(int, int)` 콜백 함수를 이용해 로딩 프로그레스를 구현할 수 있습니다.
이 과정에서 혹시 문제가 생기면 `AIError.ErrorCode`가 `AI_RES_ERR`로 `OnAIPlayerError(AIError)` 콜백을 통해 전달됩니다. 추가로, 예를 들면 인증 토큰의 만료 등의 내용이 올 수 있습니다. 상황에 따라 적절한 대응이 필요합니다.

- `AIError.Code.AI_API_ERR` : 인증 과정 등 정보 받는 API 부분에서 에러
- [이 외의 에러](../../../aihuman/windows-sdk/aiplayer/errors)

:::info  
- 대응 예: 1402 error (토큰 기한 만료) -> 토큰 갱신 필요 -> AIAPI.GenerateToken 혹은 AIAPI.Authenticate 함수 재호출
- [AIError](../../../aihuman/windows-sdk/apis/aierror)객체는 API 편람에서 확인할 수 있어요!
:::

```csharp
string message;
// AI resource related event Callback
public void OnAIPlayerEvent(AIEvent aiEvent)
{
    switch (aiEvent.EventType)
    {
        case AIEvent.Type.RES_LOAD_STARTED:
            message = "AI Resource loading started.";
            break;
        case AIEvent.Type.RES_LOAD_COMPLETED:
            message = "AI Resource loading completed.";
            break;
        
        ...

    }
}

// AI resource loading progress Callback
public void OnAIPlayerResLoadingProgressed(int current, int total)
{
    float progress = ((float) current / (float) total) * 100;
    message = $"AI Resource Loading... {progress}%";
}

// AI error Callback
public void OnAIPlayerError(AIError error)
{
    switch (error.ErrorCode)
    {
        case AIError.Code.AI_API_ERR:
            // TODO: impl error handling
            break;
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

:::info Dev Tips!

- 콜백 받을 구현체가 AIHuman.Interface.IAIPlayerCallback를 상속 받고, 콜백 함수를 구현 후 AIPlayer 객체를 생성할 때 매개변수로 전달해 보세요!
- OnAIPlayerEvent 콜백 함수와 별개로 [AIPlayerState](../../../aihuman/windows-sdk/apis/aiplayerstate)를 통해 AIPlayer의 상태값을 확인할 수 있어요!

:::
