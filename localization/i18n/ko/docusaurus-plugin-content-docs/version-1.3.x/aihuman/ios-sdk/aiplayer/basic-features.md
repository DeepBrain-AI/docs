---
sidebar_position: 4
---

# 발화 관련 기본 기능

### AIClipSet을 이용한 발화 기본 기능 및 AIPlayer 동작 모니터링

AI 를 통해 말하고자 하는 문장을 인자로 AIPlayer의 **send** 함수를 사용해서 말하기를 할 수 있다.

```swift
  //using text
  aiPlayer.send(text: "Hello World")	// speak one sentence
  aiPlayer.send(texts: [..., ...])		// speak multiple sentences
  
  //using AIClipSet
   let clipSet = AIClipSet.clipSet(text: "Hello World")
   aiPlayer.send(clipset: clipSet)
```

<!--말해야 할 문장이 너무 길면 합성에 실패할 수가 있다. <br/> -->
일반적으로 순수 문장만으로 발화를 시킬 수 있지만, AIClipSet을 이용하여 발화를 수행할 수도 있다. <br/>
또한 특정 제스처와 함께 발화하기를 수행할 수도 있다. 예를 들어 AI에게 손을 흔들며 "안녕하세요!"라고 인사말을 하도록 명령할 수 있다. 이를 제스처 발화라고 한다. 자세한 내용은 [AIPlayer 발화 관련 추가 기능](#제스쳐-동작)에서 설명한다. <br/> <br/>

발화할 텍스트가 너무 길면 발화에 필요한 리소스를 합성 못할 수 있다. 긴 문장을 합성할 수 있는 모델은 따로 있다. ai마다 다르지만 일반적으로 한글의 경우 대게 30 ~ 40자 이내, 영어도 비슷한 수준에서 적절한 길이로 문장을 잘라보내기를 권고한다. <br/>
이 외에도 특수 문자, 온전하지 못한 문자의 나열, 숫자, 수식, 기호, 다른 언어의 문자 또는 약어 등이 포함된 경우 기대한 것과 다르게 발화하거나 발화 못하는 경우가 있을 수 있다.

### AIPlayerCallback을 통한 말하기 상태 모니터링

send 메소드 호출 이후 등록 된 **delegate**의 onAIPlayerEvent 메소드에서 동작 상태를 확인 할 수 있다.

- AIState.AICLIPSET_PLAY_PREPARE_STARTED : 발화를 위한 준비 시작
- AIState.AICLIPSET_PLAY_PREPARE_COMPLETED : 발화를 위한 준비 완료
- AIState.AICLIPSET_PLAY_STARTED : 발화 시작
- AIState.AICLIPSET_PLAY_COMPLETED : 발화 완료
- AIState.AICLIPSET_PLAY_FAILED : 발화 실패

```swift
extension AISampleViewController: AIPlayerCallback {
	func onAIPlayerEvent(event: AIEvent) {
	    switch event.type {
	    	...
	    	case .AICLIPSET_PLAY_PREPARE_STARTED:
                print("start prepare")
            case .AICLIPSET_PLAY_PREPARE_COMPLETED:
                print("did finish prepare")
            case .AICLIPSET_PLAY_STARTED:
                print("start speaking : \(event.clipset?.getClipKey())")
            case .AICLIPSET_PLAY_COMPLETED:
                print("did finish speaking : \(event.clipset?.getClipKey())")
			case .AICLIPSET_PLAY_FAILED:
                print("failed speaking : \(event.clipset?.getClipKey())")
	    	...
	    }
	}
```

#### 발화 일시정지

```swift
aiPlayer.pause()
```

#### 발화 재시작

```swift
aiPlayer.resume()
```

#### 발화 중지

```swift
aiPlayer.stopSpeaking()
```
