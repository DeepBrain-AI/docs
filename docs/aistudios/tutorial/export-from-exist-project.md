---
sidebar_position: 2
---

# Exporting an Existing Project-based

If you want to create an image by importing information from an existing project and changing only some data (such as lines, images), you can use an existing project-based export. This example changes the AI model lines and image URL in a project with a total of one scene.

<br/>

## 1. API key settings

Authentication is required for all API communications within AISTUDIOS. The API key is used for this purpose. Sets the API key issued to the token variable. If you don't have the issued key yet, you can issue it through [Generate API key](https://www.deepbrain.io/pricing).
```js
const token = '##JWT##'; // API KEY
```

<br/>

## 2. Set Project ID
Set the previously created project ID in the projectId variable. The project ID can be found through the URL when entering the edit screen by clicking on the previously saved project on the [My Studio](https://aistudios.com/login) page. For example, on aistudios.com/v2/news/edit.news?id=abcdefg, the project ID is abcdefg.
```js
const projectId = '##PROJECT_ID##';
```

<br/>

## 3. Request Project Import API
Request the saved projectId to the project import API. The Import Project API is used to query the name, scene information, etc. of a saved project. At this time, the method is GET, and you can pass the projectId value to the URL without any body data. And set API key as Authorization value in header and Content-Type as 'application/json'. If subsequent communication is successful, the information is stored in the projectInfo variable.
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

## 4. Modify Scene Data
The saved scenes data in projectInfo contains overall data such as AI models and attached images and videos in the project. Modify the data that needs to be modified based on that data. Below is an example of changing the dialogue of the first scene AI model and the URL of the second clip in the first scene (such as an image).
```js
let sceneInfo = projectInfo.scenes;
sceneInfo[0].AIModel.script = "##NEW_SCRIPT##";
sceneInfo[0].clips[1].detail.url = "##NEW_IMAGE_URL##";
```

<br/>

## 5. Request Project Export API
Request modified scene data to the project export API. By 'export' we mean a legal request to create a video, and you can read more about the full kind of data you can send when making a Project Support API request [here](../reference/export-project). At this time, the method sets the key of the API request data to the POST, body, to scenes and forwards it in the form of a json string. And set API key as Authorization value in header and Content-Type as 'application/json'. The project key value generated during subsequent successful communication is stored in the projectKey variable.

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

## 6. Check and download project progress
Deliver the saved project key to the project progress check API to check the progress. Project progress means the degree to which the image synthesis is completed, as it may take some time to complete the image after the synthesis request, and this can be confirmed by API. At this time, the method is GET, and you can pass the project key value to the URL without any body data. And set API key as Authorization value in header and Content-Type as 'application/json'.
If the image synthesis is completed after successful communication, progress will be 100, and the URL value of the completed image will be returned. Below is an example of downloading to the specified local path (./video/) if the URL value exists, or waiting 3 seconds to check the progress again.

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

## Full Code
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