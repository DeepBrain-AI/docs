---
sidebar_position: 21
---

# Modify titles of existing project

Modify the title of each scene within an existing project. The new title contents are provided as an array. Each element in the array replaces the title clip of each scene one after the other within the video project. If the length of the provided array is larger than the total number of title clips in the existing video, the scenes are be duplicated starting from the first one with modified titles and concatenated to the video project. You can see & edit modified video at [AI Studio by Deepbrain AI](https://app.deepbrain.io).

<br/>

## 1. API endpoint

```http
http://app.deepbrain.io/api/odin/balder/project/modify_titles
```

<br/>

## 2. Request parameters

|key|desc|type|required|default|
|:---|:---|:---|:---|:---|
|projectId|Unique ObjectId of the video project|String|true|-|
|update|Video project update contents|String|true|-|
|update.values|Array containing new titles|Array(String)|true|-|

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
curl http://app.deepbrain.io/api/odin/balder/project/modify_titles  \
-H "Authorization: ${API KEY}" \
-H "Content-Type: application/json" \
-X POST \
-d '{
    "projectId":"65fa6b07dca2e367461a2925",
    "update": { 
        "values": [
            "This is the first modified title sample",
            "This is the second modified title sample",
            "This is the third modified title sample"
        ]
    }
    }'
```

</TabItem>
<TabItem value="js" label="Node.js">

```js
import axios from "axios";
const token = ${API KEY};
const customWebhookUrl = ${webhook_delivery_address};

axios.post('http://app.deepbrain.io/api/odin/balder/project/modify_titles', 
  {
    "projectId":"65fa6b07dca2e367461a2925",
    "update": { 
        "values": [
            "This is the first modified title sample",
            "This is the second modified title sample",
            "This is the third modified title sample"
        ]
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

url = "http://app.deepbrain.io/api/odin/balder/project/modify_titles"
body = {
    "projectId":"65fa6b07dca2e367461a2925",
    "update": { 
        "values": [
            "This is the first modified title sample",
            "This is the second modified title sample",
            "This is the third modified title sample"
        ]
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
