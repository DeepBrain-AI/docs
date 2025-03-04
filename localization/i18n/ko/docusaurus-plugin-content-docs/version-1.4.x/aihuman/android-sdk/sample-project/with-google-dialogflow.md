---
sidebar_position: 4
---

# Google Dialogflow 연동

:::note 관련 파일

- AIPlayerWithDialogFlowDemo.java

:::

다음으로 AIHuman + DialogFlow(구글 챗봇)은 AIHuman SDK의 잠재력을 엿볼 수 있는 예제입니다. 이 메뉴를 클릭해서 진입하면 화면에 나오는 AI와 채팅을 할수 있는 기능을 제공합니다. Dialogflow는 챗봇으로서 사용자와 텍스트로 채팅을 할수 있는 서비스를 제공하지만, 이 예제에서는 그 텍스트가 AI모델을 통해서 표현됩니다. 즉 사용자는 키보드로 적절하게 원하는 내용을 입력하고, 화면에 AI는 DialogFlow의 응답 내용을 발화합니다.

셋업을 하려면 먼저 DialogFlow 서비스에 사이트에 가서 원하는 챗봇을 생성 및 설정한 뒤 제공되는 크리덴셜 json 파일을 이용하면 챗봇으로 대화가 가능합니다. 


<p align="center">
<img src="/img/aihuman/android/Screenshot_20211207-005743.png" style={{zoom: "25%"}} />
</p>

### 1. AI와 UI 셋업하기
먼저 사용 가능한 AI 리스트 가져온 후 UI를 셋업합니다.

```java
@Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = AiplayerWithDialogflowChatbotDemoBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

      	//...
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
                initThis();
            } else {
                Log.d(TAG, "onFinishedWithList: getAIList error: " + aiError);
            }
        });
    }

    private void initThis() {
        initAIChatbotController();
        initUIs();
    }
```


<br/>

### 2. Chatbot(DialogFlow의 Wrapper 클래스)의 설정

**Dialogflow 크리덴셜 파일 준비**

DiallogFlow는 구글의 해당 서비스 사이트에서 서비스를 생성하면 사용 할 수 있습니다. 서비스를 생성하면 **크리덴셜 파일(json 파일)**을 얻을 수 있는데, 그 파일을 다운로드한 후 사용자 앱의 **assets** 디렉토리에 넣습니다(assets 디렉토리가 없으면 프로젝트의 app 디렉토리에서 오른쪽 클릭 > New > Folder > Assets Folder로 생성).

이후 new DialogFlowChatbot()로 DialogFlow 챗봇을 생성합니다.

**크리덴셜 파일을 챗봇에 설정값으로 넣기**

받은 파일을 assets 디렉토리에 넣었으면, 그 파일의 이름을 아래처럼 "**dialogflow_google_credential.json**"라고 된 부분에 JSON 값으로 입력합니다. 이제 이 JSON을 이용해 **ChatbotSettings**을 만듭니다. 이는 init(,) 메소드의 첫번째 인자가 됩니다.

**챗봇 콜백을 생성하고 init(,) 메소드를 호출하기**

챗봇 콜백(**iChatbotCallback**)은 챗봇의 상태 변화나 에러, 메세지 수신 등을 알 수 있는 콜백입니다. new 연산자로 인스턴스를 생성하여 ChatbotSettings 인스턴스와 함께 chatbot.init(,) 메소드에 아래와 같이 넣어 호출합니다. **onChatbotStateChanged** 메소드에 **ChatbotState.SESSION_INITIALIZED** 신호가 오면 챗봇을 사용할 준비가 완료된 것이며 이후부터 DialogFlow 서비스에 메세지를 보내고 받을 수 있습니다.

