# Retrieve business templates

Retrieve the list of pre-setted project information (i.e. templates) that can be utilized to create videos with business purposes.

<br/>

## 1. API endpoint

```http
https://app.aistudios.com/api/odin/v3/dropdown/templates_business
```

<br/>

## 2. Response parameters

|key|desc|type|
|:---|:---|:---|
|id|Unique ObjectId of the AI model| String|
|name|Name of the template|String|

<br/>


## 3. Sample Request

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl https://app.aistudios.com/api/odin/v3/dropdown/templates_business \
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

axios.get('https://app.aistudios.com/api/odin/v3/dropdown/templates_business', 
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

url = "https://app.aistudios.com/api/odin/v3/dropdown/templates_business"

headers = {
  "Content-Type": "application/json",
  "Authorization": ${API TOKEN}
}

r = requests.get(url, data=json.dumps(body), headers=headers)
```

</TabItem>
</Tabs>
