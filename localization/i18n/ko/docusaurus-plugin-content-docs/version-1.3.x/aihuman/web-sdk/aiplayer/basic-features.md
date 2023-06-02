---
sidebar_position: 4
---

# 발화 관련 기본 기능

### 1. Send Speaking

After the aiPlayer resource loading is completed, call the **send method**. Input a sentence into a textbox as shown below and press the **SPEAK** button to make the AI speak.

You can input just string to make AI speak but AIClipSet is also able to do it. When using AIClipSet, you can make AI speak with some gestures. For example, you can order AI to wave and say "hello!" This is called gesture speech. Details are described in the [Gesture](#42-gesture) part.

If the text to speak is too long, it may not be possible to synthesize the resources required for the speaking. There are some models that can synthesize long sentences. Although it varies from ai to ai, it is generally recommended that sentences be cut to an appropriate length in Korean, usually within 30 to 40 characters, and at a similar level in English.

<img src="/img/aihuman/web/sdk_demo_03.png" />

```javascript
//Case1. One Sentence Speak
AI_PLAYER.send("Nice to meet you");

//Case2. One Gesture Speak
const AIClipSet = { text: "Nice to meet you", gst: "hi" };
AI_PLAYER.send(AIClipSet);
```

<br/>

### 2. Pause Speaking

```javascript
AI_PLAYER.pause();
```

<br/>

### 3. Resume Speaking (Resume from Pause)

```javascript
AI_PLAYER.resume();
```

<br/>

### 4. Stop Speaking (Resets all the data you have. No resume allowed)

: Stop speaking and reset all data. (cannot resume)

```javascript
AI_PLAYER.stopSpeak();
```

<br/>

### 5. Speech related Monitoring

After the send method is called, you can keep track of the state in the registered listener. This feedback is returned by calling the method (`onAIPlayerStateChanged(state)`) of the listener. onAIPlayerStateChanged sequentially returns the following string values.

- `speakingPrepareStarted`: on synthesis start
- `speakingPrepareComplete`: on synthesis complete
- `speakingStarted`: on speech start
- `speakingComplete`: on speech end

```javascript
AI_PLAYER.onAIPlayerStateChanged = async function (state) {
  if (state === "speakingPrepareStarted") {
      // TODO: speak prepare started handling
  }

  if (state === "speakingPrepareComplete") {
      // TODO: speak prepare complete handling
  }

  if (state === "speakingStarted") {
      // TODO: speaking start handling)
  }

  if (state === "speakingComplete") {
      // TODO: speaking complete handling
  }
};
```
