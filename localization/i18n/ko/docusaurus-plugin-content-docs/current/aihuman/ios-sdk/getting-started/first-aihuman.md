---
sidebar_position: 3
---

# 나의 AI Human 만들기

이번 챕터에서는 기본 AI로 AIPlayer를 빠르게 설정하고 AI 발화 프로세스에 대해 알아본다. AIPlayer를 처음 설정할 때 네트워크 상태에 따라 로드하는 데 몇 분이 걸릴 수 있습니다. AIPlayerCallback의 on AIPlayerResloadingProgressed 함수를 구현하여 로딩 진행 상황을 모니터링할 수 있다.

:::tip
샘플에서 아래 파일의 코드를 통해 더 많은 것을 알 수 있다.
- AIQuickSampleViewController.swift
:::

### 1. 프로젝트를 만들고 **프로젝트 설정**을 따라한다.

<br/>

### 2. AIPlayer가 포함 될 ViewController에 import 한다. 멤버 변수로 AIPlayer를 추가한다.

```swift
import AIPlayerSDK

class AIQuickSampleViewController {
	var aiPlayer: AIPlayer!
    ...
}
```

<br/>

### 3. AIPlayer에 AppId와 UserKey를 설정한다.

**[https://aitalk.deepbrain.io](https://aitalk.deepbrain.io)**에서 각 플랫폼에 대한 프로젝트를 추가할 수 있다.

<!-- <img src="images/aisample_regist_000.png" width="1191" height="301"> -->

프로젝트 추가 시 플랫폼별로 등록이 가능하며, 이때 등록한 플랫폼의 AppID와 UserKey가 필요하다.

<img src="/img/aihuman/ios/aisample_regist_001.png" />

등록한 프로젝트의 appId와 userKey를 SDK에 설정한다.

```swift
AIPlayer.setAppId("your project appId")
AIPlayer.setUserKey("your project userKey")
```

<br/>

### 4. AIPlayer의 화면 비율 설정

AIPlayer의 뷰 화면 비율에 대한 AI의 크기를 최적화하기 위해 AIPlayer의 환경을 설정할 수 있다. 또는 AI의 사이즈를 절대값으로 사용 할 수도 있다. (뷰 화면 비율에 최적화 옵션이 기본값으로 되어있어 이부분은 생략이 가능하다.)

```swift
// 값이 true이면 AI를 뷰사이즈 비율에 맞게 변경, false이면 AI의 실제 사이즈로 화면에 노출됨
let config = AIPlayerConfiguration(config: [AIPlayerConfiguration.KEY_ENABLE_VIEW_ASPECT_RATIO: true])
AIPlayer.setConfig(config: config)
```

<br/>

### 5. AIPlayer 객체 요청

이단계에서 SDK인증을 한 후 디폴트로 등록 된 AI 객체를 생성하게 된다.<br/>객체가 정상적으로 생성되지 않았다면 nil 값을 받게 된다.

```swift
AIPlayer.create { (aiPlayer) in
    guard error == nil else { return }
            
    self.aiPlayer = aiPlayer
    self.aiPlayer.delegate = self
    self.view?.addSubview(aiPlayer!)
}
```

<br/>

### 6. delegate 등록

AIPlayer를 성공적으로 만들었다면 delegate를 등록해서 상태(준비가 완료 되었을 때 등)를 확인 할 수 있다. 준비가 완료되었다면 발화(말하기) 버튼을 활성화 시키자.

```swift
    ...
    aiPlayer.delegate = self
    ...

extension AIQuickSampleViewController: AIPlayerCallback {
    func onAIPlayerEvent(event: AIEvent) {
        switch event.type {
            ...
            case .AI_STATE_CHANGED:
                if self.aiState == .initialize && self.aiPlayer.state == .idle {
                    self.sendBtn.isEnabled = true
                }
                self.aiState = self.aiPlayer.state
            ...
        }
    }

    func onAIPlayerResLoadingProgressed(progress: Int) {
    }
    func onAIPlayerError(error: AIError?) {
    }
}
```

<br/>

### 7. 말하기 버튼을 눌렀을 때 실행되는 기능을 구현한다.

```swift
@IBAction func sendButtonClicked(_ sender: Any) {
    aiPlayer.send(text: "nice to meet you")
}
```

<br/>

### 8. 퀵스타트 샘플의 전체 코드는 아래와 같다.

```swift
// AppDelegate.swift

let App_ID: String = "insert_project_appId"
let User_Key: String = "insert_your_userKey"

// The function called when the app runs.
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
		...
		
        AIPlayer.setAppId(App_ID)
        AIPlayer.setUserKey(User_Key)
        
        let config = AIPlayerConfiguration(config: [AIPlayerConfiguration.KEY_ENABLE_VIEW_ASPECT_RATIO: true])
        AIPlayer.setConfig(config: config)
        
        ...
}

// AIQuickSampleViewController.swift
import UIKit
import AIPlayerSDK

class AIQuickSampleViewController: UIViewController {
    
    @IBOutlet var sendBtn: UIButton!
    @IBOutlet weak var progressLabel: UILabel!
    var aiPlayer: AIPlayer!
    
    var aiState = AIState.initialize
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        progressLabel.text = "loading 0%"
        progressLabel.isHidden = false
        self.getAI()
    }
    
    override func viewDidDisappear(_ animated: Bool) {
        super.viewDidDisappear(animated)
        
        if aiPlayer != nil {
            aiPlayer.releasePlayer()
            aiPlayer.removeFromSuperview()
            aiPlayer = nil
        }
    }
    
    @IBAction func sendButtonClicked(_ sender: Any) {
        aiPlayer.send(text: "Nice to meet you.")
    }
    @IBAction func closeButtonClicked(_ sender: Any) {
        self.dismiss(animated: true, completion: nil)
    }
    
    func getAI() {
        
        AIPlayer.create { [weak self] (aiPlayer, error) in
            guard let aiPlayer = aiPlayer else {
                if let error = error {
                    print("\(error)")
                }
                return
            }

            if let strongSelf = self {
                strongSelf.aiPlayer = aiPlayer
                strongSelf.aiPlayer.delegate = self
                strongSelf.view?.addSubview(aiPlayer)
                strongSelf.view?.sendSubviewToBack(aiPlayer)
                
                let r = strongSelf.view.bounds
                aiPlayer.frame = r
            }
        }
    }
}

extension AIQuickSampleViewController: AIPlayerCallback {
    func onAIPlayerEvent(event: AIEvent) {
        DispatchQueue.main.async {
            switch event.type {
            case .RES_LOAD_STARTED:
                self.progressLabel.isHidden = false
            case .RES_LOAD_COMPLETED:
                print("did finish loading resource")
            case .AI_STATE_CHANGED:
                if self.aiState == .initialize && self.aiPlayer.state == .idle {
                    self.progressLabel.isHidden = true
                    self.sendBtn.isEnabled = true
                }
                self.aiState = self.aiPlayer.state
            case .AICLIPSET_PLAY_STARTED:
                print("start speaking : \(event.clipset?.speechText)")
            case .AICLIPSET_PLAY_COMPLETED:
                print("did finish speaking : \(event.clipset?.speechText)")
            default:
                break
            }
        }
    }

    func onAIPlayerResLoadingProgressed(progress: Int) {
        print("progress \(progress)")
        self.progressLabel.text = "loading \(progress)%"
    }
    
    func onAIPlayerError(error: AIError?) {
        print("error \(String(describing: error))")
    }
}
```

<br/>


