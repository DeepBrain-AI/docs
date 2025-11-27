---
sidebar_position: 1
---

# AIPlayer 方法

| 方法 | 描述 |
| --- | --- |
| `init(json)` | 使用指定 AI 初始化 AIPlayer（异步） |
| `getState()` | 获取 AIPlayer 当前状态（AIPlayerState） |
| `setter(json)` | 设置 AIPlayer 参数 |
| `getter(string)` | 获取 AIPlayer 设置 |
| `preload(json)` | 预加载语音（参见下方示例） |
| `send(json)` | 让 AI 说话或执行手势（参见下方示例） |
| `pause()` | 在讲话过程中暂停 |
| `resume()` | 从暂停状态恢复讲话 |
| `stopSpeak()` | 停止讲话并重置所有数据（不可恢复） |
| `release()` | 释放资源（终止 AIPlayer，异步） |
| `getGestures()` | 获取可用手势列表 |
| `getGender()` | 获取当前 AI 性别 |
| `getSpeakableLanguages(gender)` | 获取当前 AI 可说语言（按性别） |
| `getCustomVoice()` | 获取当前自定义语音 |
| `getCustomVoicesWith(language, gender)` | 获取指定语言和性别的自定义语音 |
| `findCustomVoice(voiceId)` | 根据 ID 获取 CustomVoice |
| `setCustomVoice(customVoice)` | 为 AI 设置指定 customVoice |
| `setCustomVoiceForLanguage(language, gender)` | 按语言和性别设置 AI 语音 |
| `reconnect(callback)` | AI 断开后尝试重连 |
| `isConnected()` | 若可发送语音返回 true |
| `canPreload(callback)` | 检查是否可预加载 |
| `setVolme(volume)` | 设置音量 |
| `getVolme()` | 获取当前音量 |
| `setMute(isMute)` | 静音（3D 模型不支持） |
| `getMute()` | 获取静音状态（3D 模型不支持） |
| `generateToken()` | AIAPI - 使用 clientToken 生成认证 token（异步） |
| `getAIList()` | AIAPI - 获取可用 AI 列表（异步） |
| `getSampleTextList()` | AIAPI - 获取示例文本列表（异步） |
| `setConfig(json)` | AIAPI - 设置 AIPlayer 配置 |

<br/>

### 1. AIPlayer.init(json)

