---
sidebar_position: 3
---

# 이벤트 확인하기

## AI Human 리소스 로딩 시작 

AIPlayer 객체 생성 후 init(config, listener)을 호출하면 지시한 **aiName에** 따라, 리소스 로딩이 시작되고 등록된 listener(IAIPlayerCallback)에 리소스 로딩 상태가 보고된다. (최초에는 리소스 로드 완료까지 수분이 걸릴수 있다.)

## IAIPlayerCallback으로 플레이어의 리소스 로딩 상태 모니터링

먼저 listener의 onAIPlayerEvent(AIEvent event)메소드가 호출된다. AIEvent.type값은 어떤 이벤트가 발생했는지를 의미한다(아래의 리스트를 확인). 또한 onAIPlayerResLoadingProgressed(int current, int total) 으로 로딩 프로그레스를 구현할수 있다.

- AIEvent.AIPLAYER_STATE_CHANGED : AIPlayer의 상태가 변할때. (AIPlayerState enum과 getState() 메소드 확인)
- AIEvent.RES_LOAD_STARTED : 로딩 시작시 
- AIEvent.AI_CONNECTED : AI가 연결되어 send 또는 preload를 할수 있을 때 
- AIEvent.AI_DISCONNECTED : AI 연결이 끊어졌고 send 또는 preload를 할수 없을 때 
- AIEvent.RES_LOAD_COMPLETED : AI가 로딩을 마치고 모든 준비가 끝났을 때

이 과정에서 혹시 문제가 생기면 onAIPlayerError() 메소드가 호출된다. 예를 들면 인증 토큰의 만료등의 내용이 올수 있다. 상황에 따라 적절한 대응이 필요하다. AIError.code 값은 범위로 카테고리화 할수 있다. 아래의 샘플 코드를 참조. 

- AIError.AI_INIT_ERR : AI 로딩 및 초기화 오류 
- AIError.AI_API_ERR : 인증과 같은 API 정보 받기 부분에서 오류 
- AIError.AI_RES_ERR : AI 리소스를 다운받을때 오류 
  
  **Ex) 1402에러(값 token expired) : 토큰 리프레쉬 필요 -> AIModelInfoManager.generateToken 메소드 재호출**

```java
private IAIPlayerCallback iAIPlayerCallback = new IAIPlayerCallback() {

    @Override
    public void onAIPlayerResLoadingProgressed(int current, int total) {
        binding.aiStateTxt.setText(getString(R.string.ai_resource_loading)
                + " : " + (int) (((float) current) / total * 100) + "%");
    }

    @Override
    public void onAIPlayerEvent(AIEvent event) {
        Log.d(TAG, "onAIPlayerEvent: " + event);

        switch (event.type) {
            //...
            case AIPLAYER_STATE_CHANGED:
                onAIStateChanged();
                break;
            case AI_CONNECTED:
                binding.aiStateTxt.setText(getString(R.string.ai_connected));
                break;
            case AI_DISCONNECTED:
                binding.aiStateTxt.setText(getString(R.string.ai_has_a_problem_and_is_recovering));
                break;
            case RES_LOAD_STARTED:
                binding.aiStateTxt.setText(getString(R.string.ai_resource_loading_started));
                break;
            case RES_LOAD_COMPLETED:
                binding.aiStateTxt.setText(getString(R.string.ai_is_all_set));
                break;
        }
    }

    @Override
    public void onAIPlayerError(AIError error) {
        Log.d(TAG, "onAIPlayerError: " + error);

        enableAllUI(true); //reset ui

        if (error.code >= AIError.RESERVED_ERR) {
            //You've got reserved error. Check up the error list!
            binding.aiStateTxt.setText("RESERVED_ERR :" + error.message);
        } else if (error.code >= AIError.AI_INIT_ERR) {
            binding.aiStateTxt.setText("AI_INIT_ERR :" + error.message);
        } else if (error.code >= AIError.AI_RES_ERR) {
            binding.aiStateTxt.setText("AI_RES_ERR :" + error.message);
        } else if (error.code >= AIError.AI_SERVER_ERR) {
            binding.aiStateTxt.setText("AI_SERVER_ERR :" + error.message);
        } else if (error.code >= AIError.AI_API_ERR) {
            binding.aiStateTxt.setText("AI_API_ERR :" + error.message);
        } else if (error.code > AIError.UNKNOWN_ERR) { //0 ~ 9999
            binding.aiStateTxt.setText("BACKEND_ERR :" + error.message);

            if (error.code == 1402) { //refresh token
                AIModelInfoManager.generateToken(AIPlayerDemo.this,
                        getString(R.string.appid),
                        getString(R.string.userkey),
                        (aiError, resp) -> binding.aiStateTxt.setText("Token ref finished " + resp));
            }
        } else {
            binding.aiStateTxt.setText("UNKNOWN_ERR :" + error.message);
        }
    }
};
```
