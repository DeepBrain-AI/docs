---
sidebar_position: 1
---

# AIPlayer

namespace AIHuman.Media

| Modifier and Type                    | Method / Property Description                                |
| :----------------------------------- | ------------------------------------------------------------ |
| `ctor`                               | `AIPlayer(IAIPlayerCallback callback)` 기본 AI로 AIPlayer를 생성하고 상태 모니터링을 위해 콜백을 등록합니다. (인증이 완료된 경우에만 적용됨) |
| `ctor`                               | `AIPlayer(string aiName, IAIPlayerCallback callback)` aiName에 정의된 AI 모델로 AIPlayer를 생성하고 상태 모니터링을 위해 콜백을 등록합니다. (인증이 완료된 경우에만 적용됨) |
| `AIHuman.Media.AIPlayerView`         | `GetObject()` Cutom App(응용 프로그램)의 View(Xaml)와 연결(바인딩)되는 실제 Control 개체입니다. |
| `void`                               | `Send(string[] sentences)` AI에게 발화를 시킵니다. (문자열 사용) |
| `void`                               | `Send(AIClipSet[] clips)` AI에게 발화 또는 제스처 포함 발화를 시킵니다. (AIHuman.Common.Model.AIClipSet 사용) |
| `void`                               | `StopSpeaking()` 현재 하고 있는 말을 멈추고 할말 큐에 있는 내용도 삭제합니다. |
| `void`                               | `Pause()` 하던 말이 있으면 영상과 음성을 잠시 중단합니다.                                    |
| `void`                               | `Resume()` 플레이 중이었으면 멈춘 곳에서 부터 다시 시작합니다.   |
| `void`                               | `Preload(string[] sentences)` AI에게 발화 시킬 문장을 프리로드시킵니다. |
| `void`                               | `Preload(AIClipSet[] clips)` AI에게 발화 또는 제스처 포함 발화를 프리로드시킵니다. |
| `Collection<AIGesture>`              | `GetGestures()` 제스처 콜렉션(사용가능한 제스처)을 가져옵니다. |
| `bool`                               | `SetCustomVoice(CustomVoice cv)` 원하는 음성으로 음성을 변경합니다. 성공시 true 리턴하고 null을 인자로 넘길 시 본래의 목소리로 셋팅됩니다.|
| `CustomVoice`                        | `GetCustomVoice()` 현재 설정된 음성을 확인합니다. 설정된 값이 없으면 null을 리턴합니다. |
| `bool`                        | `SetCustomVoiceForLanguage(string languageCode, string gender = null) ` 원하는 언어와 성별로 음성을 설정합니다. language에 null 또는 빈 값 입력시 AI의 기본언어로 설정되고 true를 리턴합니다. language에 유효하지 않은 값 입력시 AI의 기본 언어로 보이스가 설정되고 false를 리턴합니다. gender에 null을 입력 시 해당 AI의 성별로 검색되고, 그 중 첫번째 음성으로 설정됩니다. 성공 시 true를 리턴하고 찾지 못하면 기본 음성으로 셋팅됩니다. |
| `float`                              | `Speed { get; set; }` AI의 현재 발화 속도를 가져오거나 설정합니다.   |
| `float`                              | `Scale { get; set; }` AI의 현재 스케일을 가져오거나 설정합니다.      |
| `AIHuman.Common.Margin`              | `Margin { get; set; }` AI의 현재 여백 정보를 가져오거나 설정합니다.  |
| `double`                             | `Volume { get; set; }` AI의 현재 볼륨을 가져오거나 설정합니다.      |
| `bool`                             | `IsMute { get; set; }` AI의 음소거 여부를 가져오거나 설정합니다.      |
| `string`                             | `AIName { get; }` AI의 이름을 가져옵니다.                          |
| `string`                             | `AIGender { get; }` AI의 성별을 가져옵니다.                        |
| `string`                             | `AILanguageCode { get; }` AI가 현재 구사하는 언어 코드를 가져옵니다.         |
| `AIHuman.Interface.AIPlayerState`    | `State { get; }` AIPlayer의 현재 상태를 가져옵니다.                 |
| `string`                             | `Reconnect(Action<bool> callback)` AI와 재연결을 시도합니다. 콜백을 통해 재연결 결과를 알 수 있습니다.           |
| `void`                               | `Dispose()` AIPlayer 객체를 소멸시킬 때 호출합니다.              |