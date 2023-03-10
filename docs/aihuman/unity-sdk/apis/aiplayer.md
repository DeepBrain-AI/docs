---
sidebar_position: 3
---

# AIHuman.View.AIPlayer

| Modifier and Type                    | Method / Property Description                                |
| :----------------------------------- | ------------------------------------------------------------ |
| `void`                               | `Init(string aiName, IAIPlayerCallback callback, IFrameImageProvider imageProvider)`  Initialize AIPlayer with the aiName received as a factor and register callback for health monitoring and image provider for AI rendering. (valid only when authenticated) |
| `void`                               | `Send(string[] sentences)` Let the AI speak. (using pure-text string) |
| `void`                               | `Send(AIClipSet[] clips)` Let the AI play. (using AIHuman.Model.AIClipSet) |
| `void`                               | `Stop()` Stop the current conversation. It also deletes the content in the speaking queue. |
| `void`                               | `Pause()` Pauses speaking.                                    |
| `void`                               | `Resume()` Continue speaking again from when it was paused.   |
| `void`                               | `Preload(string[] sentences)` Prepare the sentences to be spoken in advance. |
| `void`                               | `Preload(AIClipSet[] clips)` Prepare the clips to be play in advance. |
| `List<AIGesture>`                    | `GetGestures()` Get a list of gesture. (available gestures) |
| `bool`                               | `SetCustomVoice(CustomVoice cv)` Set AI's voice to cv. return true if success.|
| `CustomVoice`                        | `GetCustomVoice()` Get the current CustomVoice object of set ai. It returns null if not set. |
| `bool`                        | `SetCustomVoiceForLanguage(string languageCode, string gender) ` Set the voice by the desired language and gender. All available languages when language null is entered, and all genders when null is entered in gender are searched and set as the first voice. If it succeeds, it returns true. Otherwise the default voice will be set. |
| `void`                               | `Release()` Called when release AIPlayer.                |
| `float`                              | `Speed { get; set; }` Get or Set the AI's speech rate.       |
| `float`                              | `Scale { get; set; }` Get or Set the AI's scale.             |
| `AIPlayerState`                       | `State { get; }` Get the state of AIPlayer             |
| `string`                             | `AIName { get; }` Get the AI name.                           |
| `string`                             | `AIGender { get; }` Get the AI gender.                        |
| `string`                             | `AILanguage { get; }` Get the AI language.                        |
| `bool`                             | `CanPreload { get; }` It brings whether AI is in a preloadable state.                      |
| `bool`                             | `IsConnected { get; }` It brings whether AI is connected.                    |
| `void`                        | `Reconncet(Action<bool> callback)` Attempt to reconnect AI. Return the reconnection result via callback. | 