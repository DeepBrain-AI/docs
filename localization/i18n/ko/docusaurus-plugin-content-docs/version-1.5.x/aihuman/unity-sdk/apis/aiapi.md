---
sidebar_position: 1
---

# AIHuman.Core.AIAPI

| Modifier and Type                | Method and Description                                       |
| -------------------------------- | ------------------------------------------------------------ |
| ` void`                          | `Authenticate(string appId, string userKey, string platform, Action<AIList, AIError> onComplete)` 발급받은 userKey로 인증을 시도한다. CallBack(onComplete)으로 응답을 전달하며 성공하면 사용할수 있는 AI 모델을 얻을 수 있다. |
| `AIHuman.Common.AIError`                        | `GenerateToken(string appId, string userKey, string platform)` 해당 정보로 서버에 인증을 시도하고 실패하면 관련 내용을 AIError를 통해 리턴한다. |
| `void`                           | `GetAIList(Action<AIList, AIError> OnComplete)` 현재 인증된 상태의 사용가능한 AI 모델 목록을 얻어 온다.             |
| `string`                         | `DefaultAIName { get; }` 현재 설정되어 있는 기본(default) AI의 이름을 가져온다.  |
| `void`                           | `GetSampleTexts(string aiName, Action<string[], AIError> OnComplete)` AI의 이름을 인자로 해당 AI의 기본 발화 문장들을 콜백 함수를 통해 가져온다. |
| `void`                           | `GetSampleTextList(string languageCode, Action<string[], AIError> OnComplete)` languageCode를 인자로 해당 AI의 기본 발화 문장들을 콜백 함수를 통해 가져온다. |
| `AIHuman.Model.AIClipSet` | `CreateClipSet(string speechText, string gestureName = "", CustomVoice customVoice = null)` ClipSet 객체를 생성한다. |
| `AIHuman.Common.AIError`                          | `LoadCustomVoices()` 기본 음성 외 추가로 사용 가능한 음성 리스트를 로드한다.  |
| `List<string>`            | `GetSpeakableLanguages(string gender = null)` 구사 가능한 언어코드 리스트를 가져온다. |
| `List<CustomVoice>`       | `GetCustomVoices(string language = null, string gender = null)` 사용 가능한 음성 리스트를 가져온다. |
| `CustomVoice`                   | `FindCustomVoice(string id)` 음성 리스트 중 id에 해당하는 CustomVoice 객체를 가져온다. 없으면 null을 return한다. |
