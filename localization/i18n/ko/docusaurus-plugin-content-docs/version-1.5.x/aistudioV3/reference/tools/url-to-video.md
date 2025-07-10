# URL to Video
주어진 URL을 분석하여 동영상 콘텐츠를 생성하는 과정을 설명합니다.

<br/>

## 1. 프로젝트생성 요청
URL과 옵션을 전달하여 프로젝트생성 요청하세요.

### 1-1. API endpoint
```http
https://app.aistudios.com/api/odin/v3/automation/url_to_video
```

### 1-2. Request parameter
| key | desc | type | required | default | 
| :--- | :--- | :--- | :--- | :--- | 
| url | 동영상 생성을 위한 참조 URL | String | true | - | 
| options | 비디오 생성에 사용할 구성 | Json | false | {} |
| options.language | 비디오에 사용된 언어<br />언어 코드는 [ISO 639-1](https://www.loc.gov/standards/iso639-2/php/code_list.php) 표준을 따릅니다. | String | false | - |
| options.duration | 비디오 시간<br />(`30` \| `60` \| `90` \| `120` \| `150` \| `180`) | Number | false | - |
| options.objective | 비디오 영상의 목표 (예. 홍보, 교육, 설명) | String | false | - |
| options.audience | 비디오 영상의 대상 청중(예. 마케터, 학생) | String | false | - |
| options.tone | 비디오 영상의 어조(예. 명확하게, 격식있게) | String | false | - |
| options.speed | 원래 속도와 비교한 비디오 재생 속도<br />(`0.5 ~ 1.5`) | Number | false | 1 |
| options.media | 비디오 생성에 사용된 이미지 정보<br />(`search` \| `free` \| `premium` \| `generative`) | String | false | - |
| options.useGenerativeHighQuality | 고화질 AI 미디어 활성화<br />(options.media='generative' 경우에만 유효)<br />(`true` \| `false`) | Boolean | false | false |
| options.style | 스타일 정보<br />(options.media='generative' 경우에만 유효)<br />(`realistic` \| `digitalPainting` \| `sketch` \| `oilPainting` \| `pixelArt` \| `watercolor` \| `lowPoly` \| `cyberpunk` \| `fantasy` \| `anime`) | String | false | realistic |
| options.templateId | 비디오 생성에 사용할 [템플릿ID](../templates-automation) | String | false | - |
| options.model | 비디오 생성에 사용할 [모델ID](../models) | String | false | - |
| options.voiceOnly | 비디오 생성에 사용된 모델의 목소리만<br />(`true` \| `false`) | Boolean | false | false |

<!-- | options.goal | 비디오 생성의 목적<br />(`business` \| `youtube` \| `education`) | String | false | auto | -->

### 1-3. Response parameters
| key | desc | type | 
| :--- | :--- | :--- | 
| projectId | 동영상 생성 요청한 프로젝트 ID | String | 
| automationJobId | 동영상 생성 요청한 작업 ID | String | 

### 1-4. Sample Request

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl https://app.aistudios.com/api/odin/v3/automation/url_to_video  \
-H "Authorization: ${API KEY}" \
-H "Content-Type: application/json" \
-X POST \
-d '{
    "url" : "https://www.futurelearn.com/info/courses/the-rise-of-k-culture-discover-the-korean-wave-hallyu/0/steps/369144",
    "options" : {
        "language": "en",
        "speed": 1,
        "templateId": "## template id ##",
        "model": "## model id ##",
        "voiceOnly": false
    }
}'
```

</TabItem>
<TabItem value="js" label="Node.js">

```js
import axios from "axios"; 
const token = ${API KEY};
const customWebhookUrl = ${webhook_delivery_address};

