---
sidebar_position: 1
---

# AIPlayer

| Modifier and Type        | Method and Description|
| ------------------------ | ------------------------ |
| `java.lang.String`       | `getAIName()`현재 설정된 AI의 이름을 확인합니다.   |
| `float`                  | `getScale()`현재 설정된 AI의 스케일을 확인합니다.  |
| `float`                  | `getSpeed()` 현재 설정된 AI의 발화 속도를 확인합니다.   |
| `IAIPlayer.AIPlayerType` | `getType()`현재 설정된 AI의 종류를 확인합니다.  |
| `void`                   | `init(AIPlayerSettings config, IAIPlayerCallback callback)` 원하는 AI 및 콜백을 셋업합니다.    |
| `void`                   | `pause()`하던 말이 있으면 영상과 음성을 잠시 중단합니다.  |
| `void`                   | `preload(java.lang.String requests)`AI에게 할말을 프리로드 시킵니다.  |
| `void`                   | `preload(java.lang.String[] request)`AI에게 할말을 프리로드 시킵니다.  |
| `void`                   | `preload(AIClipSet request)`AI에게 발화 또는 제스처 포함 발화를 프리로드시킵니다.  |
| `void`                   | `preload(AIClipSet[] requests)`AI에게 발화 또는 제스처 포함 발화를 프리로드시킵니다. |
| `void`                   | `release()`리소스 해제. onDestroy 등에서 호출되어야 합니다.  |
| `void`                   | `resume()`플레이 중이었으면 멈춘 곳에서 부터 다시 시작합니다.  |
| `void`                   | `send(java.lang.String request)`AI에게 말을 시킵니다. |
| `void`                   | `send(java.lang.String[] requests)`AI에게 말을 시킵니다.  |
| `void`                   | `send(AIClipSet requests)` AI에게 발화 또는 제스처 포함 발화를 시킵니다. |
| `void`                   | `send(AIClipSet[] requests)`AI에게 발화 또는 제스처 포함 발화를 시킵니다.  |
| `void`                   | `setScale(float scale)`AI의 크기를 변경합니다. |
| `void`                   | `setSpeed(float speed)`AI 말하기 속도를 변경합니다. |
| `void`                   | `setTopMargin(int topMargin)` AI의 상단으로부터 마진값을 설정합니다. |
| `void`                   | `stopSpeaking()`현재 하고 있는 말을 멈추고 할말 큐에 있는 내용도 삭제합니다.  |
| `AIGesture[]`            | `getGestures()` 제스처 콜렉션(사용가능한 제스처)을 가져옵니다.  |
| `boolean`                | `setCustomVoice(CustomVoice customVoice)` 원하는 음성으로 음성을 변경합니다. 성공시 true 리턴하고 null 인풋시 본래의 목소리로 셋팅됩니다.  |
| `boolean`                | `setCustomVoiceForLanguage(String language, String gender)` 원하는 언어와 성별로 음성을 설정합니다. language에 null 또는 빈 값 입력시 AI의 기본언어로 설정되고 true를 리턴합니다. language에 유효하지 않은 값 입력시 AI의 기본 언어로 보이스가 설정되고 false를 리턴합니다. gender에 null을 입력 시 해당 AI의 성별로 검색되고, 그 중 첫번째 음성으로 설정됩니다. 성공 시 true를 리턴하고 찾지 못하면 기본 음성으로 셋팅됩니다.  |
| `CustomVoice`            | `getCustomVoice()` 현재 설정된 음성을 확인합니다. 설정된 값이 없으면 null을 리턴합니다.  |
| `String`                 | `getLanguageCode()` 현재 설정된 음성의 언어 (en 또는 en-US 포맷)를 리턴합니다. AI가 설정되지 않았으면 null을 리턴합니다.    |
| `String`                 | `getGender()` 현재 설정된 AI의 성별을 가져옵니다. MALE, FEMALE, UNI 값을 가질수 있으며 AI가 설정되지 않았으면 null을 리턴합니다.   |
| `AIPlayerState`          | `getState()` AIPlayer의 현재 상태값을 리턴합니다.  |
| `void`                    | `setVolume(float volume)` 볼륨 조절. 0 ~ 1 범위 |
| `float`                   | `getVolume()` 현재 설정된 볼륨 확인. |
| `boolean`                | `isConnected()` 현재 AI가 연결된 상태인지 확인합니다.  |
| `boolean`                | `canPreload()` 프리로드 가능한지 확인합니다. false 리턴. (현재 지원하지 않음)  |
| `boolean`                | `reconnect(IAIReconnectCallback reconnectCallback)` AI가 연결되지 않았을때 재연결을 시도합니다. 연결이 이미 되어있거나 연결시도 할 수 없는 상황인 경우 false 리턴합니다.|
