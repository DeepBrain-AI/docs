---
sidebar_position: 7
---

# Error Index 

You can check error types from the AIError and its details through the callback(onAIPlayerError) and take appropriate action.

If an error occurs, the onAIPlayerError(AIError) callback function is called. AIError, the argument of this function, contains information about the error. AIError.errorType tells what type of error occurred, and AIError.exInfo is a JSON String that has the details of the error.

If you change the string to JSON to check the error description, you will see an errorCode in JSON, and you can deal with a specific error using this code. For example, code 1402 may mean Token expired. In this case, the token is refreshed by calling AuthManager.init().

Check the full error view [here](https://ai-platform-prd.s3.ap-northeast-2.amazonaws.com/aihuman/docs/Deepbrain-AIHuman-Error-Code-V1.1.pdf).
