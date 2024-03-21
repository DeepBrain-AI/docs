---
sidebar_position: 17
---

# Export simple video

Create a simple chroma-key video. Users can select model to be used and the script spoken by the model within the video. The created video must be exported to be available for download. You can see & edit created video at [AI Studio by Deepbrain AI](https://app.deepbrain.io).

<br/>

## 1. API endpoint

```http
http://app.deepbrain.io/api/odin/balder/template/create_simple
```

<br/>

## 2. Request parameter

|key|desc|type|required|default|
|:---|:---|:---|:---|:---|
|model|Unique ObjectId of the ai model present in the video|String|true|-|
|text|Script of the video|String|true|-|

<br/>

## 3. Response parameters

|key|desc|type|
|:---|:---|:---|
|projectId|Project Id - Fetching the video project data that has been exported.|String|

<br/>


## 4. Sample Request

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```js
curl http://app.deepbrain.io/api/odin/balder/template/create_simple  \
-H "Authorization: ${API KEY}" \
-H "Content-Type: application/json" \
-X POST \
-d '{
    "model" : "M000005031",
    "text" : "This is the sample script. This text will be read by the AI Model in the video."
    }'
```

</TabItem>
<TabItem value="js" label="Node.js">

```js
import axios from "axios";
const token = ${API KEY};
const customWebhookUrl = ${webhook_delivery_address};

axios.post('http://app.deepbrain.io/api/odin/balder/template/create_simple', 
  {
    "model" : "M000005031",
    "text" : "This is the sample script. This text will be read by the AI Model in the video."
  }, 
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

url = "http://app.deepbrain.io/api/odin/balder/template/create_simple"
body = {
    "model" : "M000005031",
    "text" : "This is the sample script. This text will be read by the AI Model in the video."
}
headers = {
  "Content-Type": "application/json",
  "Authorization": ${API TOKEN}
}

r = requests.post(url, data=json.dumps(body), headers=headers)
```

</TabItem>
</Tabs>
