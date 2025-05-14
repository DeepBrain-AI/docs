# Docs to Video
To upload a document file and export a video, you must proceed to the following steps.

<br/>

## 1. Uploading Files and Verifying URIs
Upload the file that will be used to create the video in the document.

### 1-1. Api endpoint
```http
https://app.aistudios.com/api/odin/v3/automation/docs-to-video/upload-files
```

### 1-2. Request Parameters
| Key | Description | Type | Required | Default |
| --- | --- | --- | --- | --- |
| files | One or more files to upload | File (Binary) | **true** | - |

### 1-3. Response Parameters
| Key | Description | Type |
| --- | --- | --- |
| uploadResults | List of uploaded file details | Array |
| uploadResults[].uri | Unique identifier of the uploaded file | String |
| uploadResults[].fileName | Source File Name | String |

### 1-4. Sample request:
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
| options | Configuration for video generation | Json | false | {} |
| options.goal | Purpose of video generation | 'auto', 'business', 'youtube', 'education' | false | 'business' |
| options.duration | Video Time | 'auto', '30', '60', '90', '120' | false | 'auto' |
| options.speed | Video playback speed relative to original speed | 'auto', Number | false | - |
| options.language | The language used in the video. <br/>The language code follows the [ISO 639-1](https://www.loc.gov/standards/iso639-2/php/code_list.php) standard. | 'auto', String | false | - |
| options.media | Image information used to create video (valid only for options.filebackground=false) | 'auto', 'search', 'free', 'generative' | false | - |
| options.style | Style information (valid only for options.media='generative') | 'auto', 'business', 'youtube', 'education' | false | - |
| options.fileBackground | Whether to use the file you provided in the background of the video | Boolean | false | true |
| options.orientation | Screen orientation of the created video | 'web', 'mobile' | false | 'web' |
| options.model | ID of the AI model to use for video generation |  |  |  |

### 2-3. Response Parameters
| key | desc | type |
| --- | --- | --- |
| projectId | ID of the video project created | String |

### 2-4. Sample request:
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
      "goal": 'business'
      "fileBackground": true
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