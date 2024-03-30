---
sidebar_position: 11
---

# 템플릿에서 프로젝트 생성 및 편집

템플릿에서 새 프로젝트를 생성하고 수정합니다. "title" 태그 또는 "subtitles" 태그가 있는 클립을 편집할 수 있습니다. 또한 비디오의 스크립트 내용을 편집할 수 있습니다. "updates" 매개변수는 프로젝트에 대한 업데이트 정보를 포함하는 키-값 쌍입니다. "title", "subtitles" 또는 "scripts"를 키로 포함할 수 있습니다. 수정 중인 프로젝트에 동일한 태그를 가진 여러 클립이 포함되어 있는 경우 인덱스 번호로 키에 레이블을 지정할 수 있습니다. 인덱스 번호는 비디오 내에서 클립의 순서 위치를 나타냅니다(0부터 시작). 예를 들어, 비디오에서 "title" 태그가 있는 2번째, 3번째 및 5번째 클립을 편집하려는 경우 "title_1", "title_2" 및 "title_4"와 같이 키를 포맷할 수 있습니다. 마찬가지로 비디오의 처음 세 장면의 오디오 스크립트 내용을 편집하려면 "scripts", "scripts_1" 및 "scripts_2"와 같이 키를 포맷할 수 있습니다. 자세한 예시는 샘플 코드를 참조하세요. [Deepbrain AI의 AI Studio](https://app.deepbrain.io)에서 수정된 비디오를 볼 수 있고 편집할 수 있습니다.

<br/>

## 1. API endpoint

```http
https://app.deepbrain.io/api/odin/v3/editor/template/modify
```

<br/>

## 2. Request parameter

|key|desc|type|required|default|
|:---|:---|:---|:---|:---|
|templateId|사용할 템플릿의 고유 ObjectId|String|true|-|
|name|생성된 프로젝트의 이름|String|false|-|
|updates|비디오 프로젝트 업데이트 내용|Dictionary|true|-|
|updates.key|클립 또는 스크립트의 태그|String|-|-|
|updates.value|해당 클립의 업데이트 값|String|-|-|
|isExport|이 프로젝트가 내보내질지 여부|Boolean|false|false|
|[webhookUrl](../reference/webhook)|합성 결과를 보낼 URL 주소|String|false|-|

<br/>

## 3. Response parameters

|key|desc|type|
|:---|:---|:---|
|projectId|프로젝트 ID - 내보낸 비디오 프로젝트 데이터를 가져옵니다.|String|

<br/>

## 4. Sample Request

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl https://app.deepbrain.io/api/odin/v3/editor/template/modify  \
-H "Authorization: ${API KEY}" \
-H "Content-Type: application/json" \
-X POST \
-d '{
    "templateId":"655c744d2b4d3b4051400be0",
    "name": "새 프로젝트 이름",
    "updates": { 
        "title" : "비디오의 첫 번째 제목 클립에 대한 새로운 텍스트",
        "title_2" : "비디오의 세 번째 제목 클립에 대한 새로운 텍스트",
        "title_4" : "비디오의 다섯 번째 제목 클립에 대한 새로운 텍스트",
        "subtitles_1" : "비디오의 두 번째 자막 클립에 대한 새로운 텍스트",
        "subtitles_3" : "비디오의 네 번째 자막 클립에 대한 새로운 텍스트", 
        "subtitles_4" : "비디오의 다섯 번째 자막 클립에 대한 새로운 텍스트",
        "subtitles_5" : "비디오의 여섯 번째 자막 클립에 대한 새로운 텍스트",
        "scripts" : "비디오의 첫 번째 장면에 대한 새로운 오디오 스크립트",
        "scripts_3" : "비디오의 네 번째 장면에 대한 새로운 오디오 스크립트"
    },
    "isExport": true
    }'
```

</TabItem>
<TabItem value="js" label="Node.js">

```js
import axios from "axios";
const token = ${API KEY};
const customWebhookUrl = ${webhook_delivery_address};

axios.post('https://app.deepbrain.io/api/odin/v3/editor/template/modify', 
  {
    "templateId":"655c744d2b4d3b4051400be0",
    "name": "새 프로젝트 이름",
    "updates": { 
        "title" : "비디오의 첫 번째 제목 클립에 대한 새로운 텍스트",
        "title_2" : "비디오의 세 번째 제목 클립에 대한 새로운 텍스트",
        "title_4" : "비디오의 다섯 번째 제목 클립에 대한 새로운 텍스트",
        "subtitles_1" : "비디오의 두 번째 자막 클립에 대한 새로운 텍스트",
        "subtitles_3" : "비디오의 네 번째 자막 클립에 대한 새로운 텍스트",
        "subtitles_4" : "비디오의 다섯 번째 자막 클립에 대한 새로운 텍스트",
        "subtitles_5" : "비디오의 여섯 번째 자막 클립에 대한 새로운 텍스트",
        "scripts" : "비디오의 첫 번째 장면에 대한 새로운 오디오 스크립트",
        "scripts_3" : "비디오의 네 번째 장면에 대한 새로운 오디오 스크립트"
    },
    "isExport": true
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

url = "https://app.deepbrain.io/api/odin/v3/editor/template/modify"
body = {
    "templateId":"655c744d2b4d3b4051400be0",
    "name": "새 프로젝트 이름",
    "updates": { 
        "title" : "비디오의 첫 번째 제목 클립에 대한 새로운 텍스트",
        "title_2" : "비디오의 세 번째 제목 클립에 대한 새로운 텍스트",
        "title_4" : "비디오의 다섯 번째 제목 클립에 대한 새로운 텍스트",
        "subtitles_1" : "비디오의 두 번째 자막 클립에 대한 새로운 텍스트",
        "subtitles_3" : "비디오의 네 번째 자막 클립에 대한 새로운 텍스트",
        "subtitles_4" : "비디오의 다섯 번째 자막 클립에 대한 새로운 텍스트",
        "subtitles_5" : "비디오의 여섯 번째 자막 클립에 대한 새로운 텍스트",
        "scripts" : "비디오의 첫 번째 장면에 대한 새로운 오디오 스크립트",
        "scripts_3" : "비디오의 네 번째 장면에 대한 새로운 오디오 스크립트"
    },
    "isExport": true
}
headers = {
  "Content-Type": "application/json",
  "Authorization": ${API TOKEN}
}

r = requests.post(url, data=json.dumps(body), headers=headers)
```

</TabItem>
</Tabs>
