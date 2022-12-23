---
sidebar_position: 4
---

# with Playchat

:::note related files

- ChatbotSampleViewController.swift

:::

AI Human + PlayChat is a conversational AI service provided by DeepBrain AI.<br/>
When you enter the screen, the AI gives you a greeting. After that, you can communicate with the AI.<br/>
In the sample, the chatbot can respond to only a few limited conversations, but with more advanced PlayChat chatbot settings, it can be applied in a variety of situations, such as ordering at a restaurant or making a reservation.

<p align="center">
<img src="/img/aihuman/ios/aisample_ss_playchat.PNG" style={{zoom: "50%"}} />
</p>

**Creating a PlayChat chatbot**

```swift
func makeChatbot() {
    chatbot = MBPlayChat(botId: "blank_user0_1608025226460", delegate: self)
}
```

**Getting started PlayChat**
If you are connected after PlayChat is created, you can start chatting.

```swift
func didConnect() {
    chatbot.start()
}
```

**CallBack**

You can check the connection states and errors of PlayChat, as well as messages received from the chatbot.

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

**Send message to PlayChat**

```swift
func sendToServer(text: String) {
    chatbot.send(event: "userInput", parameters: ["text" : text])
}
```
