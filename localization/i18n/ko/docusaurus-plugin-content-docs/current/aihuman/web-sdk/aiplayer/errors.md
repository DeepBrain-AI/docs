---
sidebar_position: 7
---

# 에러 인덱스

You can receive the error code and its details as a callback(onAIPlayerError) and take appropriate action.

When an error occurs, the `onAIPlayerError(json)` callback function is called. `json`, the argument of this function, contains information about the error. `json.errorCode` tells what kind of error has occurred, and you can find out the details of the error as JSON String through the `json.error`.

By using this message, you can take action when a specific error occurs. For example, `code 1402` may mean Token expired, and in this case, call `generateToken()` to refresh the token.

**Check the full error types [here](https://ai-platform-prd.s3.ap-northeast-2.amazonaws.com/aihuman/docs/Deepbrain-AIHuman-Error-Code-V1.1.pdf)**.
