---
sidebar_position: 1
---

# AIPlayer

| Modifier and Type        | Method and Description                                       |
| ------------------------ | ------------------------------------------------------------ |
| `java.lang.String`       | `getAIName()` get the name of the currently set ai  |
| `float`                  | `getScale()` get the scale of the currently set ai    |
| `float`                  | `getSpeed()` get the speed of the currently set ai   |
| `IAIPlayer.AIPlayerType` | `getType()`get the type of the currently set ai. Currently only AIHuman Type. |
| `void`                   | `init(AIPlayerSettings config, IAIPlayerCallback callback)` initialize the ai with config and set callback |
| `void`                   | `pause()`pause the speech if possible                        |
| `void`                   | `preload(java.lang.String request)` preload speech  |
| `void`                   | `preload(java.lang.String[] requests)` preload speechs       |
| `void`                   | `preload(AIClipSet request)` preload speech with gesture |
| `void`                   | `preload(AIClipSet[] requests)`preload speechs with gesture |
| `void`                   | `release()`release the aiplayer when done. Similar to 'onDestroy()'. |
| `void`                   | `resume()` resume the speech if possible                     |
| `void`                   | `send(java.lang.String request)` send speech to speak          |
| `void`                   | `send(java.lang.String[] requests)` send speechs to speak    |
| `void`                   | `send(AIClipSet requests)` send speech with gesture |
| `void`                   | `send(AIClipSet[] requests)` send speechs with gesture |
| `void`                   | `setScale(float scale)` set the scale of ai                  |
| `void`                   | `setSpeed(float speed)` set the ai speech rate               |
| `void`                   | `setTopMargin(int topMargin)`  set top margin of ai to be displayed |
| `void`                   | `stopSpeaking()` stop speech if possible and clear all sentences in queue if possible |
| `AIGesture[]`            | `getGestures()` get gesture list. |
| `boolean`                | `setCustomVoice(CustomVoice customVoice)` set the CustomVoice of ai. return true if it succeeds. Null input will revert the voice to the default voice. |
| `boolean`                | `setCustomVoiceForLanguage(String language, String gender)` Set the voice by the desired language and gender. The AI's default language will be set when null for language is entered and this method returns true. If the language is not valid, also the default AI's voice will be set and returns false. When null is entered in gender, the AI's gender will be set and searched. And the voice will be set the first voice among the search result list. If the search and setting succeed, it returns true. Otherwise the default voice will be set and returns false.  |
| `CustomVoice`            | `getCustomVoice()` Get the current customVoice of set ai. It returns null if not set.  |
| `String`                 | `getLanguageCode()` get current voice's language (en or en-US format)  |
| `String`                 | `getGender()` get current ai's gender. MALE, FEMALE, UNI are possible and return null if the ai is not set.  |
| `AIPlayerState`                 | `getState()` get current AIPlayer's State  |
| `boolean`                 | `isConnected()` check if AI is connected and can send  |
| `boolean`                 | `canPreload()` check if AI is able to preload  |
| `boolean`                 | `reconnect(IAIReconnectCallback reconnectCallback)` reconnect when AI is not connected. Return false if it is connected or can't reconnect. |
