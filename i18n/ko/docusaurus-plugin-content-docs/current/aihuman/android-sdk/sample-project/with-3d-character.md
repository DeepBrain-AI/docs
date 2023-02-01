---
sidebar_position: 6
---

# with Unity 3D Character

:::note related files

- UnityActivity.java

:::

3D Character is implemented in AI Human. Basically, it provides the same UI with AIPlayerDemo's and you can test it. The activity should use different process. (Check out the AndroidManifest.xml's activity settings.)

You can change to other 3d models and it can speak with gestures.

<p align="center">
<img src="/img/aihuman/android/Screenshot_20221107-120426_AIHumanSDKDemo.jpg" style={{zoom: "25%"}} />
</p>

To use 3D character, the activity should extends UnityPlayerActivity and should implement IUnityPlayerCallback interface. **In the 'UnityToAndroid(String param) method which is IUnityPlayerCallback, 'mAI3DUnityPlayer.UnityToAndroid(param)' must be called.**

```java
public class UnityActivity extends UnityPlayerActivity implements IUnityPlayerCallback {
  
	@Override
  public void UnityToAndroid(String param) {
      Log.d(TAG, "param:" + param);
      mAI3DPlayer.UnityToAndroid(param);
    }
}
```



**Next, to setup UnityPlayerActivity, we need to set currentActivity, mUnityPlayer on ' onCreate(...)'.** On 'createAI3DPlayer()', the  mAI3DUnityPlayer is instanciated and it is 3D character loadable Player which extends from UnityPlayer and we can make the character speak using it.

```java
private AI3DPlayer mAI3DPlayer;
//call from unity. Should be static and don't change name
public static UnityActivity currentActivity;

@Override protected void onCreate(Bundle savedInstanceState)
{
    requestWindowFeature(Window.FEATURE_NO_TITLE);
    super.onCreate(savedInstanceState);

    binding = UnityActivityBinding.inflate(getLayoutInflater());
    setContentView(binding.getRoot());

    currentActivity = this;

    String cmdLine = updateUnityCommandLineArguments(getIntent().getStringExtra("unity"));
    getIntent().putExtra("unity", cmdLine);

    createAI3DPlayer();

    initThis();
}

private void createAI3DPlayer() {
        mUnityPlayer = new AI3DPlayer(UnityActivity.this,
                findViewById(R.id.unity_wrapper), UnityActivity.this);
        mAI3DPlayer = (AI3DPlayer) mUnityPlayer;
        mAI3DPlayer.requestFocus();
}
```



After receiving the usable AI list, we set up the UI. (Only 3D characters for this time).  **UnityPlayerActivity needs its own process. So, call AIModelInfoManager.generateToken() first to get the data correctly.** 

```java
private void initThis() {
        AIModelInfoManager.generateToken(this, "appId", "yourUserKey", new AIModelInfoManager.IAuthListener() {
            @Override
            public void onFinished(JSONObject resp) {
                if (resp != null && resp.optBoolean("succeed")) {
                    AIModelInfoManager.getAIList(new AIModelInfoManager.IAPIListener() {
                        @Override
                        public void onFinishedWithList(JSONObject resp) {
                            if (resp != null) {
                                Log.d(TAG, "getAIList onFinishedWithList: " + resp);

                                if (resp.optBoolean("succeed")) {
                                    setUpUIWithAIPlayer();
                                } else {
                                    Log.d(TAG, "onFinishedWithList: resp error" + resp);
                                }
                            } else {
                                Log.d(TAG, "onFinishedWithList: resp null");
                            }
                        }
                    });
                } else {
                    Toast.makeText(UnityActivity.this, "Auth failed : " + resp, Toast.LENGTH_SHORT).show();
                }
            }
        });
    }
```



**changing current AI.**

```java
private void setUpUIWithAIPlayer() {
		//...		
    binding.aiSelectSpinner.setAdapter(new ArrayAdapter<>(UnityActivity.this,
            android.R.layout.simple_spinner_dropdown_item, getAIDispNames()));
    binding.aiSelectSpinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
        @Override
        public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {
            curAIPlayerSettings = getAIPlayerSettings()[i];

            aiPlayer.init(curAIPlayerSettings, iAIPlayerCallback);
            binding.scaleSeekbar.setProgress((int) ((curAIPlayerSettings.aiScale - 0.5) * 100));
            //...
        }
        //...
    });
   //...
}
```


The speak, pausePlay, resumePlay, stopSpeaking examples are below. **The 'preload' method does not work for 3D character.**

```java
private void setUpUIWithAIPlayer() {
		//...
		binding.sendTextBtn.setOnClickListener(view -> {
    	testMode = TESTMODE_NORMAL;

	     if (selectedSpeech != null) {
                if (selectedAIGesture != null) {
                    mAI3DPlayer.send(AIClipSetFactory.CreateClip(
                            selectedAIGesture.getClipType(), selectedAIGesture.getName(),
                            selectedSpeech, null));
                } else {
                    mAI3DPlayer.send(AIClipSetFactory.CreateClip(
                            AIClipSet.ClipType.CLIP_SPEECH, null, selectedSpeech, null
                    ));
                }
            } else {
                if (selectedAIGesture != null){
                    mAI3DPlayer.send(AIClipSetFactory.CreateClip(
                            selectedAIGesture.getClipType(), selectedAIGesture.getName(),
                            selectedSpeech, null));
                } else {
                    //no gesture, no speech
                    Toast.makeText(UnityActivity.this, R.string.please_select_a_speech,
                            Toast.LENGTH_SHORT).show();
                }
            }
		});

		binding.pauseBtn.setOnClickListener(View -> mAI3DPlayer.pausePlay());
        binding.resumeBtn.setOnClickListener(View -> mAI3DPlayer.resumePlay());
 		binding.stopBtn.setOnClickListener(View -> mAI3DPlayer.stopSpeaking());
		binding.multiSendBtn.setOnClickListener(View -> {
                String[] speeches = getSpeechListForCurAi();
                if (speeches.length > 2) {
                    mAI3DPlayer.send(new String[]{speeches[1], speeches[2]});
                } else {
                    Toast.makeText(this, "Speeches not ready",
                            Toast.LENGTH_SHORT).show();
                }
            }
    );
   	//...
}
```



**AI's callback.** 

```java
private IAIPlayerCallback iAIPlayerCallback = new IAIPlayerCallback() {
    //...
    @Override
    public void onAIStateChanged(AIState state) {
        switch (state.state) {
                            //...
            case AIState.SPEAKING_STARTED:
                binding.aiStateTxt.setText(getString(R.string.ai_started_speaking));
                    //...
                break;
            case AIState.SPEAKING_COMPLETED:
                binding.aiStateTxt.setText(getString(R.string.ai_finished_speaking));
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
