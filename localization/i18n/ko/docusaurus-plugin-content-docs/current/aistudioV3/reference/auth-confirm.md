# 인증 확인

API 키가 유효한지 확인하여 인증 정보를 확인합니다.

<br/>

## 1. API Endpoint

```http
https://app.aistudios.com/api/odin/v3/auth
```

<br/>

## 2. Response Parameters

|key|desc|type|
|:---|:---|:---|
|isAuthenticated|API 키의 유효성 여부.|Boolean|

<br/>


## 3. Sample Request

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl https://app.aistudios.com/api/odin/v3/auth  \
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

axios.get('https://app.aistudios.com/api/odin/v3/auth', 
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

url = "https://app.aistudios.com/api/odin/v3/auth"

headers = {
  "Content-Type": "application/json",
  "Authorization": ${API TOKEN}
}

r = requests.get(url, data=json.dumps(body), headers=headers)
```

</TabItem>
</Tabs>

Note: The professional terms, URLs, parameter keys, and proper nouns have been left untranslated as requested.