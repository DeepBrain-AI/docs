---
sidebar_position: 15
---

# Check download url

<br/>

Check if a selected project is ready for download and retrieve its status along with download url.

## 1. API endpoint

```http
http://app.deepbrain.io/api/odin/balder/check_url/${projectId}
```

<br/>

## 2. Request parameter

|key|desc|type|required|default|
|:---|:---|:---|:---|:---|
|projectId|Id of the video project.|String|true|-|


<br/>

## 3. Response parameters

|key|desc|type|
|:---|:---|:---|
|projectId|Id of the video project.|String|
|downloadUrl|Download path of the file created. Undefined if the download url does not exist|String|
|completed|Whether this video is ready for download.|Bool|

<br/>

## 4. Sample Request

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl http://app.deepbrain.io/api/odin/balder/check_url/${projectId}  \
-H "Authorization: ${API KEY}" \
-H "Content-Type: application/json" \
-X GET
```

</TabItem>
<TabItem value="js" label="Node.js">

```js
import axios from "axios";
const token = ${API KEY};

axios.get('http://app.deepbrain.io/api/odin/balder/check_url/${projectId}', 
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

url = "http://app.deepbrain.io/api/odin/balder/check_url/${projectId}"
headers = {
  "Content-Type": "application/json",
  "Authorization": ${API TOKEN}
}

r = requests.get(url, data=json.dumps(body), headers=headers)
```

</TabItem>
</Tabs>
