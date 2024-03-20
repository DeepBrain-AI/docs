---
sidebar_position: 15
---

# Retrieve projects

Retrieve the list of video projects associated current account that have been already exported. Video project in the list are ready to be downloaded.

<br/>

## 1. API endpoint

```http
http://app.deepbrain.io/api/odin/balder/projects
```

<br/>

## 2. Response parameters
|key|desc|type|
|:---|:---|:---|
|id|Unique identifier of the video project|String|
|name|Name of the project|String|
|state|Export state of the project. This field should be "exported" to be ready for download|String|
|download_url|Download path of the file created.|String|

<br/>


## 3. Sample Request

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```js
curl http://app.deepbrain.io/api/odin/balder/projects  \
-H "Authorization: ${API KEY}" \
-H "Content-Type: application/json" \
-X GET 
```

</TabItem>
<TabItem value="js" label="Node.js">

```js
import axios from "axios";
const token = ${API KEY};
const customWebhookUrl = ${webhook_delivery_address};

axios.get('http://app.deepbrain.io/api/odin/balder/projects', 
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

url = "http://app.deepbrain.io/api/odin/balder/projects"

headers = {
  "Content-Type": "application/json",
  "Authorization": ${API TOKEN}
}

r = requests.get(url, data=json.dumps(body), headers=headers)
```

</TabItem>
</Tabs>
