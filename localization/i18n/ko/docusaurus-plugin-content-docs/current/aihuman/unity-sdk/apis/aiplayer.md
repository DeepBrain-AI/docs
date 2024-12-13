---
sidebar_position: 3
---

# AIPlayer

namespace AIHuman.View

| Modifier and Type                    | Method / Property Description                                |
| :----------------------------------- | ------------------------------------------------------------ |
| `void`                               | `Init(string aiName, IAIPlayerCallback callback, IFrameImageProvider imageProvider)`  전달 받은 AI로 AIPlayer를 초기화하고 상태 모니터링을 위한 콜백과 AI 랜더링을 위한 이미지 공급자를 등록합니다. (인증 완료 상태에서만 유효) |
| `void`                               | `Send(string[] requests)` string type의 문장을 이용하여 발화합니다. |
| `void`                               | `Send(AIClipSet[] requests)` AIHuman.Model.AIClipSet type을 이용하여 AI가 말이나 제스처 등을 수행하도록 합니다. |
| `void`                               | `StopSpeaking(bool forced = false)` 현재 하고 있는 말을 멈추고 발화 큐에 있는 내용도 삭제합니다. forced가 true 일 경우 플레이중인 제스처도 중단합니다. |
| `void`                               | `Pause()` 발화 중 일때 발화를 일시정지 시킵니다.                                 |
| `void`                               | `Resume()` 일시정지 시점 부터 다시 발화를 계속합니다.  |
| `void`                               | `Preload(string[] requests)` 말할 예정인 문장들을 미리 로드합니다. |
| `void`                               | `Preload(AIClipSet[] requests)` AIHuman.Model.AIClipSet을 이용하여 말할 예정인 문장들을 미리 로드합니다. |
| `List<AIGesture>`                    | `GetGestures()` 사용 가능한 제스처 리스트를 가져옵니다. |
| `bool`                               | `SetCustomVoice(CustomVoice cv)` AI의 음성을 cv로 설정한다. 성공 시 true, 실패 시 false를 반환합니다.|
| `CustomVoice`                        | `GetCustomVoice()` 현재 설정된 CustomVoice 객체를 가져옵니다. 기본 음성이면 null을 반환합니다. |
| `bool`                        | `SetCustomVoiceForLanguage(string languageCode, string gender) ` 원하는 언어와 성별로 음성을 설정합니다. language에 null을 입력 시 사용가능한 모든 언어, gender에 null을 입력 시 모든 성별로 검색되고, 그 중 첫번째 음성으로 설정됩니다. 성공 시 true를 리턴하고 찾지 못하면 기본 음성으로 설정됩니다. |
| `void`                               | `Dispose()` AIPlayer를 해제합니다.                |
| `bool`                               | `AutoReconnect { get; set; }` 자동으로 AI 재연결 시도 할 것인지 설정합니다.     |
| `float`                              | `Speed { get; set; }` AI의 발화 속도를 가져오거나 설정합니다.       |
| `float`                              | `Scale { get; set; }` AI 크기(확대/축소)를 가져오거나 설정합니다.             |
| `float`                              | `Volume { get; set; }` AI 음성 볼륨을 가져오거나 설정합니다.             |
| `bool`                               | `IsMute { get; set; }` AI 음소거 상태를 가져오거나 설정합니다.             |
| `AIPlayerState`                       | `State { get; }` AIPlayer의 상태를 가져옵니다.             |
| `string`                             | `AIName { get; }` AI 이름을 가져옵니다.                           |
| `string`                             | `AIGender { get; }` AI 성별을 가져옵니다.                        |
| `string`                             | `AILanguage { get; }` AI 기본 언어를 가져옵니다.                        |
| `bool`                             | `CanPreload { get; }` AI가 프리로드 가능한 상태인지를 가져옵니다.                      |
| `bool`                             | `IsConnected { get; }` AI가 연결된 상태인지를 가져옵니다.                      |
| `void`                        | `Reconnect(int attempts = 5, int delay = 3000, Action<bool> callback = null)` 시도 횟수와 지연시간(millisecond)을 전달인자로 받아서 AI 재연결을 시도합니다. 콜백을 통해 재연결 결과를 전달합니다. |
| `void`                        | `Disconnect(Action<bool> callback = null)` AI 연결을 해제합니다. 콜백을 통해 연결 해제 결과를 전달합니다. |