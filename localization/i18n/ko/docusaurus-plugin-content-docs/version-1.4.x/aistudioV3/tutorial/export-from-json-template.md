---
sidebar_position: 2
---

# JSON 템플릿 기반 내보내기

하나의 완성된 Scene 템플릿을 만들어놓고, 이를 활용하여 일부 데이터(대사, 이미지 등)만 수정해서 영상을 제작하고 싶은 경우 JSON 템플릿 기반 내보내기를 이용할 수 있습니다. 해당 예제에서는 총 3개의 씬으로 구성된 JSON 템플릿을 사용하며, 첫 번째와 세 번째 씬에는 각각 인트로-아웃트로 영상에 대한 정보가, 두 번째 씬에는 AI 모델 및 이미지 정보가 존재합니다.

<br/>

## 1. API 키 설정

AI STUDIOS V3 내 모든 API 통신 시에는 인증이 필요합니다. 이를 위해 사용되는 것이 API 키입니다. token 변수에 발급받은 API 키를 설정합니다. 아직 발급받은 키가 없다면 [API 키 발급하기](../generate-api-key)에서 발급하실 수 있습니다.

```js
const token = '##JWT##'; // API KEY
```

<br/>

## 2. JSON 템플릿 수정

아래 예시 템플릿은 총 2개의 씬으로 구성되어 있습니다. 첫 번째 씬에서 AI 모델 대사 재생 및 1장의 이미지 노출, 두 번째 씬에서 아웃트로 영상이 재생되는 구조입니다. 각 씬에는 AI 모델 데이터 외에도 유저가 업로드한 이미지 또는 영상 등을 클립(clips)이라고 표현하고, 클립은 타입마다 조금씩 다른 속성값을 가집니다.

해당 예시 템플릿에 담긴 정보를 바탕으로 아웃트로 URL, AI 모델의 대사 및 이미지 URL 값을 설정합니다. (영상 또는 이미지 URL이 없는 경우 별도 서버에 리소스 업로드가 필요합니다.)

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
          "source_url": "https://cdn-studio.deepbrain.io/images/657c091a3dbfd5f37bf9ef8d.jpg",
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
          "source_url": "https://cdn-studio.deepbrain.io/images/658279786cebbf10f29e2c5a.png",
          "width": 480,
          "height": 270,
          "video_url": "https://cdn-studio.deepbrain.io/videos/658279796cebbf10f29e2c5b.mp4",
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

## 3. 프로젝트 내보내기 API 요청

설정한 JSON 데이터를 프로젝트 내보내기 API에 요청합니다. '내보내기'란 영상을 생성하기 위한 합성 요청을 의미하며, 프로젝트 내보내기 API 요청 시 보낼 수 있는 전체 데이터 종류는 [여기](../reference/export-project)에서 자세히 확인하실 수 있습니다. 이때 method는 POST, body에 위에서 설정한 JSON 데이터(sceneInfo)를 전달합니다. 그리고 header에 Authorization 값으로 API 키, Content-Type은 'application/json' 으로 설정해줍니다. 이후 통신 성공 시 생성된 프로젝트 키값을 projectKey 변수에 저장합니다.

```js
const projectKey = await fetch('https://app.deepbrain.io/api/odin/v3/editor/project',
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

## 4. 프로젝트 진행률 확인 및 다운로드

저장한 projectKey를 프로젝트 진행률 확인 API에 전달하여 진행률을 확인합니다. 프로젝트 진행률이란, 합성 요청 후 영상이 완성되기까지 다소 시간이 소요될 수 있으므로 해당 영상 합성이 완성된 정도를 의미하며 이를 API로 확인할 수 있습니다. 이 때 method는 GET, 별도 body 데이터 없이 URL에 projectKey 값을 전달하면 됩니다. 그리고 header에 Authorization 값으로 API 키, Content-Type은 'application/json' 으로 설정해줍니다.

이후 통신 성공 시 영상 합성이 완료된 경우 progress는 100이 되며 완성된 영상의 URL 값을 리턴합니다. 아래는 해당 URL 값이 존재하는 경우 지정한 로컬 경로(./videos/)에 다운로드 받고, 아닌 경우 3초 대기 후 다시 진행률을 반복 확인하는 예시입니다.

```js
let complete = 0;
while (true) {
  if (complete) {
    break;
  }
  await fetch('https://app.deepbrain.io/api/odin/v3/editor/progress/' + projectKey,
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

## 전체 코드
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
            "source_url": "https://cdn-studio.deepbrain.io/images/657c091a3dbfd5f37bf9ef8d.jpg",
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
            "source_url": "https://cdn-studio.deepbrain.io/images/658279786cebbf10f29e2c5a.png",
            "width": 480,
            "height": 270,
            "video_url": "https://cdn-studio.deepbrain.io/videos/658279796cebbf10f29e2c5b.mp4",
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
  const projectKey = await fetch('https://app.deepbrain.io/api/odin/v3/editor/project',
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
    await fetch('https://app.deepbrain.io/api/odin/v3/editor/progress/' + projectKey,
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