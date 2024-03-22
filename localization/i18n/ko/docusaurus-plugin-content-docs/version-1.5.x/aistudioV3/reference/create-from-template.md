---
sidebar_position: 16
---

# 템플릿 기반 비디오 생성

사전 설정된 프로젝트 정보(예: 템플릿)의 제목을 수정하여 새 비디오 프로젝트를 생성합니다. 생성된 비디오는 다운로드할 수 있도록 내보내야 합니다. [Deepbrain AI의 AI Studio](https://app.deepbrain.io)에서 생성된 비디오를 보고 편집할 수 있습니다.

<br/>

## 1. API Endpoint

```http
http://app.deepbrain.io/api/odin/balder/template/modify_title
```

<br/>

## 2. Request Parameters

|key|desc|type|required|default|
|:---|:---|:---|:---|:---|
|templateId|사용할 템플릿의 고유 ObjectId|String|true|-|
|update|비디오 프로젝트 업데이트 내용|String|true|-|
|update.name|새 비디오 프로젝트의 새 제목. 이 필드가 정의되지 않은 경우 생성된 비디오는 사용된 템플릿의 이름을 따서 명명됩니다.|String|true|-|

<br/>

## 3. Response Parameters

|key|desc|type|
|:---|:---|:---|
|projectId|프로젝트 ID - 내보내기된 비디오 프로젝트 데이터를 가져옵니다.|String|

<br/>


## 4. Sample Request

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```js
curl http://app.deepbrain.io/api/odin/balder/template/modify_title  \
-H "Authorization: ${API KEY}" \
-H "Content-Type: application/json" \
-X POST \
-d '{
    "projectId":"65fa6b07dca2e367461a2925",
    "update": { 
        "title" : "This is the new title"
    }
    }'
```

</TabItem>
<TabItem value="js" label="Node.js">

```js
import axios from "axios";
const token = ${API KEY};
const customWebhookUrl = ${webhook_delivery_address};

axios.post('http://app.deepbrain.io/api/odin/balder/template/modify_title', 
  {
    "projectId":"65fa6b07dca2e367461a2925",
    "update": { 
        "title" : "This is the new title"
    }
  }, 
  {
    headers: {
      'Authorization': ${token},
      'Content-Type': 'application/json'
    }
  }
)
.then((res) => {
  console.log(res.data);
})
.catch((error) => {
  console.error(error);
})
```

</TabItem>
<TabItem value="py" label="Python">

```py
import requests
import json

url = "http://app.deepbrain.io/api/odin/balder/template/modify_title"
body = {
    "projectId":"65fa6b07dca2e367461a2925",
    "update": { 
        "title" : "This is the new title"
    }
}
headers = {
  "Content-Type": "application/json",
  "Authorization": ${API TOKEN}
}

r = requests.post(url, data=json.dumps(body), headers=headers)
```

</TabItem>
</Tabs>