---
sidebar_position: 5
---

# with Playchat & MS Azure STT

:::note related files

- AIPlayerWithPlayChatDemo.java

:::

AI Human + PlayChat + STT is a demo of an interactive AI service. Basically, it is similar to AIHuman + DialogFlow, but instead of typing in the keyboard, users can have a voice conversation with the AI. AI greets you when you enter the screen. ('Hello long time no see.')

After the greeting, if a voice input signal **Speak Now** appears below , say **where are you**. The AI understands the sentence and responds with an appropriate answer. Currently, the chatbot has limited speech sets, so it can only answer a few questions. If the chatbot is more advanced, it can be applied to  a variety of situations such as ordering at a restaurant or making a reservation. In addition, the chatbot can also display images with information on the side in addition to text.(Chatbot server should be implemented for this.)

<p align="center">
<img src="/img/aihuman/android/Screenshot_20211207-010111.png" style={{zoom: "25%"}} />
</p>

## 1. Set up the AI and UI.

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

## 2. Initialize Chatbot with Speech Recongnition.
Initialize PlayChat with a voice recognition function (STT). (AI is set as the default AI)

First, create a chatbot with the ChatbotFactory's static method (**MBPlayChatbot.newMBChatbot(,)**) and then call the init( , ) method. Then you can call STT-related startRecognize() and stopRecognize() methods along with the existing chatbot methods (send(,), etc.).

**Set GoogleSTT for STT**

Create stt instance with GoogleSTT class. This class which implements ISTT can start and stop speech recognition using  'startRecognize(), stopRecognize()' methods. GoogleSTT class use 'Service' inside so that AndroidManifest.xml needs to be set like below. Be aware where the stt package sits.
```xml
<service android:name=".stt.google.SpeechService"
            android:exported="false" />
```

Also, it uses google API which needs google credential file that is explained below. 

**Get the google Speech To Text authentication(credential) file**

The Google Speech to Text authentication file (credential) can be obtained from the Google Cloud API site (https://console.cloud.google.com/apis/dashboard). First, you need to create a project in order to use Speech to Text. After creating the project, you can get a credential file (json file) by creating user authentication information after setting up STT in Cloud API. After downloading the file, put the file in the assets directory of the app project. (If the assets directory does not exist, right-click in the app directory of the project > New > Folder > Assets Folder to create it.)

**Use the credential file to authenticate STT**

If you place the received file in the assets directory, now enter the name of the file as a JSON value in the "speechgrpc_google_credential.json" part as shown below. Then use this JSON to create ChatbotSettings. The language code for recognizing English is en-US. If you use Korean, set it to ko-KR and use the Korean AI. After that, put ChatbotSettings as the first argument of the init(,) method.

**Set MS Azure for STT**

You can use 'MS azure Speech to Text' beside google STT. To use azure, go to the MS's website(https://portal.azure.com/), create STT resource and get subscription key and region like sample below.

## 3. Create Callback.
Create chatbot callback and call the init(,) method.

The chatbot callback (iChatbotCallback) is a callback that notifies the status change of the chatbot, reports error and messages, etc. Create an instance with the new operator and call it by putting it in the chatbot.init(,) method together with the ChatbotSettings instance as shown below. When ChatbotState.SESSION_INITIALIZED is returned in the onChatbotStateChanged method, it is ready and you can send and receive messages to the Chatbot service. The voice recognition service is now ready.

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

**Get started with speech recognition**

You can turn on the voice recognition by calling **startRecognize()** method directly as shown below. To turn off voice recognition, call **stopRecognize()**, and each call will receive a response to callback.

In the callback signal of speech recognition, **STTState.START_RECOGNIZING** will be returned from onChatbotStateChanged when startRecognize() is called, and **STTState.STOP_RECOGNIZING** when **stopRecognize()** is called. In addition, there are two more callback values:

- **STTState.NEW_SPEECH_POSTED** : Called when the recognized word is delivered to the chatbot. For example, it comes after when the user says "Hello. Good morning."
- **STTState.NEW_SPEECH_RECOGNIZED** : This comes in when the recognized word is updated in the middle of recognition. For example, if the user said "Hello. Good morning", it would show all recognitions like "hello", "hello good morning" or any combination of those. This can be used to show the user that STT is responding.

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

## 4. Using AI + chatbot + voice recognition together.

Simply put, the main purpose of this sample is for conversations with AI using voice. For this, AIPlayer, chatbot, and voice recognition must work harmoniously. Therefore, we created the **AIChatbotController** class (aiChatbotCtlr member variable) that manages everything.

First, it is assumed that when AI and chatbot is loaded, it sends a **"start"(VALUE_FUNC_NAME_START)** signal to the chatbot. When the "start" signal is sent, the chatbot recognizes it and sends back a **greeting message**. The greeting goes into the onChatbotMessage() method of iChatbotCallback. The aiChatbotCtrl basically sends these words to the AI to speak.

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



**AIChatbotController processes the messages received from the chatbot.**

When you receive a message from the chatbot (**onChatbotMessage**), first check its content (JSON). JSON is divided into two parts, **func_name**, the type of command, and **args**, the actual content. Command type **onMessage** is set as a default for **func_name** and it shows chatbot's response.

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



**Data transfer format for Chatbot (PlayChat)**

Mostly, the chatbot automatically transmits the content to the PlayChat server when it recognizes voice. However, there are situations when you need to manually send some message or special signal to the chatbot (this includes the "start" signal mentioned above). To send the user's message, call the chatbot's send(,) method.

```java
boolean send(String command, JSONObject detail);
```

Write a server function name you want in the command, and put necessary arguments in a form of key:value. The currently set command (or func_name) is shown below.

```java
//send
public static final String VALUE_FUNC_NAME_USERINPUT = "userInput";
public static final String VALUE_FUNC_NAME_START = "start";

//receive
public static final String VALUE_FUNC_NAME_ONMESSAGE = "onMessage";

//there is next message 
public static final String VALUE_USERINPUT_NEXT = ":next";
```

- The userInput function can accept an argument with key=text.

- The start function doesn't need any arguments.

- OnMessage comes with the following values.  If the next value is true for the field 'extra', it means that there is a sequential message in queue.

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

- If there is a message in queue, you can receive the following message when you send  **":next" (VALUE_USERINPUT_NEXT)** as an argument to userInput function.

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
