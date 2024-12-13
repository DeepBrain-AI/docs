---
sidebar_position: 1
---

# AIPlayer

[Details](../../../aihuman/windows-sdk/aiplayer/setup#step-4-initialize-aiplayer-to-the-desired-ai)

## IAIPlayer

- assembly: AIHuman.SDK.Core  
- namespace: AIHuman.Interface  

## AIPlayer

- assembly: AIHuman.SDK.WPF  
- namespace: AIHuman.Media  

| Modifier and Type                    | Method / Property Description                                |
| :----------------------------------- | ------------------------------------------------------------ |
| `ctor`                               | `AIPlayer(IAIPlayerCallback callback)` Create AIPlayer with Default AI and register callback for state monitoring. (valid only when authentication is complete) |
| `ctor`                               | `AIPlayer(IAIPlayerOptions options, IAIPlayerCallback callback)` Create AIPlayer based on options and load AI. Register callback for health monitoring. (Authentication required) |
| `object`(`AIPlayerView`)             | `GetObject()` It is the actual Control object to be linked(binding) with the View (Xaml) of the Cutom App. |
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
| `float`                              | `Speed { get; set; }` Get or Set the AI's speech rate.       |
| `float`                              | `Scale { get; set; }` Get or Set the AI's scale.             |
| `AIHuman.Common.Margin`              | `Margin { get; set; }` Get or Set the AI's margin.           |
| `double`                             | `Volume { get; set; }` Get or Set the AI's volume.           |
| `bool`                               | `IsMute { get; set; }` Get or Set the AI's mute.             |
| `string`                             | `AIName { get; }` Get the AI's name.                           |
| `string`                             | `AIGender { get; }` Get the AI's gender.                        |
| `string`                             | `AILanguageCode { get; }` Get the AI's language code.                        |
| `AIHuman.Interface.AIPlayerState`    | `State { get; }` Get the current state of the AIPlayer.                 |
| `bool`                               | `IsConnected { get; }` Get the network connection with the AI.       |
| `string`                             | `Reconncet(int attempts = 5, int delay = 3000, Action<bool> callback = null)` Attempt to reconnect with AI. callback can be invoked using optional parameters.       |
| `void`                               | `Disconnect(Action<bool> callback = null)` Disconnect network connection with AI, callback can be invoked using optional parameters.    |
| `void`                               | `Dispose()` Called when destroying AIPlayer.                 |

<br/>

## AIPlayerOptions

- assembly: AIHuman.SDK.Core  
- namespace: AIHuman.Common  

| Modifier and Type                    | Method / Property Description                                |
| :----------------------------------- | ------------------------------------------------------------ |
| `ctor`                               | `AIPlayerOptions(string aiName = null, float aiScale = 1.0f, float aiSpeed = 1.0f, Margin aiMargin = null, bool aiDisconnect = false, AIPlayerCachingStrategy aiCaching = AIPlayerCachingStrategy.V1)` Creates an object for use when creating (initializing) AIPlayer objects. |
| `string`                             | `AIName { get; set; }` Get or Set the identifier of the AI you want to initialize. The identifier is obtained from AIList.AI.aiName. |
| `float`                              | `AIScale { get; set; }` Get or Set the scale of the AI you want to initialize. |
| `AIHuman.Common.Margin`              | `AIMargin { get; set; }` Get or Set the margin of the AI you want to initialize. |
| `float`                              | `AISpeed { get; set; }` Get or Set the spped of the AI you want to initialize. |
| `bool`                               | `AIDisconnection { get; set; }` When set to true, the AI is initialized with a disconnected network. |
| `AIHuman.Interface.AIPlayerCachingStrategy` | `AICachingStrategy { get; set; }` Get or Set the caching strategy of the AI you want to initialize. |
| `int`                              | `CacheLimit { get; set; }` Get or Set the maximum cache limit of the AI you want to initialize. |

<br/>

------------------

<br/>

(For on-premises customers)
## ServerConfiguration

- assembly: AIHuman.SDK.Core  
- namespace: AIHuman.Common  

Used as a parameter when using the `SetConfig` function of `AIAPI`.

You can set the server address that you want to change at the time of `ServerConfiguration` object creation or using a `SetValue(key, value)` function.

The key (string) members required for this setting are internally defined.

:::info

`KEY_AUTH_SERVER_ADDR`: Authentication server address  
`KEY_MID_SERVER_ADDR`: Mid server address  
`KEY_RESOURCE_SERVER_ADDR`: Resources server address  
`KEY_BACKEND_SERVER_ADDR`: Backend server address

:::

Customers who use cloud services do not need to be aware of this.

## Supporting Offline Mode 

(Features covered by CES 2024)

Supports SDK-driven modes that can operate without network communication based on [local caching](../../../aihuman/windows-sdk/aiplayer/basic-features#local-caching).


<br/>

[Contact](https://www.aistudios.com/company/contact)
