---
sidebar_position: 3
---

# AI Human Demo
:::note related files

- AIPlayerDemo.java

:::

AIPlayerDemo is an activity that demonstrates various functionalities of AIPlayer through a simple UI. You can select a different AI model, change the scale of AI, change the speech speed, and let the AI speak multiple sentences and take advantage of the preload function.

<p align="center">
<img src="/img/aihuman/android/Screenshot_20221107-120334_AIHumanSDKDemo.jpg" style={{zoom: "25%"}} />
</p>


**First, get the list of available AIs and then initialize with an AI. Call AIModelInfoManager.generateToken() method for authentication if needed. In this sample, it is called in MainActivity already.**

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

**Change AI**

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

**Speak a sentence**

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

**Callback of AI**

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
