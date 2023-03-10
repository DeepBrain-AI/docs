---
sidebar_position: 3
---

# 이벤트 확인하기

### 리소스 로딩 시작  

인증 완료 후 AIPlayer 초기화가 완료되면 전달한 **AIName**에 따라서 리소스 로딩이 시작되고 AIPlayer를 초기화 할때 등록한 listener(AIPlayerCallback)에 리소스 로딩 상태가 보고된다. (최초에는 리소스 로드 완료까지 수분이 걸릴수도 있다.)

<br/>

### AIPlayerCallback으로 AIPlayer의 리소스 로딩 상태 모니터링

먼저 listener의 OnAIPlayerEvent(AIEvent @event) 메소드가 호출되는데 관련된 event 값은 다음과 같다. 또한 OnAIPlayerResLoadingProgressed(int current, int total) 으로 로딩 프로그레스를 구현할 수 있다.

- AIEvent.Type.RES_LOAD_STARTED : 리소스 로딩 시작.
- AIEvent.Type.RES_LOAD_COMPLETED : 리소스 로딩 완료.

리소스 로딩 과정에서 혹시 문제가 발생하면 OnAIPlayerError(AIError error) 함수가 호출되는데 예를 들면 인증 토큰의 만료 등의 내용이 올 수 있다. 상황에 따라 적절한 대응이 필요하다. 

- AIError.Code.AI_API_ERR : 인증 과정 등 정보 받는 API 부분에서 에러

```csharp
// AI resource related event CallBack
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

// AI resource loading progress CallBack
public void OnAIPlayerResLoadingProgressed(int current, int total)
{
    float progress = ((float)current / (float)total) * 100;
    UnityEngine.Debug.Log(string.Format("AI Resource Loading... {0} %", (int)progress));
}

// AI error CallBack
public void OnAIPlayerError(AIError error)
{
    if (error.ErrorCode == (int)AIError.Code.AI_API_ERR)
    {
        UnityEngine.Debug.LogError(string.Format("sdk_ai_api error : {0}", error.ToString()));          
    }
}
```
