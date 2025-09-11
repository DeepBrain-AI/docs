# Docs to Video
To upload a document file and export a video, you must proceed to the following steps.

<br/>

## 1. Uploading Files and Verifying URIs
Upload the file that will be used to create the video in the document.

### 1-1. Api endpoint
```http
POST https://app.aistudios.com/api/odin/v3/automation/docs-to-video/upload-files
```

### 1-2. Request Parameters
| Key | Description | Type | Required | Default |
| --- | --- | --- | --- | --- |
| files | One or more files to upload<br />(`txt` \| `pdf` \| `xls` \| `xlsx` \| <br />`doc` \| `docs` \| `docx` \| `pptx` \| `ppt`) | File (Binary) | true | - |

### 1-3. Response Parameters
| Key | Description | Type |
| --- | --- | --- |
| uploadResults | List of uploaded file details | Array |
| uploadResults[].uri | Unique identifier of the uploaded file | String |
| uploadResults[].fileName | Source File Name | String |

### 1-4. Sample request
```jsx
import axios from "axios";
import FormData from "form-data";
import fs from "fs";

const formData = new FormData();
formData.append("files", fs.createReadStream("sampleFile1.pptx"));
formData.append("files", fs.createReadStream("sampleFile2.pdf"));

axios.post("https://app.aistudios.com/api/odin/v3/automation/docs-to-video/upload-files", formData, {
  headers: {
    "Authorization": `${API_KEY}`,
    ...formData.getHeaders(),
  },
})
.then((res) => console.log(res.data))
.catch((error) => console.error(error));
```
<br/>

## 2. Request to create a video
Please request including the URI information from the file upload.

### 2-1. Api endpoint
```http
POST https://app.aistudios.com/api/odin/v3/automation/docs-to-video
```

### 2-2. Request Parameters
| key | desc | type | required | default |
| --- | --- | --- | --- | --- |
| files | [File upload](#1-uploading-files-and-verifying-uris) Information received from API  | Array | true | - |
| files[].uri | Unique identifier of the uploaded file | String | true | - |
| files[].fileName | Source File Name | String | true | - |
| options | Configuration for video generation | Json | false | { } |
| options.language | The language used in the video<br />The language code follows the [ISO 639-1](https://www.loc.gov/standards/iso639-2/php/code_list.php) standard. | String | false | - |
| options.objective | Objectives of video footage (e.g. publicity, education, explanation) | String | false | - |
| options.audience | Target audience for video footage (e.g. marketers, students) | String | false | - |
| options.tone | The tone of a video video (e.g. clearly, formally) | String | false | - |
| options.speed | Video playback speed relative to original speed<br />(`0.5 ~ 1.5`) | Number | false | 1 |
| options.media | Image information used to create video<br />(`search` \| `free` \| `premium` \| `generative`) | String | false | - |
| options.useGenerativeHighQuality | Enabling High-Definition AI Media<br />(valid only for options.media='generative')<br />(`true` \| `false`) | Boolean | false | false |
| options.style | Style information<br />(valid only for options.media='generative')<br />(`realistic` \| `digitalPainting` \| `sketch` \| `oilPainting` \| `pixelArt` \| `watercolor` \| `lowPoly` \| `cyberpunk` \| `fantasy` \| `anime`) | String | false | realistic |
| options.templateId | [template id](../templates-automation) to use for video creation | String | false | - |
| options.model | [model id](../models) to use for video generation | String | false | - |
| options.voiceOnly | Only the voice of the model used to create the video<br />(`true` \| `false`) | Boolean | false | false |

### 2-3. Response Parameters
| key | desc | type |
| --- | --- | --- |
| projectId | ID of the video project created | String |

### 2-4. Sample request
```jsx
import axios from "axios";
const token = ${API KEY};

axios.post('https://app.aistudios.com/api/odin/v3/automation/docs-to-video',
  {
    "files":[
      {
        "uri": "39b247fd3a70d86b7849808fc1587c27.pptx",
        "fileName": "sampleFile.pptx"
      }
    ],
    "options": {
      "language": "en",
      "speed": 1,
      "templateId": "## template id ##",
      "model": "## model id ##",
      "voiceOnly": false
    }
  },
  {
    headers: {
      'Authorization': ${token},
      'Content-Type': 'application/json'
    }
  }
)
.then((res) => {
  console.log(res.data);
})
.catch((error) => {
  console.error(error);
})
```
<br/>


## 3. Check progression conditions
Review the current progress of project creation.

### 3-1. Api endpoint
```http
GET https://app.aistudios.com/api/odin/v3/automation/progress?projectId=${projectId}
```

### 3-2. Response Parameters
| Key | Description | Type |
| --- | --- | --- |
| state | Current state of the automation process | String |
| progress | Video Generation Completion Rate | Number |

### 3-3. Sample request
```jsx
import axios from "axios";

const projectId = "your_project_id";
const token = "your_api_key";

axios.get(`https://app.aistudios.com/api/odin/v3/automation/progress/${projectId}`, {}, {
  headers: {
    "Authorization": token,
    "Content-Type": "application/json"
  }
})
.then((res) => {
  console.log(res.data)
})
.catch((error) => {
  console.error(error)
});
```
<br/>
<br/>

## 4. Export
Use Project [Export to Project](/aistudioV3/reference/export-project) a video of a created project.

<br/>

## 5. Full Code
```javascript
const axios = require('axios');
const { error } = require('console');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const API_HOST = 'https://app.aistudios.com'
const GET_TOKEN_API_PATH = '/api/odin/v3/auth/token'
const FILE_UPLOAD_API_PATH = '/api/odin/v3/automation/docs-to-video/upload-files'
const CREATE_API_PATH = '/api/odin/v3/automation/docs-to-video'
const CREATE_PROGRESS_API_PATH = '/api/odin/v3/automation/progress'
const EXPORT_API_PATH = '/api/odin/v3/editor/project/export'
const EXPORT_PROGRESS_API_PATH = '/api/odin/v3/editor/progress'

