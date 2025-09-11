---
sidebar_position: 3
---

# AIAPI

- assembly: AIHuman.SDK.Core  
- namespace: AIHuman.Core  

| Modifier and Type                | Method and Description                                       |
| -------------------------------- | ------------------------------------------------------------ |
| ` void`                          | `Authenticate(string appId, string userKey, Action<AIList, AIError> OnComplete)` appId와 userKey로 인증 과정을 수행합니다. OnComplete로 응답(Callback)을 받을 수 있으며, 성공 시 해당 정보로 사용할 수 있는 AI Human 모델들을 AIList 객체를 통해 얻어오고 AIError는 null입니다. 실패 시 AIError 객체를 통해 원인을 파악할 수 있습니다. |
| `AIHuman.Common.AIError` | `GenerateToken(string appId, string userKey)` appId와 userKey로 인증 과정을 수행합니다. 성공 시 리턴(AIError)은 null이고, 실패 시 원인은 리턴(AIError)을 통해 파악할 수 있습니다. |
| `void`   | `GetAIList(Action<AIList, AIError> OnComplete)` 인증 과정을 수행한 상태에서 사용 가능한 AI Human 모델들을 AIList 객체를 OnComplete(Callback)을 통해 얻어옵니다. 성공 시 해당 정보로 사용할 수 있는 AI Human 모델들을 AIList 객체를 통해 얻어오고 AIError는 null입니다. 실패 시 AIError 객체를 통해 원인을 파악할 수 있습니다.             |
| `string`     | `DefaultAIName { get; }` 현재 자사 서비스(backend)에 설정되어 있는 기본(default) AI의 이름을 가져옵니다.         |
| `void`                       | `GetSampleTexts(string aiName, Action<string[], AIError> OnComplete)` AI의 이름을 인자로 자사 서비스(backend)에 설정되어 있는 샘플 문장들을 콜백 함수를 통해 가져옵니다. |
| `void`                       | `GetSampleTextList(string languageCode, Action<string[], AIError> OnComplete)` Language Code를 인자로 자사 서비스(backend)에 설정되어 있는 샘플 문장들을 콜백 함수를 통해 가져옵니다. |
| `AIHuman.Common.Model.AIClipSet` | `CreateClipSet(string speechText, string gestureName = "", CustomVoice customVoice = null)` ClipSet 객체를 생성합니다. |
| `AIHuman.Common.AIError` | `LoadCustomVoices()` 기본 음성 외 추가로 사용 가능한 음성(CustomVoice) 리스트를 로드합니다. (내부에서 기본적으로 호출합니다. 갱신을 목적으로 public 제공 합니다.) |
| `Collection<string>`            | `GetSpeakableLanguages(string gender = null)` 구사(CustomVoice) 가능한 언어코드 리스트를 가져옵니다. |
| `Collection<CustomVoice>`       | `GetCustomVoices(string language = null, string gender = null)` 사용 가능한 음성(CustomVoice) 리스트를 가져옵니다. |
| `CustomVoice`                   | `FindCustomVoice(string id)` 음성(CustomVoice) 리스트 중 id에 해당하는 객체를 가져옵니다. 없으면 null을 return합니다. |
