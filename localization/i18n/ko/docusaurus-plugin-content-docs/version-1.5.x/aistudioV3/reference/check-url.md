---
sidebar_position: 15
---

# 다운로드 URL 확인

<br/>

선택한 프로젝트가 다운로드할 준비가 되었는지 확인하고 다운로드 URL과 함께 상태를 조회합니다.

## 1. API Endpoint

```http
http://app.deepbrain.io/api/odin/balder/check_url/${projectId}
```

<br/>

## 2. Request Parameters

|key|desc|type|required|default|
|:---|:---|:---|:---|:---|
|projectId|비디오 프로젝트의 ID.|String|true|-|


<br/>

## 3. Response Parameters

|key|desc|type|
|:---|:---|:---|
|projectId|비디오 프로젝트의 ID.|String|
|downloadUrl|생성된 파일의 다운로드 경로. 다운로드 URL이 존재하지 않는 경우 undefined|String|
|completed|이 비디오가 다운로드할 준비가 되었는지 여부.|Bool|

<br/>

## 4. Sample Request

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl http://app.deepbrain.io/api/odin/balder/check_url/${projectId}  \
-H "Authorization: ${API KEY}" \
-H "Content-Type: application/json" \
-X GET
```

</TabItem>
<TabItem value="js" label="Node.js">

```js
import axios from "axios";
const token = ${API KEY};

axios.get('http://app.deepbrain.io/api/odin/balder/check_url/${projectId}', 
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

url = "http://app.deepbrain.io/api/odin/balder/check_url/${projectId}"
headers = {
  "Content-Type": "application/json",
  "Authorization": ${API TOKEN}
}

r = requests.get(url, data=json.dumps(body), headers=headers)
```

</TabItem>
</Tabs>