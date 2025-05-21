# Export AI Dubbing

Convert the video to the language you want! When you upload the file, you'll get dubbing and precise lip sync translated into the language you choose, and you'll be able to check your progress in real time. (China will be available later)<br/>

## 1. File upload and dub request


### 1-1. API endpoint

```http
https://app.aistudios.com/api/odin/v3/automation/translatevideos
```

### 1-2. Request parameter
| key | desc | type | required | default | 
| :--- | :--- | :--- | :--- | :--- | 
| file | Video to be translated | File | true | - | 
| original | the original language of the video to be translated | String | false | auto | 
| originalSrt | Original subtitle file of the video to be translated | File | false | - | 
| target_[0, …, 9] | Target language code, up to 10 allowed | String | true | - | 
| targetSrt_[0, …, 9] | Target subtitle file, up to 10 allowed | File | false | - | 
| isDubbingOnly | Voice-only dubbing | Boolean | false | false | 
| isRemoveBGM | Remove the BGM | Boolean | false | false | 
| isCaptionFile | Add Subtitle | Boolean | false | false | 
| numberOfSpeakers | Number of speakers, up to 5 | String | false | auto | 

### 1-3. Language Code
| Language | Code | 
| :--- | :--- | 
| English | en-US | 
| Hindi | hi-IN | 
| Portuguese | pt-PT | 
| Chinese | zh-CN | 
| Spanish | es-ES | 
| French | fr-FR | 
| German | de-DE | 
| Japanese | ja-JP | 
| Arabic | ar-SA | 
| Russian | ru-RU | 
| Korean | ko-KR | 
| Indonesian | id-ID | 
| Italian | it-IT | 
| Dutch | nl-NL | 
| Turkish | tr-TR | 
| Polish | pl-PL | 
| Swedish | sv-SE | 
| Filipino | fil-PH | 
| Malay | ms-MY | 
| Romanian | ro-RO | 
| Ukrainian | uk-UA | 
| Greek | el-GR | 
| Czech | cs-CZ | 
| Danish | da-DK | 
| Finnish | fi-FI | 
| Bulgarian | bg-BG | 
| Croatian | hr-HR | 
| Slovak | sk-SK | 
| Tamil | ta-IN | 
| Vietnamese | vi-VN | 

### 1-4. Response parameters
| key | desc | type | 
| :--- | :--- | :--- | 
| folderId | folderId that made the export request | String | 

### 1-5. Sample Request

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl https://app.aistudios.com/api/odin/v3/automation/translatevideos  \
-H "Authorization: ${API KEY}" \
-H "Content-Type: application/json" \
-X POST \
-F "file=@'${LOCAL FILE PATH}'" \
-F "target_0='en-US'"
-F "target_1='ko-KR'"
-F "target_2='ja-JP'"
```
</TabItem>

<TabItem value="js" label="Node.js">

```js
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
let data = new FormData();

data.append('file', fs.createReadStream('${LOCAL FILE PATH}'));
data.append('target_0', 'en-US');
data.append('target_1', 'ko-KR');
data.append('target_2', 'ja-JP');

axios.request({
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://app.aistudios.com/api/odin/v3/automation/translatevideos',
  headers: { 
    'Authorization': '${API KEY}', 
    'Content-Type': 'application/json'
  },
  data : data
})
.then((response) => {
    console.log(JSON.stringify(response.data));
})
.catch((error) => {
    console.log(error);
});
```
</TabItem>

<TabItem value="py" label="Python">

```py
import requests

url = "https://app.aistudios.com/api/odin/v3/automation/translatevideos"
payload = {'target_0': 'en-US', 'target_1': 'ko-KR', 'target_2': 'ja-JP'}
files=[(
    'file', 
    ('${FILE NAME}.mp4', open('${LOCAL FILE PATH}','rb'), 'application/octet-stream')
)]
headers = {
  "Content-Type": "application/json",
  "Authorization": "${API TOKEN}"
}

r = requests.post(url, headers=headers, data=payload, files=files)
```
</TabItem>
</Tabs>

<br/>


## 2. Check progression conditions

### 2-1. API endpoint

```http
https://app.aistudios.com/api/odin/v3/automation/translatevideos?folderId=${folderId}
```

### 2-2. Response parameters
| key  | desc  | type  | 
| :---  | :---  | :---  | 
| projectId  | Project ID  | String  | 
| name  | Project Name  | String  | 
| progress  | Synthetic progress  | Float  | 
| download_url  | Download URL of the completed video  | String  | 

<br/>

### 2-3. Sample Request

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl https://app.aistudios.com/api/odin/v3/automation/translatevideos?folderId=${folderId}  \
-H "Authorization: ${API KEY}" \
-H "Content-Type: application/json" \
-X GET
```

</TabItem>
<TabItem value="js" label="Node.js">

```js
import axios from "axios"; 
const token = ${API KEY};

axios.get(`https://app.aistudios.com/api/odin/v3/automation/translatevideos?folderId=${folderId}`, 
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

url = "https://app.aistudios.com/api/odin/v3/automation/translatevideos?folderId=${folderId}"

headers = {
  "Content-Type": "application/json",
  "Authorization": ${API TOKEN}
}

r = requests.get(url, headers=headers)
```

</TabItem>
</Tabs>
