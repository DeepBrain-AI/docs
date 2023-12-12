---
sidebar_position: 2
---

# Generate API Key

**You need an API Key to use the AI Studios V3 API.**

Get your API Key now and automate your video export process.

The AI Studios V3 API is available for customers on the Enterprise Plan and above.

## 1. API endpoint

```http
https://app.deepbrain.io/api/odin/v3/auth/token
```

<br/>

## 2. Request parameter

|key|desc|type|required|default|
|:---|:---|:---|:---|:---|
|appId|AppId required to issue Api Token. You can check it in the profile.|String|true|-|
|userKey|UserKey required to issue Api Token. You can check it in the profile.|String|true|-|

TODO _ 주소 변경해야함.
[Check AppId, UserKey](https://app.deepbrain.io)

<br/>

## 3. Response parameters

|key|desc|type|
|:---|:---|:---|
|token|The Api Access Token used for Api calls.|String|