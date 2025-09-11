# 프로젝트 삭제
[프로젝트 목록 조회](/aistudioV3/reference/get-projects)를 통해 확인한 프로젝트 ID를 입력하시면, 해당 프로젝트를 안전하게 삭제하실 수 있습니다.
<br/>

## 1. API Endpoint

```http
https://app.aistudios.com/api/odin/v3/editor/project
```

<br/>

## 2. Request Parameters

 | key | desc | type | required | default | 
 | :--- | :--- | :--- | :--- | :--- | 
 | ids | 삭제할 비디오 프로젝트의 고유 식별자 배열 | Object | true | - | 

<br/>

## 3. Response Parameters
 | key | desc | type | 
 | :--- | :--- | :--- | 
 | deletedCount | 삭제 카운트 | Int  | 

<br/>


## 4. Sample Request

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl https://app.aistudios.com/api/odin/v3/editor/project  \
-H "Authorization: ${API KEY}" \
-H "Content-Type: application/json" \
-X DELETE 
-d '{
    "ids": [
        "${projectId}"
    ]
}'
```

</TabItem>
<TabItem value="js" label="Node.js">

```js
import axios from "axios";
const token = ${API KEY};
const customWebhookUrl = ${webhook_delivery_address};

axios.delete('https://app.aistudios.com/api/odin/v3/editor/project', 
  {
    "ids" : [
        "${projectId}"
    ]
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

url = "https://app.aistudios.com/api/odin/v3/editor/project"
body =   {
  "ids" : [
    "${projectId}"
  ]
}
headers = {
  "Content-Type": "application/json",
  "Authorization": ${API TOKEN}
}

r = requests.delete(url, data=json.dumps(body), headers=headers)
```

</TabItem>
</Tabs>