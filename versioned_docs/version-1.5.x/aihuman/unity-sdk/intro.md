---
displayed_sidebar: aihumanunitySidebar
sidebar_position: 1
slug: /aihuman/unity-sdk
---

# Introduction

### Basic Concepts of AI Human (Video Conversation or AILive)

We introduce the AI ​​Human SDK along with the basic concepts of AI Human.

Using the AI ​​Human SDK (hereinafter referred to as SDK), AI created using deep learning can be expressed in real-time at the desired time and arrangement. AI Human can perform certain hand gestures or gestures, and by linking with a chatbot, implement services that **enable natural conversations like real people (Face to Face)**, refer to this as **Conversational AI Human**.


<p align="center">
<img src="/img/aihuman/unity/introduction.png" style={{zoom: "30%"}} />
</p>

When implementing AI Human services using SDK, AIPlayer, a key object, is used. 
AIPlayer is a component implemented by inheriting the UnityEngine.MonoBehavior class, so you can freely use it as an Add Component to a game object.
The AI within the AIPlayer was created by **training the voice and facial expression of a real person**. Therefore, it does not have any artificial sounds and is more natural than the previously existing TTS.

In addition, it is possible to select a variety of different models through AIPlayer. When an AI model is selected, the selected AI model in an Idle state is displayed on the screen after the loading process (user authentication and resource loading) as shown in the image above. 

AI's **Idle state** is the state in which the AI is listening rather than speaking. In this state, the AI model is not static like the picture above, but is designed to resemble natural human motion as closely as possible by showing movements like blinking or nodding. AIPlayer has a simple structure where all these processes are automatically performed with simple settings.

The user can command the client (AIPlayer) in the Idle state to **start speaking** like 'Hi', 'How are you', etc. Upon receiving this command, the AI will naturally begin to speak, and when finished, it will **naturally** go back to the Idles state.

Users can also **adjust the size, speech rate of the AI**. In addition, pause, resume, and stop functionalities are provided, which can be used to support variety of manipulations on the screen. AI models are available for **Korean, English, Japanese, and Chinese**, enabling multi-lingual support.

For more information, see the [Sample Project](../category/sample-project-description-4) and [AIPlayer](../category/aiplayer-description-4) Description chapters built on SDK.