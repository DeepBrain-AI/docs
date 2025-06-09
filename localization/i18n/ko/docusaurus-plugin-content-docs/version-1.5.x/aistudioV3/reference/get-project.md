# 프로젝트 불러오기

프로젝트 불러오기는 API 요청을 JSON 형식으로 전송하여 기존 프로젝트를 로드하는 방법을 다룹니다.

<br/>

## 1. API endpoint

```http
https://app.aistudios.com/api/odin/v3/editor/project/${key}
```

<br/>

## 2. Response parameters

|key|desc|type|
|:---|:---|:---|
|project|프로젝트 정보|Json|
|project._id|프로젝트 ID|String|
|project.name|프로젝트 이름|String|
|project.orientation|프로젝트 방향 (가로 / 세로)|String|
|project.scenes|프로젝트 장면 정보|Array(json)|
|project.userId|프로젝트 작성자 ID|String|
|project.templateId|템플릿 내보내기시 사용된 템플릿 ID|String|
|project.state|프로젝트 상태|String|
|project.thumbnailUrl|프로젝트 섬네일 URL|String|
|project.baseInfoId|프로젝트 버전관리 ID|String|
|project.dictionary|사용자 추가 발화 학슴 데이터|Json|
|project.backendTaskId|프로젝트 내보내기 작업 ID|String|
|project.exportType|프로젝트 내보내기 종류|String|
|project.progress|프로젝트 내보내기 진행률|Int|
|project.creditSubstracted|크레딧 차감여부|Boolean|
|project.createdAt|프로젝트 생성날짜|Date|
|project.updatedAt|프로젝트 갱신날짜|Date|
|project.download_url|합성된 프로젝트 다운로드 URL|String|

<br/>

## 3. Sample Request

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl https://app.aistudios.com/api/odin/v3/editor/project/${project key}  \
-H "Authorization: ${API KEY}" \
-H "Content-Type: application/json" \
-X GET
```

</TabItem>
<TabItem value="js" label="Node.js">

```js
import axios from "axios"; 
const token = ${API KEY};

axios.get(`https://app.aistudios.com/api/odin/v3/editor/project/${project key}`, 
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

url = "https://app.aistudios.com/api/odin/v3/editor/project/${project key}"

headers = {
  "Content-Type": "application/json",
  "Authorization": ${API TOKEN}
}

r = requests.get(url, headers=headers)
```

</TabItem>
</Tabs>
