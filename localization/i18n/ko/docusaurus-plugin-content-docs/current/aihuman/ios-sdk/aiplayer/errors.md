---
sidebar_position: 7
---

# 에러 인덱스

AIPlayer 사용 중에 발생하는 에러 코드와 그 내용을 callback(onAIPlayerError)으로 받을수 있고 적절한 처리를 해줄수 있다.

에러가 발생한 경우 onAIPlayerError 콜백함수가 호출된다. 이 함수의 인자인 error는 에러의 정보를 담고 있다. error.localizedDescription을 통해 에러 내용을 확인 할 수 있다.

자세한 에러를 확인하기 위해 error 객체를 NSError으로 형변환 해보면 멤버변수로 code를 가지고 있고, 이 code를 이용해서 특정 에러가 발생시 대처를 할수 있다. 예를 들어 1402코드는 Token expired를 의미할수 있으며 이때는 AIPlayer.generateToken을 호출하여 토큰을 리프레쉬한다.

전체 에러 열람은 [여기에서](https://ai-platform-prd.s3.ap-northeast-2.amazonaws.com/aihuman/docs/Deepbrain-AIHuman-Error-Code-V1.1.pdf) 확인할 수 있다.
