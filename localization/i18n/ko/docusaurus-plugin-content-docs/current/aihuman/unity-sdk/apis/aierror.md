---
sidebar_position: 7
---

# AIError

namespace AIHuman.Common

| Modifier and Type    | Method and Description                                       |
| -------------------- | ------------------------------------------------------------ |
| `int`             | `ErrorCode { get; }` 에러 코드. 범위 값으로 AIError.Code.UNKNOWN_ERR ~ AIError.Code.RESERVED_ERR 값을 갖습니다.               |
| `string`               | `Description { get; }` 에러 설명. |
| `string` | `ToString()` "ErrorCode: Description" 형식의 문자열을 반환합니다.              |
