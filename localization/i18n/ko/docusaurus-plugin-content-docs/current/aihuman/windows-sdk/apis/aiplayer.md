---
sidebar_position: 1
---

# AIHuman.Media.AIPlayer

| Modifier and Type                    | Method / Property Description                                |
| :----------------------------------- | ------------------------------------------------------------ |
| `ctor`                               | `AIPlayer(IAIPlayerCallback callback)` Create AIPlayer with Default AI and register callback for state monitoring. (valid only when authentication is complete) |
| `ctor`                               | `AIPlayer(string aiName, IAIPlayerCallback callback)` Creates AIPlayer with an AI model defined in aiName and registers callback for state monitoring. (valid only when authentication is complete) |
| `AIHuman.Media.AIPlayerView`         | `GetObject()` It is the actual Control object to be linked(binding) with the View (Xaml) of the Cutom App. |
| `void`                               | `Send(string[] sentences)` Let the AI speak. (using pure-text string) |
| `void`                               | `Send(AIClipSet[] clips)` Let the AI play. (using AIHuman.Common.Model.AIClipSet) |
| `void`                               | `StopSpeaking()` Stop the current conversation. It also deletes the content in the speaking queue. |
| `void`                               | `Pause()` Pauses speaking.                                    |
| `void`                               | `Resume()` Continue speaking again from when it was paused.   |
| `void`                               | `Preload(string[] sentences)` Prepare the sentences to be spoken in advance. |
| `void`                               | `Preload(AIClipSet[] clips)` Prepare the clips to be play in advance. |
| `Collection<AIGesture>`              | `GetGestures()` Get a collection of gesture. (available gestures) |
| `bool`                               | `SetCustomVoice(CustomVoice cv)` Set AI's voice to cv. return true if success.|
| `CustomVoice`                        | `GetCustomVoice()` Get the current CustomVoice object of set ai. It returns null if not set. |
| `bool`                        | `SetCustomVoiceForLanguage(string languageCode, string gender = null) ` Set the voice by the desired language and gender. All available languages when language null is entered, and all genders when null is entered in gender are searched and set as the first voice. If it succeeds, it returns true. Otherwise the default voice will be set. |
| `void`                               | `Dispose()` Called when destroying AIPlayer.                 |
| `float`                              | `Speed { get; set; }` Get or Set the AI's speech rate.       |
| `float`                              | `Scale { get; set; }` Get or Set the AI's scale.             |
| `AIHuman.Common.Margin`              | `Margin { get; set; }` Get or Set the AI's margin.           |
| `System.Windows.Controls.MediaState` | `PlayerState { get; }` Get the state of AIPlayer             |
| `string`                             | `AIName { get; }` Get the AI name.                           |
| `string`                             | `AIGender { get; }` Get the AI gender.                        |
| `string`                             | `AILanguage { get; }` Get the AI language.                        |
