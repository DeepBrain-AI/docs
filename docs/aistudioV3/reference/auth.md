---
sidebar_position: 1
---

# Authentication

## 1. API Key generation

If your account is subscribed to a Pro or higher plan, you are available for issuing an API key. When selecting the account name at the top right of the screen after logging in, go to the "Profile" tab from the menu, generate the API key by clicking the "Issuing API Key" at the bottom of the screen to create 'AppId' and 'UserKey'. Once activated, the generated 'AppId' and 'UserKey' can no longer be viewed. Thus, Please be sure to copy it separately and store it in a safe place.

API Access Token can be issued through the issued AppId and UserKey. API communication is published through the access token, and the validity of the token is 1 day (24 hours from the time of issuance).

[Generate API key](https://www.deepbrainai.io/pricing)

<br/>

## 2. Making API videos.

A test image is produced with the issued 'API Key' to check ther ID value of the generated image.

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
      "name": "Test Project Using Api",
      "orientation": "landscape",
      "scenes": [{
        "background" : {
          "id" : "background",
          "type" : "background",
          "source_type" : "image",
          "source_url" : "/images/background/bg_blue_gradient.png",
          "source_color" : "rgb(54,188,37)"
        },
        "watermark" : false,
        "clips" : [
          {
            "id" : "aiModel-1h4ij5h8e87",
            "type" : "aiModel",
            "layer" : 1,
            "top" : 144.5979042385424,
            "left" : 630.2493927359487,
            "script" : {
              "org" : "<p>Hello, this is test video using Api.</p>"
            },
            "effects" : [
              {
                "type" : "head-only"
              }
            ],
            "height" : 2229,
            "width" : 679,
            "model" : {
              "ai_name" : "M000045058",
              "emotion" : "BG00002320",
              "language" : "en",
              "source_url" : "https://cdn.aistudios.com/ai/ai_mov_thm/tight_ai_mov_thm_M000045058_BG00002320.png",
              "editor" : {
                "headCenterX" : 613.3333333333334,
                "headCenterY" : 290,
                "headWidth" : 182,
                "headHeight" : 185,
                "modelTightX" : 367.33333333333337,
                "modelTightY" : 168.16666666666669,
                "modelTightS" : 1,
                "modelTightW" : 679,
                "modelTightH" : 2229,
                "modelOriginW" : 1374,
                "modelOriginH" : 2444,
                "scale" : 0.3,
                "adjustX" : -0.016860747210092203,
                "adjustY" : -0.024822695035461,
                "spaceB" : 46.833333333333314,
                "spaceT" : 168.16666666666669,
                "spaceL" : 367.33333333333337,
                "spaceR" : 327.66666666666663,
                "top" : 168.16666666666669,
                "left" : 367.33333333333337,
                "height" : 2229,
                "width" : 679
              },
              "origin" : {
                "height" : 2444,
                "width" : 1374
              },
              "deployImage" : {
                "themb_src" : "https://cdn.aistudios.com/ai/model-introduce/thumbnails/M000045058_BG00002320.png",
                "themb_width" : 384,
                "themb_height" : 240,
                "org_src" : "https://cdn.aistudios.com/ai/ai_mov_thm/tight_ai_mov_thm_M000045058_BG00002320_org.png",
                "org_width" : 1374,
                "org_height" : 2444,
                "edit_src" : "https://cdn.aistudios.com/ai/ai_mov_thm/tight_ai_mov_thm_M000045058_BG00002320.png",
                "edit_width" : 692,
                "edit_height" : 2277
              },
              "deploySize" : {
                "org_width" : 1374,
                "org_height" : 2444,
                "edit_width" : 679,
                "edit_height" : 2229
              },
              "editorValue" : {
                "headCenterX" : 613.3333333333334,
                "headCenterY" : 290,
                "headWidth" : 182,
                "headHeight" : 185,
                "modelTightX" : 367.33333333333337,
                "modelTightY" : 168.16666666666669,
                "modelTightS" : 1,
                "modelTightW" : 679,
                "modelTightH" : 2229,
                "modelOriginW" : 1374,
                "modelOriginH" : 2444,
                "scale" : 0.3,
                "adjustX" : -0.016860747210092203,
                "adjustY" : -0.024822695035461,
                "spaceB" : 46.833333333333314,
                "spaceT" : 168.16666666666669,
                "spaceL" : 367.33333333333337,
                "spaceR" : 327.66666666666663
              },
              "maskFile" : "M000045058_BG00002320H_alpha_INV.mp4"
            },
            "name" : "aiModel-1h4ij5h8e87",
            "lockScalingFlip" : true,
            "fill" : "rgb(0,0,0)",
            "scaleX" : 1,
            "scaleY" : 1,
            "opacity" : 100,
            "lockMovementX" : false,
            "lockMovementY" : false,
            "lockRotation" : false,
            "lockScalingX" : false,
            "lockScalingY" : false,
            "lockSkewingX" : false,
            "lockSkewingY" : false,
            "lockUniScaling" : false
          }
        ],
        "thumbnailUrl" : null,
        "sceneIdx" : 0
      }]
    }'
