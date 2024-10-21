---
sidebar_position: 11
---

# Create project from template and modify

Create a new peoject from template and modify it. You can edit clips with the "title" tag or "subtitles" tag. You can also edit the script content of the video. The "updates" parameter is a key-value pair containing the update information for the project. You can include "title", "subtitles", or "scripts" as keys. If the project you are modifying includes multiple clips with the same tag, you can label the keys with index numbers. The index number represents the location of the clip in order within the video (zero-indexed). For example, if you intend to edit the 2nd, 3rd, and 5th clips in the video with the "title" tag, you can format your keys as "title_1", "title_2", and "title_4". Similarly, if you would like to edit the audio script content of the first three scenes in the video, you can format the keys as "scripts", "scripts_1", and "scripts_2". See the sample code for a detailed example. You can see & edit modified video at [AI Studio by Deepbrain AI](https://app.aistudios.com).

<br/>

## 1. API endpoint

```http
https://app.aistudios.com/api/odin/v3/template/modify
```

<br/>

## 2. Request parameter

|key|desc|type|required|default|
|:---|:---|:---|:---|:---|
|templateId|Unique ObjectId of the template to be used|String|true|-|
|name|Name of the created project|String|false|-|
|updates|Video project update contents|Dictionary|true|-|
|updates.key|tag of the clip or scripts|String|-|-|
|updates.value|Updating value of the corresponding clip|String|-|-|
|isExport|Whether this project will be exported|Boolean|false|false|
|[webhookUrl](../reference/webhook)|Url address where the synthesis result should be sent.|String|false|-|

<br/>

## 3. Response parameters

|key|desc|type|
|:---|:---|:---|
|projectId|Project Id - Fetching the video project data that has been exported.|String|

<br/>


## 4. Sample Request

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl https://app.aistudios.com/api/odin/v3/template/modify  \
-H "Authorization: ${API KEY}" \
-H "Content-Type: application/json" \
-X POST \
-d '{
    "templateId":"655c744d2b4d3b4051400be0",
    "name": "New project name",
    "updates": { 
        "title" : "New text for the first title clip in the video",
        "title_2" : "New text for the third title clip in the video",
        "title_4" : "New text for the fifth title clip in the video",
        "subtitles_1" : "New text for the second subtitle clip in the video",
        "subtitles_3" : "New text for the fourth subtitle clip in the video",
        "subtitles_4" : "New text for the fifth subtitle clip in the video",
        "subtitles_5" : "New text for the sixth subtitle clip in the video",
        "scripts" : "New audio script for the first scene of the video",
        "scripts_3" : "New audio script for the fourth scene of the video"
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

axios.post('https://app.aistudios.com/api/odin/v3/template/modify', 
  {
    "templateId":"655c744d2b4d3b4051400be0",
    "name": "New project name",
    "updates": { 
        "title" : "New text for the first title clip in the video",
        "title_2" : "New text for the third title clip in the video",
        "title_4" : "New text for the fifth title clip in the video",
        "subtitles_1" : "New text for the second subtitle clip in the video",
        "subtitles_3" : "New text for the fourth subtitle clip in the video",
        "subtitles_4" : "New text for the fifth subtitle clip in the video",
        "subtitles_5" : "New text for the sixth subtitle clip in the video",
        "scripts" : "New audio script for the first scene of the video",
        "scripts_3" : "New audio script for the fourth scene of the video"
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

url = "https://app.aistudios.com/api/odin/v3/template/modify"
body = {
    "templateId":"655c744d2b4d3b4051400be0",
    "name": "New project name",
    "updates": { 
        "title" : "New text for the first title clip in the video",
        "title_2" : "New text for the third title clip in the video",
        "title_4" : "New text for the fifth title clip in the video",
        "subtitles_1" : "New text for the second subtitle clip in the video",
        "subtitles_3" : "New text for the fourth subtitle clip in the video",
        "subtitles_4" : "New text for the fifth subtitle clip in the video",
        "subtitles_5" : "New text for the sixth subtitle clip in the video",
        "scripts" : "New audio script for the first scene of the video",
        "scripts_3" : "New audio script for the fourth scene of the video"
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
