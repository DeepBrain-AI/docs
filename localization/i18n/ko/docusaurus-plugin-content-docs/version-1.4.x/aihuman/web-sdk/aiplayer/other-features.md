---
sidebar_position: 6
---

# 발화 이외 기능들
(주로 AI 설정 관련)

AI가 셋업 완료 이후에도, aiPlayer의 일부 설정들은 변경 가능합니다. 

### 1. AI 크기(스케일) 변경

- 범위는 0 에서 2.0. 기본은 1.0 입니다.

```javascript
AI_PLAYER.setter({ size: 1.0 });
```

### 2. AI 패딩 조절 

- left, top 값의 조절이 가능합니다.
- 값은 pixel입니다.

```javascript
// x position
AI_PLAYER.setter({ left: 0 });

// y position
AI_PLAYER.setter({ top: 0 });
```

### 3. 볼륨 조절 

볼륨을 조절할 수 있으며 가능한 값의 범위는 0.0에서 1.0입니다.

```javascript
AI_PLAYER.setVolume(volume);

const curVolume = AI_PLAYER.getVolume();
```

### 4. 음소거 제어

발화시 음소거할 수 있습니다. **이 기능은 3D 모델에서 지원되지 않습니다.**

```javascript
AI_PLAYER.setMute(true)

const isMuted = AI_PLAYER.getMute();
```