# 프로젝트 진행률 확인하기

프로젝트 진행률 확인하기는 프로젝트 내보내기 작업 이후 생성된 프로젝트 아이디를 통해 합성 진행률을 확인하는 방법을 다룹니다.

<br/>

## 1. API endpoint

```http
https://app.aistudios.com/api/odin/v3/editor/progress/${key}
```

<br/>

## 2. Response parameters

|key|desc|type|
|:---|:---|:---|
|progress|합성 진행률|Float|
|downloadUrl|합성완료된 비디오의 다운로드 URL|String|

<br/>


## 3. Sample Request

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl https://app.aistudios.com/api/odin/v3/editor/progress/${project key}  \
-H "Authorization: ${API KEY}" \
-H "Content-Type: application/json" \
-X GET
```

</TabItem>
<TabItem value="js" label="Node.js">

```js
import axios from "axios"; 
const token = ${API KEY};

axios.get(`https://app.aistudios.com/api/odin/v3/editor/progress/${project key}`, 
  {
    headers: {
      'Authorization': `${token}`,
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

url = "https://app.aistudios.com/api/odin/v3/editor/progress/${project key}"

headers = {
  "Content-Type": "application/json",
  "Authorization": ${API TOKEN}
}

r = requests.get(url, headers=headers)
```

</TabItem>
</Tabs>
