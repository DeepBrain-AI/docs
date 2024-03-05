---
sidebar_position: 7
---

# AIModelInfoManager

| Modifier and Type           | Method and Description                                       |
| --------------------------- | ------------------------------------------------------------ |
| `static void`               | `generateToken(@NonNull Context context, @NonNull String appId, @NonNull String userKey, @NonNull IAuthListener listener)`  try to authorize with the userkey. If it is successful, you can use the default ai and listener function will be called. |
| `static void`               | `generateToken(@NonNull Context context, @NonNull String userKey, @NonNull IAuthListener listener)` try to authorize with the appId and userkey. If it is successful, you can use the default ai and listener function will be called. |
| `static void`               | `getAIList(AIModelInfoManager.IAPIListener listener)`  get available ai list | 
| `static JSONArray`          | `getReceivedAIWithType(String type2Dor3D)` get the ai filtered list with type(2D or 3D). In case of 3D ai, UnityActivity should be used. |
| `static void`               | `getSampleTextList(String language, IAPIListener listener)` The sample text for the language will be delivered with listener function.  |
| `static void`               | `loadCustomVoiceList(IAPIListener listener)` Load a list of available languages and gender-specific voices. The result(success or fail) will be delivered to the listener function and after that, the getCustomVoicesWith(String language, String gender) is valid.|
| `static String[]`           | `getSpeakableLanguages(String gender)` Check the language list of the currently loaded CustomVoices. This is also effective after loadCustomVoice() or generateToken() called. |
| `static CustomVoice[]`      | `getCustomVoicesWith(String language, String gender)` Among the loaded voices, a list of voices corresponding to an input value and a voice corresponding to gender is obtained. If you type null in language, you will get values corresponding to all languages, and if you type null in gender, you will get values corresponding to all genders. Valid after loadCustomVoice() or generateToken() method call. |
| `static CustomVoice`        | `findCustomVoice(String customVoiceId)` Search the CustomVoice with id. return null if not found. |
| `static AIModelInfo`        | `getDefaultAIModelInfo()` get default ai info. Valid after generateToken() method call. |
