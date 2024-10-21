# 사용 가능한 모델 정보

API를 통해 프로젝트 생성시 사용 가능한 AI Model의 정보를 확인하는 방법을 다룹니다.

<br/>

## 1. API endpoint

```http
https://app.aistudios.com/api/odin/v3/model
```

<br/>

## 2. Response parameters

|key|desc|type|
|:---|:---|:---|
|models|합성 가능한 모델 정보|Array(json)|
|models[].id|모델의 ID|String|
|models[].label|모델의 이름 정보|Json|
|models[].label.ko|국문 표기|String|
|models[].label.en|영문 표기|String|
|models[].thumbnail|모델의 생김새를 확인 할 수 있는 이미지 주소|String|
|models[].clothes|모델의 복장 정보|Array(json)|
|models[].clothes[].id|모델의 복장 ID|String|
|models[].clothes[].label|모델의 복장 표기 정보|Json|
|models[].clothes[].label.ko|국문 표기|String|
|models[].clothes[].label.en|영문 표기|String|
|models[].clothes[].thumbnail|모델의 복장을 확인 할 수 있는 이미지 주소|String|

<br/>


## 3. Sample Request

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl https://app.aistudios.com/api/odin/v3/model  \
-H "Authorization: ${API KEY}" \
-H "Content-Type: application/json" \
-X GET
```

</TabItem>
<TabItem value="js" label="Node.js">

```js
import axios from "axios"; 
const token = ${API KEY};

axios.get(`https://app.aistudios.com/api/odin/v3/model`, 
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

url = "https://app.aistudios.com/api/odin/v3/model"

headers = {
  "Content-Type": "application/json",
  "Authorization": ${API TOKEN}
}

r = requests.get(url, headers=headers)
```

</TabItem>
</Tabs>