```java
private void initAIChatbotController() {
    //...
    //google DialogFlow chatbot create and setup 
    IChatbot dfChatbot = new DialogFlowChatbot(this);
    JSONObject chatbotJson = new JSONObject();
    try {
        chatbotJson.put(KEY_DIALLOGFLOW_GOOGLE_CREDENTIAL_ASSET_FILE,
                "dialogflow_google_credential.json");
    } catch (JSONException e) {
        e.printStackTrace();
    }
    dfChatbot.init(new ChatbotSettings(chatbotJson,
                    IChatbot.ChatbotType.ENGIN_BASED_DIALOGFLOW), iChatbotCallback);
    //...
}

/**
  * Chatbot(DialogFlow)s' callback 
  */
private IChatbotCallback iChatbotCallback = new IChatbotCallback() {
/**
  * Called when Chatbot's state changed.
  * @param state. You can subclass the ChatbotState class when you needed.
  */
  @Override
  public void onChatbotStateChanged(ChatbotState state) {
  	if (state.state == ChatbotState.SESSION_INITIALIZED) {
    	aiChatbotCtlr.setChatbotReady(true);
      }
    }
	//...
};

```


<br/>

### 3. Chatbot(DialogFlow)에 메세지 보내기

chatbot에 **send("query", JSONObject)** 메소드를 다음과 같이 호출하여 메세지를 보낼 수 있습니다. 원하는 텍스트는 JSON의 "query"키 (여기서는 Constants.KEY_QUERY)로 추가하며 **언어 코드**도 추가해서 보냅니다.

```java
    JSONObject json = new JSONObject();
    try {
        json.put(Constants.KEY_QUERY, query);
        json.put(Constants.KEY_LANGUAGECODE, languageCode);
    } catch (JSONException e) {
        e.printStackTrace();
    }
    bSent = chatbot.send(Constants.CMD_QUERY, json);
```

**AIPlayer와 Dialogflow 챗봇을 하나의 클래스에서 관리하기** 

위와 같이 Dialogflow에 하나의 메세지를 보낼 수 있지만 메세지를 보내고 나서 채팅창도 업데이트합니다. 마찬가지로 DialogFlow로부터 응답을 받으면 AI에게 발화도 시키고 채팅창도 업데이트하는 일련의 과정들이 있어야 자연스럽게 채팅이 이루어집니다. 

이렇게 AIPlayer와 Dialogflow 챗봇이 긴밀하게 동작됨으로 인해 이 클래스들을 가지고 컨트롤하기 위한 클래스(**AIChatbotController**)를 작성하였습니다. 이 액티비티에서는 직접적으로 AIPlayer나 Chatbot을 컨트롤하지 않고, 원하는 행위 기준으로 작성된 클래스인 AIChatbotController의 메소드를 호출함으로서 복잡도를 줄이도록 작성되었습니다.


<br/>

### 4. AI와 채팅하기 (DialogFlow에서 응답을 가져와 AI에게 말시키기)

aiChatbotCtlr.sendNewQuery(text)를 호출하여 Dialogflow에서 메세지를 보내고, 메세지에 대한 응답은 iChatbotCallback의 **onChatbotMessage()** 쪽으로 옵니다. 이것을 다시 aiChatbotCtlr.onChatbotMessage()로 넘기면 내부적으로 AIPlayer에게 말을 시키고 채팅을 추가하는 등의 동작이 수행됩니다.

```java
private void initUIs() {
    binding.chatSendBtn.setOnClickListener(view -> {
        if (aiChatbotCtlr.isChatReady()) {
            String text = binding.chatEdittext.getText().toString();
            if (!text.isEmpty()) {
                aiChatbotCtlr.sendNewQuery(text);
                binding.chatEdittext.setText(null);
            }
        } else {
            binding.aiStateTxt.setText("Chatting is not ready");
            binding.aiStateTxt.setBackgroundColor(Color.RED);
        }
    });
}

/**
 * Chatbot(DialogFlow)'s Callback 
*/
private IChatbotCallback iChatbotCallback = new IChatbotCallback() {
	//...
	@Override
	public void onChatbotMessage(JSONObject response) {
  	    aiChatbotCtlr.onChatbotMessage(response);
    }
  //...
};

private class AIChatbotController implements LifecycleObserver {
    //...
        public void onChatbotMessage(JSONObject resp) {
            if (resp != null) {
                sendAIMessage(resp.optString(Constants.KEY_MESSAGE));
            }
        }
}

```
