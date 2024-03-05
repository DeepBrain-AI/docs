---
sidebar_position: 1
---

# Export multiple chromakey

Let's create several chroma key images. Chroma Key refers to a form in which only people except all elements are stored for separate use of AI models. In this example, a total of three chroma key images are generated, and you can specify different AI models, costumes, and lines for each image.

<br/>

## 1. API key settings

Authentication is required for all API communications within AI Studios. The API key is used for this purpose. Sets the API key issued to the token variable. If you don't have the issued key yet, you can issue it through [Generate API key](../generate-api-key).
```js
const token = '##JWT##'; // API KEY
```

<br/>

## 2. Set API request data
Refer to the example below to set the Chroma Key Export API request data by the number of images to be generated. 'Export' means a composite request to generate an image, and the data required to request a chroma key export API include language (language), text (metabolism), model (model ID), and clothes (clothes ID) values. You can find more information about AI models in the [AI Model List](../reference/model-list).
```js
const jobs = [
    {
      language: 'ko',
      text: 'Hello, this is my first work.',
      model: 'M000004017',
      clothes: 'BG00006160'
    },
    {
      language: 'ko',
      text: 'Hello, this is my second work.',
      model: 'M000004017',
      clothes: 'BG00001004'
    },
    {
      language: 'ko',
      text: 'Hello, this is my third work.',
      model: 'M000004017',
      clothes: 'BG00006160'
    }
  ];
```

<br/>

## 3. Chromakey Export API Request
Now let us loop through the data that we set up in Step 2 above, and send chromakey export requests to our API endpoint. As you can see in the code snippet below, the POST request must have our request data in the form of a stringified JSON object. The request header must contain 'Content-Type': 'application/json' and your unique API Key as the value for the 'Authorization' key. Once the request is successful, we can save the project id value in our projectKey variable.
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

## 4. Check and download project progress
Deliver the saved project key to the project progress check API in the previously written repetition statement to check the progress. Project progress means the degree to which the image synthesis is completed, as it may take some time to complete the image after the synthesis request, and this can be confirmed by API. At this time, the method is GET, and you can pass the project key value to the URL without any body data. And set API key as Authorization value in header and Content-Type as 'application/json'.
If the image synthesis is completed after successful communication, progress will be 100, and the URL value of the completed image will be returned. Below is an example of downloading to the specified local path (./video/) if the URL value exists, or waiting 3 seconds to check the progress again.

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
    language: 'ko',
    text: 'Hello, this is my first work.',
    model: 'M000004017',
    clothes: 'BG00006160'
    },
    {
    language: 'ko',
    text: 'Hello, this is my second work.',
    model: 'M000004017',
    clothes: 'BG00001004'
    },
    {
    language: 'ko',
    text: 'Hello, this is my third work.',
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
