---
sidebar_position: 7
---

# Error Index 

Error codes and contents that occur while using AIPlayer can be received as callback (on AIPlayerError), and appropriate processing can be performed.

If an error occurs, the onAIPlayerError callback function is called. The 'error' object of this function contains information about the error.
You can check the contents of the error through error.localizedDescription.

In order to check the detailed error, if the error object is converted into NSError, it has a code as a member variable, and it can be used to cope with a specific error. For example, 1402 code can mean Token expired, which calls AIPlayer.generateToken to refresh the token.

The full error reading can be found [here](https://ai-platform-prd.s3.ap-northeast-2.amazonaws.com/aihuman/docs/Deepbrain-AIHuman-Error-Code-V1.1.pdf).
