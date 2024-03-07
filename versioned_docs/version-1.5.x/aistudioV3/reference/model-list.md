# Get Model List

The get model list section demonstrates how to retrieve information about AI models that can be used to create a project through the API.

<br/>

## 1. API endpoint

```http
https://app.deepbrain.io/api/odin/v3/model
```

<br/>

## 2. Response parameters

|key|desc|type|
|:---|:---|:---|
|models|Information about synthetic models|Array(json)|
|models[].id|Unique key of the AI model|String|
|models[].label|Name information of the AI model|Json|
|models[].label.ko|Korean notation|String|
|models[].label.en|English notation|String|
|models[].thumbnail|Image path for previewing the model|String|
|models[].clothes|Clothes information|Array(json)|
|models[].clothes[].id|Clothes that the AI Model will wear.|String|
|models[].clothes[].label|Name of clothes|Json|
|models[].clothes[].label.ko|Korean notation|String|
|models[].clothes[].label.en|English notation|String|
|models[].clothes[].thumbnail|Image path for previewing the clothes|String|

<br/>


## 3. Sample Request

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl https://app.deepbrain.io/api/odin/v3/model  \
-H "Authorization: ${API KEY}" \
-H "Content-Type: application/json" \
-X GET
```

</TabItem>
<TabItem value="js" label="Node.js">

```js
import axios from "axios"; 
const token = ${API KEY};

axios.get(`https://app.deepbrain.io/api/odin/v3/model`, 
  {
    headers: {
      'Authorization': `${token}`,
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

url = "https://app.deepbrain.io/api/odin/v3/model"

headers = {
  "Content-Type": "application/json",
  "Authorization": ${API TOKEN}
}

r = requests.get(url, headers=headers)
```

</TabItem>
</Tabs>
