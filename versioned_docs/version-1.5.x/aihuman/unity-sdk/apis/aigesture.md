---
sidebar_position: 6
---

# AIGesture

namespace AIHuman.Model

| Modifier and Type    | Method and Description                                       |
| -------------------- | ------------------------------------------------------------ |
| `string`             | `Name { get; }` Get the name of the gesture.               |
| `bool`               | `EnableSpeech { get; }` Get whether the gesture is speech-enabled. Returns true if gesture with speech is possible. |
| `string`             | `Alias { get; }` Get the alias of the gesture.               |
| `AIClipSet.ClipType` | `GetClipType()` Get the recommended clip type when using the gesture.               |
