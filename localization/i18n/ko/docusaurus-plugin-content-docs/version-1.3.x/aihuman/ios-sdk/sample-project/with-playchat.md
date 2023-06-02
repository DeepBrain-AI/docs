---
sidebar_position: 4
---

# Playchat 연동

:::note 관련 파일

- ChatbotSampleViewController.swift

:::

[PlayChat](https://aichat.deepbrainai.io/)은 DeepBrain AI의 ChatBot 솔루션이다.

AI Human + PlayChat은 딥브레인 AI가 제공하는 대화형 AI 서비스다.<br/>
화면에 진입하면 AI가 인사말을 건넨다. 인사말 이후 텍스트를 입력하면 입력된 텍스트에 따라 AI가 답변을 한다.<br/>
샘플에서는 챗봇에 몇가지 제한된 대화에 대해서만 응답 할 수 있지만 플레이 챗봇을 고도화 시키면 상황에 따라 식당에서 주문하기나 공연 예약 등 다양하게 응용 할 수 있다.

<p align="center">
<img src="/img/aihuman/ios/aisample_ss_playchat.PNG" style={{zoom: "50%"}} />
</p>

**플레이챗 챗봇 생성하기**

```swift
func makeChatbot() {
    chatbot = MBPlayChat(botId: "blank_user0_1608025226460", delegate: self)
}
```

**플레이챗 시작하기**
플레이챗이 생성된 이후 정상적으로 접속이 되었다면 채팅을 시작할 수 있다.

```swift
func didConnect() {
    chatbot.start()
}
```

**플레이챗 콜백**

PlayChat의 연결 상태와 오류, 챗봇에서 받은 메시지 등을 확인할 수 있다.

```swift
extension ChatbotSampleViewController: MBPlayChatDelegate {
    func didConnect() {
        ...
    }
    
    func didDisconnect() {
        ...
    }
    
    func onError(error: Error?) {
        ...
    }
    
    func onReceive(event: ChatbotEvent) {
        self.event = event
        if event.name == "onMessage" {
            let text = event.text
            if let img = event.image {
                self.chattingView.addChatWithImage(text: text, imgUrl: img.urlString, isLeft: true)
            }else {
                self.chattingView.addChat(text: text, isLeft: true)
            }
        }
    }
}
```

**플레이챗에 메세지 보내기**

```swift
func sendToServer(text: String) {
    chatbot.send(event: "userInput", parameters: ["text" : text])
}
```
