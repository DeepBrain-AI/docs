---
sidebar_position: 7
---

# Error Index 

You can receive the error code and its details as a callback(OnAIPlayerError) and take appropriate action.

If an error occurs, the `OnAIPlayerError(AIError)` callback function is called from the IAIPlayerCallback implementation. The `AIError`, a parameter of this function, contains information about the error. The `ErrorCode` property can identify the type of error compared to the `AIError.Code` and can identify additional explanations through the `Description` property. For the `sender` member considering the extension, currently delivering the identification value (AIName) of the model where the error occurred.

:::info
AIError.Code
- `UNKNOWN_ERR` : Unknown error other than SDK
- `AI_API_ERR` : API error provided by SDK
- `AI_SERVER_ERR` : Error received from server
- `AI_RES_ERR` : Error in downloading and loading resources
- `AI_INIT_ERR` : Error during initialization
- `INVALID_AICLIPSET_ERR` : Error in invalid clip set
- `AICLIPSET_PRELOAD_ERR` : Preload related error
- `AICLIPSET_PLAY_ERR` : Utterance (action) related error
- `RESERVED_ERR` : (Currently Not Used)

:::

Take error handling, for example, when the error code is `1402`, it means Token Expired, and in response, you can call the `Authenticate` or `GenerateToekn` function to update the token.

You can find the overall contents of the errors in **[this link](https://ai-platform-prd.s3.ap-northeast-2.amazonaws.com/aihuman/docs/Deepbrain-AIHuman-Error-Code-V1.1.pdf)**.
