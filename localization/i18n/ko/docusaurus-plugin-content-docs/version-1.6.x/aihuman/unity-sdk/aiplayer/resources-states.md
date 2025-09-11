---
sidebar_position: 3
---

# 이벤트 확인하기

### 리소스 로딩 시작하기  

인증 완료 후 `AIPlayer` 초기화가 완료되면 전달한 `aIName`에 따라서 리소스 로딩이 시작되고 AIPlayer를 초기화 할때 등록한 AIPlayerCallback component에 리소스 로딩 상태가 보고됩니다.

<br/>

### AIPlayerCallback으로 AIPlayer 동작 모니터링

`AIPlayerCallback`의 구현을 통해 AIPlayer 동작 상태가 변경되면 `OnAIPlayerEvent(AIEvent @event)` 메소드가 호출됩니다. 관련된 `AIEvent.Type` 값은 다음과 같습니다. 

:::info

- AIEvent.Type.RES_LOAD_STARTED : 리소스 로딩 시작
- AIEvent.Type.RES_LOAD_COMPLETED : 리소스 로딩 완료
- AIEvent.Type.AICLIPSET_PLAY_PREPARE_STARTED : 발화 준비(합성) 시작
- AIEvent.Type.AICLIPSET_PLAY_PREPARE_COMPLETED : 발화 시작 조건 달성 완료
- AIEvent.Type.AICLIPSET_PRELOAD_STARTED : 프리로드 시작
- AIEvent.Type.AICLIPSET_PRELOAD_COMPLETED : 프리로드 완료
- AIEvent.Type.AICLIPSET_PRELOAD_FAILED : 프리로드 실패
- AIEvent.Type.AICLIPSET_PLAY_STARTED : 발화 시작
- AIEvent.Type.AICLIPSET_PLAY_COMPLETED : 발화 완료
- AIEvent.Type.AICLIPSET_PLAY_FAILED : 발화 실패
- AIEvent.Type.AI_CONNECTED : AI 동작을 위한 소켓 연결 완료
- AIEvent.Type.AI_DISCONNECTED : AI 동작을 위한 소켓 연결 해제
- AIEvent.Type.AICLIPSET_PLAY_BUFFERING : 발화 중 버퍼링
- AIEvent.Type.AICLIPSET_RESTART_FROM_BUFFERING : 버퍼링에서 다시 발화 재개
- AIEvent.Type.AIPLAYER_STATE_CHANGED : AIPlayer 상태 변경

:::

또한 `OnAIPlayerResLoadingProgressed(int current, int total)` 콜백을 통해 로딩 프로그레스를 구현할 수 있습니다.
리소스 로딩 과정에서 혹시 문제가 발생하면 `OnAIPlayerError(AIError error)` 함수가 호출되는데 예를 들면 인증 토큰의 만료 등의 에러가 발생할 수 있습니다. 상황에 따라 적절한 대응이 필요합니다. 

- AIError.Code.AI_API_ERR : 인증 과정 등 정보 받는 API 부분에서 에러

```csharp
// AI resource related event Callback
public void OnAIPlayerEvent(AIEvent @event)
{
    if (@event.EventType == AIEvent.Type.RES_LOAD_STARTED)
    {
        UnityEngine.Debug.Log("AI Resource loading started.");
    }
    else if (@event.EventType == AIEvent.Type.RES_LOAD_COMPLETED)
    {
        UnityEngine.Debug.Log("AI Resource loading completed.");
    }
}

// AI resource loading progress Callback
public void OnAIPlayerResLoadingProgressed(int current, int total)
{
    float progress = ((float)current / (float)total) * 100;
    UnityEngine.Debug.Log(string.Format("AI Resource Loading... {0} %", (int)progress));
}

// AI error Callback
public void OnAIPlayerError(AIError error)
{
    if (error.ErrorCode == (int)AIError.Code.AI_API_ERR)
    {
        UnityEngine.Debug.LogError(string.Format("sdk_ai_api error : {0}", error.ToString()));          
    }
}
```
