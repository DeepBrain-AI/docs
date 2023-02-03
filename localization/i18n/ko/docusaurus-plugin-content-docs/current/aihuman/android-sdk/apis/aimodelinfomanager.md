---
sidebar_position: 7
---

# AIModelInfoManager

| Modifier and Type           | Method and Description                                       |
| --------------------------- | ------------------------------------------------------------ |
| `static void`               | `generateToken(@NonNull Context context, @NonNull String appId, @NonNull String userKey, @NonNull IAuthListener listener)`  발급받은 userKey로 인증을 시도한다. 콜백으로 응답이 오며 성공하면 기본 AI 모델 정보가 셋팅된다. |
| `static void`               | `generateToken(@NonNull Context context, @NonNull String userKey, @NonNull IAuthListener listener)` 설정한 userKey로 인증을 시도한다. appId는 context의 packagename으로 셋팅된다. 콜백으로 응답이 오며 성공하면 기본 AI 모델 정보가 셋팅된다. |
| `static void`               | `getAIList(AIModelInfoManager.IAPIListener listener)` SDK 인증 성공한 상태에서  사용가능한 ai 리스트를 콜백을 통해준다.  |
| `static JSONArray`          | `getReceivedAIWithType(String type2Dor3D)` getAIList()로 받은 ai 리스트 중에 2D 또는 3D타입으로 리스트를 가져온다. 3D의 경우 UnityActivity 클래스를 통해서 사용가능하다. |
| `static void`               | `getSampleTextList(String language, IAPIListener listener)` 해당 언어의 샘플 문장을 불러와서 콜백으로 전달한다.  |
| `static void`               | `loadCustomVoiceList(IAPIListener listener)` 사용 가능한 언어와 성별에 해당하는 음성의 리스트를 로드한다. listener의 콜백으로 성공과 실패가 전달되고 이 메소드의 응답 이후 getCustomVoicesWith(String language, String gender) 메소드가 유효하다.                            |
| `static String[]`           | `getSpeakableLanguages(String gender)` 현재 로드된 음성의 언어 리스트를 확인한다. loadCustomVoice() 또는 generateToken() 메소드 호출 이후에 유효하다. |
| `static CustomVoice[]`      | `getCustomVoicesWith(String language, String gender)` 로드된 음성중에 입력값에 해당하는 언어와 성별에 해당하는 음성의 리스트를 가져온다. language에 null을 입력하면 모든 언어, gender에 null을 입력하면 모든 성별에 해당하는 값을 가저온다. loadCustomVoice() 또는 generateToken() 메소드 호출 이후에 유효하다. |
| `static CustomVoice`        | `findCustomVoice(String customVoiceId)` 음성의 id로 CustomVoice를 검색한다. 없으면 null 리턴 |
| `static AIModelInfo`        | `getDefaultAIModelInfo()` generateToken()이후 기본으로 사용할 AI의 정보를 가져온다. |
