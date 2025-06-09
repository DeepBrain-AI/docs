# Exporting an JSON-based Template

JSON-based template export is available if you want to create a single completed Scene template and then use it to make changes in only some data (such as scripts, images, etc.) to produce videos. The example uses a JSON template consisting of a total of two scenes, with information about the AI model and image information in the first scene, and outro image in the second scene.

<br/>

## 1. API Key settings

Authentication is required for all API communications within AI STUDIOS V3. Set your API key to the token variable. If you don't have an issued key yet, you can issue it through [Generate API key](../generate-api-key).

```js
const token = '##JWT##'; // API KEY
```

<br/>

## 2. Modify JSON Template

In addition to AI model data, each scene expresses an image or video uploaded as a clip, and the clip has slightly different attribute values for each type. Set video or image URL values for AI models based on the example template below. (If your video or image sources are not in the form of URLs, a separate server is required to upload the resources.)

```js
const sceneInfo = `{
  "name": "Exporting an JSON-based Template.",
  "orientation": "landscape",
  "scenes": [
    {
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
            "org": "Hello, This is test video.",
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
        {
          "id": "image-1hgur0eiu11",
          "type": "image",
          "layer": 2,
          "source_url": "https://cdn-studio.aistudios.com/images/657c091a3dbfd5f37bf9ef8d.jpg",
          "width": 2333,
          "height": 3500,
          "left": 202.78299206561076,
          "top": 121.11799144894621,
          "name": "image-1hgur0eiu11",
          "lockScalingFlip": true,
          "fill": "rgb(0,0,0)",
          "scaleX": 0.1494529947853931,
          "scaleY": 0.1494529947853931,
          "lockMovementX": false,
          "lockMovementY": false,
          "lockRotation": false,
          "lockScalingX": false,
          "lockScalingY": false,
          "lockSkewingX": false,
          "lockSkewingY": false,
          "lockUniScaling": false
        }
      ],
      "thumbnailUrl": null,
      "sceneIdx": 0
    },
    {
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
          "id" : "aiModel-1h4ij5h8e87",
          "type" : "aiModel",
          "layer" : 1,
          "top" : 146.74129135713008,
          "left" : 630.2493927359487,
          "script" : {
            "org" : "",
            "tts" : null
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
          "lockUniScaling" : false,
          "headOnly" : null,
          "voiceOnly" : false,
          "isDelete" : true
        },
        {
          "id": "videoImage-1hguqu268jj",
          "type": "videoImage",
          "layer": 2,
          "source_url": "https://cdn-studio.aistudios.com/images/658279786cebbf10f29e2c5a.png",
          "width": 480,
          "height": 270,
          "video_url": "https://cdn-studio.aistudios.com/videos/658279796cebbf10f29e2c5b.mp4",
          "volume": 100,
          "left": -4.5977011494253475,
          "top": -3.4483267519073024,
          "name": "videoImage-1hguqu268jj",
          "lockScalingFlip": true,
          "fill": "rgb(0,0,0)",
          "scaleX": 4.008091908352622,
          "scaleY": 4.008091908352622,
          "lockMovementX": false,
          "lockMovementY": false,
          "lockRotation": false,
          "lockScalingX": false,
          "lockScalingY": false,
          "lockSkewingX": false,
          "lockSkewingY": false,
          "lockUniScaling": false
        }
      ],
      "thumbnailUrl": null,
      "sceneIdx": 0
    }
  ]
}`;
```

<br/>

## 3. Request Project Export API

Request the set JSON data to the project export API. Meaning of 'export' is a request that creates a new video. You can read more about all kinds of data you can send when making the Export Project API request. [here](../reference/export-project). At this time, using POST method, the request body inclues the data of modeifed scenes in the form of a string. And set API key as Authorization value in the Header and Content-Type as 'application/json'. The project key value generated during subsequent successful communication is stored in the projectKey variable.

```js
const projectKey = await fetch('https://app.aistudios.com/api/odin/v3/editor/project',
  {
    method: 'POST',
    body: sceneInfo,
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    }
  }
).then((response) => response.json()
).then((res) => {
  if (res.success == true) {
    return res.data.projectId;
  }
});
```

<br/>

## 4. Check and down

Utilize the saved projectKey by sending it to the Project Progress Check API to monitor the video synthesis progress. The API assesses the degree of completion, which might take some time to reach 100%. To confirm completion, employ the GET method, passing the projectKey value directly in the end of URL query without any body data. Ensure the Authorization value in the Header is set as the API key, with Content-Type specified as 'application/json'.

Upon successful video synthesis, progress will reach 100% upon completion. You will receive the URL address for the finished video in return. The following example illustrates the process: the system generates and waiting for video get exported to the designated local path (./video/), and checks its progress every 3 seconds.

