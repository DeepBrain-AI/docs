---
sidebar_position: 1
---

# AIPlayer

## functions

| Name                     | Description                                         |
| ------------------------ | ------------------------------------------------------------ |
| `static func setUserKey()`            | set userKey                                |
| `static func setAppId()`            | set AppId                                        |
| `static func setConfig(config:)`            | Configuring the AIPlayer <br/> config: AI Environment Objects (AIPlayerConfiguration)                                        |
| `static func` <br/> `create(callbackHandler:)`            | Returns AIPlayer class with default AI settings on authentication |
| `static func generateToken()`            | Attempt user authentication |
| `static func` <br/> `getAIList(completionHandler:)`            | `completionHandler` (`Int`: respose code, `[String: Any]`: AI List, `Error`: error detail) Returns available AIs as a list |
| `static func aiList()`            | Get AI list                                                  |
| `static func` <br/> `create(name:, callbackHandler:)`            | `name`: AI name, <br/> `callbackHandler` (`IAIPlayer`: AI class, `Error`: error detail) Create AI class with a given ai name |
| `static func getSpeakableLanguages(gender:)`        |  Gets the list of available languages. <br/> If there is no gender, gets the full list of available.               |
| `static func getCustomVoicesWith(language:, gender:)`        |  Gets the list of available voices. <br/> Enter language and gender to get only the corresponding list.              |
| `static func findCustomVoice(customVoiceId:)`        |  Find CustomVoice by id. Return null if there is none                               |
| `static func loadCustomVoices(completionHandler:)`        |  Load a list of available languages and gender-specific voices. <br/> Through closure, nil is delivered when successful, and functions related to voice change after success can be used.           |
| `func release()`                   |  Remove AI class.  |
| `func send(text:)`                   |  Make the ai speak.                             |
| `func send(texts:)`                   |  Make the ai speak multiple sentences.      |
| `func send(clipset:)`                   |  Make the ai speak.                             |
| `func send(clipsets:)`                   |  Make the ai speak multiple sentences.      |
| `func preload(texts:)`                   |  Preload next sentence.                      |
| `func stopSpeaking()`                   |  Stop speech.  |
| `func pause()`                   | Pause speech.                                                |
| `func resume()`                   |  Resume speech.                                |
| `func setCustomVoice(customVoice:)`            |  Change AI's voice to the desired CustomVoice. True return on success.                    |
| `func setCustomVoiceForLanguage(language:, gender:)`            |  Change the voice of AI to the desired language. True return on success.                    |
| `func customVoice()`  |   Gets the AIPlayer user-set voice. nil return if no user settings exist.   |
| `func reconnect(callbackHandler:)`    |   Attempt to reconnect when disconnected.   |

## properties
| Name     | Description     |
| -------- | --------------- |
| `var name`           | `String { getter }` read only<br/> AIPlayer name                                |
| `var gender`           | `String { getter }` read only<br/> AIPlayer gender                                |
| `var language`           | `String { getter }` read only<br/> AIPlayer language                                |
| `var gestures`        |   `Array { getter }` read only <br/> List of available gestures   |
| `var size`           | `CGSize { getter }` read only<br/> AIPlayer size                  |
| `var scale`          | `CGFloat { getter setter }` <br/> set AIPlayer size                      |
| `var speechSpeed`            | `Float { getter setter }`<br/> set AI speech rate             |
| `var enableViewAspectRatio`  | `Bool { getter }`<br/> AIPlayer View Size aspect Ratio Optimization Enabled             |
| `var verticalAlignment` | `AIPlayerVerticalAlignment { getter setter }`<br/> AI vertical alignment on size update |
| `var horizontalAlignment` | `AIPlayerHorizontalAlignment {getter setter }`<br/> AI horizontal alignment on size update |
| `var state`   | `AIState` { getter } read only <br/> AIPlayer state            |
| `var isConnected`     |   `Bool { getter }` read only <br/> AI connection status   |
| `var canPreload`      |   `Bool { getter }` read only <br/> Preloadable status   |
