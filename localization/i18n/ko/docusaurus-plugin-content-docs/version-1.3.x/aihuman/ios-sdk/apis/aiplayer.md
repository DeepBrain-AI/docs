---
sidebar_position: 1
---

# AIPlayer

## functions

| Name                     | Description                                         |
| ------------------------ | ------------------------------------------------------------ |
| `static func setUserKey()`            | 등록 된 userKey를 설정                                               |
| `static func setAppId()`            |  사용하는 앱의 ID를 설정                                                 |
| `static func setConfig(config:)`            |  AIPlayer의 환경 설정 <br/> `config`: AI 환경 객체 (AIPlayerConfiguration)           |
| `static func` <br/> `create(callbackHandler:)`            |  사용자 인증과 동시에 디폴트로 등록 된 AI 객체를 빠르게 가져올때 사용한다.
| `static func generateToken()`            |  사용자 인증을 시도한다. |
| `static func` <br/> `getAIList(completionHandler:)`            | `completionHandler` (`Int`: 결과 코드, `[String: Any]`: AI List, `Error`: 에러 내용) 사용 가능한 AI 리스트를 가져온다. |
| `static func aiList()`            |  AI 리스트를 가져온다. |
| `static func` <br/> `create(name:, callbackHandler:)`            | `name`: AI 이름, <br/> `callbackHandler` (`IAIPlayer`: AI 객체, `Error`: 에러 내용) AI 이름으로 AI 객체를 생성한다. |
| `static func getSpeakableLanguages(gender:)`        |  사용 가능한 언어 목록을 가져온다. <br/> gender가 없으면 전체 있으면 해당 하는 목록만을 가져온다.                               |
| `static func getCustomVoicesWith(language:, gender)`        |  사용 가능한 음성 목록을 가져온다. <br/> language, gender를 입력하면 해당하는 목록만을 가져온다.                               |
| `static func findCustomVoice(customVoiceId:)`        |  음성의 id로 CustomVoice를 검색한다. 없으면 nil 리턴                               |
| `static func loadCustomVoices(completionHandler:)`        |  사용 가능한 언어와 성별에 해당하는 음성의 리스트를 로드한다. 클로저를 통해 성공시에 nil이 전달 되고 성공 이후 음성 변경과 관련한 기능을 사용할 수 있다.           |
| `func release()`                   |  AI 객체를 해제한다. AI의 사용을 종료할 때 사용한다.         |
| `func send(text:)`                   |  AI에게 말을 시킨다.                                                |
| `func send(texts:)`                   |  AI에게 말을 시킨다. (여러 문장)                                               |
| `func send(clipset:)`                   |  AI에게 말을 시킨다.                                                |
| `func send(clipsets:)`                   |  AI에게 말을 시킨다. (여러 문장)                                               |
| `func preload(texts:)`                   |  AI에게 할말을 미리 준비하게 한다.                                            |
| `func stopSpeaking()`                   |  현재 하고 있는 말을 멈춘다. (여러 문장일 경우 나머지도 모두 삭제 한다.)   |
| `func pause()`                   |  말을 하던 도중이면 잠시 멈추게 한다.                                                    |
| `func resume()`                   |  잠시 멈춰있던 말을 이어서 하게 한다.                                                   |
| `func setCustomVoice(customVoice:)`            |  원하는 CustomVoice로 AI의 음성을 변경한다. 성공시 true 리턴                    |
| `func setCustomVoiceForLanguage(language:, gender)`            |  원하는 언어로 AI의 음성을 변경한다. 성공시 true 리턴                    |
| `func customVoice()`  |   AIPlayer 사용자 설정 음성을 가져온다. 사용자 설정이 없으면 nil 리턴   |
| `func reconnect(callbackHandler:)`    |   연결이 끊겼을때 재접속 시도한다.   |

## properties
| Name     | Description     |
| -------- | --------------- |
| `var name`           | `String { getter }` 읽기 전용<br/> AIPlayer 이름                                |
| `var gender`           | `String { getter }` 읽기 전용<br/> AIPlayer 성별                                |
| `var language`           | `String { getter }` 읽기 전용<br/> AIPlayer 언어                                |
| `var gestures`        |   `Array { getter }` 읽기 전용 <br/> 사용 가능한 제스쳐 목록   |
| `var size`           | `CGSize { getter }` 읽기 전용<br/> AIPlayer 크기                                |
| `var scale`          | `CGFloat { getter setter }` <br/> AIPlayer 크기 조절                                    |
| `var enableViewAspectRatio`   | `Bool { getter }` <br/> AIPlayer 뷰 사이즈 비율 최적화 적용 여부                                    |
| `var speechSpeed`            | `Float { getter setter }`<br/> AI 말하기 속도 조절                              |
| `var verticalAlignment` | `AIPlayerVerticalAlignment { getter setter }`<br/> AI 크기를 조절할 때 수직 기준점                |
| `var horizontalAlignment` | `AIPlayerHorizontalAlignment {getter setter }`<br/> AI 크기를 조절할 때 수평 기준점            |
| `var state`   | `AIState { getter }` 읽기 전용 <br/> AIPlayer의 상태값                               |
| `var isConnected`     |   `Bool { getter }` 읽기 전용 <br/> AI 연결 상태값   |
| `var canPreload`      |   `Bool { getter }` 읽기 전용 <br/> 프리로드 가능 상태값   |

