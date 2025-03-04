---
sidebar_position: 2
---

# AIPlayer(AI3DPlayer) Set up

:::info AIPlayer(AI3DPlayer) Full setup process (4 steps)

- Step 1: Authenticate SDK user. (Callback returns failure if appId and userKey are not valid.)
- Step 2: Get a list of available AIs. (Failure is returned if authentication is not performed.)
- Step 3: Create and return the AIPlayer.
- Step 4: Initialize the AIPlayer with one of the AI models.

:::

<br/>

### Step 1. Authenticate SDK user

In order to use AIPlayer, first of all, it is necessary to check if the user is authenticated. The first step for user authentication is to obtain userkey. Userkey is a unique string generated by DeepBrain AI and should never be disclosed. If you call the API using this authentication key, you will receive available Default AI data.

The authentication method AIModelInfoManager.generateToken(,,,) takes userKey as a parameter. How to obtain the Userkey is explained [here](../getting-started/first-aihuman.md). When this method is called, it registers a listener and receives response. The response is delivered to the listener as an argument. More precisely, it is passed to onFinishedWithList(JSONObject resp). resp contains defaultAI info that can be used immediately. If the token expired and a token refresh is required, calling this API will refresh it.

It is recommended to call this method as soon as possible (onCreate of Launcher activity, etc.) in a network available state after app startup.

**To use AI3DPlayer within UnityActivity, AIModelInfoManager.generateToken() should be called again. The process is different (unity) and the values are not shared between them.**   

```java
AIModelInfoManager.generateToken(this, appId, userkey, (aiError, resp) -> {
      /* resp{
          "succeed":true,
          "defaultAI": {"ai_name":...}
          */

      if (aiError == null) {
          //create aiplayer inside aiWrapper
          aiPlayer = AIPlayerFactory.create(AILiveQuickStart.this, binding.aiWrapper, AILIVE, null);

          //init with default ai
          AIModelInfo defaultAI = AIModelInfoManager.getDefaultAIModelInfo();
          AIPlayerSettings aiSettings = new AIPlayerSettings(defaultAI.getName(), AILIVE, 0.8f, 40, 1);
          aiPlayer.init(aiSettings, iAiPlayerCallback);
      } else {
          Log.d(TAG, "onCreate: generateToken error:" + aiError);
      }
  });
```




<br/>

### Step 2. Get the list of available AIs

AIModelInfoManager authenticates and returns the authentication result. To check which AIs can be used after authentication, call the following method after  authentication succeeds. If there is no AI available or if this value is checked before authentication, null is returned.

```java
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
```



**Checking AI names that can be used after authentication**

```java
//2D or 3D selection
JSONArray arr = AIModelInfoManager.getReceivedAIWithType("2D");
```

<br/>

### Step 3. Create, use and release the AIPlayer when done using it

After checking the authentication and available AIs in steps 1 and 2, initialize an AIPlayer instance. It can be created by using a constructor or factory method.

The constructor argument 'context' refers to the activity that will contain the AIPlayer(extends View), and 'parent' specifies the parent view to which the AIPlayer will be added. All layout parameters (width, height) of AIPlayer are set to match_parent. Currently, only AIHuman is available for type.

**How to create AIPlayer is as follows.**

```java
IAIPlayer aiPlayer = new AIPlayer(context, parent);

//Or use factory method 
//IAIPlayer aiPlayer = AIPlayerFactory.create(context, parent, UNITY, null);

//for 3d char
//mUnityPlayer = new AI3DPlayer(UnityActivity.this,
//                findViewById(R.id.unity_wrapper), UnityActivity.this);
//mAI3DPlayer = (AI3DPlayer) mUnityPlayer;
```

**Release (Giving Back Resources)**

When it is done (onDestroy), the resource must be returned by calling aiPlayer.release().

```java
@Override
protected void onDestroy() {
    super.onDestroy();

    if (aiPlayer != null) {
        aiPlayer.release();
    }
}
```


<br/>

### Step 4. Initialize AIPlayer to your desired AI

In order to change AI models, you need to initialize AIPlayer with a configuration class AIPlayerSettings. By updating the aiName field of the AIPlayerSettings, you can change the AI model to your desired AI. Call the init(......) method of AIPlayer with the AIPlayerSettings config as shown below. In this way, aiPlayer downloads relevant resources and updates to an operable state. In addition, the status can be reported to the registered callback.

```java
//AIPlayer created 
IAIPlayer aiPlayer = new AIPlayer(context, parent);

//set aiName and init.
AIPlayerSettings config = new AIPlayerSettings(
                   aiName, IAIPlayer.AIPlayerType.AIHuman, .8f, 80, 1f);
//set iAIPlayerCallback for callback.
aiPlayer.init(config, iAIPlayerCallback);

//for 3d 
//mUnityPlayer = new AI3DPlayer(UnityActivity.this,
//                findViewById(R.id.unity_wrapper), UnityActivity.this);
//        mAI3DPlayer = (AI3DPlayer) mUnityPlayer;
//AIPlayerSettings curAIPlayerSettings = new AIPlayerSettings(
//                    ai.optString(Constants.KEY_AINAME), UNITY, 1.f, 0, 1f);
// mAI3DPlayer.init(curAIPlayerSettings, iAiPlayerCallback);
```

The config(AIPlyerSettings) argument to the init method of AIPlayer is the player settings. The aiName of the AIPlyerSettings class determines which ai to use. aiplayerType is currently only available for AIHuman. AiScale defaults to 0.8 and aiTopMargin is the distance from the top (default 80px). AiSpeed refers to speech rate (default 1). The callback argument to the init method is a listener that monitors the state change, loading state, and error of AIPlayer.

**For 3D Character, Additional Setup is needed. Refer this [link](../sample-project/with-3d-character.md)**
