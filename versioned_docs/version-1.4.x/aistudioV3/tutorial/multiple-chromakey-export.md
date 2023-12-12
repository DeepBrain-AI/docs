---
sidebar_position: 1
---

# Export multiple chroma key

We'll produce multiple chromakey videos by capturing subjects against a consistent green backdrop, providing a distinct color for future compositing with separate image resources with our AI models. In this scenario, we aim to generate three chromakey videos. Each video allows customization of AI models, costumes, and dialogue lines to create unique compositions.

<br/>

## 1. API Key Settings

Authentication is required for all API communications within AI STUDIOS V3. Set your API key to the token variable. If you don't have an issued key yet, you can issue it through [Generate API key](https://www.deepbrain.io/pricing).

```js
const token = '##JWT##'; // API KEY
```

<br/>

## 2. Set API Request data

In order to initiate the Chromakey Export API and specify the number of images for generation, refer to the example below. Each 'Export' request represents the creation of an image, necessitating specific data inputs such as language preferences (language), text content (text), the assigned model ID (model), and the corresponding clothes ID (clothes). For additional insights into available AI models, please visit the provided link for more information. [AI Model List](../reference/model-list).

```js
const jobs = [
  {
    language: 'en',
    text: 'Hello, this is my first job.',
    model: 'M000004017',
    clothes: 'BG00006160'
  },
  {
    language: 'en',
    text: 'Hello, this is my second job.',
    model: 'M000004017',
    clothes: 'BG00001004'
  },
  {
    language: 'en',
    text: 'Hello, this is my third job.',
    model: 'M000004017',
    clothes: 'BG00006160'
  }
];
```

<br/>

## 3. Chroma Key Export API Reqeust

Now let us loop through the data that we set up in Step 2 above, and send chroma key export request to our API endpoint. As you can see in tehr code snippet below, the POST request must have our request data in the form of a stringified JSON object. THer request header must contain 'Content-Type': 'application/json' and your unique API Key as the value for the 'Authorization' key. Once ther request is successful, we can save ther project id value in our projectKey variable.

```js
for (const i in jobs) {
  // #1. Request export
  let projectKey = await fetch('https://app.deepbrain.io/api/odin/v3/simple/video',
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

## 4. Check and download project progress

Utilize the saved projectKey by sending it to the Project Progress Check API to monitor the video synthesis progress. The API assesses the degree of completion, which might take some time to reach 100%. To confirm completion, employ the GET method, passing the projectKey value directly in the end of URL query without any body data. Ensure the Authorization value in the Header is set as the API key, with Content-Type specified as 'application/json'.

Upon successful video synthesis, progress will reach 100% upon completion. You will receive the URL address for the finished video in return. The following example illustrates the process: the system generates and waiting for video get exported to the designated local path (./video/), and checks its progress every 3 seconds.

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
      await fetch('https://app.deepbrain.io/api/odin/v3/editor/progress/'+projectKey,
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

## Full code
```js
import fetch from "node-fetch";
import https from "https"
import url from "url"
import path from "path"
import fs from "fs"

const token = '##JWT##'; // API KEY
const jobs = [
  {
    language: 'en',
    text: 'Hello, this is my first job.',
    model: 'M000004017',
    clothes: 'BG00006160'
  },
  {
    language: 'en',
    text: 'Hello, this is my second job.',
    model: 'M000004017',
    clothes: 'BG00001004'
  },
  {
    language: 'en',
    text: 'Hello, this is my third job.',
    model: 'M000004017',
    clothes: 'BG00006160'
  }
];

for (const i in jobs) {
  // #1. Request export
  let projectKey = await fetch('https://app.deepbrain.io/api/odin/v3/simple/video',
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
      console.log('Export succeed - ' + res.data.key);
      return res.data.key;
    }
  });

  // #2. Check progress & download
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
          if (res.data.url) {
            console.log('Start download - project key: ' + projectKey);
            const parsedUrl = url.parse(res.data.url);
            const filename = path.basename(parsedUrl.pathname);
            const file = fs.createWriteStream("./videos/" + filename);
            const request = https.get(res.data.url, function (response) {
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
