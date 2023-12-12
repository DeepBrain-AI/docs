---
sidebar_position: 2
---

# API 키 발급하기

**AI Studio V3 API를 사용하려면 API Key가 필요합니다.**  

API 키를 생성해서 비디오 내보내기 프로세스 자동화를 경험해 보세요.

AI Studio V3 API는 Pro 이상의 구독 고객이 이용할 수 있습니다.

## 1. API endpoint

```http
https://app.deepbrain.io/api/odin/v3/auth/token
```

<br/>

## 2. Request parameter

|key|desc|type|required|default|
|:---|:---|:---|:---|:---|
|appId|Api Token 발급에 필요한 AppId. Profile에서 확인이 가능합니다.|String|true|-|
|userKey|Api Token 발급에 필요한 userKey. Profile에서 확인이 가능합니다.|String|true|-|

TODO _ 주소 변경해야함.
[AppId, UserKey 확인하기](https://app.deepbrain.io)

<br/>

## 3. Response parameters

|key|desc|type|
|:---|:---|:---|
|token|Api 호출에 사용하는 Api Access Token.|String|