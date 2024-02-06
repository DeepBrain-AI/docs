---
sidebar_position: 4
---

# Get Project

Get Project describes how to load a pre-existing project by sending api requests in a JSON format.

<br/>

## 1. API endpoint

```http
https://app.deepbrain.io/api/odin/v3/editor/project/${key}
```

<br/>

## 2. Response parameters

|key|desc|type|
|:---|:---|:---|
|project|Project data|Json|
|project._id|Project ID|String|
|project.name|Project name|String|
|project.orientation|Project orientation|String|
|project.scenes|Scene data|Array(json)|
|project.userId|Project owner ID|String|
|project.templateId|Template ID|String|
|project.state|Project status|String|
|project.thumbnailUrl|Project thumbnail URL|String|
|project.baseInfoId|Project version management ID|String|
|project.dictionary|User additional speech learning data|Json|
|project.backendTaskId|Project Task ID used by server|String|
|project.exportType|Project export type|String|
|project.progress|Project export progress|Int|
|project.creditSubstracted|Credit deducted|Boolean|
|project.createdAt|Project creation date|Date|
|project.updatedAt|Project renewal date|Date|
|project.download_url|Project download URL|String|

<br/>

## 3. Sample Request

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl https://app.deepbrain.io/api/odin/v3/editor/project/${project key}  \
-H "Authorization: ${API KEY}" \
-H "Content-Type: application/json" \
-X GET
```

</TabItem>
<TabItem value="js" label="Node.js">

```js
import axios from "axios"; 
const token = ${API KEY};

axios.get(`https://app.deepbrain.io/api/odin/v3/editor/project/${project key}`, 
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

url = "https://app.deepbrain.io/api/odin/v3/editor/project/${project key}"

headers = {
  "Content-Type": "application/json",
  "Authorization": ${API TOKEN}
}

r = requests.get(url, headers=headers)
```

</TabItem>
</Tabs>
