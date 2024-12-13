---
sidebar_position: 6
---

# Functionalities other than AI Speaking

The following are actions other than the utterance of the AIPlayer.

### Change AI Size(Scale)

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