```

</TabItem>
<TabItem value="js" label="Node.js">

```js
import axios from 'axios' 
const token = ${API KEY}

axios.post('https://app.deepbrain.io/api/odin/v3/editor/project', 
  {
    "name": "Test Project Using Api",
    "orientation": "landscape",
    "scenes": [{
      "background" : {
        "id" : "background",
        "type" : "background",
        "source_type" : "image",
        "source_url" : "/images/background/bg_blue_gradient.png",
        "source_color" : "rgb(54,188,37)"
      },
      "watermark" : false,
      "clips" : [
        {
          "id" : "aiModel-1h4ij5h8e87",
          "type" : "aiModel",
          "layer" : 1,
          "top" : 144.5979042385424,
          "left" : 630.2493927359487,
          "script" : {
            "org" : "<p>Hello, this is test video using Api.</p>"
          },
          "effects" : [
            {
              "type" : "head-only"
            }
          ],
          "height" : 2229,
          "width" : 679,
          "model" : {
            "ai_name" : "M000045058",
            "emotion" : "BG00002320",
            "language" : "en",
            "source_url" : "https://cdn.aistudios.com/ai/ai_mov_thm/tight_ai_mov_thm_M000045058_BG00002320.png",
            "editor" : {
              "headCenterX" : 613.3333333333334,
              "headCenterY" : 290,
              "headWidth" : 182,
              "headHeight" : 185,
              "modelTightX" : 367.33333333333337,
              "modelTightY" : 168.16666666666669,
              "modelTightS" : 1,
              "modelTightW" : 679,
              "modelTightH" : 2229,
              "modelOriginW" : 1374,
              "modelOriginH" : 2444,
              "scale" : 0.3,
              "adjustX" : -0.016860747210092203,
              "adjustY" : -0.024822695035461,
              "spaceB" : 46.833333333333314,
              "spaceT" : 168.16666666666669,
              "spaceL" : 367.33333333333337,
              "spaceR" : 327.66666666666663,
              "top" : 168.16666666666669,
              "left" : 367.33333333333337,
              "height" : 2229,
              "width" : 679
            },
            "origin" : {
              "height" : 2444,
              "width" : 1374
            },
            "deployImage" : {
              "themb_src" : "https://cdn.aistudios.com/ai/model-introduce/thumbnails/M000045058_BG00002320.png",
              "themb_width" : 384,
              "themb_height" : 240,
              "org_src" : "https://cdn.aistudios.com/ai/ai_mov_thm/tight_ai_mov_thm_M000045058_BG00002320_org.png",
              "org_width" : 1374,
              "org_height" : 2444,
              "edit_src" : "https://cdn.aistudios.com/ai/ai_mov_thm/tight_ai_mov_thm_M000045058_BG00002320.png",
              "edit_width" : 692,
              "edit_height" : 2277
            },
            "deploySize" : {
              "org_width" : 1374,
              "org_height" : 2444,
              "edit_width" : 679,
              "edit_height" : 2229
            },
            "editorValue" : {
              "headCenterX" : 613.3333333333334,
              "headCenterY" : 290,
              "headWidth" : 182,
              "headHeight" : 185,
              "modelTightX" : 367.33333333333337,
              "modelTightY" : 168.16666666666669,
              "modelTightS" : 1,
              "modelTightW" : 679,
              "modelTightH" : 2229,
              "modelOriginW" : 1374,
              "modelOriginH" : 2444,
              "scale" : 0.3,
              "adjustX" : -0.016860747210092203,
              "adjustY" : -0.024822695035461,
              "spaceB" : 46.833333333333314,
              "spaceT" : 168.16666666666669,
              "spaceL" : 367.33333333333337,
              "spaceR" : 327.66666666666663
            },
            "maskFile" : "M000045058_BG00002320H_alpha_INV.mp4"
          },
          "name" : "aiModel-1h4ij5h8e87",
          "lockScalingFlip" : true,
          "fill" : "rgb(0,0,0)",
          "scaleX" : 1,
          "scaleY" : 1,
          "opacity" : 100,
          "lockMovementX" : false,
          "lockMovementY" : false,
          "lockRotation" : false,
          "lockScalingX" : false,
          "lockScalingY" : false,
          "lockSkewingX" : false,
          "lockSkewingY" : false,
          "lockUniScaling" : false
        }
      ],
      "thumbnailUrl" : null,
      "sceneIdx" : 0
    }]
  },
  {
    headers: {
      'Authorization': ${token},
      'Content-Type': 'application/json'
    }
  }
)
.then((res) => {
  console.log(res.data)
})
.catch((error) => {
  console.error(error)
})
```

</TabItem>
<TabItem value="py" label="Python">

```py
import requests
import json

