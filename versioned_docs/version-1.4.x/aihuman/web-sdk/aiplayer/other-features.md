---
sidebar_position: 6
---

# Functionalities other than AI Speaking
(mainly related to AI settings)

After the resource is loaded, some settings of aiPlayer can be changed while the actual operation is on.

### 1. Adjust AI Size

The range of possible values are from 0 to 2.0 . The default size is 1.0.

```javascript
AI_PLAYER.setter({ size: 1.0 }); //float
```

<br/>

### 2. Adjust AI Padding

It can be adjusted based on both left and top.
The standard for the set value is pixel.

```javascript
// x position
AI_PLAYER.setter({ left: 0 });

// y position
AI_PLAYER.setter({ top: 0 });
```

### 3. Volume Control

You can control the volume. The possible value range is from 0.0 to 1.0.

```javascript
AI_PLAYER.setVolume(volume);

const curVolume = AI_PLAYER.getVolume();
```

### 4. Mute Control

You can mute the speak. **3D Model is Not supported for this feature.**

```javascript
AI_PLAYER.setMute(true)

const isMuted = AI_PLAYER.getMute();
```
