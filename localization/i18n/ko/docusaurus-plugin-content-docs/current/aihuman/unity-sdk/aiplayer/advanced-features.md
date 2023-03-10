---
sidebar_position: 5
---

# 발화 관련 추가 기능

AIPlayer의 발화 기능을 제외한 기능은 아래와 같다.

리소스 로딩 후 발화가 가능한 상태에서 AIPlayer의 일부 설정들을 변경할 수 있다. 리소스 로딩까지 완료되면(`RES_LOAD_COMPLETED`) 실제 동작이 가능한 대기상태로 바뀐다. 아래와 같이 데모 AIHuman Scene에서 **음성, 제스처, 속도** 등을 변경할 수 있다.

### AI 말하기 속도 변경

: AI의 말하기 속도를 설정할 수 있다. 설정값 범위는 소수 0.5 ~ 1.5 이다.
```csharp
// set Property
_aiPlayer.Speed = value;
```

### 제스처 동작
앞서 간략하게 언급한 바와 같이 [클립셋](/aihuman/unity-sdk/apis/aiclipset)을 이용하여 발화를 수행할 수도 있다. 여기서 말하는 클립셋이란 일련의 AI 동작들에서 하나의 발화 단위를 의미한다. 이때 발화의 종류는 말하기만을 수행하는 일반 발화와 제스처를 포함한 말하기인 제스처 발화, 그리고 어떤 동작만 수행하는 제스처가 있다. AI 모델의 [제스처](/aihuman/unity-sdk/apis/aigesture) 기능 제공 유무에 따라 해당 기능을 사용할 수 있으며 AIPlayer의 [GetGestures](/aihuman/unity-sdk/apis/aiplayer)함수를 이용하여 사용 가능한 제스처 목록을 가져올 수 있다. 제스처를 지원하지 않는 모델의 경우에도 클립셋을 이용하여 동작시킬 수 있다. 

아래와 같은 클립셋의 타입이 존재한다.

:::info types
  - CLIP_SPEECH: 제스처가 없는 일반 발화만 가능한 Clip
  - CLIP_GESTURE: 제스처만 가능한 Clip
  - CLIP_SPEECH_GESTURE: 제스처가 포함된 발화가 가능한 Clip
:::

아래 이미지에서는 AI 모델이 "hi"라는 제스처와 함께 발화를 하고 있다.

<p align="center">
<img src="/img/aihuman/unity/aiplayer_gesture.png" style={{zoom: "40%"}} />
</p>

```csharp
using System.Collections.Generic;
using AIHuman.Model;
using AIHuman.Core;
using AIHuman.View;
...
private List<AIGesture> _gestures;
...
_gestures = _aiPlayer.GetGestures();
...
AIGesture gesture = _gestures[index];

AIClipSet clip = AIAPI.CreateClipSet("nice to meet you.", gesture.Name);

_aiPlayer.Send(new[] {clip});
```

#### 제스처 동작의 콜백 모니터링

발화 동작과 동일하게 AIPlayerCallback.OnAIPlayerEvent(AIEvent)가 호출된다. AIEvent의 Type값은 다음과 같이 호출되어 상태를 알수 있다. 단, 여기서 AIEvent.ClipSet 객체를 통해 Type, GestureName, SpeechText를 알수 있으므로 제스처 동작인지, 그냥 발화 동작인지 알수 있다. 

- `AICLIPSET_PLAY_PREPARE_STARTED`
- `AICLIPSET_PLAY_PREPARE_COMPLETED`
- `AICLIPSET_PLAY_STARTED`
- `AICLIPSET_PLAY_COMPLETED`

<br/>

### 언어 및 음성 변경
일부 AI는 기본 음성 외에 다른 음성으로 발화를 할수 있다. 이때 지원하는 음성의 언어가 AI의 기본 언어와 다른 경우에도 발화가 가능하다. 아래와 같이 데모에서 현재 AI가 사용할 수 있는 음성 리스트를 확인할 수 있다. 해당 음성 리스트는 AIHumanSDKManager.Authenticate 혹은 AIAPI.Authenticate, AIAPI.GenerateToken 함수 호출 이후에 확인할 수 있다. 보다 명시적으로는 AIAPI.LoadCustomVoices를 사용할 수 있으나 성공적인 인증 절차 이후에 정상 동작한다.

<p align="center">
<img src="/img/aihuman/unity/aiplayer_customvoice.png" style={{zoom: "40%"}} />
</p>

<br/>

#### AIPlayer의 언어 및 음성 변경 방법
먼저 현재 AI가 발화할 수 있는 언어의 리스트는 다음의 함수를 통해 확인할 수 있다.

```csharp
List<string> languages = AIHumanSDKManager.Instance.GetSpeakableLanguages(_aiPlayer.AIGender);
``` 

다음으로 해당하는 언어와 성별에 맞는 음성 리스트는 다음의 메소드로 확인 가능하다. CustomVoice는 ID, Name, LanguageCode, Gender 프로퍼티를 가지고 있다.

```csharp
List<CustomVoice> customVoices = AIHumanSDKManager.Instance.GetCustomVoices();
``` 

원하는 음성의 ID를 알고 있는 경우, 다음 메소드를 이용해 원하는 음성을 찾을 수 있다. 없으면 null을 리턴한다. 여기서 voiceId 값은 CustomVoice 객체의 ID값이다. (myVoice.ID 프로퍼티로 얻을 수 있다.)

