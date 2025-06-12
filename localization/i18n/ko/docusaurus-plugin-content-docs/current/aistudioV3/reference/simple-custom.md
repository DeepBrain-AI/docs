# 커스텀아바타 내보내기

<br/>

커스텀 아바타 내보내기 기능은 사용자가 생성한 커스텀 아바타를 이용해 영상을 제작할 수 있도록, JSON 형식의 API 요청을 통해 비디오를 출력하는 과정을 설명합니다.

## 1. API endpoint

```http
https://app.aistudios.com/api/odin/v3/simple/custom
```

<br/>

## 2. Request parameter

| key | desc | type | required | default |
| :--- | :--- | :--- | :--- | :--- |
| language | 작성한 스크립트의 언어 | String | true | - |
| text | 모델이 발화할 스크립트 | String | true | - |
| model | 사용할 커스텀아바타 모델의 ID | String | true | - |
| isExport | 이 프로젝트 내보내질지 여부. false 인경우는 [프로젝트](https://app.aistudios.com/dashboard)에 노출 | Boolean | false | true |
| workspaceId | [작업공간](./workspaces) 고유식별자 ID | String | false | - |
| [webhookUrl](../reference/webhook) | 합성 결과를 보내줄 주소 | String | false | - |


<br/>

## 3. Response parameters

| key | desc | type |
| :--- | :--- | :--- |
| projectId | 내보내기 요청을 한 크로마키의 프로젝트 ID | String |
| taskId | 내보내기 요청을 한 태스크ID | String |

<br/>


## 4. Sample Request

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl https://app.aistudios.com/api/odin/v3/simple/custom  \
-H "Authorization: ${API KEY}" \
-H "Content-Type: application/json" \
-X POST \
-d '{
      "language": "en",
      "text": "Sample Script",
      "model": "67da28f034b05ae2e4385a2b",
      "webhookUrl": ${webhook_delivery_address}
    }'
```

</TabItem>
<TabItem value="js" label="Node.js">

```js
import axios from "axios"; 
const token = ${API KEY};
const customWebhookUrl = ${webhook_delivery_address};

axios.post('https://app.aistudios.com/api/odin/v3/simple/custom', 
  {
    "language": "en",
    "text": "Sample Script",
    "model": "67da28f034b05ae2e4385a2b",
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

url = "https://app.aistudios.com/api/odin/v3/simple/custom"
body = {
  "language": "en",
  "text": "Sample Script",
  "model": "67da28f034b05ae2e4385a2b",
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
