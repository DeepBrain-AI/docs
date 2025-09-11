# 프로젝트 생성 후 내보내기

프로젝트 내보내기는 JSON 형식으로 API 요청을 전송하여 새로운 이미지를 합성하는 방법을 다룹니다.

<br/>

## 1. API endpoint

```http
https://app.aistudios.com/api/odin/v3/editor/project
```

<br/>

## 2. Request parameter

| key | desc | type | required | default |
| :--- | :--- | :--- | :--- | :--- |
| name | 프로젝트 이름 | String | false | Default Template |
| orientation | 프로젝트 형태 <br />(`landscape` \| `portrait`) | String | false | landscape |
| scenes | 각 장면별 정보 | Array(json) | true | - |
| scenes[].sceneIdx | 해당 장면의 순번 | Int | true | - |
| scenes[].scripts | 발화할 대사 데이터 리스트<br />(* *추후, 기능의 확장성을 위해 배열로 되어 있지만 대사 데이터는 하나만 입력해야 합니다.*) | Json | true | - |
| scenes[].scripts[].org | 발화할 대사 텍스트<br />`<p />`, `<span />` 태그 등을 허용하지만 `plain text`만 입력하는 것을 권장합니다. | String | true | - |
| scenes[].scripts[].isTTS | 아바타의 목소리를 그대로 사용할 것인지, TTS로 합성된 목소리를 사용할 것인지 여부<br />아바타의 목소리를 사용할 경우 `false`, 다른 목소리를 사용할 경우 `true` | Boolean | true | - |
| scenes[].scripts[].tts | 아바타의 목소리가 아닌 TTS로 합성된 목소리를 사용하는 경우, 해당 목소리의 데이터<br />아바타의 목소리를 사용할 경우 `null`, 다른 목소리를 사용할 경우 `Json` | Json | null | true | - |
| scenes[].scripts[].modelId | 아바타의 모델 아이디 | String | true | - |
| scenes[].scripts[].clothId | 아바타의 복장 아이디 | String | true | - |
| scenes[].background | 장면별 배경화면 정보 | Json | true | - |
| scenes[].clips | 모델, 텍스트, 이미지 등 추가할 클립들의 정보 | Array(json) | true | - |
| scenes[].clips[].scaleX | 클립의 크기 배율을 나타냅니다. 높이와 너비 입력을 기준으로 각각 x와 y의 크기 배율을 나타냅니다. | Float | false | 1 |
| scenes[].clips[].scaleY | 클립의 크기 배율을 나타냅니다. 높이와 너비 입력을 기준으로 각각 x와 y의 크기 배율을 나타냅니다. | Float | false | 1 |
| scenes[].clips[].height | 클립의 높이를 나타냅니다. | Float | true | - |
| scenes[].clips[].width | 클립의 너비를 나타냅니다. | Float | true | - |
| scenes[].clips[].left | 장면의 좌측을 기준으로 클립의 위치를 나타냅니다. | Float | true | - |
| scenes[].clips[].top | 장면의 상단을 기준으로 클립의 위치를 나타냅니다. | Float | true | - |
| scenes[].clips[].layer | 클립들의 정렬 순서 (번호가 높을수록 상단에 노출) | Int | true | - |
| scenes[].clips[].id | 클립의 Id | String | true | - |
| scenes[].clips[].type | [추가할 클립의 종류](./clips) <br />(`aiModel` \| `shape` \| `image` \| `textImage` \| `videoImage` \| `audio`) | String | true | - |
| isExport | 이 프로젝트 내보내질지 여부 <br />(false 일경우 [프로젝트 대시보드](https://app.aistudios.com/dashboard)에 노출) | Boolean | false | true |
| workspaceId | [작업공간](./workspaces) 고유식별자 ID | String | false | - |
| resolution | 비디오 품질 <br />(`4k` \| `1080` \| `720` \| `480`) | String | false | 1080 |
| [webhookUrl](../reference/webhook) | 합성 결과를 보내줄 주소 | String | false | - |

<br/>

:::caution `scenes[].scripts[]` 데이터 포맷

`scenes[].scripts[]`에는 발화할 대사(`org`) 이외에 몇가지 추가 정보를 필수로 지정해야 합니다. 잘못 지정된 경우 기능이 정상적으로 동작하지 않을 수 있습니다.

> **`isTTS`, `tts`**  
아바타의 목소리를 그대로 사용할 것인지, 아바타의 목소리가 아닌 TTS로 합성된 목소리를 사용할 것인지를 나타냅니다.  
아바타의 목소리를 그대로 사용하는 경우 `isTTS`를 `false`, `tts`를 `null`로 지정합니다.  
TTS로 합성된 목소리를 사용하는 경우 `isTTS`를 `true`, `tts`를 해당 TTS의 데이터로 지정합니다.  
사용 가능한 TTS의 종류와 상테 데이터 포맷 등은 문의를 통한 확인이 필요합니다.

> **`modelId`, `clothId`**  
아바타의 모델 아이디와 복장 아이디를 나타냅니다.  
이 값은 필수로 지정되어야 하고 해당 씬의 아바타 클립과 동일한 값이 지정되어야 합니다.  
지정되지 않거나 아바타 클립과 다르게 지정된 경우 기능이 정상적으로 동작하지 않을 수 있습니다.
<table>
  <thead>
    <tr>
      <th>-</th>
      <th>아바타 클립의 프로퍼티</th>
      <th>스크립트의 프로퍼티</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>모델 아이디</td>
      <td><code>model.ai_name</code></td>
      <td><code>modelId</code></td>
    </tr>
    <tr>
      <td>복장 아이디</td>
      <td><code>model.emotion</code></td>
      <td><code>clothId</code></td>
    </tr>
  </tbody>
</table>  

:::

<br />

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
curl https://app.aistudios.com/api/odin/v3/editor/project  \
-H "Authorization: ${API KEY}" \
-H "Content-Type: application/json" \
-X POST \
-d '{
      "scenes": [{
        "background": {
          "id": "background",
          "type": "background",
          "source_type": "image",
          "source_url": "/images/background/bg_blue_gradient.png",
          "source_color": "rgb(54,188,37)"
        },
        "watermark": false,
        "scripts": [
          {
            "org": "<p>Hello, this is test video.</p>",
            "isTTS": false,
            "tts": null,
            "modelId": "M000045058",
            "clothId": "BG00002320"
          }
        ],
        "clips": [
          {
            "id": "aiModel-1h4ij5h8e87",
            "type": "aiModel",
            "layer": 1,
            "top": 146.74129135713008,
            "left": 630.2493927359487,
            "effects": [
              {
                "type": "head-only"
              }
            ],
            "height": 2229,
            "width": 679,
            "model": {
              "ai_name": "M000045058",
              "emotion": "BG00002320",
              "language": "en",
              "source_url": "https://cdn.aistudios.com/ai/ai_mov_thm/tight_ai_mov_thm_M000045058_BG00002320.png",
              "editor": {
                "headCenterX": 613.3333333333334,
                "headCenterY": 290,
                "headWidth": 182,
                "headHeight": 185,
                "modelTightX": 367.33333333333337,
                "modelTightY": 168.16666666666669,
                "modelTightS": 1,
                "modelTightW": 679,
                "modelTightH": 2229,
                "modelOriginW": 1374,
                "modelOriginH": 2444,
                "scale": 0.3,
                "adjustX": -0.016860747210092203,
                "adjustY": -0.024822695035461,
                "spaceB": 46.833333333333314,
                "spaceT": 168.16666666666669,
                "spaceL": 367.33333333333337,
                "spaceR": 327.66666666666663,
                "top": 168.16666666666669,
                "left": 367.33333333333337,
                "height": 2229,
                "width": 679
              },
              "origin": {
                "height": 2444,
                "width": 1374
              },
              "deployImage": {
                "themb_src": "https://cdn.aistudios.com/ai/model-introduce/thumbnails/M000045058_BG00002320.png",
                "themb_width": 384,
                "themb_height": 240,
                "org_src": "https://cdn.aistudios.com/ai/ai_mov_thm/tight_ai_mov_thm_M000045058_BG00002320_org.png",
                "org_width": 1374,
                "org_height": 2444,
                "edit_src": "https://cdn.aistudios.com/ai/ai_mov_thm/tight_ai_mov_thm_M000045058_BG00002320.png",
                "edit_width": 692,
                "edit_height": 2277
              },
              "deploySize": {
                "org_width": 1374,
                "org_height": 2444,
                "edit_width": 679,
                "edit_height": 2229
              },
              "editorValue": {
                "headCenterX": 613.3333333333334,
                "headCenterY": 290,
                "headWidth": 182,
                "headHeight": 185,
                "modelTightX": 367.33333333333337,
                "modelTightY": 168.16666666666669,
                "modelTightS": 1,
                "modelTightW": 679,
                "modelTightH": 2229,
                "modelOriginW": 1374,
                "modelOriginH": 2444,
                "scale": 0.3,
                "adjustX": -0.016860747210092203,
                "adjustY": -0.024822695035461,
                "spaceB": 46.833333333333314,
                "spaceT": 168.16666666666669,
                "spaceL": 367.33333333333337,
                "spaceR": 327.66666666666663
              },
              "maskFile": "M000045058_BG00002320H_alpha_INV.mp4"
            },
            "name": "aiModel-1h4ij5h8e87",
            "lockScalingFlip": true,
            "fill": "rgb(0,0,0)",
            "scaleX": 1,
            "scaleY": 1,
            "opacity": 100,
            "lockMovementX": false,
            "lockMovementY": false,
            "lockRotation": false,
            "lockScalingX": false,
            "lockScalingY": false,
            "lockSkewingX": false,
            "lockSkewingY": false,
            "lockUniScaling": false,
            "headOnly": null,
            "voiceOnly": false,
            "isDelete": false
          },
        ],
        "thumbnailUrl": null,
        "sceneIdx": 0
      }],
      "webhookUrl": ${webhook_delivery_address}
    }'
```

</TabItem>
<TabItem value="js" label="Node.js">

```js
import axios from "axios";
const token = ${API KEY};
const customWebhookUrl = ${webhook_delivery_address};

axios.post('https://app.aistudios.com/api/odin/v3/editor/project', 
  {
    "scenes": [{
      "background": {
        "id": "background",
        "type": "background",
        "source_type": "image",
        "source_url": "/images/background/bg_blue_gradient.png",
        "source_color": "rgb(54,188,37)"
      },
      "watermark": false,
      "scripts": [
        {
          "org": "<p>Hello, this is test video.</p>",
          "isTTS": false,
          "tts": null,
          "modelId": "M000045058",
          "clothId": "BG00002320"
        }
      ],
      "clips": [
        {
          "id": "aiModel-1h4ij5h8e87",
          "type": "aiModel",
          "layer": 1,
          "top": 146.74129135713008,
          "left": 630.2493927359487,
          "effects": [
            {
              "type": "head-only"
            }
          ],
          "height": 2229,
          "width": 679,
          "model": {
            "ai_name": "M000045058",
            "emotion": "BG00002320",
            "language": "en",
            "source_url": "https://cdn.aistudios.com/ai/ai_mov_thm/tight_ai_mov_thm_M000045058_BG00002320.png",
            "editor": {
              "headCenterX": 613.3333333333334,
              "headCenterY": 290,
              "headWidth": 182,
              "headHeight": 185,
              "modelTightX": 367.33333333333337,
              "modelTightY": 168.16666666666669,
              "modelTightS": 1,
              "modelTightW": 679,
              "modelTightH": 2229,
              "modelOriginW": 1374,
              "modelOriginH": 2444,
              "scale": 0.3,
              "adjustX": -0.016860747210092203,
              "adjustY": -0.024822695035461,
              "spaceB": 46.833333333333314,
              "spaceT": 168.16666666666669,
              "spaceL": 367.33333333333337,
              "spaceR": 327.66666666666663,
              "top": 168.16666666666669,
              "left": 367.33333333333337,
              "height": 2229,
              "width": 679
            },
            "origin": {
              "height": 2444,
              "width": 1374
            },
            "deployImage": {
              "themb_src": "https://cdn.aistudios.com/ai/model-introduce/thumbnails/M000045058_BG00002320.png",
              "themb_width": 384,
              "themb_height": 240,
              "org_src": "https://cdn.aistudios.com/ai/ai_mov_thm/tight_ai_mov_thm_M000045058_BG00002320_org.png",
              "org_width": 1374,
              "org_height": 2444,
              "edit_src": "https://cdn.aistudios.com/ai/ai_mov_thm/tight_ai_mov_thm_M000045058_BG00002320.png",
              "edit_width": 692,
              "edit_height": 2277
            },
            "deploySize": {
              "org_width": 1374,
              "org_height": 2444,
              "edit_width": 679,
              "edit_height": 2229
            },
            "editorValue": {
              "headCenterX": 613.3333333333334,
              "headCenterY": 290,
              "headWidth": 182,
              "headHeight": 185,
              "modelTightX": 367.33333333333337,
              "modelTightY": 168.16666666666669,
              "modelTightS": 1,
              "modelTightW": 679,
              "modelTightH": 2229,
              "modelOriginW": 1374,
              "modelOriginH": 2444,
              "scale": 0.3,
              "adjustX": -0.016860747210092203,
              "adjustY": -0.024822695035461,
              "spaceB": 46.833333333333314,
              "spaceT": 168.16666666666669,
              "spaceL": 367.33333333333337,
              "spaceR": 327.66666666666663
            },
            "maskFile": "M000045058_BG00002320H_alpha_INV.mp4"
          },
          "name": "aiModel-1h4ij5h8e87",
          "lockScalingFlip": true,
          "fill": "rgb(0,0,0)",
          "scaleX": 1,
          "scaleY": 1,
          "opacity": 100,
          "lockMovementX": false,
          "lockMovementY": false,
          "lockRotation": false,
          "lockScalingX": false,
          "lockScalingY": false,
          "lockSkewingX": false,
          "lockSkewingY": false,
          "lockUniScaling": false,
          "headOnly": null,
          "voiceOnly": false,
          "isDelete": false
        },
      ],
      "thumbnailUrl": null,
      "sceneIdx": 0
    }],
    "webhookUrl": `${ClientWebhookUrl}`
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

url = "https://app.aistudios.com/api/odin/v3/editor/project"
body = {
  "scenes": [{
    "background": {
      "id": "background",
      "type": "background",
      "source_type": "image",
      "source_url": "/images/background/bg_blue_gradient.png",
      "source_color": "rgb(54,188,37)"
    },
    "watermark": false,
    "scripts": [
      {
        "org": "<p>Hello, this is test video.</p>",
        "isTTS": false,
        "tts": null,
        "modelId": "M000045058",
        "clothId": "BG00002320"
      }
    ],
    "clips": [
      {
        "id": "aiModel-1h4ij5h8e87",
        "type": "aiModel",
        "layer": 1,
        "top": 146.74129135713008,
        "left": 630.2493927359487,
        "effects": [
          {
            "type": "head-only"
          }
        ],
        "height": 2229,
        "width": 679,
        "model": {
          "ai_name": "M000045058",
          "emotion": "BG00002320",
          "language": "en",
          "source_url": "https://cdn.aistudios.com/ai/ai_mov_thm/tight_ai_mov_thm_M000045058_BG00002320.png",
          "editor": {
            "headCenterX": 613.3333333333334,
            "headCenterY": 290,
            "headWidth": 182,
            "headHeight": 185,
            "modelTightX": 367.33333333333337,
            "modelTightY": 168.16666666666669,
            "modelTightS": 1,
            "modelTightW": 679,
            "modelTightH": 2229,
            "modelOriginW": 1374,
            "modelOriginH": 2444,
            "scale": 0.3,
            "adjustX": -0.016860747210092203,
            "adjustY": -0.024822695035461,
            "spaceB": 46.833333333333314,
            "spaceT": 168.16666666666669,
            "spaceL": 367.33333333333337,
            "spaceR": 327.66666666666663,
            "top": 168.16666666666669,
            "left": 367.33333333333337,
            "height": 2229,
            "width": 679
          },
          "origin": {
            "height": 2444,
            "width": 1374
          },
          "deployImage": {
            "themb_src": "https://cdn.aistudios.com/ai/model-introduce/thumbnails/M000045058_BG00002320.png",
            "themb_width": 384,
            "themb_height": 240,
            "org_src": "https://cdn.aistudios.com/ai/ai_mov_thm/tight_ai_mov_thm_M000045058_BG00002320_org.png",
            "org_width": 1374,
            "org_height": 2444,
            "edit_src": "https://cdn.aistudios.com/ai/ai_mov_thm/tight_ai_mov_thm_M000045058_BG00002320.png",
            "edit_width": 692,
            "edit_height": 2277
          },
          "deploySize": {
            "org_width": 1374,
            "org_height": 2444,
            "edit_width": 679,
            "edit_height": 2229
          },
          "editorValue": {
            "headCenterX": 613.3333333333334,
            "headCenterY": 290,
            "headWidth": 182,
            "headHeight": 185,
            "modelTightX": 367.33333333333337,
            "modelTightY": 168.16666666666669,
            "modelTightS": 1,
            "modelTightW": 679,
            "modelTightH": 2229,
            "modelOriginW": 1374,
            "modelOriginH": 2444,
            "scale": 0.3,
            "adjustX": -0.016860747210092203,
            "adjustY": -0.024822695035461,
            "spaceB": 46.833333333333314,
            "spaceT": 168.16666666666669,
            "spaceL": 367.33333333333337,
            "spaceR": 327.66666666666663
          },
          "maskFile": "M000045058_BG00002320H_alpha_INV.mp4"
        },
        "name": "aiModel-1h4ij5h8e87",
        "lockScalingFlip": true,
        "fill": "rgb(0,0,0)",
        "scaleX": 1,
        "scaleY": 1,
        "opacity": 100,
        "lockMovementX": false,
        "lockMovementY": false,
        "lockRotation": false,
        "lockScalingX": false,
        "lockScalingY": false,
        "lockSkewingX": false,
        "lockSkewingY": false,
        "lockUniScaling": false,
        "headOnly": null,
        "voiceOnly": false,
        "isDelete": false
      },
    ],
    "thumbnailUrl": null,
    "sceneIdx": 0
  }],
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
