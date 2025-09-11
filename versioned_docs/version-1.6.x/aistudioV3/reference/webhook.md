# Webhook

Webhook delivers the progress of the generation requests for export, download links and also credits that get deducted at the completion of the request.

## 1. Response parameters

|key|desc|type|
|:---|:---|:---|
|progress|Progress|Int|
|credit|Amount of credit used (exposed if progress is 100)|Int|
|backendTaskId|Project Task ID used by server|String|
|download_url|Synthetic project download URL (exposed if progress is 100)|String|

