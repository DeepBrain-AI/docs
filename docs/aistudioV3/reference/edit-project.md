# Edit project and export

Editing and exporting a project involves fetching the existing project information and modifying only certain data (such as scripts, images, etc.) to synthesize a new video.

<br/>

## 1. API endpoint

```http
https://app.aistudios.com/api/odin/v3/editor/project/${key}
```

<br/>

## 2. Request parameter

|key|desc|type|required|default|
|:---|:---|:---|:---|:---|
|updates|Content to change in the existing template.|Json|true|-|
|updates.value|Changes by clip in the project.|Array(json)|true|-|
|updates.value[].sceneIdx|The index of the scene to be changed|Int|true|-|
|updates.value[].type|Type of clip to change|String enum<br/>(aiModel, shape, image, textImage, videoImage, audio, background)|true|-|
|updates.value[].values|Content to change.|Json|true|-|
|isExport|Whether this project will be exported. Expose to the [project](https://app.aistudios.com/dashboard) if false|Boolean|false|true|
|[webhookUrl](../reference/webhook)|Url address where the synthesis result should be sent.|String|false|-|

<br/>

## 3. Response parameters

|key|desc|type|
|:---|:---|:---|
|projectId|ID of the requested project for synthesis|String|


<br/>


## 4. Sample Request

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl https://app.aistudios.com/api/odin/v3/editor/project/${project key}  \
-H "Authorization: ${API KEY}" \
-H "Content-Type: application/json" \
-X POST \
-d '{
      "updates": {
        "value": [
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
        ]
      },
      "webhookUrl": ${webhook_delivery_address}
    }'
```

</TabItem>
<TabItem value="js" label="Node.js">

```js
import axios from "axios"; 
const token = ${API KEY};
const customWebhookUrl = ${webhook_delivery_address};

axios.post(`https://app.aistudios.com/api/odin/v3/editor/project/${project key}`, 
  {
    "updates": {
      "value": [
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
      ]
    },
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

url = "https://app.aistudios.com/api/odin/v3/editor/project/${project key}"
body = {
  "updates": {
    "value": [
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
    ]
  },
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
