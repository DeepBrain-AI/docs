---
sidebar_position: 1
---

# AIPlayer

[상세 내용](../../../aihuman/windows-sdk/aiplayer/setup#4단계-aiplayer를-원하는-ai로-초기화하기)

## IAIPlayer

- assembly: AIHuman.SDK.Core  
- namespace: AIHuman.Interface  

## AIPlayer

- assembly: AIHuman.SDK.WPF  
- namespace: AIHuman.Media  

| Modifier and Type                    | Method / Property Description                                |
| :----------------------------------- | ------------------------------------------------------------ |
| `ctor`                               | `AIPlayer(IAIPlayerCallback callback)` 기본 AI로 AIPlayer를 생성하고 상태 모니터링을 위해 콜백을 등록합니다. (인증 성공 이후 정상 동작합니다.) |
| `ctor`                               | `AIPlayer(IAIPlayerOptions options, IAIPlayerCallback callback)` options를 기반으로 AIPlayer를 생성하고 AI를 로딩합니다. 상태 모니터링을 위해 콜백을 등록합니다. (인증 성공 이후 정상 동작합니다.)  |
| `object`(`AIPlayerView`)             | `GetObject()` View(Xaml)와 연결(바인딩)되는 실제 UserControl 객체입니다. |
| `void`                               | `Send(string[] sentences)` AI에게 발화를 시킵니다. (문자열 사용) |
| `void`                               | `Send(AIClipSet[] clips)` AI에게 발화 또는 제스처 포함 발화를 시킵니다. (AIHuman.Common.Model.AIClipSet 사용) |
| `void`                               | `StopSpeaking(bool forced = false)` 현재 하고 있는 말을 멈추고 대기 큐에 있는 내용도 삭제합니다. forced를 true(비권장)로 전달하면 AI는 즉각 대기(IDLE) 상태로 돌아갑니다. 발화 완료 콜백을 전달하지 않습니다. |
| `void`                               | `Pause()` 발화 중 일시 정지합니다. (렌더링 멈춤)               |
| `void`                               | `Resume()` 일시 정지 상태에서 다시 재계합니다. (Pause 상태에서만 가능)  |
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
| `bool`                               | `IsMute { get; set; }` AI의 음소거 여부를 가져오거나 설정합니다.      |
| `string`                             | `AIName { get; }` AI의 이름을 가져옵니다.                          |
| `string`                             | `AIGender { get; }` AI의 성별을 가져옵니다.                        |
| `string`                             | `AILanguageCode { get; }` AI가 현재 구사하는 언어 코드를 가져옵니다.         |
| `AIHuman.Interface.AIPlayerState`    | `State { get; }` AIPlayer의 현재 상태를 가져옵니다.                 |
| `bool`                               | `IsConnected { get; }` AI와의 네트워크 연결 여부를 가져옵니다.        |
| `void`                             | `Reconnect(int attempts = 5, int delay = 3000, Action<bool> callback = null)` AI와의 네트워크 연결을 (재)시도합니다. attempts는 재시도 횟수, delay는 지연시간(밀리초), callback을 선택적 파라미터를 활용하여 호출할 수 있습니다.    |
| `void`                             | `Disconnect(Action<bool> callback = null)` AI와의 네트워크 연결을 끊습니다. callback을 선택적 파라미터를 활용하여 호출할 수 있습니다.      |
| `void`                               | `Dispose()` AIPlayer 객체를 소멸시킬 때 호출합니다.              |

<br/>

## AIPlayerOptions

- assembly: AIHuman.SDK.Core  
- namespace: AIHuman.Common  

| Modifier and Type                    | Method / Property Description                                |
| :----------------------------------- | ------------------------------------------------------------ |
| `ctor`                               | `AIPlayerOptions(string aiName = null, float aiScale = 1.0f, float aiSpeed = 1.0f, Margin aiMargin = null, bool aiDisconnect = false, AIPlayerCachingStrategy aiCaching = AIPlayerCachingStrategy.V1)` AIPlayer 객체 생성(초기화) 시에 사용할 AIPlayerOptions 객체를 생성합니다. |
| `string`                             | `AIName { get; set; }` 초기화하려는 AI의 식별값을 가져오거나 설정합니다. 식별값은 AIList.AI.aiName에서 획득합니다. |
| `float`                              | `AIScale { get; set; }` 초기화하려는 AI의 스케일을 가져오거나 설정합니다. |
| `AIHuman.Common.Margin`              | `AIMargin { get; set; }` 초기화하려는 AI의 여백을 가져오거나 설정합니다. |
| `float`                              | `AISpeed { get; set; }` 초기화하려는 AI의 속도를 가져오거나 설정합니다. |
| `bool`                               | `AIDisconnection { get; set; }` true로 전달하면 AI와 네트워크 연결이 끊어진 상태로 초기화 됩니다. |
| `AIHuman.Interface.AIPlayerCachingStrategy` | `AICachingStrategy { get; set; }` 초기화하려는 로컬 캐싱 전략을 가져오거나 설정합니다. |
| `int`                              | `CacheLimit { get; set; }` 초기화하려는 최대 로컬 캐싱 수를 가져오거나 설정합니다. |

<br/>

------------------

<br/>

(온프레미스 고객용)
## ServerConfiguration

- assembly: AIHuman.SDK.Core  
- namespace: AIHuman.Common  

`AIAPI`의 `SetConfig` 함수 사용 시 매개변수로 활용됩니다.

`ServerConfiguration` 객체 생성 시 혹은 `SetValue(key, value)` 함수를 이용하여 변경하고자 하는 서버 주소를 전달하여 서버 구성을 설정할 수 있습니다.

내부에는 해당 설정에 필요한 키 `string` 멤버들이 정의 되어있습니다.

:::info

`KEY_AUTH_SERVER_ADDR`: 인증 서버 주소  
`KEY_MID_SERVER_ADDR`: 중계 서버 주소  
`KEY_RESOURCE_SERVER_ADDR`: 리소스 서버 주소  
`KEY_BACKEND_SERVER_ADDR`: 백엔드 서버 주소  

:::

일반적인 클라우드 서비스 형태로 이용하는 고객의 경우 해당 내용을 인지할 필요는 없습니다.

## 오프라인 모드 지원

(CES 2024에서 활용된 기능)

[로컬 캐싱](../../../aihuman/windows-sdk/aiplayer/basic-features#로컬-캐싱) 기능을 활용하여 네트워크 통신 없이도 운영이 가능한 SDK 구동 모드를 지원합니다.

<br/>

[문의하기](https://www.aistudios.com/company/contact)
