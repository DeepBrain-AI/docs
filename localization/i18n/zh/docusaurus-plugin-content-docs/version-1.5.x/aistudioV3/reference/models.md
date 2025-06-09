# Retrieve models

Retrieve the list of valid AI models that can appear video projects.

<br/>

## 1. API endpoint

```http
https://app.aistudios.cn/api/odin/v3/dropdown/models
```

<br/>

## 2. Response parameters

|key|desc|type|
|:---|:---|:---|
|id|Unique identifier of the AI model| String|
|label|User-friendly label of the AI model|String|
|avatarType|Type of AI Model|String|

<br/>


## 3. Sample Request

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl https://app.aistudios.cn/api/odin/v3/dropdown/models  \
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

axios.get('https://app.aistudios.cn/api/odin/v3/dropdown/models',
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

url = "https://app.aistudios.cn/api/odin/v3/dropdown/models"

headers = {
  "Content-Type": "application/json",
  "Authorization": ${API TOKEN}
}

r = requests.get(url, data=json.dumps(body), headers=headers)
```

</TabItem>
</Tabs>
