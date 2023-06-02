---
sidebar_position: 3
---

# Exporting an JSON template-based

JSON template-based export is available if you want to create a single completed Scene template and then use it to modify only some data (such as lines, images, etc.) to produce images. The example uses a JSON template consisting of a total of three scenes, with information about the intro-outro images in the first and third scenes, and AI model and image information in the second scene.

<br/>

## 1. API key settings

Authentication is required for all API communications within AISTUDIOS. The API key is used for this purpose. Sets the API key issued to the token variable. If you don't have the issued key yet, you can issue it through [Generate API key](https://www.deepbrain.io/pricing).
```js
const token = '##JWT##'; // API KEY
```

<br/>

## 2. Modify JSON Template
The example template below consists of a total of three scenes. After playing the intro image in the first scene, the AI model metabolism is played in the second scene, the image exposure in the first scene, and the outro image is played in the last third scene. In addition to AI model data, in each scene, images or images uploaded by users are expressed as clips, and clips have slightly different attribute values for each type.
Based on the information contained in the example template, set the values of the intro URL, outro URL, metabolism of the AI model, and image URL. (If you do not have an image or image URL, you need to upload resources to a separate server)

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

## 3. Request Project Export API
Request the set JSON data to the project export API. By 'export' we mean a legal request to create a video, and you can read more about the full kind of data you can send when making a Project Support API request [here](../reference/export-project). At this time, the method delivers the JSON data (sceneInfo) set above to POST, body. And set API key as Authorization value in header and Content-Type as 'application/json'. The project key value generated during subsequent successful communication is stored in the projectKey variable.

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

## 4. Check and download project progress
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