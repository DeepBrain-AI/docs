---
sidebar_position: 8
---

# 프로젝트 내보내기

기존 비디오 프로젝트를 내보냅니다. 내보내기된 프로젝트는 결국 다운로드할 수 있게 됩니다. 이 API 엔드포인트는 AI Studio 백엔드 서버의 백엔드 서버로 내보내기 요청을 보내기 위한 것입니다. 다운로드 URL을 조회하려면 [get project 엔드포인트](../reference/get-project.md) 또는 [get-projects 엔드포인트](../reference/get-projects.md)를 사용하세요. 비디오 내보내기는 데이터 크기(예: 장면 수)에 따라 최대 10분이 소요될 수 있습니다.

<br/>

## 1. API Endpoint

```http
https://app.aistudios.com/api/odin/v3/editor/project/export
```

<br/>

## 2. Request Parameters

|key|desc|type|required|default|
|:---|:---|:---|:---|:---|
|projectId|내보낼 비디오 프로젝트의 고유 ObjectId|String|true|-|
|[webhookUrl](../reference/webhook)|내보내기 결과를 보낼 URL 주소.|String|false|-|

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

```bash
curl https://app.aistudios.com/api/odin/v3/editor/project/export  \
-H "Authorization: ${API KEY}" \
-H "Content-Type: application/json" \
-X POST \
-d '{
    "projectId":"65fa6b07dca2e367461a2925",
  }, '
```

</TabItem>
<TabItem value="js" label="Node.js">

```js
import axios from "axios";
const token = ${API KEY};
const customWebhookUrl = ${webhook_delivery_address};

axios.post('https://app.aistudios.com/api/odin/v3/editor/project/export', 
  {
    "projectId":"65fa6b07dca2e367461a2925",
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

url = "https://app.aistudios.com/api/odin/v3/editor/project/export"
body = {
    "projectId":"65fa6b07dca2e367461a2925",
  }, 
headers = {
  "Content-Type": "application/json",
  "Authorization": ${API TOKEN}
}

r = requests.post(url, data=json.dumps(body), headers=headers)
```

</TabItem>
</Tabs>