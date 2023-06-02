---
sidebar_position: 5
---

# STT(MS Azure, Google)와 PlayChat 연동

:::note 관련 파일

- AIPlayerWithPlayChatDemo.java

:::

[PlayChat](https://aichat.deepbrainai.io/)은 DeepBrain AI의 ChatBot 솔루션입니다.

AIHuman + PlayChat + STT는 DeepBrain AI에서 제공하는 대화형 AI 서비스 예제라고 볼수 있습니다. 기본적으로 AIHuman + DialogFlow와 비슷하지만 사용자가 키보드로 입력을 하는 것이 아니라 **실제 사람처럼 음성으로 대화합니다**. 화면에 진입하면 AI가 먼저 인사말을 합니다.(Hello long time no see.) 

인사말 이후 **지금 말하세요**라고 아래에 음성 입력 신호가 나오면 **where are you**라고 말해보십시오.**(실제로 동작하는 것은 구글 STT 또는 MS STT의 설정이 완료된 이후에 가능합니다. 이 단락의 아래에 설명이 되어있습니다.)** AI는 사용자의 음성을 알아듣고 챗봇의 응답에 따라 적절한 대답을 합니다. 현재는 테스트 챗봇이라 몇가지 제한된 물음에만 응답 할수 있지만 챗봇을 고도화시키면 상황에 따라 식당에서 주문이라든가 공연 예약 등 다양하게 응용할수 있습니다. 또한 챗봇이 텍스트 외에 **추가 정보를 보내 이미지도 표시**할수 있도록 하였습니다. 

<p align="center">
<img src="/img/aihuman/android/Screenshot_20211207-010111.png" style={{zoom: "25%"}} />
</p>

## 1. 먼저 사용 가능한 AI 리스트를 가져온 후 UI를 셋업.

```java
@Override
protected void onCreate(@Nullable Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    binding = AiplayerMbPlaychatbotSttDemoBinding.inflate(getLayoutInflater());
    setContentView(binding.getRoot());

  	//...
    AIModelInfoManager.getAIList((aiError, resp) -> {
            /* resp{
                "succeed":true,
                "ai":[{"aiName":"vida","aiDisplayName":"Vida","language":"en"},
                {"aiName":"bret","aiDisplayName":"Bret","language":"en"},
                {"aiName":"danny","aiDisplayName":"Danny","language":"en"},
                {"aiName":"samh","aiDisplayName":"Samh","language":"en"},
                {"aiName":"kang","aiDisplayName":"Kang","language":"ko"}]}
             */

            if (aiError == null) {
                initAIChatbotController();
            } else {
                Log.d(TAG, "onFinishedWithList: getAIList error" + aiError);
            }
        });
}
```

## 2. 챗봇과 음성 인식 초기화 
음성인식기능(STT(Speech to Text))과 PlayChat을 초기화합니다. (AI는 기본 AI로 설정되어 있습니다.)

먼저 MBPlayChatbot의 스태틱 메소드(**newMBChatbot**(,))로 챗봇을 생성한 후 init( , ) 메소드를 호출합니다. 이 클래스는 IChatbot 인터페이스를 구현하였으므로 기존의 챗봇 메소드(send(,))을 사용할수 있습니다. 

**GoogleSTT로 STT 설정하기**

GoogleSTTV2 클래스(샘플로 제공)로 생성하여 사용합니다. 이 클래스는 ISTT 인터페이스를 구현하여 startRecognize(), stopRecognize()등의 메소드로 음성 인식 동작을 할수 있습니다. 언어 설정과 더불어 콜백을 등록함으로써 인식 결과를 얻을수 있습니다. 

**MS Azure로 STT 설정하기**

구글 STT 외에 MS azure Speech to Text(샘플로 제공)를 사용할수 있습니다. 이를 위해서는 MS 사이트에(https://portal.azure.com/)에서 해당 STT 리소스(음성 서비스)를 생성하고 구독키와 위치/지역 값을 받아 아래의 샘플과 같이 설정해야합니다.

## 3. 챗봇 콜백을 생성하고 init(,) 메소드를 호출하기

챗봇 콜백(iChatbotCallback)은 챗봇의 상태 변화나 에러, 메세지 수신 등을 알수 있는 콜백입니다. 이 콜백 인스턴스를 생성하여 ChatbotSettings 인스턴스와 함께 chatbot.init(,) 메소드에 아래와 같이 넣어 호출하면 됩니다. onChatbotStateChanged 메소드에 ChatbotState.SESSION_INITIALIZED가 오면 준비가 완료되어 Chatbot 서비스에 메세지를 보내고 받을 수 있습니다. 음성인식 서비스도 준비가 된 것입니다.

```java
private void resetChatbotWithSTT(String sttType) {
        //set chatbot
        String chatUrl = null; //change if need
        String chatbotId = botId; //change if need
        if (chatbot != null) {
            chatbot.release();
            chatbot = null;
        }
        chatbot = MBPlayChatbot.newMBChatbot(chatUrl, chatbotId);
        chatbot.init(new ChatbotSettings(null, IChatbot.ChatbotType.NATIVE_MB_PLAYCHAT), iChatbotListener);

        //set stt
        this.sttType = sttType;
        if (stt != null) {
            stt.release();
            stt = null;
        }

        System.gc();

        if (getString(R.string.google_stt).equals(this.sttType)) {
            //getLifecycle().addObserver(gglSTT);
            this.stt = new GoogleSTTV2(this, "en-US", iSTTListener);
        } else { //ms stt
            stt = new MSAzureSTT(this, "your_subscription",
                    "your_region", "en-US", MSAzureSTT.RECOGNIZE_MODE.ONCE, iSTTListener);
        }
    }

/**
 * Chatbot(Playchat)'s callback 
 */
 private IChatbotCallback iChatbotCallback = new IChatbotCallback() {
    /**
    * @param state.
    */
    @Override
    public void onChatbotStateChanged(ChatbotState state) {
        switch (state.state) {
        //...
            case ChatbotState.SESSION_INITIALIZED:
            aiChatbotCtlr.setChatbotReady(true);
            binding.chatbotStateTxt.setText("Chatbot loading completed");
            binding.chatbotStateTxt.setBackgroundColor(Color.GREEN);
            break;
            //...
        };
    }
}
```

<br/>

**음성 인식 시작해보기**

아래와 같이 직접 **startRecognize()** 메소드를 이용해 음성 인식 서비스를 켤수 있습니다. 음성 인식을 끄는 것은 **stopRecognize()**를 호출하면 되는데 각각 호출 후 콜백으로 응답이 옵니다.

음성 인식의 콜백 신호는 **startRecognize()**를 호출하면 **STTState.START_RECOGNIZING**, **stopRecognize()**를 호출하면 **STTState.STOP_RECOGNIZING** 값이 오는 것을 확인할 수 있습니다. 그 외에도 몇가지가 더 있는데 이는 다음과 같습니다. 

- **STTState.NEW_FINAL_SPEECH** : 최종적으로 STT에서 인식이 된 말이 전달됩니다. 예를 들면 "안녕하세요. 좋은 아침입니다."라고 사용자가 말하고 난후 옵니다. 
- **STTState.NEW_SPEECH_RECOGNIZED** : 인식 중간 중간에 인식된 말이 업데이트 되었을 때 옵니다. 예를 들면 사용자가 "안녕하세요. 좋은 아침입니다."라고 말하였다면 중간중간에 STTState.NEW_SPEECH_RECOGNIZED로 "안녕하세요." , "안녕하세요. 좋은", "안녕하세요. 좋은 아침입니다." 라고 3번 호출될 수 있습니다. 이를 이용해 사용자에게 STT가 반응하고 있다는 것을 보여줄 수 있습니다.

```java
//turn on  
stt.startRecognize(0);

//turn off
stt.stopRecognize();

/**
  * ISTT callback
  */
	private final ISTTCallback iSTTListener = new ISTTCallback() {

        @Override
        public void onSTTStateChanged(STTState state) {
            Log.d(TAG, "onSTTStateChanged: " + state.state + " " + state.data);
            switch (state.state) {
                case STTState.START_RECOGNIZING:
                    binding.chatState.setText(getString(R.string.speak_now));
                    binding.chatState.setVisibility(View.VISIBLE);
                    binding.sttRestartBtn.setVisibility(View.GONE);
                    break;
                case STTState.STOP_RECOGNIZING:
                    binding.chatState.setStaticText("");
                    binding.chatState.setVisibility(View.INVISIBLE);
                    break;
                case STTState.NEW_SPEECH_RECOGNIZED:
                    binding.chatState.setStaticText(state.data.optString(Constants.KEY_SPEECH));
                    break;
                case STTState.NEW_FINAL_SPEECH:
                    aiChatbotCtlr.sendUserInputToChatbot(state.data.optString(Constants.KEY_SPEECH));
                    break;
            }
        }

        @Override
        public void onSTTError(STTError error) {
            Log.d(TAG, "onSTTError:" + error);
            Toast.makeText(AILiveWithMBPlayChatWithSTTDemo.this, error.toString(), Toast.LENGTH_SHORT).show();

            binding.chatState.setVisibility(View.GONE);
            binding.sttRestartBtn.setVisibility(View.VISIBLE);
        }
    };
```

## 4. AI + 챗봇 + 음성 인식 함께 사용하기 

간단히 생각해보면 이 샘플은 AI와 음성으로 대화를 이어나가는 것이 주목적입니다. 이를 위해서는 AIPlayer와 챗봇, 음성 인식이 조화롭게 동작되어야 합니다. 따라서 이를 용이하게 하기 위해 전체를 관리하는 **AIChatbotController** 클래스(aiChatbotCtlr 멤버 변수)를 작성하였습니다.

먼저 AI는 로드되었다고 가정하고, 챗봇이 로드되면 챗봇에 **"start"(VALUE_FUNC_NAME_START)** 신호를 보내는데, 이렇게 "start" 신호를 호출하면 챗봇이 인식하고 **인사 메세지**를 보냅니다. 그 인사말이 iChatbotCallback의 onChatbotMessage() 메소드에 들어오며 aiChatbotCtrl은 기본적으로 이 말을 AI에게 보내 발화하게 합니다. 

```java
@Override
public void onChattingReady() {
	binding.chatbotStateTxt.setText("chatting starts");
    aiChatbotCtlr.sendMsgToChatbotAndUpdateChatUI(VALUE_FUNC_NAME_START, null);
}

/**
 * received Chatbot's response
 * @param response  
 */
@Override
public void onChatbotMessage(JSONObject response) {
    if (resp != null) {
        //...
    }
}
```



**AIChatbotController가 챗봇에서 받은 메세지를 처리**

챗봇에서 메세지를 받으면(**onChatbotMessage**) 일단 어떤 내용(JSON)인지 확인합니다. JSON은 크게 두가지 파트로 나뉘는데 어떤 커맨드인지를 의미하는  **func_name**과 내용을 의미하는 **args** 부분입니다. 기본적으로 func_name에 **onMessage**는 챗봇이 하는 말을 나타내는 함수로 정해져 있습니다.  

```java
/**
 * onChatbotMessage
 *
 * @param resp 
 */
public void onChatbotMessage(JSONObject resp) {
    if (resp != null) {
        /* example
        {"func_name":"onMessage",
         "args":
            {"kind":"Content",
             "text":"Hello,  long time no see.",
             "languages":{"en":"Hello,  long time no see."},
             "image":{"url":"http://...,"displayname":"office image.jpg"}
             "extra":{}}}
         */

        chatManager.onNewChatMessage(resp);

        //process for functions accordingly
        processChatbotMsgFunc(
                resp.optString(KEY_FUNC_NAME), resp.optJSONObject(KEY_ARGS));
    }
}

private void processChatbotMsgFunc(String fName, JSONObject args) {
    if (fName == null) {
        return;
    }

    switch (fName) {
        case VALUE_FUNC_NAME_ONMESSAGE:
            if (args != null) {
                String text = args.optString(KEY_TEXT);

                //ai speak
                sendMessageToAIAndChatbot(new String[]{text}, null);

                //ui update
                iAiWithChatbotControlListener.onChatAdded(createChatWith(args));
            }
            break;
    }
}
```



**Chatbot(PlayChat)의 데이터 전송 포맷**

기본적으로 STT가 포함된 이 챗봇은 음성인식이 되면 그 내용을 바로 PlayChat 서버에 전달합니다. 그러나 수동으로 챗봇에 어떤 메세지나 특별한 신호를 보내야할 상황도 있습니다(위에서 말한 "start" 신호도 이에 포함됩니다). 사용자의 메세지를 보내려면 chatbot의 send(,) 메소드를 호출하면 됩니다. 

```java
boolean send(String command, JSONObject detail);
```

command에 원하는 서버 함수 이름을 쓰고, 필요한 인자들을 detail에 key:value로 넣으면 됩니다. 현재 정해진 command (또는 func_name)는 다음과 같습니다. 

```java
//send
public static final String VALUE_FUNC_NAME_USERINPUT = "userInput";
public static final String VALUE_FUNC_NAME_START = "start";

//receive
public static final String VALUE_FUNC_NAME_ONMESSAGE = "onMessage";

//there is next message 
public static final String VALUE_USERINPUT_NEXT = ":next";
```

- userInput 함수는 사용자 음성 인식된 문자열을 json에 'text' 키값으로 넣어 주면됩니다. 

- start 함수는 인자가 필요없습니다. 

- onMessage에는 아래와 같이 응답이 오며, 여기에서 'extra'에 next값이 true이면 다음에 연속으로 할말이 있다는 뜻입니다.  

  ```java
  /* example
  {"func_name":"onMessage",
  	"args":
   	{"kind":"Content",
    "text":"Hello,  long time no see.",
    "languages":{"en":"Hello,  long time no see."},
    "image":{"url":"http://...,"displayname":"office image.jpg"}
    "extra":{next:true}}}
  */ 
  ```

- 다음 메세지가 있을 경우 userInput에 'text' 키값으로 특수 인자 표시인 **":next" (VALUE_USERINPUT_NEXT)**를 json에 넣어서 보내면 다음 메세지를 받을수 있습니다. 

  ```java
  /**
   * Call when AI finishs speaking.
   */
  public void onAISpeakingEnd() {
  	  //if there is next message 
      if (chatManager.hasNextMessage()) { 
          sendUserInputToChatbot(VALUE_USERINPUT_NEXT);
      } 
      //...
  }
  ```
