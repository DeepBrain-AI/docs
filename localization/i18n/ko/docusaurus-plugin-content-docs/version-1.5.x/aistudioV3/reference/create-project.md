---
sidebar_position: 20
---

# 템플릿 기반 프로젝트 생성하기

템플릿 기반 프로젝트 생성하기는 기존에 존재하는 템플릿을 통해 새로운 비디오 프로젝트를 생성하는 방법을 다룹니다. (영상을 합성하지 않습니다.)

<br/>

## 1. API endpoint

```http
http://app.deepbrain.io/api/odin/v3/editor/template/${templateId}
```

<br/>

## 2. Request parameter

|key|desc|type|required|default|
|:---|:---|:---|:---|:---|
|templateId|사용할 템플릿의 고유 ObjectId|String|true|-|
|aiName|변경할 모델의 ID|String|false|-|
|clothId|변경할 모델의 복장 ID|String|false|-|

<br/>

## 3. Response parameters

|key|desc|type|
|:---|:---|:---|
|projectId|생성된 프로젝트의 ID|String|

<br/>


## 4. Sample Request

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```js
curl http://app.deepbrain.io/api/odin/v3/editor/template/${templateId}  \
-H "Authorization: ${API KEY}" \
-H "Content-Type: application/json" \
-G \
-d '{
      "model": "M000045058",
      "clothes": "BG00002320"
    }'
```

</TabItem>
<TabItem value="js" label="Node.js">

```js
import axios from "axios";
const token = ${API KEY};

axios.get('http://app.deepbrain.io/api/odin/v3/editor/template/${templateId}', 
  {
    headers: {
      'Authorization': ${token},
      'Content-Type': 'application/json'
    },
    params: {
    "model": "M000045058",
    "clothes": "BG00002320"
  }, 
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

url = "http://app.deepbrain.io/api/odin/v3/editor/template/${templateId}"
params = {
    "model": "M000045058",
    "clothes": "BG00002320"
}
headers = {
  "Content-Type": "application/json",
  "Authorization": ${API TOKEN}
}

r = requests.get(url, params, headers=headers)
```

</TabItem>
</Tabs>
