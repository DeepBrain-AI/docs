---
sidebar_position: 6
---

# Functionalities other than AI Speaking
(mainly related to AI settings)

Once resource loading completes, AIPlayer becomes active and operatable. 

In this active state, you can change AIPlayer's settings.

The image below shows which settings are configurable in the Sample Project. 

<p align="center">
<img src="/img/aihuman/ios/aisample_ss_002.jpg" style={{zoom: "30%"}} />
</p>

### AI Size: value between 0.5~1.5 

```Swift
aiPlayer.scale = scale
```


<br/>

### Volume Control

: You can control the volume. The possible value range is from 0.0 to 1.0.

```swift
aiPlayer.volume = value;
```

: Toggle mute on and off.

```swift
aiPlayer.isMute = value;
```