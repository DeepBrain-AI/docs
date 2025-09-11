---
sidebar_position: 2
---

# 인증 및 생성하기

:::info 전체 설정 프로세스(4단계)

- 1단계 : SDK 사용자 인증을 진행합니다. (등록 된 appId와 올바른 userKey가 아니면 실패가 콜백으로 옵니다.)
- 2단계 : 사용 할수 있는 AI 리스트를 가져옵니다. (이 과정에는 인증이 포함됩니다. 등록 된 userKey와 appId가 아니면 실패가 콜백으로 옵니다.)
- 3단계 : AIPlayer 객체를 생성합니다.
- 4단계 : 사용이 끝난 AIPlayer를 제거함으로써 자원을 환원합니다.

:::

<br/>

### 1단계: SDK 사용자 인증

AIPlayer를 사용하기 위해서는 사용자 인증 여부를 확인해야 합니다. 사용자 인증의 첫 번째 단계는 사용자 키를 얻는 것입니다. 사용자 키는 DeepBrain AI가 생성한 고유 문자열로 외부에 노출되지 않도록 각별히 주의해주세요.

App ID와 userKey를 설정 한 후, generateToken()를 호출하면 사용자 인증이 완료됩니다.

토큰의 사용기간이 만료 된 경우, generateToken() API를 다시 호출해서 재인증을 해야합니다.

```swift
AIPlayer.setAppId("app identifier")
AIPlayer.setUserKey("unique userKey")
AIPlayer.generateToken { (error) in
    if let error = error {  // error : succeeded = nil, failed = error
        // TODO: error handling here
        return
    }
}
```


<br/>

### 2단계 : 인증 후 기본 AI 목록 가져오기

인증이 완료되면 AIPlayer는 인증 결과를 가지고 있습니다. getAiList()를 호출하면, 사용 가능한 모든 AI목록이 반환됩니다. AI 모델 권한이 없거나 인증 전에 getAiList()를 호출하면 에러가 반환됩니다.

```swift
AIPlayer.getAiList { [weak self] (res, error) in
    /* res : {"ai": [
                {aiName: "", aiDisplayName: "", language: ""}
                ]}
    error : succeeded = nil, failed = error
    */
    guard let res == res else {
        if let error = error {
            print(error)
        }
        return
    }

    if let list = res["ai"] as? Array<[String: Any]> {
        ...
    }
}
```

AI 리스트를 가져온 이후 AIPlayer.aiList() 함수를 통해 언제든지 리스트를 다시 가져 올 수 있습니다.

```swift
let aiList = AIPlayer.aiList()
```


<br/>

### 3단계: AIPlayer 생성하기

2단계에서 사용 가능한 AI를 확인한 후 **create** 함수를 통해 AIPlayer 객체를 생성할 수 있습니다. AIPlayer를 생성 하는데는 AI의 정보 항목 중에서 **aiName** 이 필요합니다. 생성 하는데 성공했다면 UIView에 AIPlayer를 붙일 수 있습니다. 이때 생성 된 객체의 **delegate** 설정을 통해 AI의 상태를 지속적으로 확인 할 수 있습니다.

AI 이름을 매개 변수로 사용하여 AIPlayer 클래스의 **create** 함수를 호출하여 AI 객체를 생성한다.

생성된 AIPlayer 개체의 **delegate** 설정을 통해 AI의 상태를 지속적으로 확인 할 수 있습니다.

```swift
class CustomViewController: UIViewController, AIPlayerCallback {

 	...

  	AIPlayer.create(name: "ai_name") { [weak self] (aiPlayer, error) in
	  	guard let aiPlayer = aiPlayer else {
	  		...
	  		return
	  	}

	  	if let aiPlayer = aiPlayer {
	  		aiPlayer.delegate = self
	  		self?.view?.addSubview(aiPlayer)
	  	}
	}

	...

}

```


<br/>

### 4단계: AI 객체 제거하기

AIPlayer의 **releasePlayer** 함수를 통해 객체에 사용했던 자원을 환수해야 합니다.

또한, AIPlayer를 붙였던 UIView에서도 제거를 해야 합니다.

```swift
aiPlayer.releasePlayer()
aiPlayer.removeFromSuperview()
```
