---
sidebar_position: 5
---

# with AWS SDK

:::note related files

- demo_aws_sdk.html, src/aws_sdk_index.js, js files(aws sdk) in src/lib/, demo2.css

:::

This demo is a conversational AI service using AI Human and AWS SDKs. (Actual operation is possible after AWS keys and secrets are set up.)

<img src="/img/aihuman/web/aws_sdk_web.png" />

<br/>
<br/>
<br/>

### Using AI Human with AWS Transcribe/LLM Chatbot

You can build a conversational AI service with powerful AWS SDKs. We are going to use AWS Transcribe for STT and BedrockRuntime Claud SDK for LLM Chatbot. This demo referenced below sites. 

- Official Docs: https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/welcome.html 
- Reference Sample: https://github.com/awsdocs/aws-doc-sdk-examples 



<br/>

### Set up the AWS SDK's environment 
#### 1. The Transcribe SDK 
Please follow link below and fullfil the environment setup in AWS. This means you need to get authenticated and build aws resource for transcribe. The goal is to get the 'region' and 'Physical ID of the IDENTITY_POOL_ID' for transcribe. 
- https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javascriptv3/example_code/cross-services/transcribe-streaming-app 

Next, copy all the js files in the src/libs from the website and put them in the same dir in your project. Set the Region and IDENTITY_POOL_ID in awsID.js.

#### 2. The Anthropic Claude(Bedrock Runtime) SDK
Please acquire the accessKeyId, secretAccessKey of your aws account. This is sample program so that the key and secret are here exposed. It is recommanded to use other proxy server to protect them. Check out the sample code for this.

- https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javascriptv3/example_code/bedrock-runtime

Next, choose your llm model. Here, we are going to use anthropicClaude.  

- https://github.com/awsdocs/aws-doc-sdk-examples/blob/main/javascriptv3/example_code/bedrock-runtime/models/anthropicClaude/invoke_claude_2.js

<br/>
 

### Setting up Webpack build 
Webpack is used in this aws sample. Please go over the 'package.json' file to check out the settings which is the 'webpack_aws.config.js' build (scripts.aws) for this demo. Also notice the 'type:module' for es style and dependencies as well including webpack-cli. 

Then, in 'webpack_aws.config.js', find out the 'entry' and 'output' section from export default part. The entry is this demo's source file(aws_sdk_index.js) and output is the webpack build result of it. We implement all the functions  in this file with the corresponding html/css. Open the demo_aws_sdk.html in public dir, and see that it includes the demo_aws_sdk.js. 

To build the 'demo_aws_sdk.js', type 'npm run aws' in terminal.


<br/>

### Integrate AIHuman with AWS SDK
In the entry file, we have 4 important Classes that are AppController, LLMChatbot, Transcriber and AIPlayer. The LLMChatbot has BedrockRuntimeClient and Transcriber has the transcribeClient. Set up the keys and secrets and build using the 'npm run build' and 'npm run dev' to check out how this demo works. 

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

After run the command, please open chrome and go to 'http://localhost:3000/demo_aws_sdk.html'. The Start button will show in the middle. Click it and it will call 'initSample()' function which initializes the AIPlayer with default AI. When the AIPlayer initialization completes, the AppController will soon call 'startFirstGreeting()' which makes AIHuman speak the greeting. 

After AIHuman speaks the greeting, users can send text to the LLM. On the bottom of the chat window, there is UI that you can type in text. Write something and click send button. It will be sent to aws LLM and the model will respond to that. Also, the model's answer will be spoken by the AIPlayer.

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

For transcribing, select the 'voice radio button' on right top in menu panel. The input mode will be changed from TEXT to VOICE. Click the 'Record' button under the chat window to start record, you will see the sign of recording in url input on top of the browser UI. Speak something like 'How are you'(it is set up in 'en-US'). The SDK will transcribe what you said and display them in UI. Also the button's text will be changed to 'Send', click it. Then the transcribed text will be sent to LLM too. Soon the model will respond to it and AIHuman will speak the answer.

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