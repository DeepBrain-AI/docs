---
sidebar_position: 1
---

# AIPlayer 기능

| Method | Description |
| ------ | ----------- |
| `init(json)` | 원하는 AI를 셋업합니다. (async)  |
| `getState()` | AIPlayer의 현재 상태값을 리턴합니다.   |
| `setter(json)` | AIPlayer를 설정합니다 |
| `getter(string)` | AIPlayer 설정 정보를 확인합니다. |
| `preload(json)` | AI에게 할말을 프리로드 시킵니다.    |
| `send(json)` | AI에게 발화 또는 제스처 포함 발화를 시킵니다. |
| `pause()` | 하던 말이 있으면 영상과 음성을 잠시 중단합니다. |
| `resume()` | 플레이 중이었으면 멈춘 곳에서 부터 다시 시작합니다. |
| `stopSpeak()` | 현재 하고 있는 말을 멈추고 할말 큐에 있는 내용도 삭제합니다. |
| `release()` | 리소스 해제(async) |
| `getGestures()` | 제스처 콜렉션(사용가능한 제스처)을 가져옵니다. |
| `getGender()` | 현재 설정된 AI의 성별을 가져옵니다. MALE, FEMALE, UNI 값을 가질수 있으며 AI가 설정되지 않았으면 null을 리턴합니다. |
| `getSpeakableLanguages(gender)` | 현재 로드된 음성의 언어 리스트를 확인합니다. loadCustomVoice() 또는 generateToken() 메소드 호출 이후에 유효합니다. |
| `getCustomVoice()` | 현재 설정된 음성을 확인합니다. 설정된 값이 없으면 null을 리턴합니다. |
| `getCustomVoicesWith(language, gender)`       | 로드된 음성 중에 입력 값에 해당하는 언어와 성별에 해당하는 음성의 리스트를 가져옵니다. language에 null을 입력하면 모든 언어, gender에 null을 입력하면 모든 성별에 해당하는 값을 가져옵니다. loadCustomVoice() 또는 generateToken() 메소드 호출 이후에 유효합니다. |
| `findCustomVoice(voiceId) ` | 음성의 id로 CustomVoice를 검색합니다. 없으면 null 값을 리턴합니다. |
| `setCustomVoice(customVoice) ` | 원하는 음성으로 음성을 변경합니다. 성공시 true 리턴하고 null 인풋시 본래의 목소리로 셋팅됩니다. |
| `setCustomVoiceForLanguage(language, gender)` | 원하는 언어와 성별로 음성을 설정합니다. language에 null 또는 빈 값 입력시 AI의 기본언어로 설정되고 true를 리턴합니다. language에 유효하지 않은 값 입력시 AI의 기본 언어로 보이스가 설정되고 false를 리턴합니다. gender에 null을 입력 시 해당 AI의 성별로 검색되고, 그 중 첫번째 음성으로 설정됩니다. 성공 시 true를 리턴하고 찾지 못하면 기본 음성으로 셋팅됩니다. |
| `reconnect(callback)` | AI가 연결되지 않았을때 재연결을 시도합니다. 연결이 이미 되어있거나 연결시도 할 수 없는 상황인 경우 false 리턴합니다. |
| `isConnected()` | 현재 AI가 연결된 상태인지 확인합니다. |
| `canPreload(callback)` | 프리로드 가능한지 확인합니다. |
| `setVolme(volume)` | 볼륨 조절. |
| `getVolme()` | 현재 볼륨값을 확인합니다. |
| `setMute(isMute)` | 음소거를 제어합니다. |
| `getMute()` | 음소거 상태를 확인합니다. |
| `generateToken()` | AIAPI - 발급받은 userKey로 인증을 시도합니다. 콜백으로 응답이 오며 성공하면 기본 AI 모델 정보가 셋팅됩니다. (async) |
| `getAIList()` | AIAPI - SDK 인증 성공한 상태에서 사용가능한 AI 리스트를 콜백을 제공합니다. (async) |
| `getSampleTextList()` | AIAPI - 해당 언어의 샘플 문장을 불러 와서 콜백으로 전달합니다. (async) |
| `setConfig(json)` | AIAPI - Set configurations on AIPlayer |


