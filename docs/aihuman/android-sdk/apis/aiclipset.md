---
sidebar_position: 4
---

# AIClipSet

| Modifier and Type | Method and Description                                       |
| ----------------- | ------------------------------------------------------------ |
| `enum`            | `ClipType` <br />- CLIP_SPEECH <br />- CLIP_GESTURE<br />- CLIP_SPEECH_GESTURE |
| `String`          | `getSpeechText()` speech to speak                            |
| `ClipType`        | `getClipType()` get ClipType of AIClipSet                    |
| `String`          | `getGesture()` get the name of gesture                       |
| `String`          | `getKey()`  get Clip's key                                   |
| `static String`   | `createKey(String gesture, String speechText)` create Clips' key |
| `CustomVoice`     | `getCustomVoice()` get current custom voice. |
| `void`            | `setCustomVoice(CustomVoice cv)` set a custom voice. |
| `static String`   | `createKey(String gesture, String speechText)` create key with gesture and speechText. |

