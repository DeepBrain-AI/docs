---
sidebar_position: 7
---

# AIError

namespace AIHuman.Common

| Modifier and Type    | Method and Description                                       |
| -------------------- | ------------------------------------------------------------ |
| `int`             | `ErrorCode { get; }` error's code. This can vary from AIError.Code.UNKNOWN_ERR ~ AIError.Code.RESERVED_ERR               |
| `string`               | `Description { get; }` error's Description |
| `string` | `ToString()` Returns a string in the form "ErrorCode: Description".              |