url = 'https://app.deepbrain.io/api/odin/v3/editor/project'
body = {
  {
    "name": "Test Project Using Api",
    "orientation": "landscape",
    "scenes": [{
      "background" : {
        "id" : "background",
        "type" : "background",
        "source_type" : "image",
        "source_url" : "/images/background/bg_blue_gradient.png",
        "source_color" : "rgb(54,188,37)"
      },
      "watermark" : false,
      "clips" : [
        {
          "id" : "aiModel-1h4ij5h8e87",
          "type" : "aiModel",
          "layer" : 1,
          "top" : 144.5979042385424,
          "left" : 630.2493927359487,
          "script" : {
            "org" : "<p>Hello, this is test video using Api.</p>"
          },
          "effects" : [
            {
              "type" : "head-only"
            }
          ],
          "height" : 2229,
          "width" : 679,
          "model" : {
            "ai_name" : "M000045058",
            "emotion" : "BG00002320",
            "language" : "en",
            "source_url" : "https://cdn.aistudios.com/ai/ai_mov_thm/tight_ai_mov_thm_M000045058_BG00002320.png",
            "editor" : {
              "headCenterX" : 613.3333333333334,
              "headCenterY" : 290,
              "headWidth" : 182,
              "headHeight" : 185,
              "modelTightX" : 367.33333333333337,
              "modelTightY" : 168.16666666666669,
              "modelTightS" : 1,
              "modelTightW" : 679,
              "modelTightH" : 2229,
              "modelOriginW" : 1374,
              "modelOriginH" : 2444,
              "scale" : 0.3,
              "adjustX" : -0.016860747210092203,
              "adjustY" : -0.024822695035461,
              "spaceB" : 46.833333333333314,
              "spaceT" : 168.16666666666669,
              "spaceL" : 367.33333333333337,
              "spaceR" : 327.66666666666663,
              "top" : 168.16666666666669,
              "left" : 367.33333333333337,
              "height" : 2229,
              "width" : 679
            },
            "origin" : {
              "height" : 2444,
              "width" : 1374
            },
            "deployImage" : {
              "themb_src" : "https://cdn.aistudios.com/ai/model-introduce/thumbnails/M000045058_BG00002320.png",
              "themb_width" : 384,
              "themb_height" : 240,
              "org_src" : "https://cdn.aistudios.com/ai/ai_mov_thm/tight_ai_mov_thm_M000045058_BG00002320_org.png",
              "org_width" : 1374,
              "org_height" : 2444,
              "edit_src" : "https://cdn.aistudios.com/ai/ai_mov_thm/tight_ai_mov_thm_M000045058_BG00002320.png",
              "edit_width" : 692,
              "edit_height" : 2277
            },
            "deploySize" : {
              "org_width" : 1374,
              "org_height" : 2444,
              "edit_width" : 679,
              "edit_height" : 2229
            },
            "editorValue" : {
              "headCenterX" : 613.3333333333334,
              "headCenterY" : 290,
              "headWidth" : 182,
              "headHeight" : 185,
              "modelTightX" : 367.33333333333337,
              "modelTightY" : 168.16666666666669,
              "modelTightS" : 1,
              "modelTightW" : 679,
              "modelTightH" : 2229,
              "modelOriginW" : 1374,
              "modelOriginH" : 2444,
              "scale" : 0.3,
              "adjustX" : -0.016860747210092203,
              "adjustY" : -0.024822695035461,
              "spaceB" : 46.833333333333314,
              "spaceT" : 168.16666666666669,
              "spaceL" : 367.33333333333337,
              "spaceR" : 327.66666666666663
            },
            "maskFile" : "M000045058_BG00002320H_alpha_INV.mp4"
          },
          "name" : "aiModel-1h4ij5h8e87",
          "lockScalingFlip" : true,
          "fill" : "rgb(0,0,0)",
          "scaleX" : 1,
          "scaleY" : 1,
          "opacity" : 100,
          "lockMovementX" : false,
          "lockMovementY" : false,
          "lockRotation" : false,
          "lockScalingX" : false,
          "lockScalingY" : false,
          "lockSkewingX" : false,
          "lockSkewingY" : false,
          "lockUniScaling" : false
        }
      ],
      "thumbnailUrl" : null,
      "sceneIdx" : 0
    }]
  }
}
headers = {
    'Content-Type': 'application/json',
    'Authorization': ${API TOKEN}
}

r = requests.post(url, data=json.dumps(body), headers=headers)
```

</TabItem>
</Tabs>
