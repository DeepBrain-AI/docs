---
sidebar_position: 6
---

# with Unity 3D Character

:::note related files

- UnityActivity.java

:::

3D Character is implemented in AI Human. Basically, it provides the same UI with AIPlayerDemo's and you can test it. This activity should use different than default process. (Check out the AndroidManifest.xml's activity process settings.)

You can change to other 3d models and it can speak with gestures.

<p align="center">
<img src="/img/aihuman/android/Screenshot_20221107-120426_AIHumanSDKDemo.jpg" style={{zoom: "25%"}} />
</p>

To use 3D character, the activity should extends UnityPlayerActivity and should implement IUnityPlayerCallback interface. **In the 'UnityToAndroid(String param) method which is IUnityPlayerCallback, 'mAI3DPlayer.UnityToAndroid(param)' must be called.**

```java
public class UnityActivity extends UnityPlayerActivity implements IUnityPlayerCallback {
  
    @Override
    public void UnityToAndroid(String param) {
      Log.d(TAG, "param:" + param);
      mAI3DPlayer.UnityToAndroid(param);
    }
}
```

**Set up AndroidManifest.xml for UnityPlayerActivity**
As mentioned in project setup, UnityPlayerActivity needs AndroidManifest.xml setup. Please refer this [link](../getting-started/projectsetup.md). 


**Next, to setup UnityPlayerActivity, we need to set currentActivity, mUnityPlayer on ' onCreate(...)'.** On 'createAI3DPlayer()', the  mAI3DPlayer is instanciated and it is 3D character loadable Player which extends from UnityPlayer and we can make the character speak using it.

```java
private AI3DPlayer mAI3DPlayer;
//call from unity. Should be static and don't change name
public static UnityActivity currentActivity;

@Override
protected void onCreate(Bundle savedInstanceState) {
    requestWindowFeature(Window.FEATURE_NO_TITLE);
    super.onCreate(savedInstanceState);

    binding = UnityActivityBinding.inflate(getLayoutInflater());
    setContentView(binding.getRoot());

    initSDKAuthInfoVars();

    currentActivity = this;

    String cmdLine = updateUnityCommandLineArguments(getIntent().getStringExtra("unity"));
    getIntent().putExtra("unity", cmdLine);

    createAI3DPlayer();

    initThis();
}

private void createAI3DPlayer() {
    mUnityPlayer = new AI3DPlayer(UnityActivity.this, binding.unityWrapper, UnityActivity.this);
    mAI3DPlayer = (AI3DPlayer) mUnityPlayer;
    mAI3DPlayer.requestFocus();
}
```



After receiving the usable AI list, we set up the UI. (Only 3D characters for this time).  **UnityPlayerActivity needs its own process. So, call AIModelInfoManager.generateToken() first to get the data correctly.** 

```java
private void initThis() {
    AIModelInfoManager.generateToken(this, appId, userkey, (aiError, resp) -> {
        if (aiError == null) {
            AIModelInfoManager.getAIList((aiError1, resp1) -> {
                if (aiError1 == null) {
                    setUpUIWithAIPlayer();
                } else {
                    Log.d(TAG, "initThis: getAIList error:" + aiError1);
                    Toast.makeText(UnityActivity.this, "getAIList error : " + aiError1.message, Toast.LENGTH_SHORT).show();
                }
            });
        } else {
            Log.d(TAG, "initThis: generateToken error:" + aiError);
            Toast.makeText(UnityActivity.this, "Auth failed : " + aiError.message, Toast.LENGTH_SHORT).show();
        }
    });
}
```



**changing current AI.**

```java
binding.aiSelectSpinner.setAdapter(new ArrayAdapter<>(UnityActivity.this,
                android.R.layout.simple_spinner_dropdown_item, getAIDispNames()));
        binding.aiSelectSpinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {
                Log.d(TAG, "aiSelectSpinner onItemSelected: " + i);

                curAIPlayerSettings = getAIPlayerSettings()[i];

//                test
//                customize character when loading ===========
//                JSONObject customizeDefault = new JSONObject();
//                JSONObject customizeInfo = new JSONObject();
//                try {
//                    customizeDefault.put("hair", "short");
//                    customizeDefault.put("shoes", "black");
//                    customizeDefault.put("clothset", "suit_pants"); //set_name
//                    customizeInfo.put("customize_default", customizeDefault);
//                } catch (JSONException e) {
//                    e.printStackTrace();
//                }
//                curAIPlayerSettings.customizeDefaultFor3D = customizeDefault;
//                =========== add customize customize_default

                mAI3DPlayer.init(curAIPlayerSettings, iAiPlayerCallback);

                binding.scaleSeekbar.setProgress((int) ((curAIPlayerSettings.aiScale - 0.5) * 100));
            }

            @Override
            public void onNothingSelected(AdapterView<?> adapterView) {
            }
        });
```


The speak, pausePlay, resumePlay, stopSpeaking examples are below. **The 'preload' method does not work for 3D character.**

