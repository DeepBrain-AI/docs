---
sidebar_position: 15
---

# 모델 조회

비디오 프로젝트에 등장할 수 있는 유효한 AI 모델 목록을 조회합니다.

<br/>

## 1. API Endpoint

```http
https://app.aistudios.com/api/odin/v3/dropdown/models
```

<br/>

## 2. Response Parameters

|key|desc|type|
|:---|:---|:---|
|id|AI 모델의 고유 식별자|String|
|label|AI 모델의 사용자 친화적 레이블|String|

<br/>


## 3. Sample Request

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl https://app.aistudios.com/api/odin/v3/dropdown/models  \
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

axios.get('https://app.aistudios.com/api/odin/v3/dropdown/models', 
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

url = "https://app.aistudios.com/api/odin/v3/dropdown/models"

headers = {
  "Content-Type": "application/json",
  "Authorization": ${API TOKEN}
}

r = requests.get(url, data=json.dumps(body), headers=headers)
```

</TabItem>
</Tabs>