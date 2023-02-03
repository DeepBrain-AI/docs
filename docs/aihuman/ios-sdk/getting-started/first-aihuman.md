---
sidebar_position: 3
---

# Own your first AI Human

n this chapter, we will quickly set up AIPlayer with the Default AI and learn about AI speaking process. When setting up AIPlayer for the first time, it may take several minutes to load depending on the network condition. You can monitor the loading progress by implementing the onAIPlayerResLoadingProgressed function of AIPlayerCallback.

:::tip
From the sample, you can learn more from the code in the file below.
- AIQuickSampleViewController.swift
:::

### 1. Create a project to test and complete the project setup.

<br/>

### 2. Import it into the ViewController that AIPlayer will be included in. Add AIPlayer as a member variable.

```swift
import AIPlayerSDK

class AIQuickSampleViewController {
	var aiPlayer: AIPlayer!
    ...
}
```

<br/>

### 3. Set appId and userKey in AIPlayer.

You can add project for each platform here.
**[https://aitalk.deepbrain.io](https://aitalk.deepbrain.io)**

<!-- <img src="images/aisample_regist_000.png" width="1191" height="301"> -->

When adding a project, registration is possible for each platform, and the AppID and UserKey of the platform registered at this time are required.

<img src="/img/aihuman/ios/aisample_regist_001.png" />

Set the appId and userKey of the registered project to the SDK.

```swift
AIPlayer.setAppId("your project appId")
AIPlayer.setUserKey("your project userKey")
```

<br/>

### 4. Set screen ratio of AIPlayer

In order to optimize the size of AI to the view screen ratio of AIPlayer, you can set the AIPlayer's environment. Or you can use the size of AI as an absolute value. (The optimization option is the default for the view screen ratio, so this part can be omitted.)

```swift
// If the value is true, change the AI to match the view size ratio, or it is displayed on the screen as the absolute size of the AI
let config = AIPlayerConfiguration(config: [AIPlayerConfiguration.KEY_ENABLE_VIEW_ASPECT_RATIO: true])
AIPlayer.setConfig(config: config)
```

<br/>

### 5. Request the AIPlayer object.

In this step, after SDK authentication, the default registered AI object is created. If the create object is failed, a nil value is returned.

```swift
AIPlayer.create { (aiPlayer) in
    guard error == nil else { return }
            
    self.aiPlayer = aiPlayer
    self.aiPlayer.delegate = self
    self.view?.addSubview(aiPlayer!)
}
```

<br/>

### 6. Register the delegate

If the AIPlayer creation is successful, you can register the delegate to check the state (when preparation is complete, etc.). When the resource loading is complete, activate the button.

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

### 7. Implement a function that is executed when the speak button is pressed.

```swift
@IBAction func sendButtonClicked(_ sender: Any) {
    aiPlayer.send(text: "nice to meet you")
}
```

<br/>

### 8. The full code of the quickstart sample is shown below.

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


