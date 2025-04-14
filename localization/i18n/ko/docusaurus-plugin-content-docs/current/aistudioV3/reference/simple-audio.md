---
sidebar_position: 13
---

# 오디오 내보내기

<br/>

오디오 내보내기 섹션에서는 AI 모델의 음성으로 오디오 파일을 만들기 위해 JSON 형식으로 API 요청을 보내는 방법을 보여줍니다.

## 1. API endpoint

```http
https://app.aistudios.com/api/odin/v3/simple/audio
```

<br/>

## 2. Request parameter

|key|desc|type|required|default|
|:---|:---|:---|:---|:---|
|language|작성한 스크립트의 언어|String|true|-|
|text|모델이 발화할 스크립트. 모델의 언어와 일치해야함.|String|true|-|
|model|사용할 모델의 ID|String|true|-|

<!-- |tts|모델의 기본 음성이 아닌 외부 TTS 정보|Json|false|-| -->

<br/>

## 3. Response parameters

|key|desc|type|
|:---|:---|:---|
|fileName|생성된 Audio 파일 이름|String|
|downloadUrl|생성된 Audio 파일 다운로드 URL|String|
|metaList|Audio 파일의 metadata 정보|Array(json)|

<br/>


## 4. Sample Request

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl https://app.aistudios.com/api/odin/v3/simple/audio  \
-H "Authorization: ${API KEY}" \
-H "Content-Type: application/json" \
-X POST \
-d '{
      "language": "en",
      "text": "Hello, this is test vidoe",
      "model": "M000045058"
    }'
```

</TabItem>
<TabItem value="js" label="Node.js">

```js
import axios from "axios";
const token = ${API KEY};

axios.post('https://app.aistudios.com/api/odin/v3/simple/audio', 
  {
    "language": "en",
    "text": "Hello, this is test vidoe",
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

url = "https://app.aistudios.com/api/odin/v3/simple/audio"
body = {
  "language": "en",
  "text": "Hello, this is test vidoe",
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
