# 프로젝트 수정 후 내보내기

프로젝트 수정 후 내보내기는 기존에 존재하는 프로젝트 정보를 가져와 일부 데이터(대사, 이미지 등)만 변경하여 새로운 동영상을 합성하는 방법을 다룹니다.

<br/>

## 1. API endpoint

```http
https://app.aistudios.com/api/odin/v3/editor/project/${key}
```

<br/>

## 2. Request parameter

| key | desc | type | required | default |
| :--- | :--- | :--- | :--- | :--- |
| updates | 프로젝트 속 변경 내용 | Json | true | - |
| updates.value | 프로젝트 속 클립별 변경 내용 | Array(json) | true | - |
| updates.value[].sceneIdx | 변경할 내용이 있는 장면의 Idx | Int | true | - |
| updates.value[].type | 변경할 내용이 있는 요소의 타입 | String enum (aiModel, shape, image, textImage, videoImage, audio, background) | true | - |
| updates.value[].values | 변경 내용 | Json | true | - |
| isExport | 이 프로젝트 내보내질지 여부. false 인경우는 [프로젝트](https://app.aistudios.com/dashboard)에 노출 | Boolean | false | true |
| workspaceId | [작업공간](./workspaces) 고유식별자 ID | String | false | - |
| [webhookUrl](../reference/webhook) | 합성 결과를 보내줄 주소 | String | false | - |

<br/>

## 3. Response parameters

| key | desc | type |
| :--- | :--- | :--- |
| projectId | 합성 요청된 프로젝트의 ID | String |

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
