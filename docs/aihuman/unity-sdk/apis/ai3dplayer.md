---
sidebar_position: 4
---

# AI3DPlayer

namespace AIHuman.View

| Modifier and Type                    | Method / Property Description                                |
| :----------------------------------- | ------------------------------------------------------------ |
| `void`                               | `Init(string aiName)`  Initialize the AI3DPlayer with the forwarded aiName. Applies RP character resources based on GraphicsSettings.currentRenderPipeline. (valid only when authenticated) |
| `void`                               | `Init(string aiName, string pipeline)`  Initialize the AI3DPlayer with the forwarded aiName and pipeline. (pipeline : Built-in, URP) (valid only when authenticated) |
| `void`                               | `Send(string[] requests)` Let the AI speak. (using pure-text string) |
| `void`                               | `Send(AIClipSet[] requests)` Let the AI play. (using AIHuman.Model.AIClipSet) |
| `void`                               | `StopSpeaking()` Stop the current conversation. It also deletes the content in the speaking queue. |
| `void`                               | `Pause()` Pauses speaking. |
| `void`                               | `Resume()` Continue speaking again from when it was paused.  |
| `void`                               | `SetCustomVoice(CustomVoice cv)` Set AI's voice to cv. return true if success.|
| `CustomVoice`                        | `GetCustomVoice()` Get the current CustomVoice object of set ai. It returns null if not set. |
| `bool`                        | `SetCustomVoiceForLanguage(string languageCode, string gender) ` Set the voice by the desired language and gender. All available languages when language null is entered, and all genders when null is entered in gender are searched and set as the first voice. If it succeeds, it returns true. Otherwise the default voice will be set. |
| `void`                               | `Dispose()` Called when release AIPlayer.                |
| `void`                              | `Scale(float scale)` Set the AI scale.            |
| `void`                              | `Scale(float scale, Transform pivot)` Set AI scale based on pivot.             |
| `float`                              | `Speed { get; set; }` Get or Set the AI's speech rate.            |
| `float`                              | `Volume { get; set; }` Get or Set the AI's volume.            |
| `bool`                               | `IsMute { get; set; }` Get or Set the AI's Mute.             |
| `AIPlayerState`                       | `State { get; }` Get the state of AI3DPlayer.             |
| `string`                             | `AIName { get; }` Get the AI name.                          |
| `string`                             | `AIGender { get; }` Get the AI gender.                      |
| `string`                             | `AILanguage { get; }` Get the AI language.                       |
| `string[]`                             | `AIGestures { get; }` Get the AI gestures.                        |
| `OnAIPlayerEvent`                             | `onAIPlayerEvent` Delegate who can register event in AI3DPlayer.    |
| `OnAIPlayerError`                             | `onAIPlayerError` Delegate who can register error in AI3DPlayer.    |