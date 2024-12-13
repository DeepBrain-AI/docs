---
sidebar_position: 2
---

# 인증 및 생성하기

전체 설정 프로세스는 4단계로 구성됩니다.

- 1단계: AIPlayer 객체 생성
- 2단계: SDK 사용자 인증(appId 및 userKey가 올바르지 않은 경우 실패 반환)
- 3단계: 사용 가능한 AI 목록 가져오기(인증되지 않은 경우 오류 반환)
- 4단계: 원하는 AI의 이름으로 AIPlayer 초기화


### 1. AIPlayer 객체를 만듭니다.

해당 생성자를 사용하여 AIPlayer 개체를 생성합니다.

```javascript
const wrapper = document.getElementById("AIPlayerWrapper");
const AI_PLAYER = new AIPlayer(wrapper);
```

<br/>


### 2. SDK 사용자 인증

AIPlayer를 사용하기 위해서는 사용자가 인증 절차를 거쳐야 합니다. 첫 번째 인증 단계는 사용자 키를 얻는 것입니다. UserKey는 DeepBrain AI가 생성한 고유 문자열로 절대 공개해서는 안 됩니다. 이 키와 appId를 사용하여 서버에 JWT ClientToken을 만듭니다. 그런 다음 비동기 'AIPlayer.generateToken()'함수를 호출합니다. 이는 JWT ClientToken의 결과를 사용하는 함수입니다.

앱 시작 후 네트워크 사용 가능 상태에서 가능한 한 빨리 이 메소드를 호출하는 것이 좋습니다.

**결과는 JSON으로 전달됩니다. JWT 토큰(token), 토큰 만료일(tokenExpire), 기본 AI 모델 정보(defaultAI)가 포함되어 있습니다. 토큰이 만료되면 generateToken를 재호출하여 토큰을 새로 고침 할 수 있습니다.**


```javascript
const result = await AI_PLAYER.generateToken({ appId: appId, token: clientToken });
/* result
		{"succeed":true,
		"token":"eyJhbGciO...",
		"tokenExpire":1608032460152,
		"defaultAI":   {"ai_na...} */
```

<br/>


### 3. 가능한 AI 리스트 불러오기 

인증이 완료되면 AIPlayer는 인증 정보를 가지고 있습니다. 이제 'AIplayer.getAIlist()'을 호출하여 사용 가능한 AI 목록을 얻을 수 있습니다. 인증이 잘못되었거나 문제가 있으면 '{success:false}'을(를) 반환합니다.

```javascript
const result = await AI_PLAYER.getAIList();
/* result
    { "succeed":true,
      "ai":[{"aiName":"vida","aiDisplayName":"Vida","language":"en"},
      {"aiName":"bret","aiDisplayName":"Bret","language":"en"},
      {"aiName":"danny","aiDisplayName":"Danny","language":"en"},
      {"aiName":"samh","aiDisplayName":"Samh","language":"en"},
      {"aiName":"kang","aiDisplayName":"Kang","language":"ko"}]} */
```

<br/>


### 4. 원하는 AI로 AIPlayer 초기화

AIPlayer 객체에 특정 AI를 적용하려면 원하는 AI 모델로 초기화해야 합니다. getAIList 결과에서 얻을 수 있는 AI 이름으로 'init(...)' 함수를 호출합니다. AIPlayer를 초기화하기 위해 aiName과 크기, 위치 및 속도를 입력합니다. AIPlayer는 전달된 매개 변수에 따라 AI 리소스를 로드하기 시작합니다.

- 이벤트, 오류 및 진행 상황을 모니터링하기 위해 'init'를 호출하기 전에 콜백을 설정합니다.
이 [page](../apis/aiplayer-data.md )와 [page](../apis/aiplayer-callback.md )를 참조하십시오.

```javascript
  AI_PLAYER.onAIPlayerEvent = function (aiEvent) {
    // TODO: event handling 
    console.log("AI onAIPlayerEvent :", aiEvent);
  };

  AI_PLAYER.onAIPlayerLoadingProgressed = function (result) {
    // TODO: loading handling
    console.log("AI onAIPlayerLoadingProgressed :", result);
  };

  AI_PLAYER.onAIPlayerErrorV2 = function (aiError) {
    // TODO: error handling
    console.log("AI onAIPlayerErrorV2 :", aiError);
  };
```

- aiName, 크기, 위치, 속도를 사용하여 AIPlayer 초기화

```javascript
  const result = await AI_PLAYER.init({
    aiName: "...", size: 1.0, left: 0, top: 0, speed: 1.0
  });
```


<br/>

### 5. AIPlayer 자원 해제

AIPlayer를 종료하거나 제거하려는 경우 'release()'를 호출하여 리소스를 해제해야 합니다.

```javascript
  AI_PLAYER.release();
```
