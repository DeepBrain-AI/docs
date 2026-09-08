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
| `send(text)` | AI에게 발화를 시킵니다. |
| `pause()` | 하던 말이 있으면 영상과 음성을 잠시 중단합니다. |
| `resume()` | 플레이 중이었으면 멈춘 곳에서 부터 다시 시작합니다. |
| `stopSpeak()` | 현재 하고 있는 말을 멈추고 할말 큐에 있는 내용도 삭제합니다. |
| `release()` | 리소스 해제(async) |
| `getGestures()` | 제스처 콜렉션(사용가능한 제스처)을 가져옵니다. |
| `getGender()` | 현재 설정된 AI의 성별을 가져옵니다. MALE, FEMALE, UNI 값을 가질수 있으며 AI가 설정되지 않았으면 null을 리턴합니다. |
| `reconnect(callback)` | 연결이 끊겼거나 handshake 인증 실패 후 재연결합니다. 새 `generateToken()` 뒤에만 호출하세요. |
| `isConnected()` | 현재 AI가 연결된 상태인지 확인합니다. |
| `canPreload(callback)` | 프리로드 가능한지 확인합니다. |
| `setVolume(volume)` | 볼륨 조절. |
| `getVolume()` | 현재 볼륨값을 확인합니다. |
| `setMute(isMute)` | 음소거를 제어합니다. |
| `getMute()` | 음소거 상태를 확인합니다. |
| `generateToken()` | AIAPI - ClientToken을 세션 JWT로 교환합니다. (async) |
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
  | `json.aiName` | `String` | `getAIList()` 의 `data.ai[].ai_name` (`model_id` 아님) |
  | `json.size`    | `Float`  | AI 아바타 크기 (optional, default: 1.0)                            |
  | `json.left`    | `Number` | AI 아바타 가로축 위치 (optional, default: 0, pixel)                       |
  | `json.top`     | `Number` | AI 아바타 세로축 위치 (optional, default: 0, pixel)                        |
  | `json.speed`   | `Float`  | AI 아바타 발화 및 행동 속도 (optional, step, 0.1, range: 0.5 ~ 1.5, default: 1) |

- Example

```javascript
const result = await AI_PLAYER.init({
  aiName: list.data.ai[0].ai_name,
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
  const state = AI_PLAYER.getState();
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
AI_PLAYER.getter("size");
```


<br/>

### 5. AIPlayer.send(...)

AI에게 발화를 시킵니다. (프리로드된 데이터가 있으면, 이를 사용합니다)
여러 문장을 발화시키려면 Array 타입을 사용하십시오.

- 2가지 타입으로 전달 가능합니다.

  | Param        | Type            | Description |
  | ------------ | --------------- | ----------- |
  | `text`       | `String`        | 하나의 보통 문장 형태           |
  | `texts`      | `Array<String>` | 여러개의 문장 형태     |

- Example

```javascript
//Case1. One Sentence Speak (text)
AI_PLAYER.send("Nice to meet you");
//Case2. Multi Sentences Speak (String Array)
AI_PLAYER.send(["Nice to meet you", "How are you?"]);
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

사용자가 아바타를 **끌 때**만 호출하세요. 잠깐 끊기거나 토큰 에러 `1402`에서 호출하면 세션이
끝납니다. `release()` 없이 reconnect하면 같은 세션이 이어집니다. `release()` 후 다음 `init()`은
새 세션입니다.

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

### 13. AIPlayer.reconnect(callback)

```javascript
AIPlayer.reconnect((callback = () => {}));
```

소켓을 다시 붙입니다. 화면의 플레이어는 유지한 채 `onAIPlayerErrorV2`가 `1402`(JWT 만료)를 보고한
뒤, 또는 disconnect 뒤에 `generateToken()`을 한 다음 호출하세요.

handshake 인증 실패는 `connect` / `AI_DISCONNECTED`가 없을 수 있습니다. 새 토큰 교환 후에는
그래도 `reconnect()`를 호출하면 됩니다. 만료된 JWT로 다시 붙이지 마세요(`1402` 루프). `1407`은
재시도하지 마세요. [트러블슈팅](../troubleshooting)을 참고하세요.


<br/>

### 14. AIPlayer.isConnected()

```javascript
const isConnected = AI_PLAYER.isConnected();
```


<br/>

### 15. AIPlayer.canPreload()

```javascript
const canPreload = AI_PLAYER.canPreload((callback = () => {}));
```


<br/>

### 16. AI_PLAYER.setVolume(volume)

```javascript
AI_PLAYER.setVolume(volume);

const curVolume = AI_PLAYER.getVolume();
```


<br/>

### 17. AI_PLAYER.setMute(isMute)

```javascript
AI_PLAYER.setMute(true);

const isMuted = AI_PLAYER.getMute();
```

<br/>


### 18. AI_PLAYER.setConfig(json)
AIPlayer의 속성을 다양하게 설정합니다.

- Parameter

  | Param           | Type     | Description |
  | --------------- | -------- | ----------- |
  | `json`          | `Object` | 설정 json object |
  | `json.logLevel` | `Number` | Console log의 표출 레벨 설정 (0 ~ 5, 0 최소, 5 최대) |
  | `json.enableSpeechCache` | `Boolean`  | true이면 발화 요청시 먼저 브라우저 db에 데이터가 있는지 검색한다. false이면 브라우저 db를 검색하지 않고 서버에 먼저 요청한다 (default: true) |
  | `json.enablePersistantSpeechCache` | `Boolean`  | true이면 AIPlayer 'init' 호출시에 브라우저 발화 cache db를 초기화하거나 데이터를 지우지 않는다. 따라서 브라우저 캐시가 존재한다면 이를 이용하여 네트워크 요청을 줄일수 있다. 하지만 해당 캐시가 존재하는 동안에는 갱신이나 업데이트가 되지 않는다 (default: false) |
  | `json.enableSkipErrorSpeech` | `Boolean`  | true이면 서버에서 발화 요청에 대해 에러가 발생해도 발화가 멈추지 않는다.(ex. "error: synth server is busy"). 또한 발화할 문장이 큐에 쌓여있다면 다음 문장을 이어 발화한다 (default: false) |
  | `json.enableEarlyStart` | `Boolean`  | idle 배경의 앞부분을 먼저 로드해 더 일찍 렌더링을 시작한다. 첫 화면까지의 시간을 줄인다. (default: false) |

- Example

```javascript
AI_PLAYER.setConfig({
  logLevel: 0,
  enableSpeechCache: true,
  enablePersistantSpeechCache: false,
  enableSkipErrorSpeech: false,
  enableEarlyStart: false
})
```
