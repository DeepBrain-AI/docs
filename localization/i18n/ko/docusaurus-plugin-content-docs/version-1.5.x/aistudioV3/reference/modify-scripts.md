---
sidebar_position: 19
---

# 기존 프로젝트의 대본 수정

기존 프로젝트의 대본을 수정합니다. 새로운 대본 내용은 배열로 제공됩니다. 배열의 각 요소는 비디오 프로젝트 내의 각 장면의 대본을 대체합니다. 제공된 배열의 길이가 총 장면 수보다 큰 경우, 장면은 첫 번째 장면부터 수정된 대본으로 복제되어 비디오 프로젝트에 연결됩니다. [Deepbrain AI의 AI Studio](https://app.deepbrain.io)에서 수정된 비디오를 보고 편집할 수 있습니다.

<br/>

## 1. API Endpoint

```http
http://app.deepbrain.io/api/odin/balder/project/modify_scripts
```

<br/>

## 2. Request Parameters

|key|desc|type|required|default|
|:---|:---|:---|:---|:---|
|projectId|비디오 프로젝트의 고유 ObjectId|String|true|-|
|update|비디오 프로젝트 업데이트 내용|String|true|-|
|update.values|새로운 대본이 포함된 배열|Array(String)|true|-|

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
curl http://app.deepbrain.io/api/odin/balder/project/modify_scripts  \
-H "Authorization: ${API KEY}" \
-H "Content-Type: application/json" \
-X POST \
-d '{
    "projectId":"65fa6b07dca2e367461a2925",
    "update": { 
        "values": [
            "This is the sample modified script for scene one",
            "This is the sample modified script for scene two",
            "This is the sample modified script for scene three"
        ]
    }
    }'
```

</TabItem>
<TabItem value="js" label="Node.js">

```js
import axios from "axios";
const token = ${API KEY};
const customWebhookUrl = ${webhook_delivery_address};

axios.post('http://app.deepbrain.io/api/odin/balder/project/modify_scripts', 
  {
    "projectId":"65fa6b07dca2e367461a2925",
    "update": { 
        "values": [
            "This is the sample modified script for scene one",
            "This is the sample modified script for scene two",
            "This is the sample modified script for scene three"
        ]
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

url = "http://app.deepbrain.io/api/odin/balder/project/modify_scripts"
body = {
    "projectId":"65fa6b07dca2e367461a2925",
    "update": { 
        "values": [
            "This is the sample modified script for scene one",
            "This is the sample modified script for scene two",
            "This is the sample modified script for scene three"
        ]
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