---
sidebar_position: 6
---

# Optional Features

The following are mainly AI setting-related features other than speech.

Once the resource is loaded, you can change AIPlayer's settings; for example, you can adjust the **Scale, Volume**, etc.

<br/>

### Change AI Speech Rate

: You can change the size(scale) of AI. The possible value range is from 0.5 to 1.5.

```csharp
// set Property
_aiPlayer.Scale = value;
```


<br/>

### Volume Control

: You can control the volume. The possible value range is from 0.0 to 1.0.

```csharp
// set Property(float)
_aiPlayer.Volume = value;
```

: Toggle mute on and off.

```csharp
// set Property(bool)
_aiPlayer.IsMute = value;
```