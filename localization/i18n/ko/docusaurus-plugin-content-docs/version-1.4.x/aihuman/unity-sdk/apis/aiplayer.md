---
sidebar_position: 3
---

# AIHuman.View.AIPlayer

| Modifier and Type                    | Method / Property Description                                |
| :----------------------------------- | ------------------------------------------------------------ |
| `void`                               | `Init(string aiName, IAIPlayerCallback callback, IFrameImageProvider imageProvider)`  전달 받은 AI로 AIPlayer를 초기화하고 상태 모니터링을 위한 콜백과 AI 랜더링을 위한 이미지 공급자를 등록한다. (인증 완료 상태에서만 유효) |
| `void`                               | `Send(string[] sentences)` string type의 문장을 이용하여 발화한다. |
| `void`                               | `Send(AIClipSet[] clips)` AIHuman.Model.AIClipSet type을 이용하여 AI가 말이나 제스처 등을 수행하도록 한다. |
| `void`                               | `Stop()` 현재 하고 있는 말을 멈춘다. 발화 큐에 있는 내용도 삭제한다. |
| `void`                               | `Pause()` 발화 중 일때 발화를 일시정지 시킨다.                                 |
| `void`                               | `Resume()` 일시정지 시점 부터 다시 발화를 계속한다.  |
| `void`                               | `Preload(string[] sentences)` AI 에게 말할 예정인 문장들을 미리 준비시킨다. |
| `void`                               | `Preload(AIClipSet[] clips)` AIHuman.Model.AIClipSet을 이용하여 AI가 말이나 제스처 등을 미리 준비시킨다. |
| `List<AIGesture>`                    | `GetGestures()` 사용 가능한 제스처 리스트를 가져온다. |
| `bool`                               | `SetCustomVoice(CustomVoice cv)` AI의 음성을 cv로 설정한다. 성공 시 true, 실패 시 false를 return한다.|
| `CustomVoice`                        | `GetCustomVoice()` 현재 설정된 CustomVoice 객체를 가져온다. 기본 음성이면 null을 return한다. |
| `bool`                        | `SetCustomVoiceForLanguage(string languageCode, string gender) ` 원하는 언어와 성별로 음성을 설정한다. language에 null을 입력 시 사용가능한 모든 언어, gender에 null을 입력 시 모든 성별로 검색되고, 그 중 첫번째 음성으로 설정된다. 성공 시 true를 리턴하고 찾지 못하면 기본 음성으로 셋팅된다. |
| `void`                               | `Release()` AIPlayer를 해제한다.                |
| `float`                              | `Speed { get; set; }` AI의 발화 속도를 가져오거나 설정한다.       |
| `float`                              | `Scale { get; set; }` AI 크기(확대/축소)를 가져오거나 설정한다.             |
| `float`                              | `Volume { get; set; }` AI 음성 볼륨을 가져오거나 설정한다.             |
| `bool`                               | `IsMute { get; set; }` AI 음소거 상태를 가져오거나 설정한다.             |
| `AIPlayerState`                       | `State { get; }` AIPlayer의 상태를 가져온다.             |
| `string`                             | `AIName { get; }` AI 이름을 가져온다.                           |
| `string`                             | `AIGender { get; }` AI 성별을 가져온다.                        |
| `string`                             | `AILanguage { get; }` AI 언어을 가져온다.                        |
| `bool`                             | `CanPreload { get; }` AI가 프리로드 가능한 상태인지를 가져온다.                      |
| `bool`                             | `IsConnected { get; }` AI가 연결된 상태인지를 가져온다.                      |
| `void`                        | `Reconncet(Action<bool> callback)` AI 재연결을 시도한다. 콜백을 통해 재연결 결과를 리턴한다. |