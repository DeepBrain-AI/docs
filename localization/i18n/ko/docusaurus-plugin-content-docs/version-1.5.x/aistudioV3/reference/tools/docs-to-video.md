# Docs to Video
문서파일을 업로드 하고 동영상 내보내기 할려면 다음 단계로 진행해야 합니다.

<br/>

## 1. 파일 업로드 및 URI 확인
문서에서 비디오 생성에 사용될 파일을 업로드합니다.

### 1-1. Api endpoint
```http
POST https://app.aistudios.com/api/odin/v3/automation/docs-to-video/upload-files
```

### 1-2. Request Parameters
| Key | Description | Type | Required | Default |
| --- | --- | --- | --- | --- |
| files | 업로드할 1개 이상의 파일<br />(`txt` \| `pdf` \| `xls` \| `xlsx` \| <br />`doc` \| `docs` \| `docx` \| `pptx` \| `ppt`) | File (Binary) | true | - |

### 1-3. Response Parameters
| Key | Description | Type |
| --- | --- | --- |
| uploadResults | 업로드된 파일 세부 정보 목록 | Array |
| uploadResults[].uri | 업로드된 파일의 고유 식별자 | String |
| uploadResults[].fileName | 원본 파일 이름 | String |

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

## 2. 프로젝트생성 요청
파일 업로드에서 가져온 URI 정보를 포함하여 요청하세요.

### 2-1. Api endpoint
```http
POST https://app.aistudios.com/api/odin/v3/automation/docs-to-video
```

### 2-2. Request Parameters
| key | desc | type | required | default |
| --- | --- | --- | --- | --- |
| files | [파일업로드 API](#1-파일-업로드-및-uri-확인) 에서 응답받은 정보  | Array | true | - |
| files[].uri | 업로드된 파일의 고유 식별자 | String | true | - |
| files[].fileName | 원본 파일 이름 | String | true | - |
| options | 비디오 생성에 사용할 구성 | Json | false | { } |
| options.language | 비디오에 사용된 언어<br />언어 코드는 [ISO 639-1](https://www.loc.gov/standards/iso639-2/php/code_list.php) 표준을 따릅니다. | String | false | - |
| options.objective | 비디오 영상의 목표 (예. 홍보, 교육, 설명) | String | false | - |
| options.audience | 비디오 영상의 대상 청중(예. 마케터, 학생) | String | false | - |
| options.tone | 비디오 영상의 어조(예. 명확하게, 격식있게) | String | false | - |
| options.speed | 원래 속도와 비교한 비디오 재생 속도<br />(`0.5 ~ 1.5`) | Number | false | 1 |
| options.media | 비디오 생성에 사용된 이미지 정보<br />(`search` \| `free` \| `premium` \| `generative`)<br />(**템플릿 파일배경 사용시 default 적용**) | String | false | - |
| options.useGenerativeHighQuality | 고화질 AI 미디어 활성화<br />(options.media='generative' 경우에만 유효)<br />(`true` \| `false`)<br />(**템플릿 파일배경 사용시 default 적용**) | Boolean | false | false |
| options.style | 스타일 정보<br />(options.media='generative' 경우에만 유효)<br />(`realistic` \| `digitalPainting` \| `sketch` \| `oilPainting` \| `pixelArt` \| `watercolor` \| `lowPoly` \| `cyberpunk` \| `fantasy` \| `anime`) | String | false | realistic |
| options.templateId | 비디오 생성에 사용할 [템플릿ID](../templates-automation) | String | false | - |
| options.model | 비디오 생성에 사용할 [모델ID](../models) | String | false | - |
| options.voiceOnly | 비디오 생성에 사용된 모델의 목소리만<br />(`true` \| `false`) | Boolean | false | false |

### 2-3. Response Parameters
| key | desc | type |
| --- | --- | --- |
| projectId | 생성된 비디오 프로젝트의 ID | String |

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
      "voiceOnly": false,
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


## 3. 프로젝트생성 진행상황 확인
프로젝트생성 현재 진행상황을 확인합니다.

### 3-1. Api endpoint
```http
GET https://app.aistudios.com/api/odin/v3/automation/progress?projectId=${projectId}
```

### 3-2. Response Parameters
| Key | Description | Type |
| --- | --- | --- |
| state | 자동화 프로세스의 현재 상태 | String |
| progress | 비디오 생성 완료 비율 | Number |

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

## 4. 내보내기
생성된 프로젝트를 동영상 내보내기 할려면 [프로젝트 내보내기](/aistudioV3/reference/export-project) 이용하세요.
<br/>


## 5. 전체코드
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
