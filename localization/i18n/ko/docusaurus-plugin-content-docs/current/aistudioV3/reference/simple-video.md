---
sidebar_position: 12
---

# 크로마키 내보내기

<br/>

크로마키 내보내기 섹션은 AI 모델만 포함된 크로마키 비디오를 내보내기 위해 JSON 형식으로 API 요청을 보내는 방법을 보여줍니다.

## 1. API endpoint

```http
https://app.deepbrain.io/api/odin/v3/simple/video
```

<br/>

## 2. Request parameter

|key|desc|type|required|default|
|:---|:---|:---|:---|:---|
|language|작성한 스크립트의 언어|String|true|-|
|text|모델이 발화할 스크립트. 모델의 언어와 일치해야함.|String|true|-|
|model|사용할 모델의 ID|String|true|-|
|clothes|모델의 복장 ID|String|true|-|
|ttsType|모델의 기본 음성이 아닌 외부 TTS 정보|Json|false|-|
|isExport|이 프로젝트가 내보내질지 여부|Boolean|false|false|
|[webhookUrl](../reference/webhook)|합성 결과를 보내줄 주소|String|false|-|


<br/>

## 3. Response parameters

|key|desc|type|
|:---|:---|:---|
|projectId|내보내기 요청을 한 크로마키의 프로젝트 ID|String|

<br/>


## 4. Sample Request

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl https://app.deepbrain.io/api/odin/v3/simple/video  \
-H "Authorization: ${API KEY}" \
-H "Content-Type: application/json" \
-X POST \
-d '{
      "language": "en",
      "text": "Sample Script",
      "model": "M000045058",
      "clothes": "BG00002320",
      "isExport" : true,
      "webhookUrl": ${webhook_delivery_address}
    }'
```

</TabItem>
<TabItem value="js" label="Node.js">

```js
import axios from "axios"; 
const token = ${API KEY};
const customWebhookUrl = ${webhook_delivery_address};

axios.post('https://app.deepbrain.io/api/odin/v3/simple/video', 
  {
    "language": "en",
    "text": "Sample Script",
    "model": "M000045058",
    "clothes": "BG00002320",
    "isExport" : true,
    "webhookUrl": `${customWebhookUrl}`
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

url = "https://app.deepbrain.io/api/odin/v3/simple/video"
body = {
  "language": "en",
  "text": "Sample Script",
  "model": "M000045058",
  "clothes": "BG00002320",
  "isExport" : true,
  "webhookUrl": ${webhook_delivery_address}
}
    
headers = {
  "Content-Type": "application/json",
  "Authorization": ${API TOKEN}
}

r = requests.post(url, data=json.dumps(body), headers=headers)
```

</TabItem>
</Tabs>
