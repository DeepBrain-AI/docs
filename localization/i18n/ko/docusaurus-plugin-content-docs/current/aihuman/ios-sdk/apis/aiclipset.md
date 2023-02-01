---
sidebar_position: 5
---

# AIClipSet

### functions

| Name                     | Description                           |
| ------------------------ | ------------------------------------- |
| `static func clipset(text: gesture:, customVoice:)` | 'text': a speech sentence,<br/>'gesture': gesture<br/> 'customVoice': voice model<br/> Create ClipSet with speech sentences and gestures as factors. |


### properties

| Name     | Description     |
| -------- | --------------- |
| `var speechText`   | `String? { getter }` read only<br/> AI's speech sentence                  |
| `var gesture`   | `String? { getter }` read only<br/> AI's gesture              |
| `var customVoice`   | `CustomVoice? { getter }` read only<br/> AI's voice              |

### AIClipSetType

Indicates the form of AI speech and gesture.

| Name     | Description     |
| -------- | --------------- |
| `CLIP_SPEECH`   | No gestures and only plain speaking    |
| `CLIP_GESTURE`   | Gesture only          |
| `CLIP_SPEECH_GESTURE`   | Speaking with gestures          |
| `CLIP_ERROR`   | Error due to invalid request          |

