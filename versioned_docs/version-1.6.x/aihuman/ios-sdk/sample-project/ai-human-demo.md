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
<img src="/img/aihuman/ios/aisample_intro_2d.PNG" style={{zoom: "35%"}} />
</p>

**First, get a list of available AIs and set up the UI.**

```swift
func getAIList() {
    AIPlayer.getAiList { [weak self] (res, error) in
        guard let res = res else {
            if let error = error {
                print(error)
            }
            return
        }
        
        if let list = res["ai"] as? Array<[String: Any]> {
            var temp: [String: Any] = [:]
            for dic in list {
                guard let displayName = dic["aiDisplayName"] as? String else { continue }
                temp[displayName] = dic
            }
            self?.chooseAIComboBox.dataSource = temp
        }
    }
}
```

**You can change the current AI as shown below.**

Use ComboBoxButton created with **[DropDown] (https://github.com/AssistoLab/DropDown)** open source for dropdown UI.

```swift
func setupChooseAiDropDown() {
    chooseAIComboBox.keySortType = .ascending
    chooseAIComboBox.itemSelection = { [weak self] (key, item) in
        guard let self = self else { return }
        guard let item = item as? [String: Any] else { return }
        guard let aiName = item["aiName"] as? String else { return }
        guard self.currentAI != key else { return }
        
        self.currentAI = key
        self.getAI(aiName)
    }
}
```

**Examples of speak, pause, resume, and stop features.** 

```swift
@IBAction func sendButtonClicked(_ sender: Any) {
    if let text = chooseTextComboBox.selectedKey {
        aiPlayer.send(text: text)
    }
    return
}
@IBAction func pauseButtonClicked(_ sender: Any) {
    if aiPlayer.state == .pause {
        aiPlayer.resume()
        pauseBtn.setTitle("PAUSE", for: .normal)
        pauseBtn.tag = 0
    }else if aiPlayer.state == .play {
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
func onAIPlayerEvent(event: AIEvent) {
    switch event.type {
    ...
    case .AICLIP_PLAY_STARTED:
        print("AI start speaking.")
        break
    case .AICLIP_PLAY_COMPLETED:
        print("AI finish speaking")
        break
    ...
    }
}
func onAIPlayerError(error: AIError?) {
    print(error)
}
```
<br/>