<br/>

### 1. AIPlayer.init(json)

원하는 AI로 AIPlayer 셋업합니다. ([getAIList](../apis/aiapi#2-AIPlayer.getAIList))

- Parameter

  | Param          | Type     | Description                                                       |
  | -------------- | -------- | ----------------------------------------------------------------- |
  | `json`         | `Object` | init 함수의 파라미터들                            |
  | `json.ai_name` | `String` | AI 아바타 이름 (ID)                                               |
  | `json.size`    | `Float`  | AI 아바타 크기 (optional, default: 1.0)                            |
  | `json.left`    | `Number` | AI 아바타 가로축 위치 (optional, default: 0, pixel)                       |
  | `json.top`     | `Number` | AI 아바타 세로축 위치 (optional, default: 0, pixel)                        |
  | `json.speed`   | `Float`  | AI 아바타 발화 및 행동 속도 (optional, step, 0.1, range: 0.5 ~ 1.5, default: 1) |

- Example

```javascript
const result = await AI_PLAYER.init({
  aiName: "...",
  size: 1.0,
  left: 0,
  top: 0,
  speed: 1.0,
});
```


<br/>

### 2. AIPlayer.getState()

AIPlayer의 상태를 가져옵니다. 여기[AIPlayerState](../apis/aiplayer-data#5-aiplayerstate)를 확인하십시오.

- Return Parameter: `AIPlayerState`

- Example

```javascript
  const state = AI_PLAYER.getState());
```


<br/>

### 3. AIPlayer.setter(json)

AIPlayer를 셋팅합니다.

- Parameter

  | Param        | Type     | Description                                                               |
  | ------------ | -------- | ------------------------------------------------------------------------- |
  | `json`       | `Object` | parameters of the setter function                                         |
  | `json.size`  | `Float`  | AI model size (optional, range: 0 ~ 2.0, default: 1.0)                    |
  | `json.top`   | `Number` | AI model top (optional, default: 0)                                       |
  | `json.left`  | `Number` | AI model left (optional, default: 0)                                      |
  | `json.speed` | `Float`  | AI model speech rate (optional, step, 0.1, range : 0.5 ~ 1.5, default: 1) |

- Example

```javascript
AI_PLAYER.setter({ size: 1.2, top: 20, left: 20, speed: 1.2 });
```


<br/>

### 4. AIPlayer.getter(key)

AIPlayer의 셋팅값을 가져옵니다.

- Return Parameter: AI model or AIPlayer information

  | Param | Type     | Value | Description |
  | ----- | -------- | ----- | -------------------------------- |
  | `key` | `String` | `'maxTextLength'` \| `'long_speech'` \| `'language'` \| `'size'` \| `'top'` \| `'left'` \| `'speed'` | AI model or AIPlayer information |

- Example

```javascript
AI_PLAYER.getter("key");
```


<br/>

### 5. AIPlayer.send(...)

AI에게 발화 또는 제스처 포함 발화를 시킵니다. (프리로드된 데이터가 있으면, 이를 사용합니다)
여러 문장을 발화시키려면 Array 타입을 사용하십시오.

- 4가지 타입으로 전달 가능합니다.

  | Param        | Type            | Description |
  | ------------ | --------------- | ----------- |
  | `text`       | `String`        | 하나의 보통 문장 형태           |
  | `texts`      | `Array<String>` | 여러개의 문장 형태     |
  | `AIClipSet`  | `Object`        | 하나의 제스처 포함 문장 형태             |
  | `AIClipSets` | `Array<Object>` | 제스처 포함이 가능한 여러개의 문장 형태 |

- Example

```javascript
//Case1. One Sentence Speak (text)
AI_PLAYER.send("Nice to meet you");
//Case2. Multi Sentences Speak (String Array)
AI_PLAYER.send(["Nice to meet you", "How are you?"]);
//Case3. One Gesture Speak (json)
AI_PLAYER.send({ text: "Nice to meet you", gst: "hi" });
//Case4. Multi Gestures Speak (json Array)
AI_PLAYER.send([{ text: "Nice to meet you", gst: "hi" }, { text: "How are you?" }]);
```


<br/>

### 6. AIPlayer.preload(...)

AI 발화 데이터를 프리로드합니다.

- 4가지 타입으로 전달 가능합니다.

  | Param        | Type            | Description |
  | ------------ | --------------- | --------------------------------------- |
  | `text`       | `String`        | 하나의 보통 문장 형태 |
  | `texts`      | `Array<String>` | 여러개의 문장 형태 |
  | `AIClipSet`  | `Object`        | 하나의 제스처 포함 문장 형태 |
  | `AIClipSets` | `Array<Object>` | 제스처 포함이 가능한 여러개의 문장 형태 |

- Example

```javascript
// Case1. One Sentence Preload (text)
AI_PLAYER.preload("Nice to meet you");
// Case2. Multi Sentence Preload (String Array)
AI_PLAYER.preload(["Nice to meet you", "How are you?"]);
// Case3. One Gesture Preload (json)
AI_PLAYER.preload({ text: "Nice to meet you", gst: "hi" });
// Case4. Multi Gesture Preload (json Array)
AI_PLAYER.preload([{ text: "Nice to meet you", gst: "hi" }, { text: "How are you?" }]);
```


<br/>

### 7. AIPlayer.pause()

발화를 일시 중지 시킵니다.


<br/>

### 8. AIPlayer.resume()

일시중지된 발화를 재시작 시킵니다.


<br/>

### 9. AIPlayer.stopSpeak()

현재 발화를 중지시키고, 발화 큐에 데이터도 클리어시킵니다.


<br/>

### 10. AIPlayer.release()

AIPlayer의 자원을 해제합니다. 더이상 사용치 않을때 호출합니다.
- Examples

```javascript
AI_PLAYER.release();
```

<br/>

### 11. AIPlayer.getGestures()

현재 AI의 제스처 목록을 가져옵니다.

- Return Parameter: `Array<AIGesture>`

- Examples

```javascript
const gestures = AI_PLAYER.getGestures();
```


<br/>

### 12. AIPlayer.getGender()

현재 AI의 성별을 가져옵니다.

- Return Parameter: `MALE` || `FEMALE` || `UNI` || `null`

- Examples

```javascript
const gender = AI_PLAYER.getGender();
```


<br/>

### 13. AIPlayer.getSpeakableLanguages(gender)

발화할 수 있는 언어 중 해당 성별인 언어 리스트를 가져옵니다.

- Return Parameter: `Array<String>`

- Examples

```javascript
const languages = AI_PLAYER.getSpeakableLanguages(gender);
```


<br/>

### 14. AIPlayer.getCustomVoice()

현재 설정된 customVoice를 가져옵니다.

- Return Parameter: `CustomVoice` || `null`

- Examples

```javascript
const customVoice = AI_PLAYER.getCustomVoice();
```


<br/>

### 15. AIPlayer.getCustomVoicesWith(language, gender)

해당 언어와 성별에 해당하는 customVoice리스트를 가져옵니다.

- Return Parameter: `Array<CustomVoice>`

- Examples

```javascript
const customVoices = AI_PLAYER.getCustomVoicesWith(language, gender);
```


<br/>

### 16. AIPlayer.findCustomVoice(voiceId)

전달된 id에 해당하는 customVoice 개체를 가져옵니다.

- Return Parameter: `CustomVoice` || `null`

- Examples

```javascript
const customVoice = AI_PLAYER.findCustomVoice(voiceId);
```


<br/>

### 17. AIPlayer.setCustomVoice(customVoice)

전달된 customVoice로 현재 AI의 목소리를 셋팅합니다. null을 입력하면 본래 목소리로 셋팅됩니다.

- Return Parameter: `true` || `false`

- Examples

```javascript
const isSuccess = AI_PLAYER.setCustomVoice(customVoice);
```


<br/>

### 18. AIPlayer.setCustomVoiceForLanguage(language, gender)

전달된 language와 gender에 해당하는 customVoice로 현재 AI의 목소리를 설정합니다.

- Return Parameter: `true` || `false`

- Examples

```javascript
const isSuccess = AI_PLAYER.setCustomVoiceForLanguage(language, gender);
```


<br/>

### 19. AIPlayer.reconnect(callback)

```javascript
AIPlayer.reconnect((callback = () => {}));
```


<br/>

### 20. AIPlayer.isConnected()

```javascript
const isConnected = AI_PLAYER.isConnected();
```


<br/>

### 21. AIPlayer.canPreload()

```javascript
const canPreload = AI_PLAYER.canPreload((callback = () => {}));
```


<br/>

### 22. AI_PLAYER.setVolume(volume)

```javascript
AI_PLAYER.setVolume(volume);

const curVolume = AI_PLAYER.getVolume();
```


<br/>

### 23. AI_PLAYER.setMute(isMute)

```javascript
AI_PLAYER.setMute(true);

const isMuted = AI_PLAYER.getMute();
```

<br/>


### 23. AI_PLAYER.setConfig(json)
AIPlayer의 속성을 다양하게 설정합니다.

- Parameter

  | Param           | Type     | Description |
  | --------------- | -------- | ----------- |
  | `json`          | `Object` | 설정 json object |
  | `json.useCustomVoice` | `Boolean` | 커스텀 보이스를 조회하고 사용 (default: true) |
  | `json.logLevel` | `Number` | Console log의 표출 레벨 설정 (0 ~ 5, 0 최소, 5 최대) |
  | `json.enableSpeechSplit`  | `Boolean` | 사용자의 문장을 ".!?"로 나누어 발화 요청하며 내부적으로 하나의 문장처럼 처리한다 (default: false) |
  | `json.splitAPITimeout` | `Number` | Split API의 타임아웃. 시간내에 성공하지 못하면 원문장을 요청한다 (default: 4000, ms) |
  | `json.enableBGImgDB` | `Boolean`  | true이면 백그라운드 리소스 이미지를 브라우저 DB에 저장하고 다음에 필요할 때 DB를 먼저 체크하여 가져온다 (default: false) |
  | `json.enableSpeechCache` | `Boolean`  | true이면 발화 요청시 먼저 브라우저 db에 데이터가 있는지 검색한다. false이면 브라우저 db를 검색하지 않고 서버에 먼저 요청한다 (default: true) |
  | `json.enablePersistantSpeechCache` | `Boolean`  | true이면 AIPlayer 'init' 호출시에 브라우저 발화 cache db를 초기화하거나 데이터를 지우지 않는다. 따라서 브라우저 캐시가 존재한다면 이를 이용하여 네트워크 요청을 줄일수 있다. 하지만 해당 캐시가 존재하는 동안에는 갱신이나 업데이트가 되지 않는다 (default: false) |
  | `json.enableSkipErrorSpeech` | `Boolean`  | true이면 서버에서 발화 요청에 대해 에러가 발생해도 발화가 멈추지 않는다.(ex. "error: synth server is busy"). 또한 발화할 문장이 큐에 쌓여있다면 다음 문장을 이어 발화한다 (default: false) |

- Example

```javascript
AI_PLAYER.setConfig({
  useCustomVoice: true, 
  logLevel: 0
  enableSpeechSplit: false,
  splitAPITimeout: 4000,
  enableBGImgDB: false,
  enableSpeechCache: true,
  enablePersistantSpeechCache: false,
  enableSkipErrorSpeech: false
})
```
