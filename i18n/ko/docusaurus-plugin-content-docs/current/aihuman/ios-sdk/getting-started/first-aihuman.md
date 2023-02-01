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
import AIPlayer

class AIQuickSampleViewController {
	var aiPlayer: AIPlayer!
    ...
}
```

<br/>

### 3. Set appId and userKey in AIPlayer.

You can add project for each platform here.
**[https://aitalk.deepbrainai.io](https://aitalk.deepbrainai.io)**

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
            guard error == nil else {
                return
            }
            
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
    func onAIPlayerStateChanged(state: AIPlayerState, type: AIClipSetType, key: String?) {
        if state == .didFinishLoadingResource {
            DispatchQueue.main.async {
                self.sendBtn.isEnabled = true       // enable speak button 
            }
        }
    }

    func onAIPlayerResLoadingProgressed(progress: Int) {
    }
    func onAIPlayerError(error: Error?, state: AIPlayerState) {
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
// The function called when the app runs.
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
		...
		
        AIPlayer.setAppId("")
        AIPlayer.setUserKey("")
        
        let config = AIPlayerConfiguration(config: [AIPlayerConfiguration.KEY_ENABLE_VIEW_ASPECT_RATIO: true])
        AIPlayer.setConfig(config: config)
        
        ...
}

// AIQuickSampleViewController.swift
import UIKit
import AIPlayer

class AIQuickSampleViewController: UIViewController {
    
    @IBOutlet var sendBtn: UIButton!
    var aiPlayer: AIPlayer!
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        self.getAI()
    }
    
    override func viewDidDisappear(_ animated: Bool) {
        super.viewDidDisappear(animated)
        
        if aiPlayer != nil {
            aiPlayer.releasePlayer()
            aiPlayer.removeFromSuperview()
        }
    }
    
    @IBAction func sendButtonClicked(_ sender: Any) {
        aiPlayer.send(text: "nice to meet you")
    }
    
    func getAI() {
        AIPlayer.create { (aiPlayer) in
            guard aiPlayer != nil else {
                return
            }
            
            self.aiPlayer = aiPlayer
            self.aiPlayer.delegate = self
            self.view?.addSubview(aiPlayer!)
            
            self.view.sendSubviewToBack(self.aiPlayer)
        }
    }
}

extension AIQuickSampleViewController: AIPlayerCallback {
    func onAIPlayerStateChanged(state: AIPlayerState, type: AIClipSetType, key: String?) {
        if state == .didFinishLoadingResource {
        		print("did finish loading resource")
        		DispatchQueue.main.async {
                self.sendBtn.isEnabled = true       // enable speak button
             }
        }else if state == .startSpeaking {
        		print("start speaking \(String(describing: key))")
        }else if state == .didFinishSpeaking {
        		print("did finish speaking")
        }
    }
    func onAIPlayerResLoadingProgressed(progress: Int) {
    }
    func onAIPlayerError(error: Error?, state: AIPlayerState) {
    }
}
```

<br/>


