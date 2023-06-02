---
sidebar_position: 6
---

# 발화 이외 기능들
(mainly related to AI settings)

After the resource is loaded, some settings of aiPlayer can be changed while the actual operation is on. In the sample project screen below, you can see that **Size, Padding**, etc. can be adjusted.

### 1. Adjust AI Size

- You can choose AI's size(scale)
- The range of possible values are from 0 to 2.0 . The default size is 1.0.
- value type: float

```javascript
AI_PLAYER.setter({ size: 1.0 });
```

<br/>

### 2. Adjust AI Padding

- You can choose AI's padding.
- It can be adjusted based on both the x-axis(Horizontal) and y-axis(Vertical).
- The standard for the set value is pixel.
- value type: number

```javascript
// x position
AI_PLAYER.setter({ left: 0 });

// y position
AI_PLAYER.setter({ top: 0 });
```
