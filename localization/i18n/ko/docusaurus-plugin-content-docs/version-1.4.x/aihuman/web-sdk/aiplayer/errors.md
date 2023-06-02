---
sidebar_position: 7
---

# 에러 인덱스

오류 코드와 해당 세부 정보를 콜백(onAIPlayerErrorV2)으로 받을 수 있으며, 이때 적절한 작업을 수행합니다.

오류가 발생하면 onAIPlayerErrorV2(aiError) 콜백 함수가 호출됩니다. 이 함수의 인수인 aiError는 오류에 대한 정보를 포함하고 있습니다. aiError.code는 어떤 종류의 오류가 발생했는지 알려주며, aiError.message를 통해 오류의 세부사항을 string으로 알 수 있습니다.

이 콜백을 사용하면 특정 오류가 발생할 때 조치를 취할 수 있습니다. 예를 들어, 코드 1402는 토큰이 만료되었음을 의미할 수 있으며, 이 경우 `generateToken()`를 호출하여 토큰을 새로 고침 합니다.

**전체 에러 타입은 [여기 링크](https://ai-platform-prd.s3.ap-northeast-2.amazonaws.com/aihuman/docs/Deepbrain-AIHuman-Error-Code-V1.1.pdf)**에서 확인할 수 있습니다.
