---
sidebar_position: 5
---

# AIPlayer Advanced Speaking Features

### AI Speech Rate: between 0.5~1.5

```Swift
aiPlayer.speechSpeed = speechSpeed
```

### Gesture

As briefly mentioned above, the speech may be performed using the AIClipSet. Here, the term AIClipSet refers to one speech unit in a series of AI operations. At this time, the types of speech include general speech that only speaks speech, gesture speech that includes gestures, and gestures that perform only gesture. Depending on whether the AI model provides the AIGesture feature, the feature can be used, and a list of available gestures can be obtained using the AIPlayer's guestures array. Even in the case of a model that does not support a gesture, it may be operated using a clipset.

The following types of clipsets exist.

- AIClipSet.ClipType
  - CLIP_SPEECH: Clipset with no gestures and only plain speaking
  - CLIP_GESTURE: Gesture-only clipset
  - CLIP_SPEECH_GESTURE: Speechable clipset with gesture

In the sample screenshot below, an AI model named Jonathan is waving and speaking with a gesture of "hi."

<p align="center">
<img src="/img/aihuman/ios/aisample_ss_gesture.PNG" style={{zoom: "35%"}} />
</p>

It can be generated using the AIClipSet.clipset function.

```swift
let clipset = AIClipSet.cipset(text: "an speech sentence", gesture: "gesture")
aiPlayer.send(clipset: clipset)
```

#### Change the voice or language

Some AIs can speak with other voices besides basic voices. At this time, it is also possible to speak when the language of the supported voice is different from the basic language of AI. To use multiple languages and voices, you can use AIPlayer's generateToken or loadCustomVoices function after calling it.

<p align="center">
<img src="/img/aihuman/ios/aisample_ss_customvoice.PNG" style={{zoom: "50%"}} />
</p>

##### Set the custom voice using AIPlayer's method

A list of available languages can be found by the following methods. If you enter a gender as a value, you can only get a list of languages available for that gender.

```Swift
let languageList: [String] = AIPlayer.getSpeakableLanguages() // Full list of available
let languageList: [String] = AIPlayer.getSpeakableLanguages(gender: ) // Full list available for that gender - male, female
```

It is possible to check which voice AI can use by the following method. CustomVoice has properties of id, name, language, and tag.

```Swift
let customVoices: [CustomVoice] = AIPlayer.getCustomVoicesWith(language: , gender:)
```

If you know the id of the desired voice, you can find the desired voice using the following method. If not, return nil. <br/>
Here, the customVoiceId value is the same as the value obtained by obtaining the id of the customVoice as a string.

```Swift
let customVoice = AIPlayer.findCustomVoice(customVoiceId: customVoiceId)
```

Direct change to the desired voice on the AIPlayer is set as follows, and is set to the default voice when entering nil. Returns true on success. 

```Swift
aiPlayer.setCustomVoice(customVoice: customVoice)
```

If you change to a language that corresponds to the list of available languages, it will be changed to the first voice in the list of voices that can be changed in that language.
If the gender value is nil, use the gender of ai.

```Swift
aiPlayer.setCustomVoiceForLanguage(language:, gender)
```

##### Set the custom voice using AIClipSet

In addition to using the setCustomVoice method to set up a voice other than the basic voice, AIClipSet can be used to change the voice by sentence.

```Swift
let customVoice = AIPlayer.getCustomVoicesWith()[0]
let clipSet = AIClipSet.clipSet(text: speechText, customVoice: customVoice)
```

### Preload

Preload is used when you want to make the AI speak the next sentence without delay by loading sentences in advance. You could think of it as a caching process. AI's speech requires large amount of video/audio data. Therefore preloading too many sentences could kill the app. 

```Swift
aiPlayer.preload(texts: [])
```
