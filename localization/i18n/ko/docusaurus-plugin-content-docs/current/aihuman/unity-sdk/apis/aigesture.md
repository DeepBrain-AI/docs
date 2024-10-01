---
sidebar_position: 6
---

# AIGesture

namespace AIHuman.Model

| Modifier and Type    | Method and Description                                       |
| -------------------- | ------------------------------------------------------------ |
| `string`             | `Name { get; }` 해당 제스처의 이름을 가져옵니다.               |
| `bool`               | `EnableSpeech { get; }` 해당 제스처의 발화 가능 유무를 가져옵니다. 발화가 가능하면 true, 불가하면 false를 반환합니다. |
| `string`             | `Alias { get; }` 해당 제스처의 별명을 가져옵니다.               |
| `AIClipSet.ClipType` | `GetClipType()` 해당 제스처를 사용할 때 권장되는 클립셋 타입을 가져옵니다.               |
