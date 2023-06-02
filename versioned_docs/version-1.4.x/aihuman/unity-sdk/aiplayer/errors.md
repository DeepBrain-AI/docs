---
sidebar_position: 7
---

# Error Index 

You can receive the error code and its details as a callback(OnAIPlayerError) and take appropriate action.

When an error occurs, the `OnAIPlayerError(AIError)` callback function is called. `AIError`, the argument of this function, contains information about the error. `AIError.ErrorCode` tells what kind of error has occurred, and you can find out the details of the error as JSON String through the `ToString()` function.

**Check the full error types [here](https://ai-platform-prd.s3.ap-northeast-2.amazonaws.com/aihuman/docs/Deepbrain-AIHuman-Error-Code-V1.1.pdf)**.
