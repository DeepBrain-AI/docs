---
sidebar_position: 5
---

# AWS SDK 연동 

:::note related files

- demo_aws_sdk.html, src/aws_sdk_index.js, js files(aws sdk) in src/lib/, demo2.css

:::

이 데모는 AI Human과 AWS SDK를 사용하여 대화형 AI 서비스를 구현하는 데모입니다. (실제 동작은 AWS key와 secret이 설정된 후에 동작합니다.)

<img src="/img/aihuman/web/aws_sdk_web.png" />

### AI Human과 AWS Transcribe/LLM 챗봇 사용하기 

이제 강력한 AWS SDK를 사용하여 대화형 AI 서비스를 구축 할 수 있습니다. 
이 예제에서는 AWS Transcribe를 이용해 STT를 구현하고, BedrockRuntime Claud SDK를 이용하여 LLM Chatbot을 구현합니다. 아래의 문서와 샘플을 참고하였습니다.

- 공식 문서: https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/welcome.html 
- 참고 샘플: https://github.com/awsdocs/aws-doc-sdk-examples 


## AWS SDK의 개발 환경 셋업 
### 1. Transcribe SDK 
아래의 링크를 참조하여 AWS에서 필요한 환경을 설정하십시오. 이것은 이 SDK를 사용하려면 aws 인증을 한후 aws 리소스를 생성해야함을 의미합니다. 목표는 'transcribe'용 region과 'Physical ID of the IDENTITY_POOL_ID'를 획득하는 것입니다. 
- https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javascriptv3/example_code/cross-services/transcribe-streaming-app 

다음으로 위 사이트에서 src/libs 아래의 js 파일들을 복사 한 후 당신의 프로젝트에 동일한 dir 구조 아래에 넣으십시오. 이후 Region과 IDENTITY_POOL_ID을 awsID.js 파일에 입력하십시오. 

### 2. Anthropic Claude(Bedrock Runtime) SDK
AWS 계정으로부터 accessKeyId, secretAccessKey 값을 확인하십시오. 이 데모는 단지 샘플이므로 키나 시크릿 같은 값을 노출하는 것은 바람직하지 않습니다. 키/시크릿의 보호를 위해서 다른 프록시 서버를 이용하는 것이 좋습니다. 아래의 사이트에서 코드 샘플을 확인합니다.

- https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javascriptv3/example_code/bedrock-runtime

이제 llm 모델을 선택합니다. 여기서는 anthropicClaude을 사용하였습니다. 

- https://github.com/awsdocs/aws-doc-sdk-examples/blob/main/javascriptv3/example_code/bedrock-runtime/models/anthropicClaude/invoke_claude_2.js

<br/>
 

## 웹팩(Webpack) 빌드를 셋업

aws 샘플에서는 웹팩이 사용되었습니다. 프로젝트의 'package.json' 파일을 주의깊게 살펴보고 웹팩 빌드에 사용된 'webpack_aws.config.js' 옵션(scripts.aws)을 확인하십시오. 또한 ES 스타일을 위한 'type:module' 셋팅과 dependencies들을 확인하십시오. 

'webpack_aws.config.js' 파일에서 먼저 'entry'와 'output' 부분( export default)을 찾으십시오. entry 부분은 이 데모의 source file(aws_sdk_index.js)을 지정하며, output 부분은 webpack build 결과 파일을 지칭합니다. 이 소스 파일에 관련된 html/css파일을 포함한 모든 기능을 구현하였습니다. public에 demo_aws_sdk.html을 열어보시면 demo_aws_sdk.js 스크립트를 포함한 것을 보실 수 있습니다. 

'demo_aws_sdk.js' 파일을 빌드하시려면, 터미널에 'npm run aws'를 입력하세요.

