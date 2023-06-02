---
sidebar_position: 5
---

# 발화 관련 추가 기능

### AI 말하기 속도 변경: 0.5~1.5 사이 값

```swift
aiPlayer.speechSpeed = speechSpeed
```

### 제스쳐 동작

상술한 바와 같이, 스피치는 AI 클립 세트를 사용하여 수행될 수 있다. 여기서 말하는 AIClipSet이란 일련의 AI 동작들에서 하나의 발화 단위를 의미한다. 이때 발화의 종류는 말하기만을 수행하는 일반 발화와 제스처를 포함한 말하기인 제스처 발화, 그리고 어떤 동작만 수행하는 제스처가 있다. AI 모델의 AIGesture 기능 제공 유무에 따라 해당 기능을 사용할 수 있으며 AIPlayer의 gestures 배열을 이용하여 사용가능한 제스처 목록을 가져올 수 있다. 제스처를 지원하지 않는 모델의 경우에도 클립셋을 이용하여 동작시킬 수 있다.

아래와 같은 클립셋의 유형이 존재한다.

- AIClipSet.ClipType
  - CLIP_SPEECH: 제스처가 없는 일반 발화만 가능한 Clip
  - CLIP_GESTURE: 제스처만 가능한 Clip
  - CLIP_SPEECH_GESTURE: 제스처가 포함된 발화가 가능한 Clip

아래 샘플 스크린샷에서는 Jonathan이라는 AI 모델이 "hi"라는 제스처와 함께 손을 흔들며 발화를 하고 있다.

<p align="center">
<img src="/img/aihuman/ios/aisample_ss_gesture.PNG" style={{zoom: "35%"}} />
</p>

AIClipSet.clipset 함수를 이용하여 생성할 수 있다.

```swift
let clipset = AIClipSet.cipset(text: "an speech sentence", gesture: "gesture")
aiPlayer.send(clipset: clipset)
```

### 언어 및 음성 변경

일부 AI는 기본 음성 외에 다른 음성으로 발화를 할수 있다. 이때 지원하는 음성의 언어가 AI의 기본 언어와 다른 경우도 발화 가능하다. 여러 언어와 음성을 사용하기 위해서는 AIPlayer의 generateToken 또는 loadCustomVoices 함수를 호출 한 후 사용할 수 있다.

<p align="center">
<img src="/img/aihuman/ios/aisample_ss_customvoice.PNG" style={{zoom: "50%"}} />
</p>

#### AIPlayer의 언어 및 음성 변경 방법

사용 가능한 언어의 목록은 다음의 메소드로 확인 가능하다. 매개변수 값으로 성별을 넣으면 해당 성별에서 사용 가능한 언어 목록만 가져올 수 있다.

```swift
let languageList: [String] = AIPlayer.getSpeakableLanguages() // 전체 목록
let languageList: [String] = AIPlayer.getSpeakableLanguages(gender: ) // 해당 성별에 사용 가능한 전체 목록 - male, female
```

AI가 어떤 음성을 사용할수 있는지는 다음의 메소드로 확인 가능하다. CustomVoice는 id, name, gender, language의 프로퍼티를 가지고 있다.

```swift
let customVoices: [CustomVoice] = AIPlayer.getCustomVoicesWith(language: , gender:)
```

원하는 음성의 id를 알고 있는 경우, 다음 메소드를 이용해 원하는 음성을 찾을수 있다. 없으면 nil을 리턴한다. <br/>
여기서 customVoiceId 값은 문자열로써 CustomVoice의 id를 가져온 값과 같다.

```swift
let customVoice = AIPlayer.findCustomVoice(customVoiceId: customVoiceId)
```

원하는 음성으로 aiplayer에 직접 변경은 다음과 같이 설정하며, nil 입력시 기본 음성으로 설정된다. 성공시 true를 리턴한다.

```swift
aiPlayer.setCustomVoice(customVoice: customVoice)
```

사용 가능한 언어 목록에 해당되는 언어로 변경을 할 경우 해당언어에서 변경 할 수 있는 음성 목록의 첫번째 음성으로 변경 된다. 성별 값이 nil인 경우 ai의 성별을 사용한다.

```swift
aiPlayer.setCustomVoiceForLanguage(language:, gender)
```

#### AIClipSet 이용 방법

기본 음성 외에 다른 음성을 설정하기위해 setCustomVoice 메소드를 사용하는 방법 외에, AIClipSet을 이용하여 문장 단위로 음성을 변경해서 발화할수 있다.

```swift
let customVoice = AIPlayer.getCustomVoicesWith()[0]
let clipSet = AIClipSet.clipSet(text: speechText, customVoice: customVoice)
```

### 프리로드

프리로드는 미리 문장을 불러와 AI가 다음 문장을 빠르게 말하게 하고 싶을 때 사용한다. 캐싱 프로세스라고 생각할 수 있습니다. 인공지능의 음성은 많은 양의 비디오/오디오 데이터를 필요로 한다. 그러므로 너무 많은 문장을 미리 로드하면 앱이 죽을 수 있다.

```swift
aiPlayer.preload(texts: [])
```
