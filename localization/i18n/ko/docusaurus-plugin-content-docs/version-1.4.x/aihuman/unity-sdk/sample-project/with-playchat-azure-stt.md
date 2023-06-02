---
sidebar_position: 4
---

# MS Azure STT와 PlayChat 연동

:::note related scene

- 3.Playchat & AzureSTT.scene

:::

이번 데모는 AI Human + Playchat + Azure STT를 연동한 대화형 AI 서비스의 예제이다. 기본적으로 AI Human과 Playchat은 사용자로부터 문장을 입력 받아 채팅하는 형태이다. 추가적으로 Azure STT를 사용하여 **실제 사람처럼 음성으로 대화한다**. 화면에 진입하면 AI가 인사를 한다. ("Hello, long time no see.") 

인사말 이후 채팅으로 대화하거나 하단에 **Speak now**라는 음성 입력 신호가 나오면 "**where are you**"라고 말해보자. (실제로 동작하는 것은 Azure STT의 설정이 완료된 이후에 가능하다.) AI는 음성을 알아듣고 AI가 적절한 대답을 한다. 현재는 테스트 챗봇이라 몇가지 제한된 물음에만 응답 할수 있지만 챗봇을 고도화시키면 상황에 따라 식당에서 주문이라든가 공연 예약 등 다양하게 활용될 수 있다. 또한 챗봇이 텍스트 외에 **추가 정보를 보내 이미지도 표시**할수 있도록 하였다. 

<p align="center">
<img src="/img/aihuman/unity/sampleproject_azurestt.png" style={{zoom: "40%"}} />
</p>

### AI + Chatbot + Speech Recognition 함께 사용하기

해당 Demo에서 말하는 대화형 AI 서비스를 사용해 보려면, 아래와 같이 준비 과정이 필요하다.

- Playchat Bot ID 준비하기: 데모에 준비되어있음 (https://aichat.deepbrainai.io/)
- Azure Speech Service Key와 Endpoint 준비하기: https://docs.microsoft.com/ko-kr/azure/cognitive-services/speech-service/overview

ChatbotManager.cs 파일의 class 정의 상단부에 선언된 PLAYCHAT_BOT_ID 변수와 AzureRecognitive.cs 파일의 class 정의 상단부에 선언된 AZURE_STT_URL, AZURE_SUBSCRIPTION_KEY 변수에 각각 값을 지정한다.

이 데모는 AI와 음성으로 대화를 이어나가는 것이 주목적이다. 이를 위해서는 AIPlayer와 챗봇, 음성 인식이 조화롭게 돌아가야한다. 따라서 이를 용이하게 하기 위해 전체를 관리하는 **DemoChatbot** 클래스를 작성하였다.

먼저, AI가 로드되었다고 가정하고, 챗봇이 로드되면 챗봇에 **"start"** 신호를 보내는데, 이렇게 "start" 신호를 호출하면 챗봇이 인식하고 **인사 메세지**를 보낸다. 그 인사말은 IChatbotCallback의 OnChatbotMessage 함수를 통해 전달된다. DemoChatbot은 이 메시지에서 AI에게 전달할 문장을 추출하여 AIPlayer에게 전달하게 되고 AI가 말하도록 한다. 

```csharp
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

### Chatbot(Playchat)의 데이터 전송 포맷 

Azure STT를 통해 음성인식이 되면 그 내용을 바로 Playchat 서버에 전달한다. 그러나 수동으로 챗봇에 어떤 메세지나 특별한 신호를 보내야할 상황도 있다. (위에서 말한 "start" 신호도 이에 포함된다) 사용자의 메세지를 보내려면 ChatbotManager의 Send함수를 이용하면 된다. 

```csharp
bool Send(string command, JObject detail)
```

command에 원하는 서버 함수 이름을 쓰고, 필요한 인자들을 detail에 key:value로 넣으면 된다. 현재 정해진 command는 다음과 같다. 

- userInput : text를 키로 인자값을 넣으면 된다. 

- start : 인자가 필요없다. 

- onMessage : 기본적으로 아래와 같이 값이 오며, 특히 여기에서 'extra'에 next값이 true이면 다음에 연속으로 할말이 있다는 뜻이다.

```csharp
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

- 다음 메세지가 있을 경우 userInput에 인자 text로 특수 인자 표시인 **":next"**를 넣어서 보내면 다음 메세지를 받을수 있다. 

```csharp
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

위 설명은 중략된 부분이 많다. 데모의 Playchat & AzureSTT Scene을 참고바란다.
