---
sidebar_position: 6
---

# Functionalities other than AI Speaking
(mainly related to AI settings)

After the resource is loaded, some settings of aiPlayer can be changed while the actual operation is on. In the sample project screen below, you can see that **Scale, Margins**, etc. can be adjusted.

### Change AI Size(Scale)
<img src="/img/aihuman/windows/scale_1.4.x.png" />

: You can change the size(scale) of AI. The possible value range is from 0.5 to 1.5.

```csharp
// set Property
_aiPlayer.Scale = value;
```

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
