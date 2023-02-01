---
sidebar_position: 3
---

# AI Human Demo
:::note related files

- AISampleViewController.swift

:::

The AI Player sample is a ViewController where you can try various functionalities of AIPlayer.<br/>
You can change the AI model, AI scale, speech rate, and try out multi speak feature (described in more detail below). 

<p align="center">
<img src="/img/aihuman/ios/aisample_ss_001.PNG" style={{zoom: "35%"}} />
</p>

**First, get a list of available AIs and set up the UI.**

```swift
func getAIList() {
    AIPlayer.getAiList { [weak self] (code, res, error) in
        guard code == 0 else {
            if let error = error {
                print(error.localizedDescription)
            }
            return
        }
        
        if let list = res?["ai"] as? Array<[String: Any]> {
            var temp: [String] = []
            for dic in list {
                temp.append(dic["aiName"] as! String)
            }
            self?.chooseAiDropDown.dataSource = temp
            DispatchQueue.main.async {
                self?.chooseAiDropDown.reloadAllComponents()
            }
            self?.aiItems.append(contentsOf: list)
        }
    }
}
```

**You can change the current AI as shown below.**

Use **[DropDown](https://github.com/AssistoLab/DropDown)** open source for dropdown UI.

```swift
func setupChooseAiDropDown() {
    chooseAiDropDown.anchorView = chooseAiBtn
    chooseAiDropDown.bottomOffset = CGPoint(x: 0, y: chooseAiBtn.bounds.height)
    chooseAiDropDown.dataSource = [
    ]
    
    // Action triggered on selection
    chooseAiDropDown.selectionAction = { [weak self] (index, item) in
        self?.chooseAiBtn.setTitle(item, for: .normal)
        if let count = self?.aiItems.count, count > 0 {
            self?.getAI(self?.aiItems[index]["aiName"] as! String)
        }
    }
}
```

**Examples of speak, pause, resume, and stop features.** 

```swift
@IBAction func sendButtonClicked(_ sender: Any) {
    if let text = chooseTextDropDown.selectedItem {
        aiPlayer.send(text: text)
    }
    return
}
@IBAction func pauseButtonClicked(_ sender: Any) {
    if aiPlayer.isPaused {
        aiPlayer.resume()
        pauseBtn.setTitle("PAUSE", for: .normal)
        pauseBtn.tag = 0
    }else {
        aiPlayer.pause()
        pauseBtn.setTitle("RESUME", for: .normal)
        pauseBtn.tag = 1
    }
}
@IBAction func stopButtonClicked(_ sender: Any) {
    aiPlayer.stopSpeaking()
}
```

**Receiving callback of AI action is as follows.** 

```swift
func onAIPlayerStateChanged(state: AIPlayerState, type: AIClipSetType, key: String?) {
    switch state {
    ...
    case .startSpeaking:
        print("AI start speaking.")
        break
    case .didFinishSpeaking:
        print("AI finish speaking")
        break
    ...
    }
}
func onAIPlayerError(error: Error?, state: AIPlayerState) {
    print(error.localizedDescription)
}
```
<br/>