---
sidebar_position: 6
---

# Optional Features
The following are mainly AI setting-related features other than speech.

Once the resource is loaded, you can change AIPlayer's settings; for example, you can adjust the **Scale, Margin, Volume**, etc.

<br/>

### Change AI Speech Rate
<img src="/img/aihuman/windows/scale_1.4.x.png" />

: You can change the size(scale) of AI. The possible value range is from 0.5 to 1.5.

```csharp
// set Property
_aiPlayer.Scale = value;
```


<br/>

### Change AI Position(Margin)
<img src="/img/aihuman/windows/margin_1.4.x.png" />

: You can change the position(margins) of AI. It can be adjusted based on the X-axis(Horizontal) and the Y-axis(Vertical).

```csharp
AIHuman.Common.Margin _aiMargin;
_aiMargin.X = 64;
_aiMargin.Y = 8;
// set Property
_aiPlayer.Margin = _aiMargin;
```


<br/>

### Volume Control

<img src="/img/aihuman/windows/volumecontrol_1.4.x.png" />

: You can control the volume. The possible value range is from 0.0 to 1.0.

```csharp
// set Property(double)
_aiPlayer.Volume = value;
```

: Toggle mute on and off.

```csharp
// set Property(bool)
_aiPlayer.IsMute = value;
```


<br/>

### Disconnect from AI

<img src="/img/aihuman/windows/disconnect_1.5.x.png" />

: By disconnection from AI, you can implement an idle state without network communication.

If the disconnect is successful, `AI_DISCONNECTED` event callback is received through `OnAIPlayerEvent`. If the AIPlayer.Disconnect(callback) function is called and the callback function is passed to the parameter, the `AI_DISCONNECTED` event callback is not received.

```csharp
// void Disconnect(Action<bool> callback = null)
_aiPlayer.Disconnect((result) => {
    MessageBox.Show($"Disconnect result: {result}");
});
```


<br/>

### Reconnect to AI

<img src="/img/aihuman/windows/reconnect_1.5.x.png" />

: You can explicitly try to reconnect while you are disconnected from the AI.

If the reconnection is successful, `AI_CONNECTED` event callback is received through `OnAIPlayerEvent`. If the AIPlayer.Reconnect(5, 3000, callback) function is called and the callback function is passed to the parameter, the `AI_CONNECTED` event callback is not received.

Optionally, the factors of the Reconnect function are the number of reconnection attempts, the second is the interval (in milliseconds), and the third is the callback.

```csharp
// void Reconnect(int attempts = 5, int delay = 3000, Action<bool> callback = null)
_aiPlayer.Reconnect(1, 1000, (result) => {
    MessageBox.Show($"reconnect result: {result}");
});
```

