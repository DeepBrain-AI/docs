# 자동화 템플릿 조회
[Docs To Video](./tools/docs-to-video) / [Topic To Video](./tools/topic-to-video) / [Url To Video](./tools/url-to-video) / [Scripts To Video](./tools/scripts-to-video) 이용시 사용되는 템플릿 목록을 조회합니다.

<br/>

## 1. API Endpoint

```http
https://app.aistudios.com/api/odin/v3/dropdown/templates_automation
```

<br/>

## 2. Request Parameters

| key | desc | type | required | default |
| :--- | :--- | :--- | :--- | :--- |
| category | 템플릿 카테고리 **_`Info`_** | String | true | - |
| orientation | 템플릿 방향<br />(`web` \| `mobile`) | String | false | web |
| fileBackground | 문서 업로드후 문서내용을 배경사용으로 사용할지 여부<br />(`true` \| `false`) | String | false | false |

:::info
- **요청별 허용 카테고리**<br />
  - Docs to video : `business` \| `education`
  - [Topic / Url / Scripts] to video : `social` \| `business` \| `education`

- **fileBackground** 옵션은 문서를 업로드하는 **Docs to video** 옵션입니다.
:::

<br/>

## 3. Response Parameters

| key | desc | type | 
| :--- | :--- | :--- | 
| id | 템플릿의 고유 ID | String | 
| name | 템플릿의 이름 | String | 
| thumbnailUrl | 템플릿 이미지 | String | 

<br/>


## 4. Sample Request

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl https://app.aistudios.com/api/odin/v3/dropdown/templates_automation \
-H "Authorization: ${API KEY}" \
-H "Content-Type: application/json" \
-X POST \
-G \
-d '{
  "category": "social",
  "orientation": "web",
  "fileBackground": false
}'
```

</TabItem>
<TabItem value="js" label="Node.js">

```js
import axios from "axios";
const token = ${API KEY};

axios.post('https://app.aistudios.com/api/odin/v3/dropdown/templates_automation', 
  {
    headers: {
      'Authorization': ${token},
      'Content-Type': 'application/json'
    },
    params: {
      "category": "social",
      "orientation": "web",
      "fileBackground": false
    },
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

url = "https://app.aistudios.com/api/odin/v3/dropdown/templates_automation"
params = {
  "category": "social",
  "orientation": "web",
  "fileBackground": false
}
headers = {
  "Content-Type": "application/json",
  "Authorization": ${API TOKEN}
}

r = requests.post(url, data=json.dumps(body), headers=headers)
```

</TabItem>
</Tabs>