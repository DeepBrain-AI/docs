---
sidebar_position: 10
---

# Create project from template
Creating a project from a template covers how to create a new video project using an existing template. (It does not involve video composition.)
<br/>

## 1. API endpoint
```http
https://app.aistudios.cn/api/odin/v3/editor/template/${templateId}
```
<br/>

## 2. Request parameters
|key|desc|type|required|default|
|:---|:---|:---|:---|:---|
|templateId|Unique ObjectId of the template to be used|String|true|-|
|aiName|ID of the model to be changed|String|false|-|
|clothId|Clothing ID of the model to be changed|String|false|-|
|name|Name of the created project|String|false|-|
<br/>

## 3. Response parameters
|key|desc|type|
|:---|:---|:---|
|projectId|ID of the created project|String|
<br/>

## 4. Sample Request
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl https://app.aistudios.cn/api/odin/v3/editor/template/${templateId} \
-H "Authorization: ${API KEY}" \
-H "Content-Type: application/json" \
-G \
-d '{ 
  "model": "M000045058", 
  "clothes": "BG00002320",
  "name" : "New project name" 
  }'
```

</TabItem>
<TabItem value="js" label="Node.js">

```js
import axios from "axios";

const token = ${API KEY};

axios.get('https://app.aistudios.cn/api/odin/v3/editor/template/${templateId}', {
  headers: {
    'Authorization': ${token},
    'Content-Type': 'application/json'
  },
  params: {
    "model": "M000045058", 
    "clothes": "BG00002320",
    "name" : "New project name" 
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

url = "https://app.aistudios.cn/api/odin/v3/editor/template/${templateId}"

params = {
    "model": "M000045058", 
    "clothes": "BG00002320",
    "name" : "New project name" 
}

headers = {
    "Content-Type": "application/json",
    "Authorization": ${API TOKEN}
}

r = requests.get(url, params, headers=headers)
```

</TabItem>
</Tabs>
