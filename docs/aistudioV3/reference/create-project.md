---
sidebar_position: 7
---

# Create project and export

Exporting projects describes how to synthesize new videos by sending api requests in JSON format. You can see & edit exported video at [AI Studio by Deepbrain AI](https://app.deepbrain.io).

<br/>

## 1. API endpoint

```http
https://app.deepbrain.io/api/odin/v3/editor/project
```

<br/>

## 2. Request parameter

|key|desc|type|required|default|
|:---|:---|:---|:---|:---|
|name|Project name|String|false|Default Template|
|orientation|Project orientation|String|false|landscape|
|dictionary|User additional speech learning data|Json|false|-|
|scenes|Scene data|Array(json)|true|-|
|scenes[].sceneIdx|Sequence of the scene|Int|true|-|
|scenes[].background|Background image information.|Json|true|-|
|scenes[].clips|Fields to add clips such as text, images, and background images.|Array(json)|true|-|
|scenes[].clips[].scaleX|Represents the size magnification of the clip. Represents the size magnification of x and y, respectively, based on the height and width input.|Float|false|1|
|scenes[].clips[].scaleY|Represents the size magnification of the clip. Represents the size magnification of x and y, respectively, based on the height and width input.|Float|false|1|
|scenes[].clips[].height|The height of the clip.|Float|true|-|
|scenes[].clips[].width|The width of the clip.|Float|true|-|
|scenes[].clips[].left|The position of the clip relative to the left side of the scene.|Float|true|-|
|scenes[].clips[].top|The position of the clip based on the top of the scene.|Float|true|-|
|scenes[].clips[].layer|Alignment order of clips (the higher the number, the more exposed to the top)|Int|true|-|
|scenes[].clips[].id|ID of the clip|String|true|-|
|scenes[].clips[].type|Types of clips.  [Learn more](./clips)|String enum (aiModel, shape, image, textImage, videoImage, audio)|true|-|
|[webhookUrl](../reference/webhook)|Url address where the synthesis result should be sent.|String|false|-|

<br/>

## 3. Response parameters

|key|desc|type|
|:---|:---|:---|
|projectId|Project Id - Fetching the Chroma-key video data that has been exported.|String|

<br/>


## 4. Sample Request

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl https://app.deepbrain.io/api/odin/v3/editor/project  \
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
        "clips": [
          {
            "id": "aiModel-1h4ij5h8e87",
            "type": "aiModel",
            "layer": 1,
            "top": 146.74129135713008,
            "left": 630.2493927359487,
            "script": {
              "org": "<p>Hello, this is test video.</p>",
              "tts": null
            },
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

axios.post('https://app.deepbrain.io/api/odin/v3/editor/project', 
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
      "clips": [
        {
          "id": "aiModel-1h4ij5h8e87",
          "type": "aiModel",
          "layer": 1,
          "top": 146.74129135713008,
          "left": 630.2493927359487,
          "script": {
            "org": "<p>Hello, this is test video.</p>",
            "tts": null
          },
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

url = "https://app.deepbrain.io/api/odin/v3/editor/project"
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
    "clips": [
      {
        "id": "aiModel-1h4ij5h8e87",
        "type": "aiModel",
        "layer": 1,
        "top": 146.74129135713008,
        "left": 630.2493927359487,
        "script": {
          "org": "<p>Hello, this is test video.</p>",
          "tts": null
        },
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
