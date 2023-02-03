---
sidebar_position: 2
---

# AI3DPlayer

| Modifier and Type        | Method and Description                                       |
| ------------------------ | ------------------------------------------------------------ |
| `java.lang.String`       | `getAIName()`현재 설정된 ai의 이름 확인   |
| `float`                  | `getScale()`현재 설정된 ai의 스케일 확인  |
| `float`                  | `getSpeed()` 현재 설정된 ai의 말하기 속도 확인   |
| `IAIPlayer.AIPlayerType` | `getType()`현재 설정된 ai의 종류 확인.  |
| `void`                   | `init(AIPlayerSettings config, IAIPlayerCallback callback)` 원하는 ai 및 콜백을 셋업한다.    |
| `void`                   | `pause()`하던 말이 있으면 영상과 음성을 잠시 중단한다.  |
| `void`                   | `preload(java.lang.String requests)`ai에게 할말을 프리로드시킨다.  |
| `void`                   | `preload(java.lang.String[] request)`ai에게 할말을 프리로드시킨다.  |
| `void`                   | `preload(AIClipSet request)`ai에게 발화 또는 제스처 포함 발화를 프리로드시킨다.  |
| `void`                   | `preload(AIClipSet[] requests)`ai에게 발화 또는 제스처 포함 발화를 프리로드시킨다. |
| `void`                   | `release()`리소스 해제. onDestroy 등에서 호출되어야 한다.  |
| `void`                   | `resume()`플레이 중이었으면 멈춘곳에서부터 다시 시작한다.  |
| `void`                   | `send(java.lang.String request)`ai에게 말을 시킨다. |
| `void`                   | `send(java.lang.String[] requests)`ai에게 말을 시킨다.  |
| `void`                   | `send(AIClipSet requests)` ai에게 발화 또는 제스처 포함 발화를 시킨다. |
| `void`                   | `send(AIClipSet[] requests)`ai에게 발화 또는 제스처 포함 발화를 시킨다.  |
| `void`                   | `setScale(float scale)`ai의 크기 변경                                         |
| `void`                   | `setSpeed(float speed)`ai 말하기 속도 변경                                     |
| `void`                   | `setTopMargin(int topMargin)` ai의 상단으로부터 마진 설정 |
| `void`                   | `stopSpeaking()`현재 하고 있는 말을 멈추고 할말 큐에 있는 내용도 삭제한다.  |
| `AIGesture[]`            | `getGestures()` 제스처 콜렉션(사용가능한 제스처)을 가져온다.  |
| `boolean`                | `setCustomVoice(CustomVoice customVoice)` 원하는 음성으로 음성을 변경한다. 성공시 true 리턴하고 null 인풋시 본래의 목소리로 셋팅된다.  |
| `boolean`                | `setCustomVoiceForLanguage(String language, String gender)` 원하는 언어와 성별로 음성을 설정한다. language에 null 또는 빈 값 입력시 AI의 기본언어로 설정되고 true를 리턴한다. language에 유효하지 않은 값 입력시 AI의 기본 언어로 보이스가 설정되고 false를 리턴한다. gender에 null을 입력 시 해당 AI의 성별로 검색되고, 그 중 첫번째 음성으로 설정된다. 성공 시 true를 리턴하고 찾지 못하면 기본 음성으로 셋팅된다.  |
| `CustomVoice`            | `getCustomVoice()` 현재 설정된 음성확인한다. 설정된 값이 없으면 null을 리턴한다.  |
| `String`                 | `getLanguageCode()` 현재 설정된 음성의 언어 (en 또는 en-US 포맷)를 리턴한다. AI가 설정되지 않았으면 null을 리턴한다.    |
| `String`                 | `getGender()` 현재 설정된 AI의 성별을 가져온다. MALE, FEMALE, UNI 값을 가질수 있으며 AI가 설정되지 않았으면 null을 리턴한다.   |
| `AIPlayerState`                 | `getState()` AIPlayer의 현재 상태 확인  |
| `boolean`                 | `isConnected()` 현재 AI가 연결된 상태인지 확인  |
| `boolean`                 | `canPreload()` 프리로드 가능한지 확인. false 리턴. (현재 지원하지 않음)  |
| `boolean`                 | `reconnect(IAIReconnectCallback reconnectCallback)` AI가 연결되지 않았을때 재연결 시도. 연결이 이미 되어있거나 연결시도 할수 없는 상황인 경우 false 리턴.|
