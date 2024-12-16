---
sidebar_position: 7
---

# 에러 인덱스

AIPlayer 사용 중에 에러가 발생하면 코드와 그 내용을 OnAIPlayerError(AIError) 함수를 통해 전달받게되고 그에 따라 적절한 처리를 해줄 수 있다.

에러가 발생한 경우 `OnAIPlayerError(AIError)` 콜백함수가 호출된다. 이 함수의 인자인 `AIError`는 에러의 정보를 담고 있다. `AIError.ErrorCode`은 어떤 Error가 발생 하였는지를 알려주며 `ToString()` 함수는 JSON string으로 error의 자세한 내용을 알수 있다.

**전체 에러 열람은 [여기에서](https://ai-platform-prd.s3.ap-northeast-2.amazonaws.com/aihuman/docs/Deepbrain-AIHuman-Error-Code-V1.1.pdf) 확인 할 수 있습니다.**.
