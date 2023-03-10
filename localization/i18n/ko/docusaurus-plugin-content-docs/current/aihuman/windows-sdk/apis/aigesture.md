---
sidebar_position: 5
---

# AIHuman.Common.Model.AIGesture

| Modifier and Type    | Method and Description                                       |
| -------------------- | ------------------------------------------------------------ |
| `string`             | `Name { get; }` 해당 제스처의 이름을 가져옵니다.              |
| `bool`               | `EnableSpeech { get; }` 해당 제스처의 발화 가능 유무를 가져옵니다. 발화가 가능하면 true, 불가한 제스처라면 false를 return 합니다. |
| `AIClipSet.ClipType` | `GetClipType()` 해당 제스처를 사용할 때 권장되는 클립셋 타입을 가져옵니다.            |
