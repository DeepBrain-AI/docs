---
sidebar_position: 3
---

# AIAPI

namespace AIHuman.Core

| Modifier and Type                | Method and Description                                       |
| -------------------------------- | ------------------------------------------------------------ |
| ` void`                          | `Authenticate(string appId, string userKey, Action<AIList, AIError> OnComplete)` Attempts to authenticate with the issued userKey. It passes the response to Callback(onComplete) and if successful, you can get a usable AI model. |
| `AIHuman.Common.AIError`         | `GenerateToken(string appId, string userKey)` Attempts to authenticate to the server with this information and returns true if successful. |
| `void`   | `GetAIList(Action<AIList, AIError> OnComplete)` Get a list of available AI models.             |
| `string`     | `DefaultAIName { get; }` Get the default AI information.         |
| `void`                       | `GetSampleTexts(string aiName, Action<string[], AIError> OnComplete)` Get AI sample sentences using aiName. |
| `void`                       | `GetSampleTextList(string languageCode, Action<string[], AIError> OnComplete)` Get the list of sample texts for the language from server. |
| `AIHuman.Common.Model.AIClipSet` | `CreateClipSet(string speechText, string gestureName = "", CustomVoice customVoice = null)` Create AIClipSet Object. |
| `AIHuman.Common.AIError`                          | `LoadCustomVoices()` Load a collection of available languages and gender-specific voices.  |
| `Collection<string>`            | `GetSpeakableLanguages(string gender = null)` Get a collection of speakable languages. |
| `Collection<CustomVoice>`       | `GetCustomVoices(string language = null, string gender = null)` Get a collection of available custom voices. |
| `CustomVoice`                   | `FindCustomVoice(string id)` Find CustomVoice by id. return null if there is none. |
