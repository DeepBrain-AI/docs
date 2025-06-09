# Export project

Export existing video project. Exported project will be ready for download eventually. This API endpoint is intended to send export request to the backend server of the AI Studios backend server. To retrieve its download url, use the [get project endpoint](../reference/get-project.md) or the [get-projects endpoint](../reference/get-projects.md). Video export may take up to 10 minutes depend on its data size (e.g. number of scenes).

<br/>

## 1. API endpoint

```http
https://app.aistudios.cn/api/odin/v3/editor/project/export
```

<br/>

## 2. Request parameters

|key|desc|type|required|default|
|:---|:---|:---|:---|:---|
|projectId|Unique ObjectId of the video project to be exported|String|true|-|
|[webhookUrl](../reference/webhook)|Url address where the export result should be sent.|String|false|-|

<br/>

## 3. Response parameters

|key|desc|type|
|:---|:---|:---|
|projectId|Project Id - Fetching the video project data that has been exported.|String|

<br/>


## 4. Sample Request

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl https://app.aistudios.cn/api/odin/v3/editor/project/export  \
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

axios.post('https://app.aistudios.cn/api/odin/v3/editor/project/export', 
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

url = "https://app.aistudios.cn/api/odin/v3/editor/project/export"
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
