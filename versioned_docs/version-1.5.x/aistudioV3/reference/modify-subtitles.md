---
sidebar_position: 15
---

# Modify subtitles of existing project

Modify the subtitles of an existing project. The new subtitles contents are provided as an array. Each element in the array replaces the subtitle clips of each scene one after the other within the video project. If the length of the provided array is larger than the total number of subtitle clips, the scenes are be duplicated starting from the first one with modified subtitles and concatenated to the video project. The modified project is exported promptly.

<br/>

## 1. API endpoint

```http
http://app.deepbrain.io/api/odin/balder/project/modify_subtitles
```

<br/>

## 2. Request parameters

|key|desc|type|required|default|
|:---|:---|:---|:---|:---|
|projectId|Unique ObjectId of the video project|String|true|-|
|update|Video project update contents|String|true|-|
|update.values|Array containing new subtitles|Array(String)|true|-|
|[webhookUrl](../reference/webhook)|Url address where the synthesis result should be sent.|String|false|-|

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
curl http://app.deepbrain.io/api/odin/balder/project/modify_subtitles  \
-H "Authorization: ${API KEY}" \
-H "Content-Type: application/json" \
-X POST \
-d '{
    "projectId":"65fa6b07dca2e367461a2925",
    "update": { 
        "values": [
            "This is the first modified subtitle sample",
            "This is the second modified subtitle sample",
            "This is the third modified subtitle sample"
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

axios.post('http://app.deepbrain.io/api/odin/balder/project/modify_subtitles', 
  {
    "projectId":"65fa6b07dca2e367461a2925",
    "update": { 
        "values": [
            "This is the first modified subtitle sample",
            "This is the second modified subtitle sample",
            "This is the third modified subtitle sample"
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

url = "http://app.deepbrain.io/api/odin/balder/project/modify_subtitles"
body = {
    "projectId":"65fa6b07dca2e367461a2925",
    "update": { 
        "values": [
            "This is the first modified subtitle sample",
            "This is the second modified subtitle sample",
            "This is the third modified subtitle sample"
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
