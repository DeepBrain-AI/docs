---
sidebar_position: 1
---

# AIAPI

namespace AIHuman.Core

| Modifier and Type                | Method and Description                                       |
| -------------------------------- | ------------------------------------------------------------ |
| `AIHuman.Common.AIError`        | `Authenticate(string appId, string userKey, string platform)` Attempts to authenticate with the issued userKey. If it fails, it returns the relevant information through AIError. |
| `void`                           | `GetAIList(AIListType listType, Action<AIList, AIError> OnComplete)` Get a list of available AI models. |
| `string`                         | `DefaultAIName { get; }` Get the default AI information.  |
| `void`                           | `GetSampleTexts(string aiName, Action<string[], AIError> OnComplete)` Get AI sample sentences using aiName. |
| `void`                           | `GetSampleTextList(string languageCode, Action<string[], AIError> OnComplete)` Get the list of sample texts for the language from server. |
| `AIHuman.Model.AIClipSet` | `CreateClipSet(string speechText, string gestureName = "", CustomVoice customVoice = null)` Create AIClipSet Object. |
| `AIHuman.Common.AIError`                          | `LoadCustomVoices()` Load a list of available languages and gender-specific voices.  |
| `List<string>`            | `GetSpeakableLanguages(string gender = null)` Get a list of speakable languages. |
| `List<CustomVoice>`       | `GetCustomVoices(string language = null, string gender = null)` Get a list of available custom voices. |
| `void`                    | `GetAudioClip(string aiName, string speechText, string voiceID, Action<string, AIClipSet, AIError, AudioClip> onComplete)` AudioClip is imported using information such as Text and voice ID as a factor. |
| `CustomVoice`                   | `FindCustomVoice(string id)` Find CustomVoice by id. return null if there is none. |
