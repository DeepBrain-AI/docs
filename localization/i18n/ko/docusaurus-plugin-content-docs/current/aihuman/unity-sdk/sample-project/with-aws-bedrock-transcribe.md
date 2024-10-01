---
sidebar_position: 6
---

# AWS Bedrock Claude와 AWS Transcribe 연동

:::note related scene

- 5.AWS Bedrock Claude & Transcribe

:::

이번 데모는 AI Human + AWS Bedrock Claude + AWS Transcribe를 연동한 대화형 AI 서비스의 예제입니다. AI Human은 AWS Bedrock Claude와 결합하여 `실시간 대화`가 가능합니다. 추가적으로 AWS Transcribe를 사용하여 `실제 사람처럼 음성으로 대화가 가능합니다`.

 `5.AWS Bedrock Claude & Transcribe` scene을 열고 AI와 대화를 시도해보세요. (실제로 동작하는 것은 AWS Transcribe의 설정이 완료된 이후에 가능합니다.) AI가 음성을 인식하고 Anthropic의 대규모 언어 모델인 Claude를 통해 적절한 대답을 하는것을 볼 수 있습니다. 현재 데모에서는 텍스트 기반의 대화만 구성되어 있지만 Amazon Bedrock의 모델 또는 백엔드 설정에 따라 이미지 출력도 가능합니다.

<p align="center">
<img src="/img/aihuman/unity/sampleproject_aws_bedrock_transcribe.png" style={{zoom: "70%"}} />
</p>

### AI + AWS Bedrock Claude + AWS Transcribe 함께 사용하기

위에서 언급한 대화형 AI 서비스를 해당 데모에서 구동하기 위해서는, 아래와 같이 `aws access` 정보가 필요합니다.

- AWS 계정 생성 및 Access 정보 : aws-accesskey-id, aws-secret-accesskey, region-endpoint, bedrock-modelid, anthropic-version

Amazon Bedrock Claude와 AWS Transcribe의 설명과 구성은 아래 페이지를 참고해주세요.

- Amazon Bedrock 기반 Claude 시작하기: https://aws.amazon.com/ko/bedrock/claude
- Amazon Transcribe 시작하기 : https://aws.amazon.com/ko/transcribe


AI 대화형 서비스를 위한 준비가 완료 되었다면 데모의 Hierarchy창에서 `DemoAWS-Bedrock-Claude-Trancribe`를 선택 후 Inspector창에서 위에서 준비한 aws access 값들을 입력합니다.


<p align="center">
<img src="/img/aihuman/unity/sampleproject_aws_bedrock_transcribe_inspector.png" style={{zoom: "70%"}} />
</p>

추가로 AWS Bedrock Claude 연결에 필요한 RegionEndpoint 설정이 필요합니다. `AWSController.cs` 스크립트의 `_bedrockRegionEndPoint` 변수에 AWS Bedrock 서비스가 구성된 RegionEndpoint 값을 입력합니다.

```csharp
// AWSController.cs
readonly RegionEndpoint _bedrockRegionEndPoint = RegionEndpoint.USWest2;
```

이제 데모 구동을 위한 준비가 완료되었습니다. 마이크를 통해 AI와 대화를 시도해보세요.


### AWS Transcribe를 연동하여 STT 구현

해당 데모에서는 음성을 텍스트로 변환하기 위해 AWS Transcribe를 연동하여 사용하고 있습니다.

`Presigned URL(사전 서명)`을 생성 후 `WebSocket`을 통해 Presigned URL을 사용하여 연결을 시도합니다. 정상적으로 연결이 되었다면, `Unity Microphone`을 통해 사용자 음성 데이터를 WebSocket을 통해 전송합니다.
변환된 텍스트는 `WebSocket.OnMessage` 이벤트를 통해 확인할 수 있습니다.

아래는 AWS Transcribe 연동을 위한 AWSController script의 주요 함수입니다.


