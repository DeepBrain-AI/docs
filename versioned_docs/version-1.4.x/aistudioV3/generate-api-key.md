---
sidebar_position: 2
---

# Generate API Key

**You need an API Key to use the AI Studios V3 API.**

Get your API Key now and automate your video export process.

The AI Studios V3 API is available for customers on the Enterprise Plan and above.

## 1. API endpoint

```http
https://app.deepbrain.io/api/odin/v3/auth/token
```

<br/>

## 2. Request parameter

|key|desc|type|required|default|
|:---|:---|:---|:---|:---|
|appId|AppId required to issue Api Token. You can check it in the profile.|String|true|-|
|userKey|UserKey required to issue Api Token. You can check it in the profile.|String|true|-|

[Check AppId, UserKey](https://account.deepbrain.io/user/api-key)

<br/>

## 3. Response parameters

|key|desc|type|
|:---|:---|:---|
|token|The Api Access Token used for Api calls.|String|

<br/>


## 4. Sample Request

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl https://app.deepbrain.io/api/odin/v3/auth/token  \
-H "Content-Type: application/json" \
-X POST \
-d '{
      "appId": "##YOUR_APP_ID##",
      "userKey": "##YOUR_USER_KEY##"
    }'
```

</TabItem>
<TabItem value="js" label="Node.js">

```js
import axios from "axios"; 

axios.post(`https://app.deepbrain.io/api/odin/v3/auth/token`, 
  {
    "appId": "##YOUR_APP_ID##",
    "userKey": "##YOUR_USER_KEY##"
  },
  {
    headers: {
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

url = "https://app.deepbrain.io/api/odin/v3/auth/token"
body = {
  "appId": "##YOUR_APP_ID##",
  "userKey": "##YOUR_USER_KEY##"
}
headers = {
  "Content-Type": "application/json"
}

r = requests.post(url, data=json.dumps(body), headers=headers)
```

</TabItem>
</Tabs>