axios.post('https://app.aistudios.com/api/odin/v3/automation/url_to_video', 
    {
        "url" : "https://www.futurelearn.com/info/courses/the-rise-of-k-culture-discover-the-korean-wave-hallyu/0/steps/369144",
        "options" : {
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

</TabItem>
<TabItem value="py" label="Python">

```py
import requests
import json

url = "https://app.aistudios.com/api/odin/v3/automation/url_to_video"
body = {
    "url" : "https://www.futurelearn.com/info/courses/the-rise-of-k-culture-discover-the-korean-wave-hallyu/0/steps/369144",
    "options" : {
        "language": "en",
        "speed": 1,
        "templateId": "## template id ##",
        "model": "## model id ##",
        "voiceOnly": false
    }
}
    
headers = {
  "Content-Type": "application/json",
  "Authorization": ${API TOKEN}
}

r = requests.post(url, data=json.dumps(body), headers=headers)
```

</TabItem>
</Tabs>

<br/>
<br/>

## 2. 프로젝트생성 진행상황 확인
요청후 동영상 생성 현재 진행 상황을 확인합니다.

### 2-1. Api endpoint
```http
GET https://app.aistudios.com/api/odin/v3/automation/progress?projectId=${projectId}
```

### 2-2. Response Parameters
| Key | Description | Type |
| --- | --- | --- |
| state | 자동화 프로세스의 현재 상태 | String |
| progress | 비디오 생성 완료 비율 | Number |

### 2-3. Sample request
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

## 3. 내보내기
생성된 프로젝트를 동영상 내보내기 할려면 [프로젝트 내보내기](/aistudioV3/reference/export-project) 이용하세요.
<br/>
<br/>


## 4. 전체코드
```javascript
const API_HOST = 'https://app.aistudios.com'

const GET_TOKEN_API_PATH = '/api/odin/v3/auth/token'
const CREATE_API_PATH = '/api/odin/v3/automation/topic_to_video'
const CREATE_PROGRESS_API_PATH = '/api/odin/v3/automation/progress'
const EXPORT_API_PATH = '/api/odin/v3/editor/project/export'
const EXPORT_PROGRESS_API_PATH = '/api/odin/v3/editor/progress'

const appId = '## your appId ##'
const userKey = '## your userKey ##'

const url = "https://www.futurelearn.com/info/courses/the-rise-of-k-culture-discover-the-korean-wave-hallyu/0/steps/369144";
const options = {
    "language": "en",
    // "duration": 60,
    // "objective": "education",
    // "audience": "students",
    // "tone": "clearly",
    "speed": 1,
    // "media": "generative",
    // "useGenerativeHighQuality": true,
    // "style": "digitalPainting",
    "templateId": "## template id ##",
    "model": "## model id ##", // Michael
    "voiceOnly": false,
};

const delay = async (ms = 1000 * 60) => {
    await new Promise(r => setTimeout(r, ms))
}

const main = async () => {
    try {
        /**
         * get api token
         */
        const token = await fetch(
            `${API_HOST}${GET_TOKEN_API_PATH}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    appId,
                    userKey
                })
            }
        )
            .then((response) => response.json())
            .then((response) => {
                if (response.success == true) {
                    return response.data.token
                } else {
                    console.error(`import authentication token error, code:`, response.error.code, `, msg:`, response.error.msg);
                    throw Error(response);
                }
            });

        console.log('token : ', token);

        /**
         * create project
         */
        const projectId = await fetch(
            `${API_HOST}${CREATE_API_PATH}`,
            {
                method: 'POST',
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "url": url,
                    "options": options
                })
            }
        )
            .then((response) => response.json())
            .then((response) => {
                if (response.success == true) {
                    return response.data.projectId
                } else {
                    console.error(`create project error, code:`, response.error.code, `, msg:`, response.error.msg);
                    throw Error(response);
                }
            });

        console.log('request create project, projectId : ', projectId);

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

            console.log('project creation progress, state: ', progressData.state, ', progress : ', progressData.progress);

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

            console.log(`export `, progressData.state, `, progress : `, progressData.progress)

            if (progressData.progress < 100) {
                await delay()
            } else {
                videoUrl = progressData.downloadUrl
                isExportFinish = true
            }
        }

        console.log('videoUrl :', videoUrl);
    } catch (error) {
        // ...
    }

    console.log('finish');
}

main()
```
