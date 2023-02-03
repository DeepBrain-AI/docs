---
sidebar_position: 3
---

# AI Human 데모
:::note 관련 파일

- AISampleViewController.swift

:::

AI Player sample은 AIPlayerSDK의 다양한 기능을 시도할 수 있는 ViewController입니다.<br/>
AI 모델, AI 스케일, 음성 속도를 변경하고 여러 문장 발화를 시도할 수 있습니다.(아래에서 더 자세히 설명)

<p align="center">
<img src="/img/aihuman/ios/aisample_intro_2d.png" style={{zoom: "35%"}} />
</p>

**먼저 사용 가능한 AI 목록을 가져와 UI를 설정합니다.**

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

**현재 AI를 아래와 같이 변경할 수 있습니다.**

드롭다운 UI에는 **[DropDown](https://github.com/AssistoLab/DropDown)** 오픈 소스를 사용해서 만든 ComboBoxButton을 사용합니다.

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

**말하기, 일시 중지, 재개 및 중지 기능의 예.** 

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

**AI 동작의 콜백 받기는 다음과 같다.** 

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