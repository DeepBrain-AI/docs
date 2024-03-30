---
sidebar_position: 13
---

# Export AI Audio

<br/>

The audio export section shows you how to send an API request in JSON format to create an audio file with the AI Model's voice.

## 1. API endpoint

```http
https://app.deepbrain.io/api/odin/v3/simple/audio
```

<br/>

## 2. Request parameter

|key|desc|type|required|default|
|:---|:---|:---|:---|:---|
|language|Langauge of the script is written in.|String|true|-|
|text|Text for AI to read. It must match the langauge of your selected model.|String|true|-|
|model|AI Model to be used.|String|true|-|
|tts|External TTS information that is not the default voice of the model.|Json|false|-|

<br/>

## 3. Response parameters

|key|desc|type|
|:---|:---|:---|
|fileName|Name of audio file created.|String|
|downloadUrl|Download path of the file created.|String|
|metaList|Metadata of the file created.|Array(json)|

<br/>

## 4. Sample Request

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl https://app.deepbrain.io/api/odin/v3/simple/audio  \
-H "Authorization: ${API KEY}" \
-H "Content-Type: application/json" \
-X POST \
-d '{
      "language": "en",
      "text": "Hello, this is test video",
      "model": "M000045058"
    }'
```

</TabItem>
<TabItem value="js" label="Node.js">

```js
import axios from "axios";
const token = ${API KEY};

axios.post('https://app.deepbrain.io/api/odin/v3/simple/audio', 
  {
    "language": "en",
    "text": "Hello, this is test video",
    "model": "M000045058"
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

url = "https://app.deepbrain.io/api/odin/v3/simple/audio"
body = {
  "language": "en",
  "text": "Hello, this is test video",
  "model": "M000045058"
}
    
headers = {
  "Content-Type": "application/json",
  "Authorization": ${API TOKEN}
}

r = requests.post(url, data=json.dumps(body), headers=headers)
```

</TabItem>
</Tabs>