## AIHuman과 AWS SDK를 연동하기
entry 파일에는, 4개의 중요한 클래스가 있습니다. AppController, LLMChatbot, Transcriber 그리고 AIPlayer가 그것들입니다. LLMChatbot은 BedrockRuntimeClient를 가지고 있습니다. Transcriber는 transcribeClient를 포함합니다. 해당하는 key와 secret들을 입력하고 'npm run build' 명령어를 이용해 빌드하고 'npm run dev'로 실행시킨후 데모가 어떻게 동작되는지 확인합니다.

```javascript
//in aws_sdk_index.js
this.llmClient = new BedrockRuntimeClient({
      region: 'the_region_you_set',
      credentials: {
        accessKeyId: 'your_access_key_id ',
        secretAccessKey: 'your_secret_access_key', //
      }
    })
```

```javascript
//in awsID.js
export const REGION = "your_region";
export const IDENTITY_POOL_ID = "your_pool_id";
```

위 커맨드를 입력후에 크롬을 열어서 주소창에 'http://localhost:3000/demo_aws_sdk.html'를 입력합니다. 중앙에 Start 버튼이 보일 것입니다. 클릭하면 'initSample()'를 호출합니다.  이는 AIPlayer를 default AI로 초기화합니다. AIPlayer 초기화가 완료되면, AppController가 AI human이 인사말을 하도록 'startFirstGreeting()'를 실행합니다. 

AIHuman이 인사말을 한 후에는, 사용자가 LLM에 입력을 보낼 수 있습니다. 
챗팅 윈도우의 아래쪽에 텍스트를 입력할수 있는 UI가 있습니다. 여기에 원하는 텍스트를 작성한 후 `send` 버튼을 클릭합니다. 이 내용은 aws LLM에 보내지고, 모델은 이에 반응합니다. 또한 반응으로 온 텍스트는 AIPlayer를 통해 발화하게 됩니다. 

```javascript
window.onTextSendBtnClick = () => {
  console.log('onTextSendBtnClick')
  appCtlr.trySendMsgToLLM(document.getElementById('AILiveInputText').value)
}
```

```javascript
let textResp = await llmChatbot.sendMsg(userMessage)      
console.log('llm text resp:', textResp)
if (this.updateAppState(APP_STATE.AI_SPEAKING)) {
  addBotMessageLogAndSendText(target)
} else {
  AI_PLAYER.stopSpeak()
  this.updateAppState(APP_STATE.IDLE, true)  
}

async function addBotMessageLogAndSendText(text, gst) {
  addBotMessageLog(text)

  await refreshTokenIFExpired();
  AI_PLAYER.send({ text, gst });
}
```

Transcribe의 경우에는 오른쪽 메뉴에 탑쪽에 'voice' 버튼을 선택합니다. 그러면 입력 모드가 TEXT에서 VOICE로 바뀝니다. 챗 윈도우 아래에 'Record' 버튼을 클릭하여 음성 레코딩을 시작합니다. 브라우저 주소창 쪽에 레코딩 사인 UI가 나오는 것을 확인 할 수 있습니다. 'How are you'('en-US'로 셋업됨)라고 말해보면, SDK가 해당 내용을 받아 해독하여 UI에 표시됨을 볼 수 있습니다. 그리고 버튼의 텍스트도 'Send'라고 바뀌었습니다. 해당 버튼을 클릭하면 받아 써진 텍스트가 LLM에 보내집니다. LLM이 곧 응답을 보내고 AIHuman이 이를 발화합니다.

```javascript
async startTranscribe() {
    console.log('startTranscribe')
    try {
      const { startRecording } = await import("./libs/transcribeClient.js");
      await startRecording('en-US', this.onTranscriptionDataReceived)

      return true
    } catch (error) {
      alert("An error occurred while recording: " + error.message);
      await this.stopTranscribe();
      //TODO show error popup

      return false
    }
  };
```

```javascript
onTranscribeComplete = async () => {
    console.log('onTranscribeComplete text', this.transcribingText)
    const userMessage = this.transcribingText

    transcriber.stopTranscribe()
    this.transcribingText = ''

    this.updateAppState(APP_STATE.IDLE, true)

    await this.trySendMsgToLLM(userMessage)
  }
```