```csharp
CustomVoice myVoice = AIHumanSDKManager.Instance.FindCustomVoice(voiceId);
``` 

원하는 음성으로 AIPlayer에 직접 변경은 다음과 같이 설정하며, null 입력시 기본 음성으로 설정된다. 성공 시 true를 리턴한다. 

```csharp
List<CustomVoice> customVoices = AIHumanSDKManager.Instance.GetCustomVoices();
CustomVoice myVoice = customVoices[0]; 
bool succeeded = _aiPlayer.SetCustomVoice(myVoice);
```


CustomVoice 객체를 직접 사용하지 않고, 언어만으로 설정하려면 다음과 같이 언어와 성별만으로 설정할 수 있고 이때는 해당 음성 리스트 중에 첫번째로 설정이 된다. 

```csharp
bool succeeded = _aiPlayer.SetCustomVoiceForLanguage("en-US", "MALE");
```


현재 설정된 CustomVoice는 아래의 메소드로 확인한다. 현재 설정된 음성이 없거나 기본 음성이면 null을 리턴한다.

```csharp
CustomVoice customVoice = _aiPlayer.GetCustomVoice();
```

#### AIClipSet 이용 방법
기본 음성 외에 다른 음성을 설정하기위해 SetCustomVoice 함수를 사용하는 방법 외에, AIClipSet을 이용하여 다음과 같이 원하는 음성으로 발화할 수 있다. 이 방법은 기존에 AIPlayer에 설정된 CustomVoice 중간에 임시로 다른 음성으로 발화시킬 수 있는 이점이 있다. 

```csharp
CustomVoice myVoice = AIAPI.GetCustomVoices("en-US", "MALE")[0];
AIClipSet aiClipSet = AIAPI.CreateClipSet("this is sample sentence.", null, myVoice);
_aiPlayer.Send(new[] {aiClipSet});
``` 

<br/>

### 프리로드

프리로드는 다음에 할 말들을 먼저 로드시켜놓고 빠르게 다음 발화를 하고 싶을 때 사용한다. 일종의 캐싱 처리이다. 데모 AIHuman scene의 발화 문장 Dropdown UI에서 하나를 선택하고 **프리로드** 버튼을 누르면 해당 동작이 수행된다.

<p align="center">
<img src="/img/aihuman/unity/aiplayer_preload.png" style={{zoom: "40%"}} />
</p>

```csharp
// using pure-text
_aiPlayer.Preload(new[] {"sentence"});
// using AIClipSet
_aiPlayer.Preload(new[] {clip});
```

#### 프리로드 동작의 콜백 모니터링 

발화 동작과 마찬가지로 프리로드 동작시에도 AIPlayerCallback.OnAIPlayerEvent(AIEvent)가 호출된다. AIEvent 값은 아래와 같다.

- `AICLIPSET_PRELOAD_STARTED`
- `AICLIPSET_PRELOAD_COMPLETED`

<br/>

AI가 할 말이 여러 문장있을 때, 먼저 첫번째 문장을 발화시킨다. OnAIPlayerEvent()에서 AICLIPSET_PLAY_STARTED 상태가 보고 되면, 즉 AI가 첫문장을 발화하기 시작할 때 다음에 할 말을 프리로드 시킨 후 AICLIPSET_PRELOAD_COMPLETED를 통해 프리로드 시킨 문장이 프리로드 완료되었음을 인지할 수 있고, 이때 다음 문장을 발화시키면 보다 빠르게 발화시킬수 있다. 

```csharp
// AI 프리로드 CallBack 활용 예
public void OnAIPlayerEvent(AIEvent @event)
{
    if (@event.EventType == AIEvent.Type.AICLIPSET_PRELOAD_STARTED)
    {
        _statusText.text = "AI가 프리로드를 시작합니다.";
    }
    else if (@event.EventType == AIEvent.Type.AICLIPSET_PRELOAD_COMPLETED)
    {
        _statusText.text = "AI가 프리로드를 마쳤습니다.";
    }   	...
}
```

<br/>

### 여러 문장 연속 발화

AIPlayer는 여러 문장 혹은 클립셋을 한번에 전달하고 차례대로 발화하게 할 수 있다. 발화 문장 Dropdown UI에 있는 문장들 중 임의의 문장들을 선정하여 다중 발화를 수행한다. 하나의 문장일 수도 있고 여러 문장일 수도 있다. 데모 AIHuman Scene의 **임의 다중 발화** 버튼을 누르면 해당 동작을 수행한다.

```csharp
// using pure-text
_aiPlayer.Send(new[] {"sentence1", "sentence2"});
// using AIClipSet
_aiPlayer.Send(new[] {clip1, clip2});
```

#### 여러 문장 연속 발화의 콜백 모니터링

한 문장마다 AIPlayerCallback.OnAIPlayerEvent(AIEvent)가 호출된다. AIEvent의 값은 다음과 같이 호출되어 상태를 알 수 있다. 

- `AICLIPSET_PLAY_PREPARE_STARTED`
- `AICLIPSET_PLAY_PREPARE_COMPLETED`

여러 문장을 보내놓으면 가능할 경우 자동으로 프리로드 동작을 한다. 해당 경우에는 AI가 말할 때 발화 사이에 딜레이가 감소된 것을 볼 수 있다.
