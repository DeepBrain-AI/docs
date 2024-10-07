---
sidebar_position: 4
---

# MS Azure STT와 PlayCaht 연동

:::note Sample Project에서 아래 파일들을 참고하세요.

- PlaychatView.xaml
- PlaychatViewModel.cs

:::

이 메뉴는 AI Human + Playchat(챗봇) + Microsoft Azure Speech SDK(STT)를 연동한 대화형 AI 서비스의 예시입니다. 기본적으로 AI Human과 Playchat은 사용자가 키보드로 입력하여 채팅하는 형식입니다. 추가로 MS Azure STT를 사용하여 실제 사람과 대화하듯 육성으로 대화가 가능하게 됩니다.. 화면에 진입하면 먼저 AI가 인사("Hello, long time no see.")를 합니다. 실제 사람처럼 손을 흔들며 인사하는 등의 다양한 시나리오를 연출할 수 있습니다.

:::info 

[PlayChat](https://aichat.deepbrainai.io/)은 DeepBrain AI의 ChatBot 솔루션입니다.

:::

인사말 이후 채팅으로 대화하거나 하단에 STT버튼을 클릭하여 음성 입력 신호가 나오면 "where are you"라고 말해 봅시다. (실제로 동작하는 것은 MS Azure STT의 설정이 완료된 이후에 가능합니다. 이 장의 아래에서 설명하고 있습니다.) AI는 육성을 듣고 AI가 적절한 대답을 하게 됩니다. 현재는 테스트 챗봇이라 몇가지 제한된 물음에만 응답 할 수 있지만 챗봇을 고도화시키면 상황에 따라 식당에서의 주문받기, 공연 예약하기 등 다양하게 활용될 수 있다. 또한 챗봇으로 부터 텍스트 외에 **추가 정보**를 전달하게 하여 이미지 등을 제공하는 시나리오를 구성할 수도 있습니다.

<img src="/img/aihuman/windows/PlaychatWithAzureSTTDemo.png" />

### AI + Chatbot + Speech Recognition 함께 사용하기

해당 Demo에서 말하는 대화형 AI 서비스를 사용해 보려면, 아래와 같이 일련의 과정이 필요합니다.

- Playchat Bot ID 준비하기: Sample에 준비되어있음 (https://www.playchat.ai/docs/en/menual-chatbot-en.html)
- Azure Speech Service Key와 Endpoint 준비하기: https://docs.microsoft.com/ko-kr/azure/cognitive-services/speech-service/overview

PlaychatViewModel.cs 파일의 class 정의 상단부에 선언된 PLAYCHAT_BOT_ID, AZURE_STT_URL, AZURE_SUBSCRIPTION_KEY 변수에 각각 값을 지정합니다.

간단히 생각해보면 이 샘플은 AI와 음성으로 대화를 이어나가는 것이 주목적입니다. 이를 위해서는 AIPlayer와 챗봇, 음성 인식이 유기적으로 동작해야 합니다. 따라서 이를 용이하게 하기 위해 전체를 관리하는 **PlaychatViewModel** 클래스를 작성하였습니다.

먼저, AI가 로드되었다고 가정하고, 챗봇이 로드되면 챗봇에 **"start"(VALUE_FUNC_NAME_START)** 신호를 보내는데, 이렇게 "start" 신호를 호출하면 챗봇이 인식하고 인사 메세지를 보내게 됩니다. 그 인사말은 IChatbotCallback의 OnChatbotMessage 함수를 통해 전달됩니다. PlaychatViewModel은 이 메시지에서 AI에게 전달할 문장을 추출하여 AIPlayer에게 전달하게 되고 AI가 말하도록 합니다.

```csharp
public void OnChattingReady()
{
    SendMsgToChatbotAndUpdateChatUI(Constants.KEY_START, null);
}

public void OnChatbotMessage(JObject response)
{
    OnNewChatMessage(response);

    if (response != null)
    {
        // get func_name, args
        string fName = response.GetValue(Constants.KEY_FUNC_NAME).ToString();
        JObject args = response.GetValue(Constants.KEY_ARGS).ToObject<JObject>();

        // process for functions accordingly
        ProcessOnNewFunc(fName, args);
    }
}
```

### Chatbot(Playchat)의 데이터 전송 포맷

MS Azure STT를 통해 음성인식이 되면 그 내용을 바로 Playchat 서버에 전달합니다. 하지만 수동으로 챗봇에 어떤 메세지나 특별한 신호를 보내고 싶은 상황(위에서 말한 "start" 신호 등)도 있을 수 있습니다. 사용자의 메세지를 챗봇에게 보내려면 IChatbot.Send 함수를 활용하면 됩니다.

```csharp
bool Send(string command, JObject detail)
```

command에 원하는 서버측 함수 이름을 전달하고, 필요한 추가 인자들을 detail에 key:value로 넣으면 됩니다. 현재 정해진 command(또는 func_name)는 다음과 같습니다.

```csharp
namespace AIHuman.Common.Constants
{
// send
public const string VALUE_USERINPUT_FUNCNAME = "userInput";
public const string KEY_START = "start";

// recv
public const string VALUE_FUNCNAME_ONMESSAGE = "onMessage";

// extra
public const string VALUE_USERINPUT_NEXT = ":next";
}
```

- userInput 함수는 text를 키로 인자값을 넣으면 됩니다.

- start 함수는 인자가 필요하지 않습니다.

- onMessage에는 기본적으로 아래와 같이 값이 오며, 특히 여기에서 'extra'에 next값이 true이면 다음에 연속으로 할말이 있다는 뜻 입니다.

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

- 다음 메세지가 있을 경우 userInput에 인자 text로 특수 인자 표시인 **":next" (VALUE_USERINPUT_NEXT)**를 넣어서 보내면 다음 메세지를 받을수 있다.

```csharp
  private void RequestNextMessageIfNeeded(JObject args)
  {
      if (args != null)
      {
          JObject extra = (JObject)args.GetValue(Constants.KEY_EXTRA);
          if (extra != null)
          {
              bool next = (bool)extra.GetValue(Constants.KEY_NEXT);
              if (next)
              {
                  SendUserInputToChatbot(Constants.VALUE_USERINPUT_NEXT);
              }
          }
      }
  }
```

위 내용에는 중략된 부분이 있습니다. 해당 Sample의 Solution 파일을 열어 Playchat.xaml, PlaychatViewModel.cs 파일을 참고해 주세요.
