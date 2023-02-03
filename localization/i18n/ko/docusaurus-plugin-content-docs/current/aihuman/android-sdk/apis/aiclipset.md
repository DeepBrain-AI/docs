---
sidebar_position: 4
---

# AIClipSet

| Modifier and Type | Method and Description                                       |
| ----------------- | ------------------------------------------------------------ |
| `enum`            | `ClipType` 아래와 같은 Clip의 Type을 나타낸다.<br />- CLIP_SPEECH: 제스처가 없는 일반 발화만 가능한 Clip <br />- CLIP_GESTURE: 제스처만 가능한 Clip<br />- CLIP_SPEECH_GESTURE: 제스처가 포함된 발화가 가능한 Clip |
| `String`          | `getSpeechText()` 발화할 문장을 가져온다.                                |
| `ClipType`        | `getClipType()` 설정된 ClipType을 가져온다. |
| `String`          | `getGesture()` 설정된 제스처 이름을 가져온다.  |
| `String`          | `getKey()` 해당 클립셋의 키값을 가져온다.  |
| `CustomVoice`     | `getCustomVoice()` 설정된 음성을 가져온다. |
| `void`            | `setCustomVoice(CustomVoice cv)` 특정 음성을 설정한다. |
| `static String`   | `createKey(String gesture, String speechText)` 해당 제스처와 발화문장으로 키를 만든다. |
