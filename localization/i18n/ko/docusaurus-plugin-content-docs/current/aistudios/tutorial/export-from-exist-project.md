---
sidebar_position: 2
---

# 기존 프로젝트 기반 내보내기

기존에 생성해둔 프로젝트에서 정보를 가져와서 일부 데이터(대사, 이미지 등)만 변경하여 영상을 제작하고 싶은 경우에는 기존 프로젝트 기반 내보내기를 이용할 수 있습니다. 해당 예제에서는 총 1개의 씬으로 이루어진 프로젝트에서 AI 모델 대사와 이미지 URL을 변경합니다.

<br/>

## 1. API 키 설정

AI STUDIOS 내 모든 API 통신 시에는 인증이 필요합니다. 이를 위해 사용되는 것이 API 키입니다. token 변수에 발급받은 API 키를 설정합니다. 아직 발급받은 키가 없다면 [API 키 발급하기](https://www.deepbrainai.io/pricing) 에서 발급하실 수 있습니다.

```js
const token = '##JWT##'; // API KEY
```

<br/>

## 2. 프로젝트 ID 설정

projectId 변수에 기존에 생성해둔 프로젝트 ID를 설정합니다. 프로젝트 ID는 [내 스튜디오](https://aistudios.com/login) 페이지에서 기존에 저장해둔 프로젝트를 클릭하여 편집 화면으로 진입 시 URL을 통해 확인할 수 있습니다. 예를 들어 aistudios.com/v2/news/edit.news?id=abcdefg 에서 프로젝트 ID는 abcdefg가 됩니다.

```js
const projectId = '##PROJECT_ID##';
```

<br/>

## 3. 프로젝트 가져오기 API 요청

저장한 projectId를 프로젝트 가져오기 API에 요청합니다. 프로젝트 가져오기 API는 저장된 프로젝트의 이름, 씬 정보 등을 조회하기 위해 사용합니다. 이 때 method는 GET, 별도 body 데이터 없이 URL에 projectId 값을 전달하면 됩니다. 그리고 header에 Authorization 값으로 API 키, Content-Type은 'application/json' 으로 설정해줍니다. 이후 통신 성공 시 해당 정보를 projectInfo 변수에 저장합니다.

```js
const projectInfo = await fetch('https://aistudios.com/api/odin/editor/project/'+projectId,
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
    return res.response;
  }
});
```

<br/>

## 4. 씬 데이터 수정

저장한 projectInfo 내 scenes 데이터에는 프로젝트 내 AI 모델과 첨부한 이미지, 비디오 등의 전반적인 데이터가 담겨있습니다. 해당 데이터를 기반으로 수정이 필요한 데이터를 수정합니다. 아래는 첫번째 씬 AI 모델의 대사와 첫번째 씬 내 두번째 클립(이미지 등)의 URL을 변경하는 예시입니다.

```js
let sceneInfo = projectInfo.scenes;
sceneInfo[0].AIModel.script = "##NEW_SCRIPT##";
sceneInfo[0].clips[1].detail.url = "##NEW_IMAGE_URL##";
```

<br/>

## 5. 프로젝트 내보내기 API 요청

수정한 씬 데이터를 프로젝트 내보내기 API에 요청합니다. '내보내기'란 영상을 생성하기 위한 합성 요청을 의미하며, 프로젝트 내보내기 API 요청 시 보낼 수 있는 전체 데이터 종류는 [여기](../reference/export-project)에서 자세히 확인하실 수 있습니다. 이 때 method는 POST, body에 API 요청 데이터의 key를 scenes로 설정 후 json 문자열 형태로 전달합니다. 그리고 header에 Authorization 값으로 API 키, Content-Type은 'application/json' 으로 설정해줍니다. 이후 통신 성공 시 생성된 프로젝트 키값을 projectKey 변수에 저장합니다.

```js
let projectKey = await fetch('https://aistudios.com/api/odin/editor/project',
  {
    method: 'POST',
    body: JSON.stringify({scenes: sceneInfo}),
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

## 6. 프로젝트 진행률 확인 및 다운로드

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
const projectId = '##PROJECT_ID##';

// #1. Get project info
const projectInfo = await fetch('https://aistudios.com/api/odin/editor/project/'+projectId,
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
  console.log('Get project succeed');
  return res.response;
}
});

// #2. Edit scene data
let sceneInfo = projectInfo.scenes;
sceneInfo[0].AIModel.script = "##NEW_SCRIPT##";
sceneInfo[0].clips[1].detail.url = "##NEW_IMAGE_URL##";

// #3. Request export
let projectKey = await fetch('https://aistudios.com/api/odin/editor/project',
{
  method: 'POST',
  body: JSON.stringify({scenes: sceneInfo}),
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

// #4. Check progress & download
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