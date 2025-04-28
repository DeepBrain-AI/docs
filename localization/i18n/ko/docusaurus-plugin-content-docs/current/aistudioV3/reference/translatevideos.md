# AI더빙 내보내기

동영상을 원하는 언어로 변환해보세요! 파일을 업로드하면, 선택한 언어로 번역된 음성 더빙과 정밀한 립싱크가 제공되며, 진행 상황도 실시간으로 확인할 수 있습니다.
<br/>

## 1. 파일 업로드 및 더빙 요청


### 1-1. API endpoint

```http
https://app.aistudios.com/api/odin/v3/automation/translatevideos
```

### 1-2. Request parameter
| key | desc | type | required | default | 
| :--- | :--- | :--- | :--- | :--- | 
| file | 번역할 영상 | File | true | - | 
| original | 번역할 영상의 원어 | String | false | auto | 
| originalSrt | 번역할 영상의 원어 자막파일 | File | false | - | 
| target_[0, …, 9] | 대상 언어 코드, 최대 10개 허용 | String | true | - | 
| targetSrt_[0, …, 9] | 대상 자막파일, 최대 10개 허용 | File | false | - | 
| isDubbingOnly | 음성전용더빙 | Boolean | false | false | 
| isRemoveBGM | BGM제거 | Boolean | false | false | 
| isCaptionFile | Add Subtitle | Boolean | false | false | 
| numberOfSpeakers | 발언자수, 최대 5 | String | false | auto | 

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
| folderId | 내보내기 요청을 한 folderId | String | 

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


## 2. 진행상항 확인

### 2-1. API endpoint

```http
https://app.aistudios.com/api/odin/v3/automation/translatevideos?folderId=${folderId}
```

### 2-2. Response parameters
| key  | desc  | type  | 
| :---  | :---  | :---  | 
| projectId  | 프로젝트 ID  | String  | 
| name  | 프로젝트 제목  | String  | 
| progress  | 합성진행률  | Float  | 
| download_url  | 합성완료된 비디오의 다운로드 URL  | String  | 

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
