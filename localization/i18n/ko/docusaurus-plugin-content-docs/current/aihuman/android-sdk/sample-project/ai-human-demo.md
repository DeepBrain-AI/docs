---
sidebar_position: 3
---

# AI Human 데모
:::note 관련 파일

- AIPlayerDemo.java

:::

AIPlayerDemo 액티비티는 AIPlayer의 다양한 기능들을 UI를 통해 시연해볼수 있는 액티비티이다. 일단 다른 AI 모델로 변경해볼 수도 있다. 또한 AI의 Scale을 변경하여 화면내에서 적절한 크기를 잡을수 있다. 말하기 속도 변경 또 여러 문장 말시키기와 프리로드 기능도 사용해볼수 있다. 

<p align="center">
<img src="/img/aihuman/android/Screenshot_20221107-120334_AIHumanSDKDemo.jpg" style={{zoom: "25%"}} />
</p>


**먼저 사용 가능한 AI 리스트 가져온 후 하나의 AI를 셋업한다. 필요한 경우 AIModelInfoManager.generateToken()을 먼저 호출한다. Sample에서는 MainActivity에서 먼저 호출하였다.**

```java
/**
     * aiPlayer creation. Gives AILIVE type to {@link AIPlayerFactory}
     */
    private void initThis() {
        //AIPlayer.enableLog(true); Enable log.

        AIModelInfoManager.getAIList((aiError, resp) -> {
            /* resp
            {"succeed":true,
             "ai":[{"aiName":"vida","aiDisplayName":"Vida","language":"en"},
                    {"aiName":"bret","aiDisplayName":"Bret","language":"en"},
                    {"aiName":"danny","aiDisplayName":"Danny","language":"en"},
                    {"aiName":"samh","aiDisplayName":"Samh","language":"en"},
                    {"aiName":"kang","aiDisplayName":"Kang","language":"ko"}]}
             */

            if (aiError == null) {
                setUpUIWithAIPlayer();
            } else {
                Log.d(TAG, "onFinishedWithList: getAILit error: " + aiError);
            }
        });
    }
```

**현재 AI를 바꾸는 부분은 다음과 같다.**

```java
// UI and AIPlayer's setup 
private void setUpUIWithAIPlayer() {
		//...		
    binding.aiSelectSpinner.setAdapter(new ArrayAdapter<>(AIPlayerDemo.this,
                android.R.layout.simple_spinner_dropdown_item, getAIDispNames()));
        binding.aiSelectSpinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {
                curAIPlayerSettings = getAIPlayerSettings()[i];
                aiPlayer.init(curAIPlayerSettings, iAIPlayerCallback);

                binding.scaleSeekbar.setProgress((int) ((curAIPlayerSettings.aiScale - 0.5) * 100));
            }

            @Override
            public void onNothingSelected(AdapterView<?> adapterView) {
            }
        });
   //...
}
```

**현재 AI 에게 발화시키기 예제는 아래와 같다.** 

```java
// UI and AIPlayer's setup 
private void setUpUIWithAIPlayer() {
		//...
		bbinding.sendTextBtn.setOnClickListener(view -> {
            testMode = TESTMODE_NORMAL;

            if (selectedSpeech != null) {
                if (selectedAIGesture != null) {
                    aiPlayer.send(AIClipSetFactory.CreateClip(
                            selectedAIGesture.getName(), selectedSpeech, null));
                } else {
                    aiPlayer.send(AIClipSetFactory.CreateClip(
                            null, selectedSpeech, null));
                }
            } else {
                if (selectedAIGesture != null) {
                    aiPlayer.send(AIClipSetFactory.CreateClip(
                            selectedAIGesture.getName(), selectedSpeech, null));
                } else {
                    //no gesture, no speech
                    Toast.makeText(AIPlayerDemo.this, R.string.please_select_a_speech, Toast.LENGTH_SHORT).show();
                }
            }
        });
   	//...
}
```

**AI 동작의 콜백 받기는 다음과 같다.** 

```java
private IAIPlayerCallback iAIPlayerCallback = new IAIPlayerCallback() {
        //...

        @Override
        public void onAIPlayerEvent(AIEvent event) {
            Log.d(TAG, "onAIPlayerEvent: " + event);

            switch (event.type) {
                //...
                case AICLIPSET_PLAY_PREPARE_STARTED:
                    binding.aiStateTxt.setText(getString(R.string.ai_started_preparation_to_speak));
                    Log.i(TAG, "AI started preparing to speak. speech :"
                            + event.getSpeechText() + " gesture:" + event.getGesture());
                    break;
                case AICLIPSET_PLAY_PREPARE_COMPLETED:
                    binding.aiStateTxt.setText(getString(R.string.ai_finished_preparation_to_speak));
                    Log.i(TAG, "AI finished preparing to speak. speech :"
                            + event.getSpeechText() + " gesture:" + event.getGesture());
                    break;
                case AICLIPSET_PLAY_STARTED:
                    binding.aiStateTxt.setText(getString(R.string.ai_started_speaking));
                    Log.d(TAG, "AI started speaking. normal state: "
                                + event.getSpeechText() + " gesture:" + event.getGesture());
                    break;
                case AICLIPSET_PLAY_COMPLETED:
                    binding.aiStateTxt.setText(getString(R.string.ai_finished_speaking));
                    Log.d(TAG, "finished speaking. normal state: " + event.getSpeechText() +
                                " gesture:" + event.getGesture());
                    break;
            }
        }

        @Override
        public void onAIPlayerError(AIError error) {
            Log.d(TAG, "onAIPlayerError: " + error);

            if (error.code >= AIError.RESERVED_ERR) {
                //You've got reserved error. Check up the error list!
                binding.aiStateTxt.setText("RESERVED_ERR :" + error.message);
            } else if (error.code >= AIError.AICLIPSET_PLAY_ERR) {
                binding.aiStateTxt.setText("AICLIPSET_PLAY_ERR :" + error.message);
            } else if (error.code >= AIError.AICLIPSET_PRELOAD_ERR) {
                binding.aiStateTxt.setText("AICLIPSET_PRELOAD_ERR :" + error.message);
            } else if (error.code >= AIError.INVALID_AICLIPSET_ERR) {
                binding.aiStateTxt.setText("INVALID_AICLIPSET_ERR :" + error.message);
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
