---
sidebar_position: 1
---

# 크로마키 여러개 내보내기

여러 개의 크로마키 영상을 생성해보도록 하겠습니다. 크로마키는 AI 모델 별도 사용을 위해 전체 요소를 제외한 인물만 저장하는 형태를 말합니다. 해당 예제에서는 총 3개의 크로마키 영상을 생성하며, 각 영상마다 AI 모델, 의상, 대사 등을 다르게 지정할 수 있습니다.

<br/>

## 1. API 키 설정

AI STUDIOS 내 모든 API 통신 시에는 인증이 필요합니다. 이를 위해 사용되는 것이 API 키입니다. token 변수에 발급받은 API 키를 설정합니다. 아직 발급받은 키가 없다면 [API 키 발급하기](../generate-api-key)에서 발급하실 수 있습니다.
Authentication is required for all API communications within AISTUDIOS. The API key is used for this purpose. Sets the API key issued to the token variable. If you don't have the issued key yet, you can issue it through .
```js
const token = '##JWT##'; // API KEY
```

<br/>

## 2. API 요청 데이터 설정

아래 예시를 참고하여 생성할 영상의 갯수만큼 크로마키 내보내기 API 요청 데이터를 설정합니다. '내보내기'란 영상을 생성하기 위한 합성 요청을 의미하며, 크로마키 내보내기 API 요청 시 필요한 데이터로는 language(언어), text(대사), model(모델ID), clothes(의상ID) 값이 있습니다. AI 모델에 관한 정보는 [AI 모델 리스트](../reference/model-list) 에서 자세히 확인하실 수 있습니다.

```js
const jobs = [
    {
      language: 'ko',
      text: '안녕하세요, 저는 첫번째 작업입니다.',
      model: 'M000004017',
      clothes: 'BG00006160'
    },
    {
      language: 'ko',
      text: '안녕하세요, 저는 두번째 작업입니다.',
      model: 'M000004017',
      clothes: 'BG00001004'
    },
    {
      language: 'ko',
      text: '안녕하세요, 저는 세번째 작업입니다.',
      model: 'M000004017',
      clothes: 'BG00006160'
    }
  ];
```

<br/>

## 3. 크로마키 내보내기 API 요청

반복문을 통해 2번 과정에서 설정한 데이터를 순차적으로 크로마키 내보내기 API에 요청합니다. 이 때 method는 POST, body에 API 요청 데이터를 json 문자열 형태로 전달해야 합니다. 그리고 header에 Authorization 값으로 API 키, Content-Type은 'application/json' 으로 설정해줍니다. 이후 통신 성공 시 생성되는 프로젝트 키값을 projectKey 변수에 저장합니다.

```js
for (const i in jobs) {
    // #1. Request export
    let projectKey = await fetch('https://aistudios.com/api/odin/simple/video',
        {
        method: 'POST',
        body: JSON.stringify(jobs[i]),
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

    //...
}
```

<br/>

## 4. 프로젝트 진행률 확인 및 다운로드

앞서 작성한 반복문 안에서 저장한 projectKey를 프로젝트 진행률 확인 API에 전달하여 진행률을 확인합니다. 프로젝트 진행률이란, 합성 요청 후 영상이 완성되기까지 다소 시간이 소요될 수 있으므로 해당 영상 합성이 완성된 정도를 의미하며 이를 API로 확인할 수 있습니다. 이 때 method는 GET, 별도 body 데이터 없이 URL에 projectKey 값을 전달하면 됩니다. 그리고 header에 Authorization 값으로 API 키, Content-Type은 'application/json' 으로 설정해줍니다.
이후 통신 성공 시 영상 합성이 완료된 경우 progress는 100이 되며 완성된 영상의 URL 값을 리턴합니다. 아래는 해당 URL 값이 존재하는 경우 지정한 로컬 경로(./videos/)에 다운로드 받고, 아닌 경우 3초 대기 후 다시 진행률을 반복 확인하는 예시입니다.

```js
for (const i in jobs) {
    // #1. Request export
    //...

    // #2. Check progress & download
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
const jobs = [
    {
    language: 'ko',
    text: '안녕하세요, 저는 첫번째 작업입니다.',
    model: 'M000004017',
    clothes: 'BG00006160'
    },
    {
    language: 'ko',
    text: '안녕하세요, 저는 두번째 작업입니다.',
    model: 'M000004017',
    clothes: 'BG00001004'
    },
    {
    language: 'ko',
    text: '안녕하세요, 저는 세번째 작업입니다.',
    model: 'M000004017',
    clothes: 'BG00006160'
    }
];

for (const i in jobs) {
    // #1. Request export
    let projectKey = await fetch('https://aistudios.com/api/odin/simple/video',
    {
        method: 'POST',
        body: JSON.stringify(jobs[i]),
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

    // #2. Check progress & download
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
}
```
