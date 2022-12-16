---
sidebar_position: 5
---

# AIHuman.Common.Model.AIGesture

| Modifier and Type    | Method and Description                                       |
| -------------------- | ------------------------------------------------------------ |
| `string`             | `Name { get; }` Get the name of the gesture.               |
| `bool`               | `EnableSpeech { get; }` Get whether the gesture is speech-enabled. Returns true if gesture with speech is possible. |
| `AIClipSet.ClipType` | `GetClipType()` Get the recommended clip type when using the gesture.               |
