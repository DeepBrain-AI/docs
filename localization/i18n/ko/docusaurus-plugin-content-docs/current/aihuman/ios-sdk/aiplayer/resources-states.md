---
sidebar_position: 3
---

# 이벤트 확인하기

AIPlayer를 위한 리소스가 완전히 로드되었는지 확인하기

객체 생성 후 AIPlayer는 자동으로 리소스 로딩이 시작되고 등록 된 **delegate** 에 리소스 로딩 상태가 보고된다.

### AIPlayerCallback을 통한 리소스 로딩 상태 모니터링

먼저 **delegate**의 onAIPlayerEvent 메소드를 통해 리소스의 로딩 시작과 완료를 알 수가 있다.

- AIState.RES_LOAD_STARTED : 리소스 로딩 시작
- AIState.RES_LOAD_COMPLETED : 리소스 로딩 완료

리소스가 로딩 되는 중에는 onAIPlayerResLoadingProgressed 메소드를 통해서 로딩의 상태를 백분율로 확인 할 수가 있다.

또한, 로딩 과정 중에서 문제가 발생 한다면 onAIPlayerError 메소드를 통해 이를 알려 준다.

```swift
extension AISampleViewController: AIPlayerCallback {
	func onAIPlayerEvent(event: AIEvent) {
	    switch event.type {
	    	...
	    	case .RES_LOAD_STARTED:
	    		print("AI Resource loading started.")
	    	break
	    	case .RES_LOAD_COMPLETED:
	    		print("AI Resource loading completed.")
	    	break
	    	...
	    }
	}

	func onAIPlayerResLoadingProgressed(progress: Int) {
        print("progress : \(progress)")
    }

    func onAIPlayerError(error: AIError?) {
    	print("AI Player error : \(state)")
    	if let error = error {
			print(error.localizedDescription)
		}
    }
}
```
