---
sidebar_position: 3
---

# Own your first AI Human

In this chapter, we will quickly look at AIHuman(AIPlayer) setup process and make the default AI say a sentence. When running AIPlayer for the first time, it may take several minutes to load resources depending on the network condition. The progress of this loading process can be monitored.

## 1. Create a project to test and complete the above project setup.

## 2. Create an Activity to include AIPlayer.
Here we create AILiveQuickStart.java.

## 3. Create a layout file.
And make a view(eg. RelativeLayout) as a wrapper for the AIPlayer and set it as the Activity's contentView.

**AI is drawn in parentView fully in vertical way.**

In the sample below, the parentView is obtained with binding.aiWrapper by giving the name aiWrapper using viewBinding. But it doesn't matter if you don't use viewBinding (you can also use it with findViewById())

- Activity Code

```java
import android.os.Bundle;
import androidx.annotation.Nullable;

public class AILiveQuickStart extends AppCompatActivity {
    private IAIPlayer aiPlayer;
    private AILiveQuickStartBinding binding; //using viewBinding 
		
    @Override
  	protected void onCreate(@Nullable Bundle savedInstanceState) {
	   	super.onCreate(savedInstanceState);
	    binding = AILiveQuickStartBinding.inflate(getLayoutInflater());
		  setContentView(binding.getRoot());
  }
}
```

- Layout(ailive_quick_start.xml) file

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">
    ...

    <RelativeLayout
        android:id="@+id/aiWrapper"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_above="@+id/input_lay" />
    ...
