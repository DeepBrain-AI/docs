---
sidebar_position: 6
---

# Unity 3D 캐릭터 활용

:::note 관련 파일

- UnityActivity.java

:::

3D 캐릭터를 이용하여 AI Human을 구현하였다. 기본적으로 AIPlayerDemo와 동일한 UI를 제공하여 3D캐릭터를 사용해볼수 있다.  주의할 점으로는 이 액티비티의 프로세스가 기본 프로세스와 달라야한다. (AndroidManifest.xml의 activity process 설정 주의)

다른 AI 모델로 변경해볼 수도 있으며, 일반 발화외에 제스처를 사용할 수도 있다.

<p align="center">
<img src="/img/aihuman/android/Screenshot_20221107-120426_AIHumanSDKDemo.jpg" style={{zoom: "25%"}} />
</p>


3D 캐릭터를 사용하기 위해서는 UnityPlayerActivity를 상속받아야 하며, IUnityPlayerCallback 인터페이스를 구현하여야한다.**IUnityPlayerCallback의 인터페이스인 UnityToAndroid(String param)에서는 아래와 같이 mAI3DPlayer.UnityToAndroid(param)을 반드시 호출해야한다.**

```java
public class UnityActivity extends UnityPlayerActivity implements IUnityPlayerCallback {
  
    @Override
    public void UnityToAndroid(String param) {
      Log.d(TAG, "param:" + param);
      mAI3DPlayer.UnityToAndroid(param);
    }
}
```

**UnityPlayerActivity를 위한 AndroidManifest.xml의 설정**
프로젝트 셋업 과정에서도 언급하였지만 UnityPlayerActivity는 AndroidManifest.xml에 셋업이 필요하다. [링크](../getting-started/projectsetup.md)를 참조한다. 


**이후 UnityPlayerActivity 셋업을 위해 onCreate(...)에서 currentActivity, mUnityPlayer를 설정해준다.** createAI3DPlayer()에서 mAI3DUnityPlayer는 UnityPlayer를 상속받아 3D 캐릭터들을 로드할수 있는 Player이며 이후 이 객체를 사용하여 발화시키는 가장 중요한 클래스이다.

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

AI3DPlayer를 생성한후 사용 가능한 AI 리스트 가져온 후 UI를 셋업한다. 3D 캐릭터들만 가져오도록 셋업한다. **UnityPlayerActivity는 따로 프로세스가 필요하므로 AIModelInfoManager.generateToken()을 호출하여 새값을 가져와야한다.** 

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



**AI를 바꾸는 부분은 다음과 같다.**

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


현재 AI 에게 발화시키기, 일시정지, 재시작, 그만 말하기의 예제는 아래와 같다. **3d 캐릭터의 경우 preload는 동작하지 않는다.**

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



**AI의 콜백은 다음과 같다.** 

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
