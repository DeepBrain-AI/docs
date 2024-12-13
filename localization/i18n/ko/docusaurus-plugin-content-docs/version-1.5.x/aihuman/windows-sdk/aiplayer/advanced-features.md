---
sidebar_position: 5
---

# 발화 관련 추가 기능

다음은 AIPlayer의 발화 관련 추가 기능들을 설명합니다.

대기(IDLE) 상태에서 **제스처, 언어 및 음성, 속도** 등을 설정 또는 변경할 수 있습니다.

## 제스처 발화

AI에게 [클립셋](../../../aihuman/windows-sdk/apis/aiclipset)을 이용하여 발화 명령을 전달합니다. 클립셋은 일련의 AI 행동 단위를 의미합니다. 이때 발화의 종류는 말하기만을 수행하는 일반 발화와 제스처를 포함한 말하기인 제스처 발화, 그리고 어떤 동작만 수행하는 제스처가 있습니다. AI Human 모델의 제스처 기능 제공 유무에 따라 해당 기능을 사용할 수 있으며 AIPlayer의 `GetGestures` 함수를 이용하여 사용 가능한 제스처 목록을 가져올 수 있습니다. 제스처를 지원하지 않는 모델의 경우에도 클립셋을 이용하여 동작시킬 수 있습니다.

아래와 같은 클립셋의 타입이 존재합니다.

:::info 클립셋 종류

- `CLIP_SPEECH`: 제스처 동작이 없는 일반 발화만 가능한 클립셋
- `CLIP_GESTURE`: 제스처만 가능한 클립셋
- `CLIP_SPEECH_GESTURE`: 제스처 동작을 포함한 제스처 발화 클립셋

:::

아래 샘플 스크린샷에서는 Jonathan이라는 AI Human 모델이 "hi" 라는 제스처와 함께 손을 흔들며 "Nice to meet you." 발화를 하고 있습니다..

<img src="/img/aihuman/windows/gesture_1.5.x.png" />

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

### 제스처 동작의 콜백 모니터링

일반 발화 동작과 동일하게 `IAIPlayerCallback.OnAIPlayerEvent(AIEvnet)`가 호출됩니다. `AIEvnet`의 `Type`값은 다음과 같으로 전달되어 이벤트를 모니터링할 수 있습니다. 이때 `AIEvent.ClipSet` 프로퍼티를 통해 `Type`과 `GestureName` 그리고 `SpeechText` 등을 알 수 있어 제스처 동작인지, 그냥 발화동작인지 등의 여러가지 시나리오 대응에 활용할 수 있습니다.

- `AICLIPSET_PLAY_PREPARE_STARTED` : 발화 문장 준비(합성) 시작
- `AICLIPSET_PLAY_PREPARE_COMPLETED` : 발화 시간 조건 완료
- `AICLIPSET_PLAY_STARTED` : 발화 시작
- `AICLIPSET_PLAY_COMPLETED` : 발화 종료

<br/>

## 언어 및 음성 변경

AI Human 자신의 기본 음성 외에도 다른 음성으로 발화를 할 수 있습니다. 이때 지원하는 음성의 언어가 AI Human 모델의 기본 언어와 다른 경우에도 발화가 가능합니다. 다국어 구사가 가능하다는 뜻이 됩니다. 아래 스크린샷과 같이 현재 AI가 사용할 수 있는 음성 리스트를 확인할 수 있습니다. 해당 음성 리스트는 `AIAPI.Authenticate` 혹은 `AIAPI.GenerateToken` 함수 호출 이후에 확인할 수 있습니다. 보다 명시적으로는 `AIAPI.LoadCustomVoices` 함수를 사용할 수 있으나 성공적인 인증 절차 이후에 정상 동작합니다.

<img src="/img/aihuman/windows/customvoice_1.5.x.png" />

<br/>

### AIPlayer의 언어 및 음성 변경하기

먼저 현재 AI가 발화할 수 있는 언어의 리스트는 다음의 메소드를 통해 확인할 수 있습니다.

```csharp
ObservableCollection<string> languages = AIAPI.GetSpeakableLanguages(_aiPlayer.AIGender);
```

다음으로 해당하는 언어와 성별에 맞는 음성 리스트는 다음의 메소드로 확인 가능합니다. `CustomVoice`는 `ID`, `Name`, `LanguageCode`, `Gender` 프로퍼티를 가지고 있습니다.

```csharp
ObservableCollection<CustomVoice> customVoices = AIAPI.GetCustomVoices();
```

원하는 음성의 `ID`를 알고 있는 경우, 다음 메소드를 이용해 원하는 음성을 바로 얻을 수 있습니다. 실패 시 `null`을 리턴합니다.

```csharp
CustomVoice myVoice = AIAPI.FindCustomVoice(voiceId);
```

원하는 음성으로 `AIPlayer`에 직접 변경은 다음과 같이 설정하며, `null`을 전달할 경우 자신의 **기본 음성**으로 설정됩니다. 성공 시 `true`를 리턴합니다..

```csharp
ObservableCollection<CustomVoice> customVoices = AIAPI.GetCustomVoices();
CustomVoice myVoice = customVoices[0];
bool succeeded = _aiPlayer.SetCustomVoice(myVoice);
```

`CustomVoice` 객체를 직접 사용하지 않고, 암묵적으로 설정하려면 다음과 같이 언어와 성별만을 이용해 설정할 수 있고 이때는 해당 음성 리스트 중에 첫번째로 항목으로 설정됩니다.

```csharp
bool succeeded = _aiPlayer.SetCustomVoiceForLanguage("en-US", "MALE");
```

현재 설정된 `CustomVoice`는 아래의 메소드로 확인합니다. 현재 설정된 음성이 없거나 기본 음성이면 `null`을 리턴합니다.