const delay = async (ms = 1000 * 60) => {
  await new Promise(r => setTimeout(r, ms))
}

const appId = '## your appId ##';
const userKey = '## your userKey ##';

/* Local Files */
const formData = new FormData();
formData.append('files', fs.createReadStream(path.resolve(process.env.HOME, '## Local file path ##')));

const options = {
  "language": "en",
  // "objective": "education",
  // "audience": "students",
  // "tone": "clearly",
  "speed": 1,
  // "media": "generative",
  // "useGenerativeHighQuality": true,
  // "style": "digitalPainting",
  "templateId": "## template id ##", // file bg template
  "model": "## model id ##", // Michael
  "voiceOnly": false,
};

const main = async () => {
  try {
    /**
     * get api token
     */
    const token = await axios.post(
      `${API_HOST}${GET_TOKEN_API_PATH}`,
      {
        appId,
        userKey
      },
      {
        'headers': {
          'Content-Type': 'application/json',
        }
      }
    ).then((response) => {
      if (response.data.success == true) {
        return response.data.data.token
      } else {
        console.error(`import authentication token error, code:`, response.data.error.code, `, msg:`, response.data.error.msg);
        throw Error(response.data);
      }
    }).catch((error) => {
      throw Error(error);
    });


    /**
     * files upload
     */
    const upfiles = await axios.post(
      `${API_HOST}${FILE_UPLOAD_API_PATH}`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          Authorization: token
        }
      }
    ).then(response => {
      if (response.data.success == true) {
        return response.data.data.uploadResults
      } else {
        console.error(`upload error, code:`, response.data.error.code, `, msg:`, response.data.error.msg);
        throw Error(response.data);
      }
    }).catch(error => {
      throw Error(error);
    });

    console.log('upload flies:', upfiles);


    /**
     * create project
     */
    const projectId = await axios.post(
      `${API_HOST}${CREATE_API_PATH}`,
      {
        "files": upfiles,
        "options": options
      },
      {
        headers: {
          Authorization: token
        }
      }
    ).then(response => {
      if (response.data.success == true) {
        return response.data.data.projectId
      } else {
        console.error(`create project error, code:`, response.data.error.code, `, msg:`, response.data.error.msg);
        throw Error(response.data);
      }
    }).catch(error => {
      throw Error(error);
    });

    console.log('request create project, projectId:', projectId);


    /**
     * project progress
     */
    let isCreateProjectFinish = false

    while (!isCreateProjectFinish) {
      const progressData = await fetch(
        `${API_HOST}${CREATE_PROGRESS_API_PATH}/?projectId=${projectId}`,
        {
          method: 'GET',
          headers: {
            Authorization: token,
          },
        },
      )
        .then((response) => response.json())
        .then((response) => {
          if (response.success === true) {
            return response.data
          } else {
            console.error(`project progress error, code:`, response.error.code, `, msg:`, response.error.msg);
            throw Error(response);
          }
        })

      console.log('project creation progress, state:', progressData.state, ', progress:', progressData.progress);

      if (progressData.state === "finish" && progressData.progress === 100) {
        isCreateProjectFinish = true
      } else {
        await delay()
      }
    }


    /**
     * export project
     */
    await fetch(
      `${API_HOST}${EXPORT_API_PATH}`,
      {
        method: 'POST',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "projectId": projectId
        })
      }
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.success == true) {
          return response.data.projectId
        } else {
          console.error(`export project error, code:`, response.error.code, `, msg:`, response.error.msg);
          throw Error(response);
        }
      });

    console.log('request export project');


    /**
     * export progress
     */
    let isExportFinish = false
    let videoUrl = ''

    while (!isExportFinish) {
      const progressData = await fetch(
        `${API_HOST}${EXPORT_PROGRESS_API_PATH}/${projectId}`,
        {
          method: 'GET',
          headers: {
            Authorization: token,
          }
        },
      )
        .then((response) => response.json())
        .then((response) => {
          if (response.success === true) {
            return response.data
          } else {
            console.error(`export progress error, code:`, response.error.code, `, msg:`, response.error.msg);
            throw Error(response);
          }
        })

      console.log(`export state:`, progressData.state, `, progress:`, progressData.progress)

      if (progressData.progress < 100) {
        await delay()
      } else {
        videoUrl = progressData.downloadUrl
        isExportFinish = true
      }
    }

    console.log('videoUrl :', videoUrl);

  } catch (err) {
    // ...
    if (err.response) {
      console.log('server error, status:', err.response.status, ', message', err.response.data);
    } else if (err.request) {
      console.log('response error,', err.request);
    } else {
      console.log(err);
    }
  }

  console.log('finish');
}

main()
```
