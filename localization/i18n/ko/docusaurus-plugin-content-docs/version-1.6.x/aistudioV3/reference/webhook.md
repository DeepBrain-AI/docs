# Webhook

Webhook은 내보내기 요청한 파일의 진행도와 요청완료시 차감된 크레딧 및 다운로드 주소를 전달합니다.

## 1. Response parameters

|key|desc|type|
|:---|:---|:---|
|progress|프로젝트의 합성 진행률|Int|
|credit|사용한 크레딧의 양 (progress가 100일 경우 노출)|Int|
|backendTaskId|프로젝트 내보내기 작업 ID|String|
|download_url|합성된 프로젝트 다운로드 URL (progress가 100일 경우 노출)|String|

