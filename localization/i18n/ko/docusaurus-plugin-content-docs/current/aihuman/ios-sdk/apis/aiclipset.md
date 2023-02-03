---
sidebar_position: 5
---

# AIClipSet

### functions

| Name                     | Description                                         |
| ------------------------ | ------------------------------------------------------------ |
| `static func clipset(text:, gesture:, customVoice:)`            | 'text': 발화 문장, <br/> 'gesture': 제스처 <br/> 'customVoice': 음성 <br/> 발화 문장과 제스처를 인자로 ClipSet을 생성 한다.     |


### properties

| Name     | Description     |
| -------- | --------------- |
| `var speechText`           | `String? { getter }` 읽기 전용<br/> AI 발화 문장                               |
| `var gesture`          | `String? { getter }` 읽기 전용<br/> AI 제스처                                    |
| `var customVoice`          | `CustomVoice? { getter }` 읽기 전용<br/> AI 음성                                    |

### AIClipSetType

Indicates the form of AI speech and gesture.

| Name     | Description     |
| -------- | --------------- |
| `CLIP_SPEECH`   | 발화를 위한 클립셋 |
| `CLIP_GESTURE`   | 제스처를 위한 클립셋 |
| `CLIP_SPEECH_GESTURE`   | 제스처가 포함된 발화를 위한 클립셋 |
| `CLIP_ERROR`   | 유효하지 않은 정보로 인한 클립셋 에러 |