```csharp
// AWSController.cs

// connect websocket
public async void Connect()
{
    if (Microphone.devices.Length == 0)
    {
        Debug.LogError($"{nameof(AWSController)} There are no microphones available.");
        return;
    }
  
    AWSTranscribePresignedURL transcribePresignedURL = GetComponent<AWSTranscribePresignedURL>();
    if (transcribePresignedURL == null)
    {
        Debug.LogError($"{nameof(AWSController)} Not find the AWSTranscribePresignedURL component.");
        return;
    }

    // get presigned url
    string url = transcribePresignedURL.GetRequestURL(_accessKey, _secretKey, _trancribeRegion);
    _socket = new WebSocket(url);

    int bitRate = Convert.ToInt32(transcribePresignedURL.GetAudioBitRate());
    // start microphone
    _clip = Microphone.Start("", false, 300, bitRate);

    _socket.OnOpen += () =>
    {
        Debug.Log($"{nameof(AWSController)} Open socket!");
    };

    _socket.OnError += (e) =>
    {
        Debug.LogError($"{nameof(AWSController)} Socket Error : {e}");
    };

    _socket.OnClose += (e) =>
    {
        Debug.Log($"{nameof(AWSController)} Close socket!");
    };

    // regist message event
    _socket.OnMessage += OnMessage;

    await _socket.Connect();
}

// message event
private void OnMessage(byte[] bytes)
{
    //First 8 bytes are the prelude with info about header lengths and total length.
    byte[] totalByteLengthBytes = new byte[4];
    Array.Copy(bytes, totalByteLengthBytes, 4);
    if (BitConverter.IsLittleEndian)
        Array.Reverse(totalByteLengthBytes);
    //an int32 is 4 bytes
    int totalByteLength = BitConverter.ToInt32(totalByteLengthBytes, 0);

    byte[] headersByteLengthBytes = new byte[4];
    Array.Copy(bytes, 4, headersByteLengthBytes, 0, 4);
    if (BitConverter.IsLittleEndian)
        Array.Reverse(headersByteLengthBytes);
    int headersByteLength = BitConverter.ToInt32(headersByteLengthBytes, 0);

    //Use the prelude to get the offset of the message.
    int offset = headersByteLength + 12;
    //Message length is everything but the headers, CRCs, and prelude.
    int payloadLength = totalByteLength - (headersByteLength + 16);
    byte[] payload = new byte[payloadLength];
    Array.Copy(bytes, offset, payload, 0, payloadLength);
    string message = Encoding.UTF8.GetString(payload);

    AWSTranscribeWebsocketMessage jsonMessage = JsonUtility.FromJson<AWSTranscribeWebsocketMessage>(message);
    
    if (jsonMessage != null && jsonMessage.Transcript.Results.Count > 0)
    {
        string resultMessage = jsonMessage.Transcript.Results[0].Alternatives[0].Transcript;
        if (!string.IsNullOrWhiteSpace(resultMessage))
        {
            // display message
            DemoAWS demoAWS = GetComponent<DemoAWS>();
            if (demoAWS != null)
            {
                demoAWS.OnMessage(resultMessage, true);
            }

            // invoke bedrock model
            Task.Run(() => InvokeModel(resultMessage));
        }             
    }
}
```

### AWS Bedrock Claude와 AI Human을 연동하여 TTS 구현

해당 데모에서는 실시간 대화 기능 구현을 위해 AWS Bedrock Claude와 AI Human을 사용합니다.

먼저 AWS Bedrock Claude의 연동을 위해 `AmazonBedrockRuntimeClient` 객체를 생성합니다. (AWS SDK에서 제공하는 클래스 객체이며, 해당 클래스의 사용을 위해 AIHuman SDK Sample에 일부 AWS SDK 라이브러리가 포함되어 있음)
그리고 요청에 필요한 값(max_tokens, anthropic_version, etc...)들을 셋팅하고 `AmazonBedrockRuntimeClient.InvokeModelAsync(InvokeModelRequest request)`를 호출합니다. 해당 API는 비동기로 동작하므로 응답을 받을때까지 대기합니다.
정상적으로 응답이 왔다면 `AIPlayer`를 통해 AI에게 발화를 명령합니다.

아래는 AWS Bedrock Claude 연동을 위한 AWSController script의 주요 함수입니다.

```csharp
// AWSController.cs

public async Task InvokeModel(string userMessage)
{
    if (_bedrockClient == null)
    {
        _bedrockClient = new AmazonBedrockRuntimeClient(_accessKey, _secretKey, _bedrockRegionEndPoint);
    }
                        
    var nativeRequest = JsonSerializer.Serialize(new
    {
        anthropic_version = _anthropicVersion,
        max_tokens = _maxTokens,
        messages = new[]
        {
            new { role = "user", content = userMessage }
        }
    });

    var request = new InvokeModelRequest()
    {
        ModelId = _bedrockClaudeModelID,
        Body = new MemoryStream(Encoding.UTF8.GetBytes(nativeRequest)),
        ContentType = "application/json"
    };

    try
    {
        var response = await _bedrockClient.InvokeModelAsync(request);
        var modelResponse = JsonNode.Parse(response.Body);
        var responseText = modelResponse["content"]?[0]?["text"] ?? "";

        // Since it is not unity's main thread, we put the response text into a queue and process it in the Update() function.
        _reponseClaudeQueue.Enqueue(responseText.ToString());              
    }
    catch (AmazonBedrockRuntimeException e)
    {
        Debug.LogError($"{nameof(AWSController)} ERROR: Can't invoke '{_bedrockClaudeModelID}'. Reason: {e.Message}");
    }
}

private void Update()
{  
    if (_reponseClaudeQueue.Count > 0)
    {
        string responseText = _reponseClaudeQueue.Dequeue();

        // AI speak
        DemoAWS demoAWS = GetComponent<DemoAWS>();
        if (demoAWS != null)
        {
            demoAWS.Speak(responseText.ToString());
        }
    }        
}
```


위 설명은 중략된 부분이 많습니다. 더 자세한 내용은 데모의 AWS Bedrock Claude & Transcribe Scene을 참고 바랍니다.
