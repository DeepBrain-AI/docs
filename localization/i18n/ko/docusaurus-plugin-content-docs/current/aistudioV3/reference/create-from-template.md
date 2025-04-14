---
sidebar_position: 10
---

# 템플릿에서 프로젝트 생성
템플릿에서 프로젝트를 생성하는 것은 기존 템플릿을 사용하여 새로운 비디오 프로젝트를 생성하는 방법을 다룹니다. (비디오 합성은 포함하지 않습니다.)
<br/>

## 1. API endpoint
```http
https://app.aistudios.com/api/odin/v3/editor/template/${templateId}
```
<br/>

## 2. Request parameters
|key|desc|type|required|default|
|:---|:---|:---|:---|:---|
|templateId|사용할 템플릿의 고유 ObjectId|String|true|-|
|aiName|변경할 모델의 ID|String|false|-|
|clothId|변경할 모델의 복장 ID|String|false|-|
|name|생성된 프로젝트의 이름|String|false|-|
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

```bash
curl https://app.aistudios.com/api/odin/v3/editor/template/${templateId} \
-H "Authorization: ${API KEY}" \
-H "Content-Type: application/json" \
-X POST \
-G \
-d '{
  "model": "M000045058",
  "clothes": "BG00002320",
  "name" : "새 프로젝트 이름"
}'
```

</TabItem>
<TabItem value="js" label="Node.js">

```js
import axios from "axios";
const token = ${API KEY};

axios.post('https://app.aistudios.com/api/odin/v3/editor/template/${templateId}', {
  headers: {
    'Authorization': ${token},
    'Content-Type': 'application/json'
  },
  params: {
    "model": "M000045058",
    "clothes": "BG00002320",
    "name" : "새 프로젝트 이름"
  },
})
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

url = "https://app.aistudios.com/api/odin/v3/editor/template/${templateId}"
params = {
  "model": "M000045058",
  "clothes": "BG00002320",
  "name" : "새 프로젝트 이름"
}
headers = {
  "Content-Type": "application/json",
  "Authorization": ${API TOKEN}
}

r = requests.post(url, params, headers=headers)
```

</TabItem>
</Tabs>
```