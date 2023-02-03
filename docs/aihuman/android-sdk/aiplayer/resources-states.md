---
sidebar_position: 3
---

# AIPlayer Resources and States

## Start loading resources

If init(config, listener) is called after AIPlayer instance creation, resource loading starts according to **aiName** indicated, and the resource loading status is reported to the registered listener (IAIPlayerCallback). (Initially, it may take several minutes for the resource to finish loading.)

## Monitor the player's resource loading status with IAIPlayerCallback

After calling the 'init' method, the listener's onAIPlayerEvent(AIEvent event) method will be called with AIEvent. The AIEvent.type indicated which event are occured(Check below list). You can also implement loading progress with onAIPlayerResLoadingProgressed(int current, int total) while loading.

- AIEvent.AIPLAYER_STATE_CHANGED : when AIPlayer's state changed. (Check AIPlayerState and getState() method)
- AIEvent.RES_LOAD_STARTED : when loading starts
- AIEvent.AI_CONNECTED : when ai is connected and able to send or preload AIClipSet to speak.
- AIEvent.AI_DISCONNECTED : when ai is disconnected from the system and not able to send or preload
- AIEvent.RES_LOAD_COMPLETED : when loading and setup finished and every thing is ready.

If there is any problem during this process, the onAIPlayerError(AIError error) method is called. For example, the expiration of the authentication token could be an example. An appropriate action is required depending on the situation. The AIError.code values can be categorized by range. Check the sample code below.

- AIError.AI_INIT_ERR : Error while initializing an AI. 
- AIError.AI_API_ERR : Error in API part receiving information such as authentication process.
- AIError.AI_RES_ERR : Error while downloading resource for AI.
  
  **Ex) 1402 error (value token expired): Token refresh required -> Recall AIModelInfoManager.generateToken method**

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
