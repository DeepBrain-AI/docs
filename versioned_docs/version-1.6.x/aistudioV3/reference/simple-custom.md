# Export Custom Avatar

<br/>

The custom avatar export function describes the process of outputting video through an API request in JSON format so that video can be produced using custom avatars created by users.

## 1. API endpoint

```http
https://app.aistudios.com/api/odin/v3/simple/custom
```

<br/>

## 2. Request parameter

| key | desc | type | required | default |
| :--- | :--- | :--- | :--- | :--- |
| language | Language of the script you created | String | true | - |
| text | The script that the model will utter | String | true | - |
| model | ID of the custom avatar model to use | String | true | - |
| isExport | Whether this project will be exported. <br />(Expose to the [project dashboard](https://app.aistudios.com/dashboard) if false) | Boolean | false | true |
| workspaceId | [Workspace](./workspaces) Unique identifier ID | String | false | - |
| resolution | Video Quality <br />(`4k` \| `1080` \| `720` \| `480`) | String | false | 1080 |
| [webhookUrl](../reference/webhook) | Address to send composite results | String | false | - |


<br/>

## 3. Response parameters

| key | desc | type |
| :--- | :--- | :--- |
| projectId | Project ID of the chroma key that made the export request | String |
| taskId | Task ID that made the export request | String |

<br/>


## 4. Sample Request

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl https://app.aistudios.com/api/odin/v3/simple/custom  \
-H "Authorization: ${API KEY}" \
-H "Content-Type: application/json" \
-X POST \
-d '{
      "language": "en",
      "text": "Sample Script",
      "model": "M000045058",
      "webhookUrl": ${webhook_delivery_address}
    }'
```

</TabItem>
<TabItem value="js" label="Node.js">

```js
import axios from "axios"; 
const token = ${API KEY};
const customWebhookUrl = ${webhook_delivery_address};

axios.post('https://app.aistudios.com/api/odin/v3/simple/custom', 
  {
    "language": "en",
    "text": "Sample Script",
    "model": "M000045058",
    "webhookUrl": `${customWebhookUrl}`
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

url = "https://app.aistudios.com/api/odin/v3/simple/custom"
body = {
  "language": "en",
  "text": "Sample Script",
  "model": "M000045058",
  "webhookUrl": ${webhook_delivery_address}
}
    
headers = {
  "Content-Type": "application/json",
  "Authorization": ${API TOKEN}
}

r = requests.post(url, data=json.dumps(body), headers=headers)
```

</TabItem>
</Tabs>
