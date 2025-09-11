# Confirm authentication

Confirm authentication information by checking if your api key is valid.

<br/>

## 1. API endpoint

```http
https://app.aistudios.cn/api/odin/v3/auth
```

<br/>

## 2. Response parameters

|key|desc|type|
|:---|:---|:---|
|isAuthenticated|Whether the API key is valid.|Boolean|

<br/>


## 3. Sample Request

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl https://app.aistudios.cn/api/odin/v3/auth  \
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

axios.get('https://app.aistudios.cn/api/odin/v3/auth', 
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

url = "https://app.aistudios.cn/api/odin/v3/auth"

headers = {
  "Content-Type": "application/json",
  "Authorization": ${API TOKEN}
}

r = requests.get(url, data=json.dumps(body), headers=headers)
```

</TabItem>
</Tabs>
