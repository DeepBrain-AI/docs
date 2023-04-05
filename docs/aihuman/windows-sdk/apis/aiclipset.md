---
sidebar_position: 4
---

# AIClipSet

namespace AIHuman.Common.Model

| Modifier and Type | Method and Description                                       |
| ----------------- | ------------------------------------------------------------ |
| `enum`            | `ClipType` Clipset types are as follows.<br />- CLIP_SPEECH: Clip only for speech without gestures <br />- CLIP_GESTURE: Gesture only Clip<br />- CLIP_SPEECH_GESTURE: Clip for speech with gestures |
| `ClipType`           | `Type { get; }` Get the clip type set in the AIClipSet.               |
| `string`             | `SpeechText { get; }` Get the sentence set in the AIClipSet.               |
| `string`             | `GestureName { get; }` Get the gesture name set in the AIClipSet.               |
| `string`             | `ClipId { get; }` Get the ID set in the AIClipSet.               |
