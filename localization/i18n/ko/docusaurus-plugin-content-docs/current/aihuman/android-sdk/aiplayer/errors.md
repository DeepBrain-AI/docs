---
sidebar_position: 7
---

#  에러 인덱스

AIPlayer 사용 중에 발생하는 에러 코드와 그 내용을 callback(onAIPlayerError)으로 받을수 있고 적절한 처리를 해줄수 있다. 

에러가 발생한 경우 onAIPlayerError(AIError) 콜백함수가 호출된다. 이 함수의 인자인 AIError는 에러의 정보를 담고 있다. AIError.code는 어떤 Error가 발생하였는지를 알려주며 AIError.exInfo는 String으로 error의 자세한 내용을 알수 있다. 

예를 들어 1402코드는 Token expired를 의미하며 이때는 AIModelInfoManager.generateToken()을 호출하여 토큰을 리프레쉬한다. 

Check the full error view [here](https://ai-platform-prd.s3.ap-northeast-2.amazonaws.com/aihuman/docs/Deepbrain-AIHuman-Error-Code-V1.1.pdf).
