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
| files | 업로드할 1개 이상의 파일 | File (Binary) | **true** | - |

### 1-3. Response Parameters
| Key | Description | Type |
| --- | --- | --- |
| uploadResults | 업로드된 파일 세부 정보 목록 | Array |
| uploadResults[].uri | 업로드된 파일의 고유 식별자 | String |
| uploadResults[].fileName | 원본 파일 이름 | String |

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

## 2. 프로젝트생성 요청
파일 업로드에서 가져온 URI 정보를 포함하여 요청하세요.

### 2-1. Api endpoint
```http
POST https://app.aistudios.com/api/odin/v3/automation/docs-to-video
```

### 2-2. Request Parameters
| key | desc | type | required | default |
| --- | --- | --- | --- | --- |
| files | [파일업로드](#1-파일-업로드-및-uri-확인) API 에서 응답받은 정보  | Array | true | - |
| files[].uri | 업로드된 파일의 고유 식별자 | String | true | - |
| files[].fileName | 원본 파일 이름 | String | true | - |
| options | 비디오 생성에 사용할 구성 | Json | false | {} |
| options.goal | 비디오 생성의 목적 | 'auto', 'business', 'youtube', 'education' | false | 'business' |
| options.duration | 비디오 시간 | 'auto', '30', '60', '90', '120' | false | 'auto' |
| options.speed | 원래 속도와 비교한 비디오 재생 속도 | 'auto', Number | false | - |
| options.language | 비디오에 사용된 언어입니다. <br/>언어 코드는 [ISO 639-1](https://www.loc.gov/standards/iso639-2/php/code_list.php) 표준을 따릅니다. | 'auto', String | false | - |
| options.media | 비디오 생성에 사용된 이미지 정보 (options.filebackground=false 경우에만 유효) | 'auto', 'search', 'free', 'generative' | false | - |
| options.style | 스타일 정보 (options.media='generative' 경우에만 유효) | 'auto', 'business', 'youtube', 'education' | false | - |
| options.fileBackground | 동영상 배경에 제공한 파일을 사용할지 여부 | Boolean | false | true |
| options.orientation | 생성된 비디오의 화면 방향 | 'web', 'mobile' | false | 'web' |
| options.model | 비디오 생성에 사용할 AI 모델의 ID |  |  |  |

### 2-3. Response Parameters
| key | desc | type |
| --- | --- | --- |
| projectId | 생성된 비디오 프로젝트의 ID | String |

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
<br/>

## 4. 내보내기
생성된 프로젝트를 동영상 내보내기 할려면 [프로젝트 내보내기](/aistudioV3/reference/export-project) 이용하세요.