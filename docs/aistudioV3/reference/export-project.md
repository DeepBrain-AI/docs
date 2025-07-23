# Export project

Export existing video project. Exported project will be ready for download eventually. This API endpoint is intended to send export request to the backend server of the AI Studios backend server. To retrieve its download url, use the [get project endpoint](../reference/get-project.md) or the [get-projects endpoint](../reference/get-projects.md). Video export may take up to 10 minutes depend on its data size (e.g. number of scenes).

<br/>

## 1. API endpoint

```http
https://app.aistudios.com/api/odin/v3/editor/project/export
```

<br/>

## 2. Request parameters

| key | desc | type | required | default |
| :--- | :--- | :--- | :--- | :--- |
| projectId | Unique ObjectId of the video project to be exported | String | true | - |
| workspaceId | [Workspace](./workspaces) Unique identifier ID | String | false | - |
| resolution | Video Quality <br />(`4k` \| `1080` \| `720` \| `480`) | String | false | 1080 |
| [webhookUrl](../reference/webhook) | Url address where the export result should be sent. | String |false | - |

<br/>

## 3. Response parameters

| key | desc | type |
| :--- | :--- | :--- |
| projectId | Project Id - Fetching the video project data that has been exported. | String |

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

## 5. Full Code
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