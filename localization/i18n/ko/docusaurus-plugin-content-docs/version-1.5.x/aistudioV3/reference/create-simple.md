---
sidebar_position: 17
---

# 크로마키 비디오 생성

간단한 크로마 키 비디오를 생성합니다. 사용자는 비디오에 사용할 모델과 모델이 말하는 대본을 선택할 수 있습니다. 생성된 비디오는 다운로드할 수 있도록 내보내야 합니다. [Deepbrain AI의 AI Studio](https://app.deepbrain.io)에서 생성된 비디오를 보고 편집할 수 있습니다.

<br/>

## 1. API Endpoint

```http
http://app.deepbrain.io/api/odin/balder/template/create_simple
```

<br/>

## 2. Request Parameters

|key|desc|type|required|default|
|:---|:---|:---|:---|:---|
|model|비디오에 등장하는 AI 모델의 고유 ObjectId|String|true|-|
|text|비디오의 대본|String|true|-|

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
curl http://app.deepbrain.io/api/odin/balder/template/create_simple  \
-H "Authorization: ${API KEY}" \
-H "Content-Type: application/json" \
-X POST \
-d '{
    "model" : "M000005031",
    "text" : "This is the sample script. This text will be read by the AI Model in the video."
    }'
```

</TabItem>
<TabItem value="js" label="Node.js">

```js
import axios from "axios";
const token = ${API KEY};
const customWebhookUrl = ${webhook_delivery_address};

axios.post('http://app.deepbrain.io/api/odin/balder/template/create_simple', 
  {
    "model" : "M000005031",
    "text" : "This is the sample script. This text will be read by the AI Model in the video."
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

url = "http://app.deepbrain.io/api/odin/balder/template/create_simple"
body = {
    "model" : "M000005031",
    "text" : "This is the sample script. This text will be read by the AI Model in the video."
}
headers = {
  "Content-Type": "application/json",
  "Authorization": ${API TOKEN}
}

r = requests.post(url, data=json.dumps(body), headers=headers)
```

</TabItem>
</Tabs>