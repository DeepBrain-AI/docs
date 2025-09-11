# 프로젝트 내보내기

기존 비디오 프로젝트를 내보냅니다. 내보내기된 프로젝트는 결국 다운로드할 수 있게 됩니다. 이 API 엔드포인트는 AI Studios 백엔드 서버의 백엔드 서버로 내보내기 요청을 보내기 위한 것입니다. 다운로드 URL을 조회하려면 [get project 엔드포인트](../reference/get-project.md) 또는 [get-projects 엔드포인트](../reference/get-projects.md)를 사용하세요. 비디오 내보내기는 데이터 크기(예: 장면 수)에 따라 최대 10분이 소요될 수 있습니다.

<br/>

## 1. API Endpoint

```http
https://app.aistudios.com/api/odin/v3/editor/project/export
```

<br/>

## 2. Request Parameters

| key | desc | type | required | default |
| :--- | :--- | :--- | :--- | :--- |
| projectId | 내보낼 비디오 프로젝트의 고유 ObjectId | String | true | - |
| workspaceId | [작업공간](./workspaces) 고유식별자 ID | String | false | - |
| resolution | 비디오 품질 <br />(`4k` \| `1080` \| `720` \| `480`) | String | false | 1080 |
| [webhookUrl](../reference/webhook) | 내보내기 결과를 보낼 URL 주소. | String | false | - |

<br/>

## 3. Response Parameters

| key | desc | type |
| :--- | :--- | :--- |
| projectId | 프로젝트 ID - 내보내기된 비디오 프로젝트 데이터를 가져옵니다. | String |

<br/>


## 4. Sample Request

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl https://app.aistudios.com/api/odin/v3/editor/project/export  \
-H "Authorization: ${API KEY}" \
-H "Content-Type: application/json" \
-X POST \
-d '{
    "projectId":"65fa6b07dca2e367461a2925",
  }, '
```

</TabItem>
<TabItem value="js" label="Node.js">

```js
import axios from "axios";
const token = ${API KEY};
const customWebhookUrl = ${webhook_delivery_address};

axios.post('https://app.aistudios.com/api/odin/v3/editor/project/export',
  {
    "projectId":"65fa6b07dca2e367461a2925",
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

url = "https://app.aistudios.com/api/odin/v3/editor/project/export"
body = {
    "projectId":"65fa6b07dca2e367461a2925",
  },
headers = {
  "Content-Type": "application/json",
  "Authorization": ${API TOKEN}
}

r = requests.post(url, data=json.dumps(body), headers=headers)
```

</TabItem>
</Tabs>

<br />

## 5. 전체코드
```javascript
const axios = require('axios');

const GET_TOKEN_API_PATH = '/api/odin/v3/auth/token'
const EXPORT_API_PATH = '/api/odin/v3/editor/project/export'
const EXPORT_PROGRESS_API_PATH = '/api/odin/v3/editor/progress'

const delay = async (ms = 1000 * 60) => {
  await new Promise(r => setTimeout(r, ms))
}

const appId = '## your appId ##';
const userKey = '## your userKey ##';
const body = {
  projectId : '## project id ##',
  // workspaceId : '## workspace id ##',
  // resolution: '## resolution ##',
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

    console.log(`token:`, token);


    /**
     * export project
     */
    const projectId = await fetch(
      `${API_HOST}${EXPORT_API_PATH}`,
      {
        method: 'POST',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
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

    console.log('request export project:', projectId);


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