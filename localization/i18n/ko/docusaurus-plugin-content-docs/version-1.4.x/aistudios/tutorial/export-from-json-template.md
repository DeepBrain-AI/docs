---
sidebar_position: 3
---

# JSON 템플릿 기반 내보내기

하나의 완성된 Scene 템플릿을 만들어놓고, 이를 활용하여 일부 데이터(대사, 이미지 등)만 수정해서 영상을 제작하고 싶은 경우 JSON 템플릿 기반 내보내기를 이용할 수 있습니다. 해당 예제에서는 총 3개의 씬으로 구성된 JSON 템플릿을 사용하며, 첫번째와 세번째 씬에는 각각 인트로-아웃트로 영상에 대한 정보가, 두번째 씬에는 AI 모델 및 이미지 정보가 존재합니다.

<br/>

## 1. API 키 설정

AI STUDIOS 내 모든 API 통신 시에는 인증이 필요합니다. 이를 위해 사용되는 것이 API 키입니다. token 변수에 발급받은 API 키를 설정합니다. 아직 발급받은 키가 없다면 [API 키 발급하기](https://www.deepbrainai.io/pricing) 에서 발급하실 수 있습니다.

```js
const token = '##JWT##'; // API KEY
```

<br/>

## 2. JSON 템플릿 수정

아래 예시 템플릿은 총 3개의 씬으로 구성되어 있습니다. 첫번째 씬에서 인트로 영상 재생 후, 두번째 씬에서 AI 모델 대사 재생 및 1장의 이미지 노출, 마지막 세번째 씬에서 아웃트로 영상이 재생되는 구조입니다. 각 씬에는 AI 모델 데이터 외에도 유저가 업로드한 이미지 또는 영상 등을 클립(clips)이라고 표현하고, 클립은 타입마다 조금씩 다른 속성값을 가집니다.

해당 예시 템플릿에 담긴 정보를 바탕으로 인트로 URL, 아웃트로 URL, AI 모델의 대사 및 이미지 URL 값을 설정합니다. (영상 또는 이미지 URL이 없는 경우 별도 서버에 리소스 업로드가 필요합니다.)

```js
const sceneInfo = `{
  "scenes":[
     {
        "clips":[
           {
              "type":"userVideo",
              "detail":{
                 "scaleX":1,
                 "scaleY":1,
                 "locationX":0,
                 "locationY":0,
                 "layer":511,
                 "url":"##INTRO_VIDEO_URL##"
              }
           }
        ]
     },
     {
        "AIModel":{
           "model":"M000004017",
           "locationX":0.28108465608465605,
           "locationY":0.3619924756625092,
           "clothes":"BG00006160",
           "scale":1,
           "language":"ko",
           "layer":509,
           "script":"##SCRIPT##"
        },
        "clips":[
           {
              "type":"background",
              "detail":{
                 "url":"https://cdn.aistudios.com/images/news/aiplatform_background_map.png"
              }
           },
           {
              "type":"image",
              "detail":{
                 "scale":0.760136003522247,
                 "locationX":-0.2376818783068783,
                 "locationY":-0.19351361943954537,
                 "layer":511,
                 "url":"##IMAGE_URL##"
              }
           }
        ]
     },
     {
        "clips":[
           {
              "type":"userVideo",
              "detail":{
                 "scaleX":1,
                 "scaleY":1,
                 "locationX":0,
                 "locationY":0,
                 "layer":511,
                 "url":"##OUTRO_VIDEO_URL##"
              }
           }
        ]
     }
  ]
}`;
```

<br/>

## 3. 프로젝트 내보내기 API 요청

설정한 JSON 데이터를 프로젝트 내보내기 API에 요청합니다. '내보내기'란 영상을 생성하기 위한 합성 요청을 의미하며, 프로젝트 내보내기 API 요청 시 보낼 수 있는 전체 데이터 종류는 [여기](../reference/export-project)에서 자세히 확인하실 수 있습니다. 이 때 method는 POST, body에 위에서 설정한 JSON 데이터(sceneInfo)를 전달합니다. 그리고 header에 Authorization 값으로 API 키, Content-Type은 'application/json' 으로 설정해줍니다. 이후 통신 성공 시 생성된 프로젝트 키값을 projectKey 변수에 저장합니다.

```js
let projectKey = await fetch('https://aistudios.com/api/odin/editor/project',
  {
    method: 'POST',
    body: sceneInfo, // JSON Data
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    }
  }
).then((response) => response.json()
).then((res) => {
  if (res.success == true) {
    return res.data.key;
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
  await fetch('https://aistudios.com/api/odin/editor/progress/'+projectKey,
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
        console.log('Waiting... progress: '+res.data.progress);
      } else { // export complete
        if (res.data.url) {
          console.log('Start download - project key: '+projectKey);
          const parsedUrl = url.parse(res.data.url);
          const filename = path.basename(parsedUrl.pathname);
          const file = fs.createWriteStream("./videos/"+filename);
          const request = https.get(res.data.url, function(response) {
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
import https from "https"
import url from "url"
import path from "path"
import fs from "fs"

const token = '##JWT##'; // API KEY

// #1. Get scene data from json template
const sceneInfo = `{
    "scenes":[
      {
          "clips":[
            {
                "type":"userVideo",
                "detail":{
                  "scaleX":1,
                  "scaleY":1,
                  "locationX":0,
                  "locationY":0,
                  "layer":511,
                  "url":"##INTRO_VIDEO_URL##"
                }
            }
          ]
      },
      {
          "AIModel":{
            "model":"M000004017",
            "locationX":0.28108465608465605,
            "locationY":0.3619924756625092,
            "clothes":"BG00006160",
            "scale":1,
            "language":"ko",
            "layer":509,
            "script":"Script area."
          },
          "clips":[
            {
                "type":"background",
                "detail":{
                  "url":"https://cdn.aistudios.com/images/news/aiplatform_background_map.png"
                }
            },
            {
                "type":"image",
                "detail":{
                  "scale":0.760136003522247,
                  "locationX":-0.2376818783068783,
                  "locationY":-0.19351361943954537,
                  "layer":511,
                  "url":"##IMAGE_URL##"
                }
            }
          ]
      },
      {
          "clips":[
            {
                "type":"userVideo",
                "detail":{
                  "scaleX":1,
                  "scaleY":1,
                  "locationX":0,
                  "locationY":0,
                  "layer":511,
                  "url":"##OUTRO_VIDEO_URL##"
                }
            }
          ]
      }
    ]
}`;

// #2. Request export
let projectKey = await fetch('https://aistudios.com/api/odin/editor/project',
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
    console.log('Export succeed - '+res.data.key);
    return res.data.key;
  }
});

// #3. Check progress & download
let complete = 0;
while (true) {
  if (complete) {
    break;
  }
  await fetch('https://aistudios.com/api/odin/editor/progress/'+projectKey,
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
        console.log('Waiting... progress: '+res.data.progress);
      } else { // export complete
        if (res.data.url) {
          console.log('Start download - project key: '+projectKey);
          const parsedUrl = url.parse(res.data.url);
          const filename = path.basename(parsedUrl.pathname);
          const file = fs.createWriteStream("./videos/"+filename);
          const request = https.get(res.data.url, function(response) {
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