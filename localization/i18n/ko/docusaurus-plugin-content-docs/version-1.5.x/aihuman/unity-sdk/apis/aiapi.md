---
sidebar_position: 1
---

# AIAPI

namespace AIHuman.Core

| Modifier and Type                | Method and Description                                       |
| -------------------------------- | ------------------------------------------------------------ |
| `AIHuman.Common.AIError`         | `Authenticate(string appId, string userKey, string platform)` 발급받은 userKey로 인증을 시도한다. 실패하면 관련 내용을 AIError를 통해 리턴한다. |
| `void`                           | `GetAIList(AIListType listType, Action<AIList, AIError> OnComplete)` listType 인자로 현재 인증된 상태의 사용가능한 AI 모델 목록을 얻어 온다. |
| `string`                         | `DefaultAIName { get; }` 현재 설정되어 있는 기본(default) AI의 이름을 가져온다.  |
| `void`                           | `GetSampleTexts(string aiName, Action<string[], AIError> OnComplete)` AI의 이름을 인자로 해당 AI의 기본 발화 문장들을 콜백 함수를 통해 가져온다. |
| `void`                           | `GetSampleTextList(string languageCode, Action<string[], AIError> OnComplete)` languageCode를 인자로 해당 AI의 기본 발화 문장들을 콜백 함수를 통해 가져온다. |
| `AIHuman.Model.AIClipSet`        | `CreateClipSet(string speechText, string gestureName = "", CustomVoice customVoice = null)` ClipSet 객체를 생성한다. |
| `AIHuman.Common.AIError`                          | `LoadCustomVoices()` 기본 음성 외 추가로 사용 가능한 음성 리스트를 로드한다.  |
| `List<string>`            | `GetSpeakableLanguages(string gender = null)` 구사 가능한 언어코드 리스트를 가져온다. |
| `List<CustomVoice>`       | `GetCustomVoices(string language = null, string gender = null)` 사용 가능한 음성 리스트를 가져온다. |
| `void`                    | `GetAudioClip(string aiName, string speechText, string voiceID, Action<string, AIClipSet, AIError, AudioClip> onComplete)` Text와 음성 id와 같은 정보를 인자로 AudioClip을 가져온다. |
| `CustomVoice`                   | `FindCustomVoice(string id)` 음성 리스트 중 id에 해당하는 CustomVoice 객체를 가져온다. 없으면 null을 return한다. |
