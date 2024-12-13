---
sidebar_position: 7
---

# Error Index

You can check error types from the AIError and its details through the callback(onAIPlayerError) and take appropriate action.

If an error occurs, the onAIPlayerError(AIError) callback function is called. AIError, the argument of this function, contains information about the error. AIError.code tells what type of error occurred, and AIError.exInfo is a String that has the details of the error.

For example, the code 1402 may indicate that the token has expired. In this case, the token is refreshed by calling AIModelInfoManager.generateToken().

Check the full list of error codes [here](https://ai-platform-prd.s3.ap-northeast-2.amazonaws.com/aihuman/docs/Deepbrain-AIHuman-Error-Code-V1.1.pdf).
