# Topic to Video
Describe the process of creating video content by conveying the topic.

<br/>

## 1. Make a request
Please request project creation by delivering the topic and options.

### 1-1. API endpoint
```http
https://app.aistudios.com/api/odin/v3/automation/topic_to_video
```

### 1-2. Request parameter
| key | desc | type | required | default | 
| :--- | :--- | :--- | :--- | :--- | 
| topic | Topic for creating videos| String | true | - | 
| options | Configuration for video generation | Json | false | {} |
| options.goal | Purpose of video generation | 'auto', 'business', 'youtube', 'education' | false | 'business' |
| options.duration | Video Time | 'auto', '30', '60', '90', '120' | false | 'auto' |
| options.speed | Video playback speed relative to original speed | 'auto', Number | false | - |
| options.language | The language used in the video. <br/>The language code follows the [ISO 639-1](https://www.loc.gov/standards/iso639-2/php/code_list.php) standard. | 'auto', String | false | - |
| options.media | Image information used to create video (valid only for options.filebackground=false) | 'auto', 'search', 'free', 'generative' | false | - |
| options.style | Style information (valid only for options.media='generative') | 'auto', 'business', 'youtube', 'education' | false | - |
| options.fileBackground | Whether to use the file you provided in the background of the video | Boolean | false | true |
| options.orientation | Screen orientation of the created video | 'web', 'mobile' | false | 'web' |
| options.model | ID of the AI model to use for video generation |  |  |  |

### 1-3. Response Parameters
| key | desc | type |
| --- | --- | --- |
| projectId | ID of the video project created | String |
| automationJobId | Job ID requested to create a video | String | 

### 1-4. Sample Request

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl https://app.aistudios.com/api/odin/v3/automation/topic_to_video  \
-H "Authorization: ${API KEY}" \
-H "Content-Type: application/json" \
-X POST \
-d '{
    "topic" : "What is K-culture?",
    "options" : {
        "goal" : "youtube",
        "duration" : 30, 
    }
}'
```

</TabItem>
<TabItem value="js" label="Node.js">

```js
import axios from "axios"; 
const token = ${API KEY};
const customWebhookUrl = ${webhook_delivery_address};

axios.post('https://app.aistudios.com/api/odin/v3/automation/topic_to_video', 
    {
        "topic" : "What is K-culture?",
        "options" : {
            "goal" : "youtube",
            "duration" : 30, 
        }
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

url = "https://app.aistudios.com/api/odin/v3/automation/topic_to_video"
body = {
    "topic" : "What is K-culture?",
    "options" : {
        "goal" : "youtube",
        "duration" : 30, 
    }
}
    
headers = {
  "Content-Type": "application/json",
  "Authorization": ${API TOKEN}
}

r = requests.post(url, data=json.dumps(body), headers=headers)
```

</TabItem>
</Tabs>

<br/>
<br/>

## 2. Check the progress of project creation
Create a video after request Check your current progress.

### 2-1. Api endpoint
```http
GET https://app.aistudios.com/api/odin/v3/automation/progress?projectId=${projectId}
```

### 2-2. Response Parameters
| Key | Description | Type |
| --- | --- | --- |
| state | Current state of the automation process | String |
| progress | Video Generation Completion Rate | Number |

### 2-3. Sample request
```jsx
import axios from "axios";

const projectId = "your_project_id";
const token = "your_api_key";

axios.get(`https://app.aistudios.com/api/odin/v3/automation/progress/${projectId}`, {}, {
  headers: {
    "Authorization": token,
    "Content-Type": "application/json"
  }
})
.then((res) => {
  console.log(res.data)
})
.catch((error) => {
  console.error(error)
});
```
<br/>
<br/>

## 3. Export
Use Project [Export to Project](/aistudioV3/reference/export-project) a video of a created project.