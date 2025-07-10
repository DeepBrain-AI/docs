# Retrieve automation templates

Query the list of templates used when using [Docs To Video](./tools/docs-to-video) / [Topic To Video](./tools/topic-to-video) / [Url To Video](./tools/url-to-video) / [Scripts To Video](./tools/scripts-to-video)

<br/>

## 1. API Endpoint

```http
https://app.aistudios.com/api/odin/v3/dropdown/templates_automation
```

<br/>

## 2. Request Parameters

| key | desc | type | required | default |
| :--- | :--- | :--- | :--- | :--- |
| category | Template Category **_`Info`_** | String | true | - |
| orientation | Template orientation<br />(`web` \| `mobile`) | String | false | web |
| fileBackground | Whether to use document content as background use after document upload<br />(`true` \| `false`) | String | false | false |

:::info
- **Allow per request category**<br />
  - Docs to video : `business` \| `education`
  - [Topic / Url / Scripts] to video : `social` \| `business` \| `education`

- **File Background** option is for the **Docs to video** that uploads the document.
:::

<br/>

## 3. Response Parameters

| key | desc | type | 
| :--- | :--- | :--- | 
| id | Unique ID of the template | String | 
| name | Name of the template | String | 
| thumbnailUrl | Template image | String | 

<br/>


## 4. Sample Request

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl https://app.aistudios.com/api/odin/v3/dropdown/templates_automation \
-H "Authorization: ${API KEY}" \
-H "Content-Type: application/json" \
-X POST \
-G \
-d '{
  "category": "social",
  "orientation": "web",
  "fileBackground": false
}'
```

</TabItem>
<TabItem value="js" label="Node.js">

```js
import axios from "axios";
const token = ${API KEY};

axios.post('https://app.aistudios.com/api/odin/v3/dropdown/templates_automation', 
  {
    headers: {
      'Authorization': ${token},
      'Content-Type': 'application/json'
    },
    params: {
      "category": "social",
      "orientation": "web",
      "fileBackground": false
    },
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

url = "https://app.aistudios.com/api/odin/v3/dropdown/templates_automation"
params = {
  "category": "social",
  "orientation": "web",
  "fileBackground": false
}
headers = {
  "Content-Type": "application/json",
  "Authorization": ${API TOKEN}
}

r = requests.post(url, data=json.dumps(body), headers=headers)
```

</TabItem>
</Tabs>