---
sidebar_position: 5
---

# AIHuman.Model.AIGesture

| Modifier and Type    | Method and Description                                       |
| -------------------- | ------------------------------------------------------------ |
| `string`             | `Name { get; }` 해당 제스처의 이름을 가져온다.               |
| `bool`               | `EnableSpeech { get; }` 해당 제스처의 발화 가능 유무를 가져온다. 발화가 가능하면 true, 불가하면 false를 return 한다. |
| `AIClipSet.ClipType` | `GetClipType()` 해당 제스처를 사용할 때 권장되는 클립셋 타입을 가져온다.               |
