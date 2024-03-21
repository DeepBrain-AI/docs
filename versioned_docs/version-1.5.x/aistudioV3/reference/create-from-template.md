---
sidebar_position: 16
---

# Template-based export by changing title

Create a new video project by modifying title of a pre-setted project information (i.e. templates). The created video must be exported to be available for download. You can see & edit created video at [AI Studio by Deepbrain AI](https://app.deepbrain.io).

<br/>

## 1. API endpoint

```http
http://app.deepbrain.io/api/odin/balder/template/modify_title
```

<br/>

## 2. Request parameter

|key|desc|type|required|default|
|:---|:---|:---|:---|:---|
|templateId|Unique ObjectId of the template to be used|String|true|-|
|update|Video project update contents|String|true|-|
|update.name|New title of the new video project. If this field is not defined, the created video is named after the template used.|String|true|-|

<br/>

## 3. Response parameters

|key|desc|type|
|:---|:---|:---|
|projectId|Project Id - Fetching the video project data that has been exported.|String|

<br/>


## 4. Sample Request

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```js
curl http://app.deepbrain.io/api/odin/balder/template/modify_title  \
-H "Authorization: ${API KEY}" \
-H "Content-Type: application/json" \
-X POST \
-d '{
    "projectId":"65fa6b07dca2e367461a2925",
    "update": { 
        "title" : "This is the new title"
    }
    }'
```

</TabItem>
<TabItem value="js" label="Node.js">

```js
import axios from "axios";
const token = ${API KEY};
const customWebhookUrl = ${webhook_delivery_address};

axios.post('http://app.deepbrain.io/api/odin/balder/template/modify_title', 
  {
    "projectId":"65fa6b07dca2e367461a2925",
    "update": { 
        "title" : "This is the new title"
    }
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

url = "http://app.deepbrain.io/api/odin/balder/template/modify_title"
body = {
    "projectId":"65fa6b07dca2e367461a2925",
    "update": { 
        "title" : "This is the new title"
    }
}
headers = {
  "Content-Type": "application/json",
  "Authorization": ${API TOKEN}
}

r = requests.post(url, data=json.dumps(body), headers=headers)
```

</TabItem>
</Tabs>
