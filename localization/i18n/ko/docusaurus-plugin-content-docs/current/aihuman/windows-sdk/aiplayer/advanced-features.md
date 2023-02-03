---
sidebar_position: 5
---

# 발화 관련 추가 기능

All functions other than speaking(mostly related to AI settings) of AIPlayer are described below.

After the resource load required for AI operation is completed, some settings of AIPlayer can be adjusted. When the resource loading is completed (`RES_LOAD_COMPLETED`), the state changes such that actual operations can be performed(Idle). On right side of the panel, **Voice, Gesture, Speed**, etc. can be adjusted as shown below.

### Change AI Speech Rate

: You can set the speech rate of AI. The possible value range is from 0.5 to 1.5.
```csharp
// set Property
_aiPlayer.Speed = value;
```

### Gestures
As briefly mentioned above, speech can also be performed using [ClipSet](#main-class-apis). The ClipSet here refers to one action unit in a series of AI actions. There are three types of ClipSet: general speech that performs only speaking, speech with gesture, and gesture only. The Gesture can be used depending on whether the AI model supports [Gestures](#main-class-apis), and the list of available gestures can be checked using the [GetGestures](#main-class-apis) function of AIPlayer. Even a model that does not support gestures can be operated using ClipSet.

AIClipSet types are as follows.

:::info types
  - CLIP_SPEECH: Clip only for speech without gestures
  - CLIP_GESTURE: Gesture only Clip
  - CLIP_SPEECH_GESTURE: Clip for speech with gestures
:::

In the sample screenshot below, an AI model named Jonathan is speaking while waving his hand with a "hi" gesture.

<img src="/img/aihuman/windows/Jonathan_Gesture_Demo.png" />

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

IAIPlayerCallback.OnAIStateChanged(AIState) is called in the same way as the speech actions. The state value of AIState is called as follows to know the state. However, since AIState.GetAIMsg().Clip.Type, GestureName, and SpeechText are known here, it is possible to know whether it is a gesture action or just a speech action.

- `SPEAKING_PREPARE_STARTED`
- `SPEAKING_PREPARE_COMPLETED`
- `SPEAKING_STARTED`
- `SPEAKING_COMPLETED`

<br/>

### Change the Voice or Language
Some AIs can speak with other voices besides basic voices. It is also possible to speak other language than the basic voice's language if the supported voice's language is different from the basic language of AI. You can check the sample for a list of voices that are currently available to a AI. The custom voices is AIAPI.AuthStart or AIAPI.It can be checked after the GenerateToken function is called. More explicitly, AIAPI.LoadCustomVoices may be used, but it will function normally after a successful authentication procedure.

<img src="/img/aihuman/windows/CustomVoice_GCE.png" />

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

Direct change to the desired voice on the aplayer is set as follows, and is set to the default voice when null is entered. Returns true when success.

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

### Preload

Preload is used when you want to make the AI speak the next sentence without delay by loading sentences in advance. You could think of it as a caching process. Select a sentence and press the **Preload** button in the sample below to perform the corresponding action.

<img src="/img/aihuman/windows/Haylyn_Preload.png" />

```csharp
// using pure-text
_aiPlayer.Preload(new[] {"sentence"});
// using AIClipSet
_aiPlayer.Preload(new[] {clip});
```

#### Preload related Monitoring 

AIPlayerCallback.onAIStateChanged(AIState) is called during the preload operation just like the speaking operation. The value of AIState is shown below.

- `SPEAKING_PREPARE_PRELOAD_STARTED`
- `SPEAKING_PREPARE_PRELOAD_COMPLETED`

<br/>

When the AI has several sentences to speak, it first processes the very first sentence. Once the returned state from onAIStateChanged is SPEAKING_STARTED, which is when the AI starts to speak the first sentence, the next sentence can be preloaded. If you play the next sentence after the state update to SPEAKING_PREPARE_PRELOAD_COMPLETED, there will be minimum delays between sentences. 

```csharp
// AI Preload related CallBack
public void onAIStateChanged(AIState aiState)
{
    if (aiState.state == AIState.Type.SPEAKING_PREPARE_PRELOAD_STARTED)
    {
        _txtStatus.text = "AI started preparation to preload.";
    }
    else if (aiState.state == AIState.Type.SPEAKING_PREPARE_PRELOAD_COMPLETED)
    {
        _txtStatus.text = "AI finished preparation to preload.";
    }
    	...
}
```

<br/>

### Speak Multiple Sentences Consecutively

You can give AIPlayer several sentences at once and make them speak sequentially. In the sample, multi-speaking is performed by selecting random sentences from sentences in the ComboBox. It can be one sentence or it can be several sentences. Press the **Multi Speak** button in the app below to perform the operation.

<img src="/img/aihuman/windows/Haylyn_MultiSpeak.png" />

```csharp
// using pure-text
_aiPlayer.Send(new[] {"This is sample sentence1", "This is sample sentence2"});
// using AIClipSet
_aiPlayer.Send(new[] {clip1, clip2});
```

#### Multi Speak related Monitoring

IAIPlayerCallback.onAIStateChanged(AIState) is called for each sentence. The possible AIState values are shown below. 

- `SPEAKING_PREPARE_STARTED`
- `SPEAKING_PREPARE_COMPLETED`

If you send several sentences, it automatically preloads if possible. In this case, you can see that the delay between utterances when the AI speaks is reduced.