```csharp
CustomVoice customVoice = _aiPlayer.GetCustomVoice();
```

### AIClipSet을 이용한 추가 활용 방법

기본 음성 외에 다른 음성을 설정하기 위해 `SetCustomVoice` 메소드를 사용하는 방법 외에, `AIClipSet`을 이용하여 다음과 같이 원하는 음성으로 발화할 수 있습니다. 이 방법은 기존에 `AIPlayer`에 설정된 `CustomVoice` 중간에 임시로 다른 음성으로 발화시킬 수 있는 장점이 있습니다.

```csharp
CustomVoice myVoice = AIAPI.GetCustomVoices("en-US", "MALE")[0];
AIClipSet aiClipSet = AIAPI.CreateClipSet("this is sample sentence.", null, myVoice);
_aiPlayer.Send(new[] {aiClipSet});
```

<br/>

## AI 말하기 속도 조절하기

: AI의 말하기 속도를 설정할 수 있습니다. 설정값 범위는 소수 0.5 ~ 1.5 입니다.

```csharp
// set Property
_aiPlayer.Speed = value;
```

## 프리로드

프리로드는 다음에 할 말들을 먼저 로드시켜놓고 빠르게 다음 발화를 하고 싶을 때 사용합니다. 일종의 캐싱 처리입니다. 스크린샷의 샘플 프로젝트에서 발화 문장 ComboBox 항목 중 하나를 선택하고 프리로드 버튼을 누르면 해당 동작이 수행됩니다.

<img src="/img/aihuman/windows/preload_1.5.x.png" />

```csharp
// using pure-text
_aiPlayer.Preload(new[] {"sentence"});
// using AIClipSet
_aiPlayer.Preload(new[] {clip});
```

### 프리로드 가능 상태 확인하기

앞장의 [이벤트 확인하기](../../../aihuman/windows-sdk/aiplayer/resources-states)에서 AI와의 네트워크 연결 상태에 따른 이벤트 콜백도 있다는 것을 확인하였습니다.

`AIPlayer` 객체는 사실 발화 기능(`Send`)에 중점이 맞춰져 있습니다. AI 연결이 되었다는 이벤트 콜백을 전달 받았다 하더라도 프리로드는 정상 동작 하지 않을 수 있습니다. (예기치 못한 네트워크 상황 혹은 재접속 상황 등)

프리로드와 관련하여 보다 안정성이 확보되어야 한다면 `AIPlayer` 객체의 `CanPreload` 프로퍼티를 이용해 가능 상태를 확인하는 방법이 있습니다.

혹은 아래와 같은 콜백에서 적절한 처리를 추가하는 방법이 있습니다.

- `AICLIPSET_PRELOAD_ERR`: OnAIPlayerError로 부터 발생 (프리로드 전용 네트워크 연결 상태에 의한 처리 실패 시)
- `AICLIPSET_PRELOAD_FAILED` : OnAIPlayerEvent로 부터 발생 (백엔드단 합성 실패 혹은 SDK 내부 네이티브단 처리 실패 시)

### 프리로드 동작의 콜백 모니터링

발화 동작과 마찬가지로 프리로드 동작시에도 `IAIPlayerCallback.OnAIPlayerEvent(AIEvent)`가 호출됩니다. `AIEvent.Type`의 값은 아래와 같습니다.

- `AICLIPSET_PRELOAD_STARTED` : 프리로드 시작
- `AICLIPSET_PRELOAD_COMPLETED` : 프리로드 성공
- `AICLIPSET_PRELOAD_FAILED` : 프리로드 실패

예를 들어, AI가 할 말이 여러 문장있을 때, 먼저 첫번째 문장을 발화시킵니다. `OnAIPlayerEvent(AIEvent)`에서 `AICLIPSET_PLAY_STARTED` 상태가 보고 되면, 즉 AI가 첫문장을 발화하기 시작할 때 다음에 할 말을 프리로드 시킨 후 `AICLIPSET_PRELOAD_COMPLETED`를 통해 프리로드 시킨 문장이 프리로드 완료되었음을 인지할 수 있고, 이때 다음 문장을 발화시키면 보다 빠르게 발화시킬 수 있습니다.

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

## 여러 문장 연속 발화

AIPlayer는 여러 문장 혹은 클립셋을 한번에 전달하고 차례대로 발화하게 할 수 있습니다. 이를 데모로 보여주기 위해서 아래 샘플 프로젝트에서는 임의 다중 발화(Random Multi Speak) 버튼을 이용하여 예시로 제공하고 있습니다. 발화 문장 ComboBox에 있는 문장들 중 임의의 문장들을 선정하여 다중 발화를 수행합니다.

<img src="/img/aihuman/windows/multispeak_1.5.x.png" />

```csharp
// using pure-text
_aiPlayer.Send(new[] {"This is sample sentence1", "This is sample sentence2"});
// using AIClipSet
_aiPlayer.Send(new[] {clip1, clip2});
```

### 여러 문장 연속 발화의 콜백 모니터링

한 문장 혹은 클립셋 마다 `IAIPlayerCallback.OnAIPlayerEvent(AIEvnet)`가 호출됩니다. `AIEvnet`의 값은 다음과 같이 호출되어 상태를 알 수 있습니다.

- `AICLIPSET_PLAY_PREPARE_STARTED`
- `AICLIPSET_PLAY_PREPARE_COMPLETED`
- `AICLIPSET_PLAY_STARTED`
- `AICLIPSET_PLAY_COMPLETED`
- `AICLIPSET_PLAY_FAILED`

여러 문장을 보내놓으면 가능할 경우 자동으로 프리로드 동작을 합니다. 이렇게 처리할 경우 AI가 말할 때 발화 사이에 딜레이가 감소된 것을 볼 수 있습니다.
