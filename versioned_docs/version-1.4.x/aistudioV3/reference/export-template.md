---
sidebar_position: 5
---

# Template-based Export

Template-based Export utlilizes preseted project informations(i.e tamplates) and modifying only some parts of it (scripts, images, etc.) to synthesize new video.

<br/>

## 1. API endpoint

```http
https://app.deepbrain.io/api/odin/v3/editor/project/${key}
```

<br/>

## 2. Request parameter

|key|desc|type|required|default|
|:---|:---|:---|:---|:---|
|updates|Content to change in the existing template.|Json|true|-|
|updates.backgroundAudio|Project Background Audio information.|Json|false|-|
|updates.value|Changes by clip in the project.|Array(json)|true|-|
|updates.value[].sceneIdx|The index of the scene to be changed|Int|true|-|
|updates.value[].type|Type of clip to change|String enum<br/>(aiModel, shape, image, textImage, videoImage, audio, background)|true|-|
|updates.value[].values|Content to change.|Json|true|-|
|[webhookUrl](../reference/webhook)|Url address where the synthesis result should be sent.|String|false|-|

<br/>

## 3. Response parameters

|key|desc|type|
|:---|:---|:---|
|projectId|Project Id - Fetching the Chromakey video data that has been exported.|String|


<br/>


## 4. Sample Request

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl https://app.deepbrain.io/api/odin/v3/editor/project/${project key}  \
-H "Authorization: ${API KEY}" \
-H "Content-Type: application/json" \
-X POST \
-d '{
      "updates": [
        {
          "sceneIdx": 0,
          "type": "aiModel",
          "values": {
            "script": "changed script"
          }
        },
        {
          "sceneIdx": 1,
          "type": "textImage",
          "values": {
            "text": "change text",
            "fontSize": 100
          }
        }
      ],
      "webhookUrl": ${webhook_delivery_address}
    }'
```

</TabItem>
<TabItem value="js" label="Node.js">

```js
import axios from "axios"; 
const token = ${API KEY};
const customWebhookUrl = ${webhook_delivery_address};

axios.post(`https://app.deepbrain.io/api/odin/v3/editor/project/${project key}`, 
  {
    "updates": [
      {
        "sceneIdx": 0,
        "type": "aiModel",
        "values": {
          "script": "changed script"
        }
      },
      {
        "sceneIdx": 1,
        "type": "textImage",
        "values": {
          "text": "change text",
          "fontSize": 100
        }
      }
    ],
    "webhookUrl": `${ClientWebhookUrl}`
  },
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
body = {
  "updates": [
    {
      "sceneIdx": 0,
      "type": "aiModel",
      "values": {
        "script": "changed script"
      }
    },
    {
      "sceneIdx": 1,
      "type": "textImage",
      "values": {
        "text": "change text",
        "fontSize": 100
      }
    }
  ],
  "webhookUrl": ${webhook_delivery_address}
}
headers = {
  "Content-Type": "application/json",
  "Authorization": ${API TOKEN}
}

r = requests.post(url, data=json.dumps(body), headers=headers)
```

</TabItem>
</Tabs>
