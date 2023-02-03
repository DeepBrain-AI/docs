---
sidebar_position: 3
---

# 나의 AI Human 만들기

이 장에서는 신속하게 AIHuman(AIPlayer)를 셋업하고 기본 AI에게 한문장 발화까지 시키는 과정을 알아 본다. AIPlayer를 최초 셋업시에는 네트워크 상태에 따라 수분 정도의 로딩이 걸릴 수 있다. 이 로딩 과정은 진행율을 모니터링 할수 있다.

## 1. 테스트를 할 프로젝트를 만들고 이전 단계의 프로젝트 셋업을 완료한다. 

## 2. AIPlayer가 포함될 Activity를 만든다.  
여기서는 AILiveQuickStart를 만들었다.

## 3. 래이아웃 파일 생성 
Activity의 contentView(layout 파일)에 AIPlayer(View의 확장 클래스)가 add될 parentView(예, RelativeLayout)를 하나 만들어준다. 

**AI는 parentView에 세로 기준으로 꽉차게 그려진다.(스케일 1.0)**

아래 샘플에서는 viewBinding을 사용하여 aiWrapper라는 이름을 주어 binding.aiWrapper로 parentView를 얻었다. 그러나 viewBinding을 쓰지 않아도 상관없다(findViewById()로 사용해도 됨)

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

## 4. 다음으로 할 일은 SDK 인증하기이다.
SDK 사이트에서 Android sample 및 SDK를 다운로드 받아 참조한다.

**[SDK Website](https://aihuman.deepbrain.io)에서 프로젝트를 생성하고, 안드로이드의 appId를 입력하고 confirm을 누르면 userkey가 발급된다.**

<img src="/img/aihuman/android/screenshot_quickstart_sdkwebsite.png"/>

**발급된 userkey를 아래 API 입력하고 실행하면, JSON 포맷으로 결과가 온다. 성공시에는 default AI같은 정보가 오고 실패하면 aiError가 온다.**

```java
AIModelInfoManager.generateToken(this, appId, userkey, (aiError, resp) -> {
      /* resp{
          "succeed":true,
          "defaultAI": {"ai_name":...}
          */
  });

//or                                  
AIModelInfoManager.generateToken(this, userkey, (aiError, resp) -> {
      /* resp{
          "succeed":true,
          "defaultAI": {"ai_name":...}
          */
  });
```

## 5. A인증이 성공되었으면 AIPlayer를 만든다. 
AIPlayer는 위에서 만들어준 aiWrapper뷰를 인자로 하여 다음과 같이 만든다. 

```java
//put aiWrapper in the argument and create AIPlayer.
aiPlayer = AIPlayerFactory.create(AILiveQuickStart.this, binding.aiWrapper, AILIVE, null);
```

## 6. AIPlayer를 만들었으면 어떤 AI를 쓸지를 설정해야한다. 
인증이 성공하면 기본 AI로 설정이 가능하다. 

```java
//set default AI. If authentication fails, defaultAI will be null. 
AIModelInfo defaultAI = AIModelInfoManager.getDefaultAIModelInfo();
AIPlayerSettings aiSettings = new AIPlayerSettings(defaultAI.getName(), AILIVE, 1.0f, 40, 1);
aiPlayer.init(aiSettings, iAiPlayerCallback);
```

## 7. AIPlayer의 콜백을 Activity의 멤버 변수로 만들고, AIPlayer의 init 메소드 호출하자. 
아래 예제는 'Nice to meet you' 문장을 준비가 완료(AIEvent.RES_LOAD_COMPLETED)되었을 때 send(발화)시키고 있다. 

```java
public class AILiveQuickStart extends AppCompatActivity {
    
    //make AIPlayer's callback, 
    private IAIPlayerCallback iAiPlayerCallback = new IAIPlayerCallback() {
        @Override
        public void onAIPlayerEvent(AIEvent event) {
            switch (event.type) {
                case RES_LOAD_COMPLETED:
                    //speak when ready
                    sendSpeakToAI("Nice to meet you.");
                    break;
            }
        }
   			
    };
  
    @Override
  	protected void onCreate(@Nullable Bundle savedInstanceState) {
	   	super.onCreate(savedInstanceState);

        //...
        //set callback in AIPlayer's init method 
        aiPlayer.init(aiSettings, iAiPlayerCallback);  
    }
  
    private void sendSpeakToAI(String text) {
        aiPlayer.send(new String[]{text});
    } 
 }
```


## 8. 전체 코드는 아래와 같다. 
Activity code (AILiveQuickStart.java)

```java
package ai.moneybrain.aiplatform.sample.activity;

import android.os.Bundle;
import android.util.Log;
import android.view.inputmethod.EditorInfo;

import androidx.annotation.Nullable;
import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;

import ai.moneybrain.aiplatform.ai.AIError;
import ai.moneybrain.aiplatform.ai.AIModelInfo;
import ai.moneybrain.aiplatform.ai.AIModelInfoManager;
import ai.moneybrain.aiplatform.ai.AIPlayerFactory;
import ai.moneybrain.aiplatform.ai.AIPlayerSettings;
import ai.moneybrain.aiplatform.ai.AIEvent;
import ai.moneybrain.aiplatform.ai.interfaces.IAIPlayer;
import ai.moneybrain.aiplatform.ai.interfaces.IAIPlayerCallback;
import ai.moneybrain.aiplatform.sample.R;
import ai.moneybrain.aiplatform.sample.databinding.AiliveQuickStartBinding;
import ai.moneybrain.aiplatform.sample.utils.Utils;

import static ai.moneybrain.aiplatform.ai.interfaces.IAIPlayer.AIPlayerType.AILIVE;

public class AILiveQuickStart extends AppCompatActivity {
    private String TAG = "AILiveQuickStart";

    private AiliveQuickStartBinding binding;
    private IAIPlayer aiPlayer;

    private String appId, userkey;

    //make AIPlayer's callback,
    private IAIPlayerCallback iAiPlayerCallback = new IAIPlayerCallback() {
        @Override
        public void onAIPlayerEvent(AIEvent event) {
            switch (event.type) {
                case RES_LOAD_COMPLETED:
                    //speak when ready
                    sendSpeakToAI("Nice to meet you.");
                    break;
            }
        }

        @Override
        public void onAIPlayerResLoadingProgressed(int current, int total) {
            binding.info.setText(getString(R.string.ai_resource_loading) +
                    " : " + (int) (((float) current) / total * 100) + "%");
        }

        @Override
        public void onAIPlayerError(AIError error) {
            Log.d(TAG, "onAIPlayerError: " + error);

            binding.info.setText(error.message);
        }
    };

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = AiliveQuickStartBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());
        initActBar();

        initSDKAuthInfoVars();

        //SDK auth
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

        //enter text to send
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

    private void initActBar() {
        ActionBar actionBar = getSupportActionBar();
        if (actionBar != null) {
            actionBar.hide();
        }
    }

    private void initSDKAuthInfoVars() {
        appId = getString(R.string.appid);
        userkey = getString(R.string.userkey);
    }

    private void onSendBtnClick() {
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