</RelativeLayout>
```

## 4. The next step is to authenticate the SDK user.

**Create a project in [SDK Website](https://aitalk.deepbrainai.io), enter appId of Android and click confirm. Then userkey will be issued.**

<img src="/img/aihuman/android/screenshot_quickstart_sdkwebsite.png"/>

**If you insert the issued userKey and call the following method, it will respond in JSON format. If it succeeds, values such as defaultAI information will be received. If it fails, errors will be received.**

```java
AIModelInfoManager.generateToken(this, "appId", "SDK_USER_KEY", resp -> {
    /* resp
    {"succeed":true,
     "token":"eyJhbGciO...","expire":1608032460152,
     "defaultAI":   {"fileN...} 
    */
}

                                 
AIModelInfoManager.generateToken(this, "SDK_USER_KEY", resp -> {
    /* resp
    {"succeed":true,
     "token":"eyJhbGciO...","expire":1608032460152,
     "defaultAI":   {"fileN...} 
    */
}
```

## 5. After authentication is successfully finished, create AIPlayer.
AIPlayer takes the aiWrapper view created above.

```java
//put aiWrapper in the argument and create AIPlayer.
aiPlayer = AIPlayerFactory.create(this, binding.aiWrapper, AIHuman);
```

## 6. After creating AIPlayer, it needs to set which AI to use.
If authentication is successful, it can be set as the default AI.

```java
//set default AI. If authentication fails, defaultAI will be null. 
AIModelInfo defaultAI = AIModelInfoManager.getDefaultAIModelInfo();
AIPlayerSettings aiSettings = new AIPlayerSettings(defaultAI.getName(), AILIVE, 1.0f, 40, 1);
aiPlayer.init(aiSettings, iAiPlayerCallback);
```

## 7. Let's make AIPlayer's callback as a member of Activity and set it in AIPlayer's init method to monitor the state of AIPlayer.
Notice below that it sends a sentence("Nice to meet you") to AI when resource-loading(AIState.RES_LOAD_COMPLETED) is completed.

```java
public class AILiveQuickStart extends AppCompatActivity {
    
    //make AIPlayer's callback, 
    private IAIPlayerCallback iAiPlayerCallback = new IAIPlayerCallback() {
        @Override
        public void onAIStateChanged(AIState state) {
            switch (state.state) {
                case AIState.RES_LOAD_COMPLETED:
                    //utter when AIPlayer's resource ready.
                    sendSpeakToAI("Nice to meet you.");
                    break;
            }
        }
   			
    };
  
    @Override
  	protected void onCreate(@Nullable Bundle savedInstanceState) {
	   	super.onCreate(savedInstanceState);

     
      //set callback in AIPlayer's init method 
      aiPlayer.init(aiSettings, iAiPlayerCallback);  
    }
  
    private void sendSpeakToAI(String text) {
        aiPlayer.send(new String[]{text});
    } 
 }
```


## 8. The full code is shown below.
Activity code (AILiveQuickStart.java)

```java
import android.os.Bundle;
import android.util.Log;
import android.view.inputmethod.EditorInfo;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import ai.moneybrain.aiplatform.ai.AIError;
import ai.moneybrain.aiplatform.ai.AIModelInfo;
import ai.moneybrain.aiplatform.ai.AIModelInfoManager;
import ai.moneybrain.aiplatform.ai.AIPlayerFactory;
import ai.moneybrain.aiplatform.ai.AIPlayerSettings;
import ai.moneybrain.aiplatform.ai.AIState;
import ai.moneybrain.aiplatform.ai.interfaces.IAIPlayer;
import ai.moneybrain.aiplatform.ai.interfaces.IAIPlayerCallback;
import ai.moneybrain.aiplatform.sample.R;
import ai.moneybrain.aiplatform.sample.databinding.AiliveQuickStartBinding;
import ai.moneybrain.aiplatform.sample.utils.Utils;

import static ai.moneybrain.aiplatform.ai.interfaces.IAIPlayer.AIPlayerType.AILIVE;

public class AILiveQuickStart extends AppCompatActivity {
    private AiliveQuickStartBinding binding; //viewBinding 사용
    private IAIPlayer aiPlayer;

    //AIPlayer callback
    private IAIPlayerCallback iAiPlayerCallback = new IAIPlayerCallback() {
        @Override
        public void onAIStateChanged(AIState state) {
            switch (state.state) {
                case AIState.RES_LOAD_COMPLETED:
                    //speak when ready  
                    sendSpeakToAI("Nice to meet you.");
                    break;
            }
        }

        @Override
        public void onAIPlayerResLoadingProgressed(int current, int total) {
            String s = getString(R.string.ai_resource_loading)  + " : " + (int)(((float)current)/total*100)+ "%";
            Log.d("AILiveQuickStart", s);
            binding.info.setText(s);
        }

        @Override
        public void onAIPlayerError(AIError error) {
        }
    };

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = AiliveQuickStartBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());
        getSupportActionBar().hide();

        //SDK auth 
        AIModelInfoManager.generateToken(this, "SDK_USER_KEY", resp -> {
            /* resp value 
				    {"succeed":true,
				     "token":"eyJhbGciO...","expire":1608032460152,
				     "defaultAI":   {"fileN...}
				    */

            //create AIPlayer using aiwrapper
            aiPlayer = AIPlayerFactory.create(AILiveQuickStart.this, binding.aiWrapper, AILIVE, null);

            //set ai as default ai 
            AIModelInfo defaultAI = AIModelInfoManager.getDefaultAIModelInfo();
            AIPlayerSettings aiSettings = new AIPlayerSettings(defaultAI.getName(), AILIVE, 1.0f, 40, 1);
            aiPlayer.init(aiSettings, iAiPlayerCallback);
        });

        //speak typing in 
        binding.input.setOnEditorActionListener((v, actionId, event) -> {
            if (actionId == EditorInfo.IME_ACTION_SEND) {
                onSendBtnClick();
            }

            return false;
        });

        binding.btnSend.setOnClickListener(v -> {
            onSendBtnClick();
        });
    }

    private void onSendBtnClick(){
        String s = binding.input.getText().toString();
        if (!s.isEmpty()) {
            sendSpeakToAI(s);
        }

        binding.input.setText(null);
        Utils.hidekeyboard(binding.input);
    }

    private void sendSpeakToAI(String text) {
        aiPlayer.send(new String[]{text});
        binding.info.setText("Sent : " + text);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (aiPlayer != null) {
            aiPlayer.release();
        }
    }
}
```

Layout(ailive_quick_start.xml)
```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <RelativeLayout
        android:id="@+id/input_lay"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_alignParentBottom="true">

        <EditText
            android:id="@+id/input"
            android:layout_width="match_parent"
            android:layout_height="52dp"
            android:layout_toLeftOf="@+id/btn_send"
            android:hint="Please input text"
            android:imeOptions="actionSend"
            android:inputType="text" />

        <Button
            android:id="@+id/btn_send"
            android:layout_width="wrap_content"
            android:layout_height="52dp"
            android:text="Speak"
            android:textStyle="bold"
            android:textSize="18dp"
            android:layout_alignParentRight="true" />
    </RelativeLayout>

    <RelativeLayout
        android:id="@+id/aiWrapper"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_above="@+id/input_lay" />

    <TextView
        android:id="@+id/info"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_above="@+id/input_lay"
        android:textSize="16dp"
        android:textStyle="bold" />

</RelativeLayout>
```
