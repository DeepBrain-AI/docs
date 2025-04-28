---
sidebar_position: 2
---

# API 키 발급하기

**AI Studio V3 API를 사용하려면 API Key가 필요합니다.**  

API 키를 생성해서 비디오 내보내기 프로세스 자동화를 경험해 보세요.

AI Studio V3 API는 API Key 를 발급 받은 고객이라면 이용할 수 있습니다.

## 1. API endpoint

```http
https://app.aistudios.com/api/odin/v3/auth/token
```

<br/>

## 2. Request parameter

|key|desc|type|required|default|
|:---|:---|:---|:---|:---|
|appId|Api Token 발급에 필요한 AppId. Profile에서 확인이 가능합니다.|String|true|-|
|userKey|Api Token 발급에 필요한 userKey. Profile에서 확인이 가능합니다.|String|true|-|

[AppId, UserKey 확인하기](https://account.aistudios.com/user/api-key)

<br/>

## 3. Response parameters

|key|desc|type|
|:---|:---|:---|
|token|Api 호출에 사용하는 Api Access Token.|String|

<br/>


## 4. Sample Request

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl https://app.aistudios.com/api/odin/v3/auth/token  \
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

axios.post(`https://app.aistudios.com/api/odin/v3/auth/token`, 
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

url = "https://app.aistudios.com/api/odin/v3/auth/token"
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
