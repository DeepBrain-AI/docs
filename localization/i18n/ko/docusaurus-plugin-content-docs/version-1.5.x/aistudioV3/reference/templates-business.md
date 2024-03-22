---
sidebar_position: 14
---

# 비즈니스 템플릿 조회

비즈니스 목적으로 비디오를 생성하는 데 사용할 수 있는 사전 설정된 프로젝트 정보(예: 템플릿) 목록을 조회합니다.

<br/>

## 1. API Endpoint

```http
http://app.deepbrain.io/api/odin/balder/dropdown/templates_business
```

<br/>

## 2. Response Parameters

|key|desc|type|
|:---|:---|:---|
|id|AI 모델의 고유 ObjectId|String|
|name|템플릿의 이름|String|

<br/>


## 3. Sample Request

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```js
curl http://app.deepbrain.io/api/odin/balder/dropdown/templates_business \
-H "Authorization: ${API KEY}" \
-H "Content-Type: application/json" \
-X GET 
```

</TabItem>
<TabItem value="js" label="Node.js">

```js
import axios from "axios";
const token = ${API KEY};
const customWebhookUrl = ${webhook_delivery_address};

axios.get('http://app.deepbrain.io/api/odin/balder/dropdown/templates_business', 
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

url = "http://app.deepbrain.io/api/odin/balder/dropdown/templates_business"

headers = {
  "Content-Type": "application/json",
  "Authorization": ${API TOKEN}
}

r = requests.get(url, data=json.dumps(body), headers=headers)
```

</TabItem>
</Tabs>