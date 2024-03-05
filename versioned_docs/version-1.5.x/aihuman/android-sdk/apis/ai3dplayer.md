---
sidebar_position: 2
---

# AI3DPlayer

| Modifier and Type        | Method and Description                                       |
| ------------------------ | ------------------------------------------------------------ |
| `java.lang.String`       | `getAIName()` get the name of the currently set ai           |
| `float`                  | `getScale()` get the scale of the currently set ai           |
| `float`                  | `getSpeed()` get the speed of the currently set ai           |
| `IAIPlayer.AIPlayerType` | `getType()` get the type of the currently set ai (AILIVE, UNITY) |
| `void`                   | `init(AIPlayerSettings config, IAIPlayerCallback callback)` init after creation. |
| `void`                   | `pausePlay()`                                                |
| `void`                   | `preload(java.lang.String requests)` not supprot             |
| `void`                   | `preload(java.lang.String[] request)` not supprot            |
| `void`                   | `preload(AIClipSet request)` not supprot                     |
| `void`                   | `preload(AIClipSet[] requests)` not supprot                  |
| `void`                   | `release()` release resource. should be called on 'onDestroy' etc. |
| `void`                   | `resumePlay()`                                               |
| `void`                   | `send(java.lang.String request)`                             |
| `void`                   | `send(java.lang.String[] requests)` send speechs to speak    |
| `void`                   | `send(AIClipSet requests)` send speech or speech with gesture to speak |
| `void`                   | `send(AIClipSet[] requests)` send speeches or speeches with gesture to speak |
| `void`                   | `setScale(float scale)`                                      |
| `void`                   | `setSpeed(float speed)`                                      |
| `void`                   | `setTopMargin(int topMargin)` not support                    |
| `void`                   | `stopSpeaking()` stop speech if possible and clear all sentences in queue if possible |
| `AIGesture[]`            | `getGestures()` get gesture list.                           |
| `boolean`                | `setCustomVoice(CustomVoice customVoice)` set the CustomVoice of ai. return true if it succeeds. Null input will revert the voice to the default voice. |
| `boolean`                | `setCustomVoiceForLanguage(String language, String gender)` Set the voice by the desired language and gender. The AI's default language will be set when null for language is entered and this method returns true. If the language is not valid, also the default AI's voice will be set and returns false. When null is entered in gender, the AI's gender will be set and searched. And the voice will be set the first voice among the search result list. If the search and setting succeed, it returns true. Otherwise the default voice will be set and returns false.  |
| `CustomVoice`            | `getCustomVoice()` Get the current customVoice of set ai. It returns null if not set.  |
| `String`                 | `getLanguageCode()` get current voice's language (en or en-US format)  |
| `String`                 | `getGender()` get current ai's gender. MALE, FEMALE, UNI are possible and return null if the ai is not set.  |
| `AIPlayerState`                 | `getState()` get current AIPlayer's State  |
| `boolean`                 | `isConnected()` check if AI is connected and can send  |
| `boolean`                 | `canPreload()` return false. (Not support)  |
| `boolean`                 | `reconnect(IAIReconnectCallback reconnectCallback)` reconnect when AI is not connected. Return false if it is connected or can't reconnect. |
