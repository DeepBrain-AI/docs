---
sidebar_position: 7
---

# Error Index 

You can receive the error code and its details as a callback(onAIPlayerErrorV2) and take appropriate action.

When an error occurs, the `onAIPlayerErrorV2(aiError)` callback function is called. `aiError`, the argument of this function, contains information about the error. `aiError.code` tells what kind of error has occurred, and you can find out the details of the error as string through the `aiError.message`.

By using this callback, you can take action when a specific error occurs. For example, `code 1402` may mean Token expired, and in this case, call `generateToken()` to refresh the token.

**Check the full error types [here](https://ai-platform-prd.s3.ap-northeast-2.amazonaws.com/aihuman/docs/Deepbrain-AIHuman-Error-Code-V1.1.pdf)**.
