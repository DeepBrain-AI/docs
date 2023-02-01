---
sidebar_position: 3
---

# AIPlayer Resources and States

Check if resource is fully loaded in AIPlayer

## Start loading resources

If init(config, listener) is called after object creation, resource loading starts according to **aiName** indicated, and the resource loading status is reported to the registered listener (IAIPlayerCallback). (Initially, it may take several minutes for the resource to finish loading.)

## Monitor the player's resource loading status with IAIPlayerCallback

First, the listener's onAIStateChanged(AIStatePublisher.AIState state) method is called, and the related AIState.state values are as follows. You can also implement loading progress with onAIPlayerResLoadingProgressed(int current, int total) .

- AIState.RES_LOAD_STARTED : when loading starts
- AIState.RES_LOAD_COMPLETED : when loading finished

If there is any problem during this process, the onAIPlayerError() method is called. For example, the expiration of the authentication token could be an issue. An appropriate action is required depending on the situation.

- AIError.SDK_API_ERR : Error in API part receiving information such as authentication process.
  
  **Ex) 1402 error (value token expired): Token refresh required -> Recall AIModelInfoManager.generateToken method**

You can also implement loading progress with onAIPlayerResLoadingProgressed(int current, int total) .

```java
 private IAIPlayerCallback iAIPlayerCallback = new IAIPlayerCallback() {

    //monitor the loading progress
    @Override
    public void onAIPlayerResLoadingProgressed(int current, int total) {
        binding.aiStateTxt.setText("AI resource loading : " + (int)(((float)current)/total*100)+ "%");
    }

    @Override
    public void onAIStateChanged(AIState state) {
        switch (state.state) {
            //...
            case AIState.RES_LOAD_STARTED:
                binding.aiStateTxt.setText("AI starts loading.");
                break;
            case AIState.RES_LOAD_COMPLETED:
                binding.aiStateTxt.setText("AI finishs loading");
                break;
        }
    }

    @Override
    public void onAIPlayerError(AIError error) {
        switch (error.errorType) {
						//...
            case AIError.SDK_API_ERR: 
                binding.aiStateTxt.setText("sdk_ai_Info error:" + error.exInfo);
                    String errorDesc = error.exInfo;
                    if (errorDesc != null) {
                        JSONObject json = null;
                        try {
                             json = new JSONObject(errorDesc);
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }

                        if (json != null && json.optInt(Constants.KEY_ERRORCODE, -1) ==
                                Constants.API_ERRORCODE_AUTH_FAIL) {
                            String err = json.optString(Constants.KEY_ERROR, "");
                            if (err.toLowerCase().contains("token expired")) {
                                //refresh token
                                AIModelInfoManager.generateToken(
                                        AIPlayerDemo.this, "SDK_USER_KEY",
                                        resp -> Log.d("TAG", "Token ref finished " + resp));
                            }
                        }
                    }
                    break;
        }
    }
};
```
