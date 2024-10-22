---
sidebar_position: 6
---

# 프로젝트 목록 조회

이미 내보내기된 현재 계정과 연결된 비디오 프로젝트 목록을 조회합니다. 목록의 비디오 프로젝트는 다운로드할 준비가 되어 있습니다.

<br/>

## 1. API Endpoint

```http
http://app.aistudios.com/api/odin/v3/editor/projects
```

<br/>

## 2. Response Parameters
|key|desc|type|
|:---|:---|:---|
|id|비디오 프로젝트의 고유 식별자|String|
|name|프로젝트의 이름|String|
|state|프로젝트의 내보내기 상태. 다운로드 준비가 되려면 이 필드는 "exported"여야 함|String|
|download_url|생성된 파일의 다운로드 경로.|String|

<br/>


## 3. Sample Request

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl http://app.aistudios.com/api/odin/v3/editor/project  \
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

axios.get('http://app.aistudios.com/api/odin/v3/editor/project', 
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

url = "http://app.aistudios.com/api/odin/v3/editor/project"

headers = {
  "Content-Type": "application/json",
  "Authorization": ${API TOKEN}
}

r = requests.get(url, data=json.dumps(body), headers=headers)
```

</TabItem>
</Tabs>