---
sidebar_position: 4
---

# MS Azure STT와 PlayChat 연동

:::note related files

- 3.Playchat & AzureSTT.scene

:::

[PlayChat](https://aichat.deepbrainai.io/)은 DeepBrain AI의 ChatBot 솔루션입니다.

This menu is an example of a Conversational AI service that integrates AI Human, PlayChat and Microsoft Azure STT. Use Azure STT to **speak like a real person**. When the AI load is complete, the AI greets you. ("Hello, long time no see.") 

After the greeting, if a voice input signal **Speak now** appears below , say 'where are you'. The AI understands the sentence and responds with an appropriate answer. Currently, the chatbot has limited speech sets, so it can only answer a few questions. If the chatbot is more advanced, it can be applied to a variety of situations such as ordering at a restaurant or making a reservation. In addition, the chatbot can also display images with information on the side in addition to text.(Chatbot server should be implemented for this.)

<p align="center">
<img src="/img/aihuman/unity/sampleproject_azurestt.png" style={{zoom: "40%"}} />
</p>

### Using AI Human, Chatbot and MS Azure Speech Recognition

If you want to use the conversational AI service mentioned in the demo, you need to prepare as follows.

- Prepare your Playchat Bot ID: Already prepared in the demo (https://www.playchat.ai/docs/en/menual-chatbot-en.html)
- Prepare Azure Speech Service Key and Endpoint: https://docs.microsoft.com/en-us/azure/cognitive-services/speech-service/overview

Assign values to the PLAYCHAT_BOT_ID variables declared at the top of the class definition of the ChatbotManager.cs file.
Assign values to the AZURE_SUBSCRIPTION_KEY, AZURE_STT_URL variables declared at the top of the class definition of the AzureRecognitive.cs file.

The main thing is to continue the conversation with AI and voice. For this, AIPlayer, chatbot, and voice recognition must work harmoniously. The class that implements this is **DemoChatbot**.

First, after the chatbot is loaded, it sends a **"start"** signal to the chatbot, and when the chatbot recognizes it, it sends a **greeting message**. The greeting is delivered via IChatbotCallback's OnChatbotMessage function. DemoChatbot extracts the sentences to be delivered to AI from this message and delivers them to AIPlayer, allowing AI to speak.

```js
public void OnChatbotStateChanged(ChatbotState state)
{
    switch (state.State)
    {
        case ChatbotState.Type.RES_LOAD_STARTED:
            {                              
                break;
            }               
        case ChatbotState.Type.SESSION_INITIALIZED:
            {                                                  
                SendMsgToChatbot("start", null);
                break;
            }              
    }
}

public void OnChatbotMessage(JObject response)
{       
    if (response != null)
    {
        // get func_name, args
        string fName = response.GetValue("func_name").ToString();
        JObject args = response.GetValue("args").ToObject<JObject>();

        // process for functions accordingly
        ProcessOnNewFunc(fName, args);
    }
}
```

### Data transfer format of Chatbot (Playchat)

When speech is recognized through Azure STT, the content is delivered directly to the Playchat server. However, there are situations where you need to manually send a message or special signal to the chatbot. (This includes the "start" signal mentioned above.) To send the user's message, use the chatbot's Send function.

```js
bool Send(string command, JObject detail)
```

Write the server function name you want in the command, and put the necessary arguments as key:value in detail.


- In the userInput function, input the argument value with text as the key.

- start function takes no arguments.

- OnMessage basically comes with the following values. In particular, if the next value is true for 'extra' here, it means that there are additional messages. 

```js
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

- If there is an additional message, you can receive the additional message by sending it by adding **":next"**, which is a special argument indication, as the argument text in userInput.

```js
private void RequestNextMessageIfNeeded(JObject args)
{
    if (args != null)
    {
        JObject extra = args.GetValue("extra").ToObject<JObject>();
        if (extra != null)
        {
            if (extra.TryGetValue("next", out JToken next))
            {
                if (next.Value<bool>())
                {
                    SendUserInputToChatbot(":next");
                }
            }
        }
    }
}
```

Many of the above explanations have been omitted. See the Playchat & AzureSTT scene in the demo.
