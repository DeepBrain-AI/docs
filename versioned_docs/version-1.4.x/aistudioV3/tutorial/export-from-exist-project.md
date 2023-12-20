---
sidebar_position: 3
---

# Exporting an Existing Project-based

If you want to create an video by importing information from an existing projects and changing only some data (such as scripts, images), you can use an existing project-based export. This example changes the scripts and image URL of its assets in a project with a total of one scene.

<br/>

## 1. API Key Settings

Authentication is required for all API communications within AI STUDIOS V3. Set your API key to the token variable. If you don't have an issued API key yet, you can issue it through [Generate API key](../generate-api-key).

```js
const token = '##JWT##'; // API KEY
```

<br/>

## 2. Set Project ID

Set the previously created project ID in a projectId variable. The project ID can be found through the URL when entering the editing page by generating new project or clicking on the previously saved project on the [My Studio](https://app.deepbrain.io/auth/signin) page. For example, If you are on `app.deepbrain.io/editor/abcdefg`, its projectId is `abcedfg`.

```js
const projectId = '##PROJECT_ID##';
```

<br/>

## 3. Request Project Import API

The saved projectId is used for requesting the Import Project API. The Import Project API is used to import the project name, scene information, etc. of a saved project. In this example, the method is GET, and you can pass the projectId into the URL without any body data. And set API key as Authorization value in header and Content-Type as 'application/json'. If subsequent communication is successful, the information will be stored in the projectInfo variable.

```js
const projectInfo = await fetch('https://app.deepbrain.io/api/odin/v3/editor/project/' + projectId,
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
    return res.data.project;
  }
});
```

<br/>

## 4. Modify Scene Data

The saved scenes data in projectInfo contains overall data such as AI models and attached images and videos in the project. You can also modify the data in the sences according to its projectInfo. An example below shows changing dialogue of the first scene, the URL of the other clips in the first scene (such as an image).

```js
const { scenes } = projectInfo;

const modelIdx = scenes[0].clips.findIndex((clips) => clips.type === 'aiModel');
// If you also want to replace your previous image with new image, you can undo comments line below.
// const imageIdx = scenes[0].clips.findIndex((clips) => clips.type === 'image');

// Please type in your substitute scripts that will replace your old script for new video.
scenes[0].clips[modelIdx].script.org = "This is overriding old script";

// If you also want to replace your previous image with new image, you can undo comments line below.
// scenes[0].clips[imageIdx].source_url = "##NEW_IMAGE_URL##";
```

<br/>

## 5. Request Project Export API

Previous modified scene data are used to send a request to the Export Project API. Meaning of 'export' is a request that creates a new video. You can read more about all kinds of data you can send when making the Export Project API request. [here](../reference/export-project). At this time, using POST method, the request body inclues the data of modeifed scenes in the form of a string. And set API key as Authorization value in the Header and Content-Type as 'application/json'. The project key value generated during subsequent successful communication is stored in the projectKey variable.

```js
const projectKey = await fetch('https://app.deepbrain.io/api/odin/v3/editor/project',
  {
    method: 'POST',
    body: JSON.stringify({ scenes }),
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

## 6. Check and download project progress

Utilize the saved projectKey by sending it to the Project Progress Check API to monitor the video synthesis progress. The API assesses the degree of completion, which might take some time to reach 100%. To confirm completion, employ the GET method, passing the projectKey value directly in the end of URL query without any body data. Ensure the Authorization value in the Header is set as the API key, with Content-Type specified as 'application/json'.

Upon successful video synthesis, progress will reach 100% upon completion. You will receive the URL address for the finished video in return. The following example illustrates the process: the system generates and waiting for video get exported to the designated local path (./video/), and checks its progress every 3 seconds.

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

## Full Code
```js
import fetch from "node-fetch";
import * as path from "path";
import * as fs from "fs";
import * as https from "https";

const token = '##JWT##'; // API KEY

// If you don't have a projectId yet, You can copy projectId from the prior example "Exporting an JSON-based Template".
const projectId = '##YOUR_PROJECT_ID##';

const generateVideo = async () => {
  // #1. Get project info
  const projectInfo = await fetch('https://app.deepbrain.io/api/odin/v3/editor/project/' + projectId,
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
      return res.data.project;
    }
  });

  // // #2. Edit scene data
  const { scenes } = projectInfo;

  const modelIdx = scenes[0].clips.findIndex((clips) => clips.type === 'aiModel');
  // If you also want to replace your previous image with new image, you can undo comments line below.
  // const imageIdx = scenes[0].clips.findIndex((clips) => clips.type === 'image');

  // Please type in your substitute scripts that will replace your old script for new video.
  scenes[0].clips[modelIdx].script.org = "This is overriding old script";

  // If you also want to replace your previous image with new image, you can undo comments line below.
  // scenes[0].clips[imageIdx].source_url = "##NEW_IMAGE_URL##";

  // #3. Request export
  const projectKey = await fetch('https://app.deepbrain.io/api/odin/v3/editor/project',
    {
      method: 'POST',
      body: JSON.stringify({ scenes }),
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

  // #4. Check progress & download
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