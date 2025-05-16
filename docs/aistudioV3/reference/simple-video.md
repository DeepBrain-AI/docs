---
sidebar_position: 12
---

# Export Chroma key Video

<br/>

The chroma-key export section shows how to send an API request in JSON format to export a chormakey video that only contains the AI Model.

## 1. API endpoint

```http
https://app.aistudios.com/api/odin/v3/simple/video
```

<br/>

## 2. Request parameter

|key|desc|type|required|default|
|:---|:---|:---|:---|:---|
|language|The langauge the script is written in.|String|true|-|
|text|Text for AI to read. It must match the langauge of your selected model.|String|true|-|
|model|Ther AI Model to be used.|String|true|-|
|clothes|Clothes that the AI Model will wear.|String|true|-|
|ttsType|External TTS information that is not the default voice of the model.|Json|false|-|
|isExport|Whether this project will be exported. Expose to the [project](https://app.aistudios.com/dashboard) if false|Boolean|false|false|
|[webhookUrl](../reference/webhook)|Url address where the synthesis result should be sent.|String|false|-|


<br/>

## 3. Response parameters

|key|desc|type|
|:---|:---|:---|
|projectId|Project Id - Fetching the Chroma-key video data that has been exported.|String|

<br/>


## 4. Sample Request

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl https://app.aistudios.com/api/odin/v3/simple/video  \
-H "Authorization: ${API KEY}" \
-H "Content-Type: application/json" \
-X POST \
-d '{
      "language": "en",
      "text": "Sample Script",
      "model": "M000045058",
      "clothes": "BG00002320",
      "isExport" : true,
      "webhookUrl": ${webhook_delivery_address}
    }'
```

</TabItem>
<TabItem value="js" label="Node.js">

```js
import axios from "axios"; 
const token = ${API KEY};
const customWebhookUrl = ${webhook_delivery_address};

axios.post('https://app.aistudios.com/api/odin/v3/simple/video', 
  {
    "language": "en",
    "text": "Sample Script",
    "model": "M000045058",
    "clothes": "BG00002320",
    "isExport" : true,
    "webhookUrl": `${customWebhookUrl}`
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

url = "https://app.aistudios.com/api/odin/v3/simple/video"
body = {
  "language": "en",
  "text": "Sample Script",
  "model": "M000045058",
  "clothes": "BG00002320",
  "isExport" : true,
  "webhookUrl": ${webhook_delivery_address}
}
    
headers = {
  "Content-Type": "application/json",
  "Authorization": ${API TOKEN}
}

r = requests.post(url, data=json.dumps(body), headers=headers)
```

</TabItem>
</Tabs>
