---
sidebar_position: 3
---

# AI Human Demo
:::note related files

- AIPlayerDemo.java

:::

AI Human is an activity that demonstrates various functionalities of AIPlayer through a simple UI. You can select a different AI model, change the scale of AI, change the speech rate, and let the AI speak multiple sentences and take advantage of the preload function.

<p align="center">
<img src="/img/aihuman/android/Screenshot_20221107-120334_AIHumanSDKDemo.jpg" style={{zoom: "25%"}} />
</p>


**First, get a list of available AIs and then set up the UI. Call AIModelInfoManager.generateToken() method if needed. In this sample, it is called in MainActivity.**

```java
/**
 * aiPlayer creation and setup UI.
 */
private void initThis(){
    AIModelInfoManager.getAIList(resp -> {
        /* resp
        {"succeed":true,
         "ai":[{"aiName":"vida","aiDisplayName":"Vida","language":"en", "type:2D"},
                {"aiName":"bret","aiDisplayName":"Bret","language":"en", "type:2D"},
                {"aiName":"danny","aiDisplayName":"Danny","language":"en", "type:2D"},
                {"aiName":"samh","aiDisplayName":"Samh","language":"en", "type:2D"},
                {"aiName":"kang","aiDisplayName":"Kang","language":"ko", "type:2D"}]}
         */

        if (resp != null) {
            if (resp.optBoolean("succeed")) {
                aiPlayer = AIPlayerFactory.create(AIPlayerDemo.this, binding.aiWrapper, AILIVE, null);
                setUpUIWithAIPlayer();
            } else {
                Log.d(TAG, "onFinishedWithList: resp error" + resp.toString());
            }
        } else {
            Log.d(TAG, "onFinishedWithList: resp null");
        }
    });
}
```

**Changing AI**

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

**Examples of speak, pause, resume, and stopSpeaking are shown below**

```java
// UI and AIPlayer's setup 
private void setUpUIWithAIPlayer() {
		//...
		binding.sendTextBtn.setOnClickListener(view -> {
            testMode = TESTMODE_NORMAL;

            if (selectedSpeech != null) {
                if (selectedAIGesture != null) {
                    aiPlayer.send(AIClipSetFactory.CreateClip(
                            selectedAIGesture.getName(), selectedSpeech, null));
                } else {
                    aiPlayer.send(
                            AIClipSetFactory.CreateClip(null, selectedSpeech, null));
                }
            } else {
                if (selectedAIGesture != null){
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

**Callback of AI shown below**

```java
private IAIPlayerCallback iAIPlayerCallback = new IAIPlayerCallback() {
				//...
        @Override
        public void onAIStateChanged(AIState state) {
            switch (state.state) {
								//...
                case AIState.SPEAKING_STARTED:
                    binding.aiStateTxt.setText("AI started speaking");
                		//...
                    break;
                case AIState.SPEAKING_COMPLETED:
                    binding.aiStateTxt.setText("AI finished speaking");
                    //...
                    break;
            }
        }   
  
		@Override
    public void onAIPlayerError(AIError error) {
					//...
        switch (error.errorType) {
            case AIError.SOCKET_ERR:
                binding.aiStateTxt.setText("Socket error :" + error.exInfo);
                break;
            //...
        }
    }
};
```
