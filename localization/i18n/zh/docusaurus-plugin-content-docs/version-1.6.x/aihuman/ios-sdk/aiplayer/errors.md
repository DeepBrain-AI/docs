---
sidebar_position: 7
---

# Error Index 

Error codes and contents that occur while using AIPlayer can be received as callback (onAIPlayerError), and appropriate processing can be performed.

If an error occurs, the onAIPlayerError callback function is called. The 'error' object of this function contains information about the error.
You can check the contents of the error through error.localizedDescription.

In order to check the detailed error, if the error object is converted into NSError,it contains a code as a member variable, which can be used to handle specific errors. For example, error code 1402 indicates that the token has expired, and the AIPlayer.generateToken method can be called to refresh the token.

The full error reading can be found [here](https://ai-platform-prd.s3.ap-northeast-2.amazonaws.com/aihuman/docs/Deepbrain-AIHuman-Error-Code-V1.1.pdf).