根据指定 AI 模型参数初始化 AI Player 对象 ([getAIList](../apis/aiapi#2-AIPlayer.getAIList))

- 参数

  | 参数 | 类型 | 描述 |
  | --- | --- | --- |
  | `json` | `Object` | init 参数对象 |
  | `json.ai_name` | `String` | AI 模型名称 |
  | `json.size` | `Float` | AI 模型大小（默认 1.0） |
  | `json.left` | `Number` | 左边距（默认 0，像素） |
  | `json.top` | `Number` | 上边距（默认 0，像素） |
  | `json.speed` | `Float` | 语速（范围 0.5~1.5，默认 1） |

- 示例

```javascript
const result = await AI_PLAYER.init({
  aiName: "...", size: 1.0, left: 0, top: 0, speed: 1.0
});
```

<br/>

### 2. AIPlayer.getState()

获取 AIPlayer 状态（参考 AIPlayerState）

- 返回：`AIPlayerState`

```javascript
const state = AI_PLAYER.getState();
```

<br/>

### 3. AIPlayer.setter(json)

设置 AI 信息

- 参数

  | 参数 | 类型 | 描述 |
  | --- | --- | --- |
  | `json` | `Object` | setter 参数 |
  | `json.size` | `Float` | AI 大小（0~2.0） |
  | `json.top` | `Number` | 上方位置 |
  | `json.left` | `Number` | 左侧位置 |
  | `json.speed` | `Float` | 语速，0.5~1.5 |

- 示例

```javascript
AI_PLAYER.setter({ size: 1.2, top: 20, left: 20, speed: 1.2 });
```

<br/>

### 4. AIPlayer.getter(key)

获取 AI 参数

- 可用 key：`maxTextLength`、`long_speech`、`language`、`size`、`top`、`left`、`speed`

```javascript
AI_PLAYER.getter("size");
```

<br/>

### 5. AIPlayer.send(...)

使 AI 说话或执行手势（使用预加载数据时复用）

- 参数类型：

  | 参数 | 类型 | 描述 |
  | --- | --- | --- |
  | `text` | `String` | 单句文本 |
  | `texts` | `Array<String>` | 多句文本 |
  | `AIClipSet` | `Object` | 单个手势句 |
  | `AIClipSets` | `Array<Object>` | 多个手势句 |

- 示例

```javascript
AI_PLAYER.send("Nice to meet you");
AI_PLAYER.send(["Nice to meet you", "How are you?"]);
AI_PLAYER.send({ text: "Nice to meet you", gst: "hi" });
AI_PLAYER.send([{ text: "Nice to meet you", gst: "hi" }, { text: "How are you?" }]);
```

<br/>

### 6. AIPlayer.preload(...)

预加载语音内容（语音或手势同 send 类型）

```javascript
AI_PLAYER.preload("Nice to meet you");
AI_PLAYER.preload(["Nice to meet you", "How are you?"]);
AI_PLAYER.preload({ text: "Nice to meet you", gst: "hi" });
AI_PLAYER.preload([{ text: "Nice to meet you", gst: "hi" }, { text: "How are you?" }]);
```

<br/>

### 7. AIPlayer.pause()

暂停讲话。

<br/>

### 8. AIPlayer.resume()

恢复讲话。

<br/>

### 9. AIPlayer.stopSpeak()

停止讲话并清除队列数据（不能恢复）。

<br/>

### 10. AIPlayer.release()

释放系统资源。

```javascript
await AI_PLAYER.release();
```

<br/>

### 11. AIPlayer.getGestures()

获取手势列表。

```javascript
const gestures = AI_PLAYER.getGestures();
```

<br/>

### 12. AIPlayer.getGender()

获取 AI 性别（MALE/FEMALE/UNI/null）。

```javascript
const gender = AI_PLAYER.getGender();
```

<br/>

### 13. AIPlayer.getSpeakableLanguages(gender)

获取当前可用语言列表。

```javascript
const languages = AI_PLAYER.getSpeakableLanguages(gender);
```

<br/>

### 14. AIPlayer.getCustomVoice()

获取当前设置的语音。

```javascript
const customVoice = AI_PLAYER.getCustomVoice();
```

<br/>

### 15. AIPlayer.getCustomVoicesWith(language, gender)

根据语言与性别过滤自定义语音。

```javascript
const voices = AI_PLAYER.getCustomVoicesWith(language, gender);
```

<br/>

### 16. AIPlayer.findCustomVoice(voiceId)

根据 ID 找到对应语音。

```javascript
const voice = AI_PLAYER.findCustomVoice(voiceId);
```

<br/>

### 17. AIPlayer.setCustomVoice(customVoice)

设置自定义语音。

```javascript
AI_PLAYER.setCustomVoice(customVoice);
```

<br/>

### 18. AIPlayer.setCustomVoiceForLanguage(language, gender)

按语言与性别设置语音。

```javascript
AI_PLAYER.setCustomVoiceForLanguage(language, gender);
```

<br/>

### 19. AIPlayer.reconnect(callback)

```javascript
AI_PLAYER.reconnect(() => {});
```

<br/>

### 20. AIPlayer.isConnected()

```javascript
const ok = AI_PLAYER.isConnected();
```

<br/>

### 21. AIPlayer.canPreload()

```javascript
const can = AI_PLAYER.canPreload(() => {});
```

<br/>

### 22. AI_PLAYER.setVolume(volume)

```javascript
AI_PLAYER.setVolume(volume);
AI_PLAYER.getVolume();
```

<br/>

### 23. AI_PLAYER.setMute(isMute)

```javascript
AI_PLAYER.setMute(true);
AI_PLAYER.getMute();
```

<br/>

### 23. AI_PLAYER.setConfig(json)

配置 AIPlayer。

```javascript
AI_PLAYER.setConfig({
  useCustomVoice: true,
  logLevel: 0,
  enableSpeechSplit: false,
  splitAPITimeout: 4000,
  enableBGImgDB: false,
  enableSpeechCache: true,
  enablePersistantSpeechCache: false,
  enableSkipErrorSpeech: false
});
```
