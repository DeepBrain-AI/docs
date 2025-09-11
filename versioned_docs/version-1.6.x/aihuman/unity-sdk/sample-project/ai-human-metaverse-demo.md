---
sidebar_position: 8
---

# AI Human Metaverse Demo

:::note related files

- 6.AIHuman & Metaverse.scene

:::

This demo is an example of a metaverse service using the AI Human SDK. Through this demo, you can look at 2D content using AIPlayer in the 3D space and interactive services with 3D characters using AI3DPlayer.

- **Supports built-in and URP.**
- **TextMeshPro package installation is required.**


<br/>

### Using AIPlayer in 3D Space

<p align="center">
<img src="/img/aihuman/unity/metaverse_aiplayer.png" style={{zoom: "60%"}} />
</p>

As shown in the above image, in the demo, you can see the implementation of TV news using AIPlayer in the 3D space. A brief implementation process is as follows.

- Create UI on TV (subtitle, news image)
- Create an AIPlayer View to draw a 2D AI model
- Create a camera for AIPlayer only and then render TV images to RenderTexture through that camera
- Create a Plane on a TV object and apply RenderTexture to the Plane Material
- Speech of AI model, use OnAIPlayerEvent() to display contextual news subtitles and images

:::tip related scripts
For more information, refer to the Hierarchy configuration of the Scene and scripts.
- DemoMetaverse.cs
- MetaverseAIPlayer.cs
- MetaversePlayerCallback.cs
- MetaverseFrameImageProvider.cs
:::


<br/>

### Using AI3DPlayer in 3D Space

<p align="center">
<img src="/img/aihuman/unity/metaverse_ai3dplayer.png" style={{zoom: "60%"}} />
</p>

As shown in the image above, in the demo, you can see the implementation of a simple interactive service using AI3DPlayer in the 3D space. A brief implementation process is as follows.

- Create Chat UI
- Configuring Chatbot for Conversations
- Loading 3D models using AI3DPlayer
- Use AI3DPlayer.onAIPlayerEvent and ChatbotManager to speak and lipsync AI models

:::tip related scripts
For more information, refer to the Hierarchy configuration of the Scene and scripts.
- MetaverseAI3DPlayer.cs
- UIMetaverseChat.cs
- ChatbotManager.cs
:::


<br/>

### Other features for metaverse implementation

Although not focused on it, the demo has several features implemented for the metaverse.

- Player manipulation from a first-person perspective
- Interacting with specific objects