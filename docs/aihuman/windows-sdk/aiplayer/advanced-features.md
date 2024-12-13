---
sidebar_position: 5
---

# Advanced Features

The following describes advanced features related to AI speech.

You can set or change **Gestures, Language and CustomVoice, Speed**, etc. in the IDLE state.

### Gestures

Use a [AIClipSet](../../../aihuman/windows-sdk/apis/aiclipset) to send utterance commands to the AI. The AIClipSet refers to a series of AI action unit. There are three types of ClipSet: general speech, speech with gesture, and gesture only. The Gesture can be used depending on whether the AI model supports gestures, and the list of available gestures can be checked using the `GetGestures` function of AIPlayer. Even a model that does not support gestures can be operated using ClipSet.

AIClipSet types are as follows.

:::info types

- CLIP_SPEECH: Clip only for speech without gestures
- CLIP_GESTURE: Gesture only Clip
- CLIP_SPEECH_GESTURE: Clip for speech with gestures
  :::

In the sample screenshot below, an AI model named Jonathan is speaking while waving his hand with a "hi" gesture.

<img src="/img/aihuman/windows/gesture_1.4.x.png" />

```csharp
using AIHuman.Common.Model;
using AIHuman.Core;
using AIHuman.Media;
...
private ObservableCollection<AIGesture> _gestures;
...
_gestures = _aiPlayer.GetGestures();
...
AIGesture gesture = _gestures[index];

AIClipSet clip = AIAPI.CreateClipSet("nice to meet you.", gesture.Name);

_aiPlayer.Send(new[] {clip});
```

#### Monitoring callbacks of gesture actions

IAIPlayerCallback.OnAIPlayerEvent(AIEvnet aiEvent) is called in the same way as the speech actions. The state value of AIEvnet is called as follows to know the event. However, since aiEvent.EventType, aiEvent.ClipSet are known here, it is possible to know whether it is a gesture action or just a speech action.

- `AICLIPSET_PLAY_PREPARE_STARTED`
- `AICLIPSET_PLAY_PREPARE_COMPLETED`
- `AICLIPSET_PLAY_STARTED`
- `AICLIPSET_PLAY_COMPLETED`

<br/>

### Change the Voice or Language

Some AIs can speak with other voices besides basic voices. It is also possible to speak other language than the basic voice's language if the supported voice's language is different from the basic language of AI. You can check the sample for a list of voices that are currently available to a AI. The custom voices is AIAPI.AuthStart or AIAPI.It can be checked after the GenerateToken function is called. More explicitly, AIAPI.LoadCustomVoices may be used, but it will function normally after a successful authentication procedure.

<img src="/img/aihuman/windows/customvoice_1.4.x.png" />

<br/>

#### Set the custom voice using AIPlayer's method

First, the list of languages that AI can currently speak can be checked through the following method.

```csharp
ObservableCollection<string> languages = AIAPI.GetSpeakableLanguages(_aiPlayer.AIGender);
```

Next, the voice list suitable for the corresponding language and gender can be checked by the following method. CustomVoice has properties of ID, Name, LanguageCode and Gender.

```csharp
ObservableCollection<CustomVoice> customVoices = AIAPI.GetCustomVoices();
```

If you know the id of the desired voice, you can find the desired voice using the following method. If there is none, return null. Here, voiceId is the ID of CustomVoice object. (The voiceId can be get by customVoice.ID property.)

```csharp
CustomVoice myVoice = AIAPI.FindCustomVoice(voiceId);
```

Directly change to the desired voice on the aplayer is set as follows, and is set to the default voice when null is entered. Returns true if successful.

```csharp
ObservableCollection<CustomVoice> customVoices = AIAPI.GetCustomVoices();
CustomVoice myVoice = customVoices[0];
bool succeeded = _aiPlayer.SetCustomVoice(myVoice);
```

Instead of using CustomVoice object directly, you can set CustomVoice with language and gender. In this case, the first customVoice of the filtered list is set. If it not available, the voice is set to the default voice.

```csharp
bool succeeded = _aiPlayer.SetCustomVoiceForLanguage("en-US", "MALE");
```

Check current CustomVoice with following method. It returns null if CustomVoice is not set or default voice.

```csharp
CustomVoice customVoice = _aiPlayer.GetCustomVoice();
```

#### Set the custom voice using AIClipSet

In addition to the method of using the SetCustomVoice method to set a voice other than the default voice, AIClipSet can be used to speak the desired voice as follows.

```csharp
CustomVoice myVoice = AIAPI.GetCustomVoices("en-US", "MALE")[0];
AIClipSet aiClipSet = AIAPI.CreateClipSet("this is sample sentence.", null, myVoice);
_aiPlayer.Send(new[] {aiClipSet});
```

<br/>

### Change AI Speech Rate

: You can set the speech rate of AI. The possible value range is from 0.5 to 1.5.

```csharp
// set Property
_aiPlayer.Speed = value;
```

<br/>

### Preload

Preload is used when you want to make the AI speak the next sentence without delay by loading sentences in advance. You could think of it as a caching process. Select a sentence and press the **Preload** button in the sample below to perform the corresponding action.

<img src="/img/aihuman/windows/preload_1.4.x.png" />

```csharp
// using pure-text
_aiPlayer.Preload(new[] {"sentence"});
// using AIClipSet
_aiPlayer.Preload(new[] {clip});
```

#### Preload related Monitoring

AIPlayerCallback.OnAIPlayerEvent(AIEvnet aiEvent) is called during the preload operation just like the speaking operation. The value of AIEvent is shown below.

- `AICLIPSET_PRELOAD_STARTED`
- `AICLIPSET_PRELOAD_COMPLETED`

<br/>

When the AI has several sentences to speak, it first processes the very first sentence. Once the returned event from OnAIPlayerEvent is AICLIPSET_PLAY_STARTED, which is when the AI starts to speak the first sentence, the next sentence can be preloaded. If you play the next sentence after the event update to `AICLIPSET_PRELOAD_COMPLETED`, there will be minimum delays between sentences.

```csharp
// AI Preload related Callback
public void OnAIPlayerEvent(AIEvent aiEvent)
{
    if (aiEvent.EventType == AIState.Type.AICLIPSET_PRELOAD_STARTED)
    {
        message = "AI started preparation to preload.";
    }
    else if (aiEvent.EventType == AIState.Type.AICLIPSET_PRELOAD_COMPLETED)
    {
        message = "AI finished preparation to preload.";
    }

    ...
}
```

<br/>

### Speak Multiple Sentences Consecutively

You can give AIPlayer several sentences at once and make them speak sequentially. In the sample, multi-speaking is performed by selecting random sentences from sentences in the ComboBox. It can be one sentence or it can be several sentences. Press the **Multi Speak** button in the app below to perform the operation.

<img src="/img/aihuman/windows/multispeak_1.4.x.png" />

```csharp
// using pure-text
_aiPlayer.Send(new[] {"This is sample sentence1", "This is sample sentence2"});
// using AIClipSet
_aiPlayer.Send(new[] {clip1, clip2});
```

#### Multi Speak related Monitoring

IAIPlayerCallback.OnAIPlayerEvent(AIEvnet aiEvent) is called for each sentence. The possible AIEvent values are shown below.

- `AICLIPSET_PLAY_PREPARE_STARTED`
- `AICLIPSET_PLAY_PREPARE_COMPLETED`

If you send several sentences, it automatically preloads if possible. In this case, you can see that the delay between utterances when the AI speaks is reduced.
