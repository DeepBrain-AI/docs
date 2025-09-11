# 导出绿幕视频

<br/>

在此文本主要解说如何I用JSON格式通过AP发起导出绿幕视频的请求。

## 1. API端点

```http
https://app.aistudios.cn/api/odin/v3/simple/video
```

<br/>

## 2. 请求参数

|key|desc|type|required|default|
|:---|:---|:---|:---|:---|
|language|编辑视频的语言|String|true|-|
|text|需要与AI数字人支持的语言，文本语言一至|String|true|-|
|model|使用的AI数字人ID|String|true|-|
|clothes|AI数字人的服装ID|String|true|-|
|ttsType|AI数字人的默认声音以外的外部TTS信息|Json|false|-|
|isExport|是否导出该视频|Boolean|false|false|
|[webhookUrl](../reference/webhook)|回馈合成结果的网址|String|false|-|


<br/>

## 3. 响应参数

|key|desc|type|
|:---|:---|:---|
|projectId|做出导出请求的绿幕视频ID|String|

<br/>


## 4. 用例

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl https://app.aistudios.cn/api/odin/v3/simple/video  \
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

axios.post('https://app.aistudios.cn/api/odin/v3/simple/video', 
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

url = "https://app.aistudios.cn/api/odin/v3/simple/video"
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