```js
let complete = 0;
while (true) {
  if (complete) {
    break;
  }
  await fetch('https://app.aistudios.com/api/odin/v3/editor/progress/' + projectKey,
    {
      method: 'GET',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      }
    }
  ).then((response) => response.json()
  ).then((res) => {
    if (res.success == true) {
      if (res.data.progress < 100) {
        console.log('Waiting... progress: ' + res.data.progress);
      } else { // export complete
        if (res.data.downloadUrl) {
          console.log('Start download - project key: ' + projectKey);
          const parsedUrl = new URL(res.data.downloadUrl);
          const filename = path.basename(parsedUrl.pathname);
          if (!fs.existsSync('./videos')) {
            fs.mkdirSync('./videos', { recursive: true });
          }
          const file = fs.createWriteStream("./videos/" + filename);
          const request = https.get(res.data.downloadUrl, function (response) {
            response.pipe(file);

            file.on("finish", () => {
              file.close();
              console.log("Download completed");
            });
          });
          complete = 1;
        }
      }
    }
  });
  await new Promise(resolve => setTimeout(resolve, 3000)); // Wait 3 seconds
}
```

<br/>

## Full Code
```js
import fetch from "node-fetch";
import * as path from "path";
import * as fs from "fs";
import * as https from "https";

const token = '##JWT##'; // API KEY

const generateVideo = async () => {
  // #1. Get scene data from json template
  const sceneInfo = `{
    "name": "Exporting an JSON-based Template.",
    "orientation": "landscape",
    "scenes": [
      {
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
              "org": "Hello, This is test video.",
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
          {
            "id": "image-1hgur0eiu11",
            "type": "image",
            "layer": 2,
            "source_url": "https://cdn-studio.aistudios.com/images/657c091a3dbfd5f37bf9ef8d.jpg",
            "width": 2333,
            "height": 3500,
            "left": 202.78299206561076,
            "top": 121.11799144894621,
            "name": "image-1hgur0eiu11",
            "lockScalingFlip": true,
            "fill": "rgb(0,0,0)",
            "scaleX": 0.1494529947853931,
            "scaleY": 0.1494529947853931,
            "lockMovementX": false,
            "lockMovementY": false,
            "lockRotation": false,
            "lockScalingX": false,
            "lockScalingY": false,
            "lockSkewingX": false,
            "lockSkewingY": false,
            "lockUniScaling": false
          }
        ],
        "thumbnailUrl": null,
        "sceneIdx": 0
      },
      {
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
            "id" : "aiModel-1h4ij5h8e87",
            "type" : "aiModel",
            "layer" : 1,
            "top" : 146.74129135713008,
            "left" : 630.2493927359487,
            "script" : {
              "org" : "",
              "tts" : null
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
            "lockUniScaling" : false,
            "headOnly" : null,
            "voiceOnly" : false,
            "isDelete" : true
          },
          {
            "id": "videoImage-1hguqu268jj",
            "type": "videoImage",
            "layer": 2,
            "source_url": "https://cdn-studio.aistudios.com/images/658279786cebbf10f29e2c5a.png",
            "width": 480,
            "height": 270,
            "video_url": "https://cdn-studio.aistudios.com/videos/658279796cebbf10f29e2c5b.mp4",
            "volume": 100,
            "left": -4.5977011494253475,
            "top": -3.4483267519073024,
            "name": "videoImage-1hguqu268jj",
            "lockScalingFlip": true,
            "fill": "rgb(0,0,0)",
            "scaleX": 4.008091908352622,
            "scaleY": 4.008091908352622,
            "lockMovementX": false,
            "lockMovementY": false,
            "lockRotation": false,
            "lockScalingX": false,
            "lockScalingY": false,
            "lockSkewingX": false,
            "lockSkewingY": false,
            "lockUniScaling": false
          }
        ],
        "thumbnailUrl": null,
        "sceneIdx": 0
      }
    ]
  }`;


  // #2. Request export
  const projectKey = await fetch('https://app.aistudios.com/api/odin/v3/editor/project',
    {
      method: 'POST',
      body: sceneInfo,
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      }
    }
  ).then((response) => response.json()
  ).then((res) => {
    if (res.success == true) {
      console.log('Export succeed - ' + res.data.projectId);
      return res.data.projectId;
    }
  });

  // #3. Check progress & download
  let complete = 0;
  while (true) {
    if (complete) {
      break;
    }
    await fetch('https://app.aistudios.com/api/odin/v3/editor/progress/' + projectKey,
      {
        method: 'GET',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      }
    ).then((response) => response.json()
    ).then((res) => {
      if (res.success == true) {
        if (res.data.progress < 100) {
          console.log('Waiting... progress: ' + res.data.progress);
        } else { // export complete
          if (res.data.downloadUrl) {
            console.log('Start download - project key: ' + projectKey);
            const parsedUrl = new URL(res.data.downloadUrl);
            const filename = path.basename(parsedUrl.pathname);
            if (!fs.existsSync('./videos')) {
              fs.mkdirSync('./videos', { recursive: true });
            }
            const file = fs.createWriteStream("./videos/" + filename);
            const request = https.get(res.data.downloadUrl, function (response) {
              response.pipe(file);

              file.on("finish", () => {
                file.close();
                console.log("Download completed");
              });
            });
            complete = 1;
          }
        }
      }
    });
    await new Promise(resolve => setTimeout(resolve, 3000)); // Wait 3 seconds
  }
}

generateVideo();
```