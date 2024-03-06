---
sidebar_position: 7
---

# 에러 인덱스 

`AIPlayer` 사용 중에 에러가 발생하면 코드와 그 내용을 `OnAIPlayerError(AIError)` 콜백을 통해 전달받게되고 그에 따라 적절한 처리를 해줄 수 있습니다.

`IAIPlayerCallback` 구현체를 설정했다면, 에러가 발생한 경우 `OnAIPlayerError(AIError)` 콜백 함수가 호출되게 됩니다. 이 함수의 인자인 `AIError`는 에러의 정보를 담고 있습니다. `ErrorCode` 프로퍼티는 `AIError.Code`와 비교하여 어떤 에러가 발생했는지 파악할 수 있으며 `Description` 프로퍼티를 통해 추가 설명을 확인할 수 있습니다.

예를 들어 `1402` 코드는 `Token expired`를 의미한다는 것을 알 수 있으며, 대응으로 `Authenticate` 혹은 `GenerateToekn` 함수를 호출하여 토큰을 갱신하는 등의 처리를 할 수 있습니다.

에러 전반의 내용은 **[해당 링크](https://ai-platform-prd.s3.ap-northeast-2.amazonaws.com/aihuman/docs/Deepbrain-AIHuman-Error-Code-V1.1.pdf)**를 통해 확인할 수 있습니다.
