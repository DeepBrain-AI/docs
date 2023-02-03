---
sidebar_position: 3
---

# AIClipSetFactory

| Modifier and Type  | Method and Description                                       |
| ------------------ | ------------------------------------------------------------ |
| `static AIClipSet` | `CreateClip(String gesture, String speechText, String id)` 해당하는 gesture와 문장을 발화할 ClipSet을 생성한다. id는 현재 동작하지 않는다.                          |
| `static AIClipSet` | `CreateClip(String gesture, String speechText, String id, CustomVoice customVoice)` 해당하는 gesture와 문장, 음성으로 발화할 ClipSet을 생성한다. id는 현재 동작하지 않는다. |