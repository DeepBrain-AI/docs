---
sidebar_position: 7
---

# 에러 인덱스 

`AIPlayer` 객체 생성 시 전달한 콜백 구현체를 통해, 런타임 중에 발생한 에러를 코드 및 그 내용과 함께 `OnAIPlayerError(AIError)` 콜백 함수를 통해 전달받게되고 그에 따라 적절한 처리를 해줄 수 있습니다.

`IAIPlayerCallback` 구현체를 올바르게 설정했다면, 에러가 발생한 경우 `OnAIPlayerError(AIError)` 콜백 함수가 호출되게 됩니다. 이 함수의 인자인 `AIError`는 에러의 정보를 담고 있습니다. `ErrorCode` 프로퍼티는 `AIError.Code`와 비교하여 어떤 에러가 발생했는지 파악할 수 있으며 `Description` 프로퍼티를 통해 추가 설명을 확인할 수 있습니다. 확장성을 고려한 `sender` 멤버의 경우, 현재는 기본적으로는 에러가 야기된 모델의 식별값(AIName)을 함께 전달하고 있습니다.

:::info
AIError.Code
- `UNKNOWN_ERR` : SDK 외의 알 수 없는 오류
- `AI_API_ERR` : SDK에서 제공하는 API 오류
- `AI_SERVER_ERR` : 서버로 부터 전달 받는 오류
- `AI_RES_ERR` : 리소스 다운로드 및 로딩 관련 오류
- `AI_INIT_ERR` : 초기화 시 발생하는 오류
- `INVALID_AICLIPSET_ERR` : 잘못된 클립셋임을 나타내는 오류
- `AICLIPSET_PRELOAD_ERR` : 프리로드 관련 오류
- `AICLIPSET_PLAY_ERR` : 발화 관련 오류
- `RESERVED_ERR` : (현재 미사용)

:::

대응책을 예로 들면, `1402` 코드는 토큰 만료(Token Expired)를 의미한다는 것을 알 수 있으며, 대응으로 `Authenticate` 혹은 `GenerateToekn` 함수를 호출하여 토큰을 갱신하는 등의 처리를 할 수 있습니다.

에러 전반의 내용은 **[해당 링크](https://ai-platform-prd.s3.ap-northeast-2.amazonaws.com/aihuman/docs/Deepbrain-AIHuman-Error-Code-V1.1.pdf)**를 통해 확인할 수 있습니다.
