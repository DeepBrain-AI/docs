---
sidebar_position: 3
---

# AIHuman.Core.AIAPI

| Modifier and Type                | Method and Description                                       |
| -------------------------------- | ------------------------------------------------------------ |
| ` void`                          | `AuthStart(string appId, string userKey, string uuid, string platform, Action<JToken, string> onComplete)` Attempts to authenticate with the issued userKey. It passes the response to CallBack(onComplete) and if successful, you can get a usable AI model. |
| `bool`                           | `GenerateToken(string appId, string userKey, string uuid, string platform)` Attempts to authenticate to the server with this information and returns true if successful. |
| `Newtonsoft.Json.Linq.JObject`   | `GetAIList()` Get a list of available AI models.             |
| `AIHuman.Common.AIModelData`     | `GetDefaultAIData()` Get the default AI information.         |
| `string[]`                       | `GetSampleTexts(string aiName)` Get AI sample sentences using aiName. |
| `string[]`                       | `GetSampleTextList(string languageCode)` Get the list of sample texts for the language from server. |
| `AIHuman.Common.Model.AIClipSet` | `CreateClipSet(string speechText, string gestureName = "", CustomVoice customVoice = null)` Create AIClipSet Object. |
| `bool`                          | `LoadCustomVoices()` Load a collection of available languages and gender-specific voices.  |
| `Collection<string>`            | `GetSpeakableLanguages(string gender = null)` Get a collection of speakable languages. |
| `Collection<CustomVoice>`       | `GetCustomVoices(string language = null, string gender = null)` Get a collection of available custom voices. |
| `CustomVoice`                   | `FindCustomVoice(string id)` Find CustomVoice by id. return null if there is none. |
