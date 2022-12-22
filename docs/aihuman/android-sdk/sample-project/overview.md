---
sidebar_position: 1
---

# Overview

The provided sample demonstrates the AIPlayer's functionalities by going through an example. This allows you to take a closer look at how you can actually use and operate the SDK. The Main Activity is MainActivity.java, and when it launches, the following 4 menu buttons appear.

<p align="center">
<img src="/img/aihuman/android/Screenshot_20220530-201302-3909315-3915724.png" style={{zoom: "25%"}} />
</p>

The main activity contains the AIHuman SDK authentication function in the **onStart() method**. This is to make sure the state is authenticated before moving on to another activity. This is why there is no problem in calling getAIList() directly without authentication in some activities. If there are no response from the getAIList() API, check the error first. Most of the time, it is a token refresh(authentication) problem.

**MainActivity's menu**

- AIHuman Quick Start (AILiveQuickStart.java)
- AIHuman (AIPlayerDemo.java)
- AIHuman + DialogFlow (AIPlayerWithDialogFlowDemo.java)
- AIHuman + PlayChat(AILiveWithMBPlayChatWithSTTDemo.java)
- AI Human 3d Character (UnityActivity.java)

Below is an explanation of each menu.
