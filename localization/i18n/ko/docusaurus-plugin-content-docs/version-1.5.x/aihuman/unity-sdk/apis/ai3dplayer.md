---
sidebar_position: 4
---

# AI3DPlayer

namespace AIHuman.View

| Modifier and Type                    | Method / Property Description                                |
| :----------------------------------- | ------------------------------------------------------------ |
| `void`                               | `Init(string aiName)`  전달 받은 AI로 AI3DPlayer를 초기화한다. GraphicsSettings.currentRenderPipeline 기준의 RP 캐릭터 리소스를 적용한다. (인증 완료 상태에서만 유효) |
| `void`                               | `Init(string aiName, string pipeline)`  전달 받은 AI와 pipeline 타입으로 AI3DPlayer를 초기화한다. (pipeline : Built-in, URP) (인증 완료 상태에서만 유효) |
| `void`                               | `Send(string[] requests)` string type의 문장을 이용하여 발화한다. |
| `void`                               | `Send(AIClipSet[] requests)` AIClipset을 이용하여 발화한다. |
| `void`                               | `StopSpeaking()` 현재 하고 있는 말을 멈춘다. 발화 큐에 있는 내용도 삭제한다. |
| `void`                               | `Pause()` 발화 중 일때 발화를 일시정지 시킨다.                                 |
| `void`                               | `Resume()` 일시정지 시점 부터 다시 발화를 계속한다.  |
| `void`                               | `SetCustomVoice(CustomVoice cv)` AI의 음성을 cv로 설정한다.|
| `CustomVoice`                        | `GetCustomVoice()` 현재 설정된 CustomVoice 객체를 가져온다. 기본 음성이면 null을 return한다. |
| `bool`                        | `SetCustomVoiceForLanguage(string languageCode, string gender) ` 원하는 언어와 성별로 음성을 설정한다. language에 null을 입력 시 사용가능한 모든 언어, gender에 null을 입력 시 모든 성별로 검색되고, 그 중 첫번째 음성으로 설정된다. 성공 시 true를 리턴하고 찾지 못하면 기본 음성으로 셋팅된다. |
| `void`                               | `Dispose()` AI3DPlayer를 해제한다.                |
| `void`                              | `Scale(float scale)` AI 크기(확대/축소)를 설정한다.             |
| `void`                              | `Scale(float scale, Transform pivot)` pivot 기준으로 AI 크기(확대/축소)를 설정한다.             |
| `float`                              | `Speed { get; set; }` AI의 발화 속도를 가져오거나 설정한다.            |
| `float`                              | `Volume { get; set; }` AI 음성 볼륨을 가져오거나 설정한다.             |
| `bool`                               | `IsMute { get; set; }` AI 음소거 상태를 가져오거나 설정한다.             |
| `AIPlayerState`                       | `State { get; }` AI3DPlayer의 상태를 가져온다.             |
| `string`                             | `AIName { get; }` AI 이름을 가져온다.                           |
| `string`                             | `AIGender { get; }` AI 성별을 가져온다.                        |
| `string`                             | `AILanguage { get; }` AI 언어을 가져온다.                        |
| `string[]`                             | `AIGestures { get; }` AI gesture 배열을 가져온다.                        |
| `OnAIPlayerEvent`                             | `onAIPlayerEvent` AI3DPlayer의 이벤트를 등록할 수 있는 대리자.    |
| `OnAIPlayerError`                             | `onAIPlayerError` AI3DPlayer의 에러를 등록할 수 있는 대리자.    |