---
displayed_sidebar: aihumanwebSidebar
sidebar_position: 1
slug: /aihuman/web-sdk
---

# Introduction

**Basic Concepts of AI Human**

AI Human (previously called AILive) SDK can display a trained AI model that resembles a real human on the screen in real-time. However, it goes beyond just realtime displaying the AI model. It even allows the AI to speak naturally as if in a video call. The most important component of the SDK is AIPlayer.

<img src="/img/aihuman/web/quick_start.png" />

AIPlayer is a component where the AI model is displayed. The AI within the AIPlayer is created by **training the voice and facial expressions of a real person.** Therefore, it does not have any artificial sounds and is more natural than the previously existing TTS.

In addition, it is possible to select a variety of different models through AIPlayer. When an AI model is selected, after the loading process(user authentication and resource loading), the selected AI model in idle state will be displayed on the screen as shown in the image above.

AI's **Idle state** is the state in which the AI is listening rather than speaking. In this state, the AI model is not static like the picture above, but is designed to resemble natural human motion as closely as possible by showing movements like blinking or nodding. AIPlayer has a simple structure where all these processes are automatically performed with simple settings.

The user can command the client (AIPlayer) in the Idle state to **start speaking** for example, 'Hi,' 'How are you,' etc. Upon receiving this command, the AI will naturally begin to speak, and when finished, it will **naturally** go back to the idle state.

Users can also **adjust the size, position, and speech rate of the AI**. In addition, pause, resume, and stop functionalities are provided, which can be used to support a variety of manipulations on the screen. We have basically English, Korean, Japanese, and Chinese AI models and it is possible to support many other languages.
