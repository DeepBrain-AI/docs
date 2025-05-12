# Topic to Video
주제를 전달하여 동영상 콘텐츠를 생성하는 과정을 설명합니다.

<br/>

## 1. 프로젝트생성 요청
주제와 옵션을 전달하여 프로젝트생성 요청하세요.

### 1-1. API endpoint
```http
https://app.aistudios.com/api/odin/v3/automation/topic_to_video
```

### 1-2. Request parameter
| key | desc | type | required | default | 
| :--- | :--- | :--- | :--- | :--- | 
| topic | 동영상 생성을 위한 주제 | String | true | - | 
| options | 비디오 생성에 사용할 구성 | Json | false | {} |
| options.goal | 비디오 생성의 목적 | 'auto', 'business', 'youtube', 'education' | false | 'business' |
| options.duration | 비디오 시간 | 'auto', '30', '60', '90', '120' | false | 'auto' |
| options.speed | 원래 속도와 비교한 비디오 재생 속도 | 'auto', Number | false | - |
| options.language | 비디오에 사용된 언어입니다. <br/>언어 코드는 [ISO 639-1](https://www.loc.gov/standards/iso639-2/php/code_list.php) 표준을 따릅니다. | 'auto', String | false | - |
| options.media | 비디오 생성에 사용된 이미지 정보 (options.filebackground=false 경우에만 유효) | 'auto', 'search', 'free', 'generative' | false | - |
| options.style | 스타일 정보 (options.media='generative' 경우에만 유효) | 'auto', 'business', 'youtube', 'education' | false | - |
| options.orientation | 생성된 비디오의 화면 방향 | 'web', 'mobile' | false | 'web' |
| options.model | 비디오 생성에 사용할 AI 모델의 ID |  |  |  |

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
curl https://app.aistudios.com/api/odin/v3/automation/topic_to_video  \
-H "Authorization: ${API KEY}" \
-H "Content-Type: application/json" \
-X POST \
-d '{
    "topic" : "What is K-culture?",
    "options" : {
        "goal" : "youtube",
        "duration" : 30, 
    }
}'
```

</TabItem>
<TabItem value="js" label="Node.js">

```js
import axios from "axios"; 
const token = ${API KEY};
const customWebhookUrl = ${webhook_delivery_address};

axios.post('https://app.aistudios.com/api/odin/v3/automation/topic_to_video', 
    {
        "topic" : "What is K-culture?",
        "options" : {
            "goal" : "youtube",
            "duration" : 30, 
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

url = "https://app.aistudios.com/api/odin/v3/automation/topic_to_video"
body = {
    "topic" : "What is K-culture?",
    "options" : {
        "goal" : "youtube",
        "duration" : 30, 
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