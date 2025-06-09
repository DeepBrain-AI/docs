# 导出有修改的项目

在此文本主要解说如何调来已经存在的视频项目信息，进行修改（包括文本，图片等要素）后再次发起合成请求。

<br/>

## 1. API端点

```http
https://app.aistudios.cn/api/odin/v3/editor/project/${key}
```

<br/>

## 2. 请求参数

|key|desc|type|required|default|
|:---|:---|:---|:---|:---|
|updates|项目中修改的内容|Json|true|-|
|updates.value|项目中各场面修改的内容|Array(json)|true|-|
|updates.value[].sceneIdx|修改内容的场景Idx|Int|true|-|
|updates.value[].type|修改的内容类别|String enum<br/>(aiModel, shape, image, textImage, videoImage, audio, background)|true|-|
|updates.value[].values|修改内容|Json|true|-|
|[webhookUrl](../reference/webhook)|回馈合成结果的网址|String|false|-|

<br/>

## 3. 响应参数

|key|desc|type|
|:---|:---|:---|
|projectId|发出合成请求的项目ID|String|


<br/>


## 4. 用例

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl https://app.aistudios.cn/api/odin/v3/editor/project/${project key}  \
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

axios.post(`https://app.aistudios.cn/api/odin/v3/editor/project/${project key}`, 
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

url = "https://app.aistudios.cn/api/odin/v3/editor/project/${project key}"
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
