---
sidebar_position: 5
---

# MS Azure STT와 PlayChat 연동

:::note 관련 파일

- AIPlayerWithPlayChatDemo.java

:::

[PlayChat](https://aichat.deepbrainai.io/)은 DeepBrain AI의 ChatBot 솔루션이다.

AIHuman + PlayChat + STT는 DeepBrain AI에서 제공하는 대화형 AI 서비스라고 볼수 있다. 기본적으로 AIHuman + DialogFlow와 비슷하지만 사용자가 키보드로 입력을 하는 것이 아니라 **실제 사람처럼 음성으로 대화한다**. 화면에 진입하면 AI가 인사를 한다.(Hello long time no see.) 

인사말 이후 **지금 말하세요**라고 아래에 음성 입력 신호가 나오면 **where are you**라고 말해보자.**(실제로 동작하는 것은 구글 STT 또는 MS STT의 설정이 완료된 이후에 가능하다. 이 단락의 아래에 설명이 되어있다.)** AI는 음성을 알아듣고 AI가 적절한 대답을 한다. 현재는 테스트 챗봇이라 몇가지 제한된 물음에만 응답 할수 있지만 챗봇을 고도화시키면 상황에 따라 식당에서 주문이라든가 공연 예약 등 다양하게 응용할수 있다. 또한 챗봇이 텍스트 외에 **추가 정보를 보내 이미지도 표시**할수 있도록 하였다. 

<p align="center">
<img src="/img/aihuman/android/Screenshot_20211207-010111.png" style={{zoom: "25%"}} />
</p>

## 1. 먼저 사용 가능한 AI 리스트 가져온 후 UI를 셋업한다.

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
음성인식기능(STT)과 PlayChat을 초기화합니다. (AI는 기본 AI로 설정되어 있습니다.)

먼저 MBPlayChatbot의 스태틱 메소드(**newMBChatbot**(,))로 챗봇을 생성한 후 init( , ) 메소드를 호출한다. 이 클래스는 IChatbot 인터페이스를 구현하였다. 따라서 기존의 챗봇 메소드들(send(,)을 사용할수 있다. 

**GoogleSTT로 STT 설정하기**

GoogleSTT 클래스로 생성하여 사용한다. ISTT 인터페이스를 구현하여 startRecognize(), stopRecognize()등의 메소드로 음성인식을 시작하고 마침 동작을 할수 있다. GoogleSTT클래스는 내부적으로 서비스를 사용하므로 AndroidManifest.xml 파일에 아래와 같이 설정이 필요하다.

```xml
<service android:name=".stt.google.SpeechService"
            android:exported="false" />
```

또한 구글 API를 사용하므로 아래와 같이 인증 파일을 준비 및 설정한다. 

**구글 Speech To Text 인증 (크리덴셜) 파일 준비**

구글 Speech to Text(음성 인식) 인증 파일(크리덴셜)은 구글 클라우드 API 사이트(https://console.cloud.google.com/apis/dashboard) 에서 얻을 수있다. 먼저 Speech to Text를 쓸 프로젝트를 만들어야 한다. 프로젝트를 생성한 후에는 Cloud API 중에서 STT 사용 설정을 한후, 사용자 인증 정보 만들기를 하면 크리덴셜 파일(json 파일)을 얻을수 있는데, 그 파일을 다운로드한 후 파일을 앱 프로젝트의 assets  디렉토리에 넣는다. (assets 디렉토리가 없으면 프로젝트의 app 디렉토리에서 오른쪽 클릭 > New > Folder > Assets Folder로 생성한다.)  

**크리덴셜 파일을 STT에 설정값으로 넣기**

받은 파일은 assets 디렉토리에 넣었으면, 이제 그 파일의 이름을 아래처럼 "speechgrpc_google_credential.json"라고 된 부분에 JSON 값으로 입력한다.  이제 이 JSON을 이용해 ChatbotSettings을 만든다. 또한 languagecode는 영어를 인식하기 위해 en-US를 쓴다. 만약 한국어를 사용한다면 ko-KR로 설정하고 AI도 한국어 AI를 사용해야한다. 이후 ChatbotSettings를 init(,) 메소드의 첫번째 인자로 넣는다.

**MS Azure로 STT 설정하기**

구글 STT 외에 MS azure Speech to Text를 사용할수 있다. 이를 위해서는 MS가 제공하는 사이트에(https://portal.azure.com/) 에서 해당 STT 리소스(음성 서비스)를 생성하고 구독키와 위치/지역 값을 받아 아래의 샘플과 같이 설정해야한다.

## 3. 챗봇 콜백을 생성하고 init(,) 메소드를 호출하기

챗봇 콜백(iChatbotCallback)은 챗봇의 상태 변화나 에러, 메세지 수신 등을 알수 있는 콜백이다. 인스턴스를 생성하여 ChatbotSettings 인스턴스와 함께 chatbot.init(,) 메소드에 아래와 같이 넣어 호출하면 끝이다. onChatbotStateChanged 메소드에 ChatbotState.SESSION_INITIALIZED가 오면 준비가 완료되어 Chatbot 서비스에 메세지를 보내고 받을 수 있다. 음성인식 서비스도 준비가 된 것이다.

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
        stt_type = sttType;
        if (stt != null) {
            stt.release();
            stt = null;
        }

        System.gc();

        if (getString(R.string.google_stt).equals(stt_type)) {
            stt = new GoogleSTT(this,
                    "speechgrpc_google_credential.json",
                    "en-US", iSTTListener);
        } else { //ms stt
            stt = new MSAzureSTT(this, "your_subscription",
                    "your_region", "en-US", iSTTListener);
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
```

<br/>

**음성 인식 시작해보기**

아래와 같이 직접 **startRecognize()** 메소드를 이용해 음성 인식 서비스를 켤수 있다. 음성 인식을 끄는 것은 **stopRecognize()**를 호출하면 되는데 각각 호출시 콜백으로 응답이 온다.

음성 인식의 콜백 신호는 startRecognize()를 호출하면 **STTState.START_RECOGNIZING**이, **stopRecognize()**를 호출하면 **STTState.STOP_RECOGNIZING**이 값이 오는 것을 확인할 수 있다. 그 외에도 몇가지가 더 있는데 이는 다음과 같다. 

- **STTState.NEW_FINAL_SPEECH** : 최종적으로 STT에서 인식이 된 말이 전달된다. 예를 들면  "안녕하세요. 좋은 아침입니다."라고 사용자가 말하고 난후 온다. 
- **STTState.NEW_SPEECH_RECOGNIZED** : 인식 중간 중간에 인식된 말이 업데이트 되었을 때 들어온다. 예를 들면 사용자가 "안녕하세요. 좋은 아침입니다."라고 말하였다면 중간중간에 STTState.NEW_SPEECH_RECOGNIZED로 "안녕하세요." , "안녕하세요. 좋은", "안녕하세요. 좋은 아침입니다." 라고 3번 호출될 수 있다. 이를 이용해 사용자에게 STT가 반응하고 있다는 것을 보여줄 수 있다.

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

간단히 생각해보면 이 샘플은 AI와 음성으로 대화를 이어나가는 것이 주목적이다. 이를 위해서는 AIPlayer와 챗봇, 음성 인식이 조화롭게 돌아가야한다. 따라서 이를 용이하게 하기 위해 전체를 관리하는 **AIChatbotController** 클래스(aiChatbotCtlr 멤버 변수)를 작성하였다.

먼저 AI는 로드되었다고 가정하고, 챗봇이 로드되면 챗봇에 **"start"(VALUE_FUNC_NAME_START)** 신호를 보내는데, 이렇게 "start" 신호를 호출하면 챗봇이 인식하고 **인사 메세지**를 보낸다. 그 인사말이 iChatbotCallback의 onChatbotMessage() 메소드에 들어온다. aiChatbotCtrl은 기본적으로 이 말을 AI에게 보내 말하게 한다. 

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



**AIChatbotController가 챗봇에서 받은 메세지를 처리한다.**

챗봇에서 메세지를 받으면(**onChatbotMessage**) 일단 어떤 내용(JSON)인지 확인한다. JSON은 크게 두가지 파트로 나뉘는데 어떤 커맨드인지를 의미하는  **func_name**과 내용을 의미하는 **args** 부분이다. 기본적으로 func_name에 **onMessage**는 챗봇이 하는 말을 나타내는 함수로 정해져 있다.  

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

기본적으로 STT가 포함된 이 챗봇은 음성인식이 되면 그 내용을 바로 PlayChat 서버에 전달한다. 그러나 수동으로 챗봇에 어떤 메세지나 특별한 신호를 보내야할 상황도 있다(위에서 말한 "start" 신호도 이에 포함된다). 사용자의 메세지를 보내려면 chatbot의 send(,) 메소드를 호출하면 된다. 

```java
boolean send(String command, JSONObject detail);
```

command에 원하는 서버 함수 이름을 쓰고, 필요한 인자들을 detail에 key:value로 넣으면 된다. 현재 정해진 command (또는 func_name, 같은 말이다.)는 다음과 같다. 

```java
//send
public static final String VALUE_FUNC_NAME_USERINPUT = "userInput";
public static final String VALUE_FUNC_NAME_START = "start";

//receive
public static final String VALUE_FUNC_NAME_ONMESSAGE = "onMessage";

//there is next message 
public static final String VALUE_USERINPUT_NEXT = ":next";
```

- userInput 함수는 text로 키로 인자값을 넣으면 된다. 

- start 함수는 인자가 필요없다. 

- onMessage에는 기본적으로 아래와 같이 값이 오며, 특히 여기에서 'extra'에 next값이 true이면 다음에 연속으로 할말이 있다는 뜻이다.  

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

- 다음 메세지가 있을 경우 userInput에 인자 text로 특수 인자 표시인 **":next" (VALUE_USERINPUT_NEXT)**를 넣어서 보내면 다음 메세지를 받을수 있다. 

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
