---
sidebar_position: 1
---

# AIHuman.Core.AIAPI

| Modifier and Type                | Method and Description                                       |
| -------------------------------- | ------------------------------------------------------------ |
| ` void`                          | `Authenticate(string appId, string userKey, string platform, Action<AIList, AIError> onComplete)` Attempts to authenticate with the issued userKey. It passes the response to Callback(onComplete) and if successful, you can get a usable AI model. |
| `AIHuman.Common.AIError`                        | `GenerateToken(string appId, string userKey, string platform)` If the server attempts authentication with the information and fails, the related content is returned through AIError. |
| `void`                           | `GetAIList(Action<AIList, AIError> OnComplete)` Get a list of available AI models.             |
| `string`                         | `DefaultAIName { get; }` Get the default AI information.  |
| `void`                           | `GetSampleTexts(string aiName, Action<string[], AIError> OnComplete)` Get AI sample sentences using aiName. |
| `void`                           | `GetSampleTextList(string languageCode, Action<string[], AIError> OnComplete)` Get the list of sample texts for the language from server. |
| `AIHuman.Model.AIClipSet` | `CreateClipSet(string speechText, string gestureName = "", CustomVoice customVoice = null)` Create AIClipSet Object. |
| `AIHuman.Common.AIError`                          | `LoadCustomVoices()` Load a list of available languages and gender-specific voices.  |
| `List<string>`            | `GetSpeakableLanguages(string gender = null)` Get a list of speakable languages. |
| `List<CustomVoice>`       | `GetCustomVoices(string language = null, string gender = null)` Get a list of available custom voices. |
| `CustomVoice`                   | `FindCustomVoice(string id)` Find CustomVoice by id. return null if there is none. |