```java
private void setUpUIWithAIPlayer() {
    //...
    binding.sendTextBtn.setOnClickListener(view -> {
            if (selectedSpeech != null) {
                if (selectedAIGesture != null) {
                    mAI3DPlayer.send(AIClipSetFactory.CreateClip(
                            selectedAIGesture.getName(), selectedSpeech, null));
                } else {
                    mAI3DPlayer.send(AIClipSetFactory.CreateClip(
                            null, selectedSpeech, null));
                }
            } else {
                if (selectedAIGesture != null) {
                    mAI3DPlayer.send(AIClipSetFactory.CreateClip(
                            selectedAIGesture.getName(), selectedSpeech, null));
                } else {
                    //no gesture, no speech
                    Toast.makeText(UnityActivity.this, R.string.please_select_a_speech, Toast.LENGTH_SHORT).show();
                }
            }
        });

    binding.pauseBtn.setOnClickListener(View -> mAI3DPlayer.pausePlay());

    binding.resumeBtn.setOnClickListener(View -> mAI3DPlayer.resumePlay());

    binding.stopBtn.setOnClickListener(View -> mAI3DPlayer.stopSpeaking());

    binding.multiSendBtn.setOnClickListener(View -> {
                if (sampleText != null && sampleText.size() > 2) {
                    mAI3DPlayer.send(new String[]{sampleText.get(1), sampleText.get(2)});
                } else {
                    Toast.makeText(this, "Speeches not ready", Toast.LENGTH_SHORT).show();
                }
            }
        );
}
```



**AI's callback.** 

```java
private final IAIPlayerCallback iAiPlayerCallback = new IAIPlayerCallback() {

        @Override
        public void onAIPlayerResLoadingProgressed(int current, int total) {
            //not support
        }

        @Override
        public void onAIPlayerEvent(AIEvent event) {
            Log.d(TAG, "onAIPlayerEvent: " + event);

            switch (event.type) {
                case AIPLAYER_STATE_CHANGED:
                    onAIStateChanged();
                    break;
                case AI_CONNECTED:
                    binding.aiStateTxt.setText(getString(R.string.ai_is_all_set));

                    initCharRotationAndPosition();

                    resetCustomVoiceLanguageSpinner();
                    resetGestureSpinner();
                    JSONArray arrPartsTypes = mAI3DPlayer.getAvailableCustomizePartsTypes();
//                    test
//                    JSONArray arrPartsTypes = new JSONArray();
//                    arrPartsTypes.put("hair");
//                    arrPartsTypes.put("shoes");
//                    arrPartsTypes.put("clothset");
                    if (arrPartsTypes != null) {
                        for (int i = 0; i < arrPartsTypes.length(); i++) {
                            resetChangePartsSpinner(arrPartsTypes.optString(i));
                        }
                    }
                    break;
                case AI_DISCONNECTED:
                    binding.aiStateTxt.setText(getString(R.string.ai_has_a_problem_and_is_recovering));
                    break;
                case RES_LOAD_STARTED:
                    binding.aiStateTxt.setText(getString(R.string.ai_resource_loading_started));
                    break;
                case RES_LOAD_COMPLETED:
                    Log.d(TAG, "onAIPlayerEvent: RES_LOAD_COMPLETED :" + mAI3DPlayer.getAIName());
                    binding.aiStateTxt.setText(getString(R.string.ai_resource_loading_completed));
                    break;
                case AICLIPSET_PLAY_PREPARE_STARTED:
                    binding.aiStateTxt.setText(getString(R.string.ai_started_preparation_to_speak));
                    Log.d(TAG, "onAIPlayerEvent: SPEAKING_PREPARE_STARTED :" + event.clipSet);
                    break;
                case AICLIPSET_PLAY_PREPARE_COMPLETED:
                    binding.aiStateTxt.setText(getString(R.string.ai_finished_preparation_to_speak));
                    Log.d(TAG, "onAIPlayerEvent: SPEAKING_PREPARE_COMPLETED :" + event.clipSet);
                    break;
                case AICLIPSET_PLAY_STARTED:
                    binding.aiStateTxt.setText(getString(R.string.ai_started_speaking));
                    Log.d(TAG, "onAIPlayerEvent: SPEAKING_STARTED :" + event.clipSet);
                    break;
                case AICLIPSET_PLAY_COMPLETED:
                    binding.aiStateTxt.setText(getString(R.string.ai_finished_speaking));
                    Log.d(TAG, "onAIPlayerEvent: SPEAKING_COMPLETED :" + event.clipSet);
                    break;
            }
        }

        @Override
        public void onAIPlayerError(AIError error) {
            Log.d(TAG, "onAIPlayerError: " + error);

            enableAllUI(true);

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
            } else if (error.code > AIError.UNKNOWN_ERR) {
                binding.aiStateTxt.setText("BACKEND_ERR :" + error.message);

                if (error.code == 1402) { //refresh token
                    AIModelInfoManager.generateToken(UnityActivity.this,
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
