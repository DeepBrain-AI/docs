# Scripts to Video
Describe the process of creating video content based on a given sentence.

<br/>

## 1. Make a request
Please request project creation by delivering sentences and options.

### 1. API endpoint
```http
https://app.aistudios.com/api/odin/v3/automation/scripts_to_video
```

### 1-2. Request parameter
| key | desc | type | required | default | 
| :--- | :--- | :--- | :--- | :--- | 
| scripts | Sentence for creating a video | String | true | - | 
| options | Configuration for video generation | Json | false | {} |
| options.language | The language used in the video<br />The language code follows the [ISO 639-1](https://www.loc.gov/standards/iso639-2/php/code_list.php) standard. | String | false | - |
| options.duration | Video Time<br />(`30` \| `60` \| `90` \| `120` \| `150` \| `180`) | Number | false | - |
| options.scriptOption | Script Use Options<br /> (AI can help make the script smooth or keep the original version as it was written.)<br />(`ai` \| `original`) | String | false | ai |
| options.objective | Objectives of video footage (e.g. publicity, education, explanation) | String | false | - |
| options.audience | Target audience for video footage (e.g. marketers, students) | String | false | - |
| options.tone | The tone of a video video (e.g. clearly, formally) | String | false | - |
| options.speed | Video playback speed relative to original speed<br />(`0.5 ~ 1.5`) | Number | false | 1 |
| options.media | Image information used to create video<br />(`search` \| `free` \| `premium` \| `generative`) | String | false | - |
| options.useGenerativeHighQuality | Enabling High-Definition AI Media<br />(valid only for options.media='generative')<br />(`true` \| `false`) | Boolean | false | false |
| options.style | Style information<br />(valid only for options.media='generative')<br />(`realistic` \| `digitalPainting` \| `sketch` \| `oilPainting` \| `pixelArt` \| `watercolor` \| `lowPoly` \| `cyberpunk` \| `fantasy` \| `anime`) | String | false | realistic |
| options.templateId | template id to use for video creation<br /> (Only valid if the category is `news` \| `education`) | String | false | - |
| options.model | [model id](../models) to use for video generation | String | false | - |
| options.voiceOnly | Only the voice of the model used to create the video<br />(`true` \| `false`) | Boolean | false | false |

<!-- | options.goal | Purpose of video generation<br />(`business` \| `youtube` \| `education`) | String | false | auto | -->

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
curl https://app.aistudios.com/api/odin/v3/automation/scripts_to_video  \
-H "Authorization: ${API KEY}" \
-H "Content-Type: application/json" \
-X POST \
-d '{
    "scripts" : "K-Culture is a short-historied term referring to South Korean popular culture.\nThe term was first coined in the late 1990s,1 when various elements of Korean pop culture – from music, to films, dramas, and fashion, food, comics and novels – began to spread overseas, first into neighbouring Asian countries, then further afield.\nThe feverish fondness that Korean pop culture attracted in overseas media soon gave rise to a host of terms such terms as the “Korean Wave” (a.k.a. Hallyu), K-Culture, and so on. In fact, the term K-Culture was quickly reimported back into South Korea, where it has been used readily to describe South Korean pop culture.",
    "options" : {
      "language": "en",
      "scriptOption": "ai",
      "speed": 1,
      "templateId": "## template id ##",
      "model": "## model id ##",
      "voiceOnly": false,
    }
}'
```

</TabItem>
<TabItem value="js" label="Node.js">

```js
import axios from "axios"; 
const token = ${API KEY};
const customWebhookUrl = ${webhook_delivery_address};

axios.post('https://app.aistudios.com/api/odin/v3/automation/scripts_to_video',
    {
        "scripts" : "K-Culture is a short-historied term referring to South Korean popular culture.\nThe term was first coined in the late 1990s,1 when various elements of Korean pop culture – from music, to films, dramas, and fashion, food, comics and novels – began to spread overseas, first into neighbouring Asian countries, then further afield.\nThe feverish fondness that Korean pop culture attracted in overseas media soon gave rise to a host of terms such terms as the “Korean Wave” (a.k.a. Hallyu), K-Culture, and so on. In fact, the term K-Culture was quickly reimported back into South Korea, where it has been used readily to describe South Korean pop culture.",
        "options" : {
          "language": "en",
          "scriptOption": "ai",
          "speed": 1,
          "templateId": "## template id ##",
          "model": "## model id ##",
          "voiceOnly": false,
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

url = "https://app.aistudios.com/api/odin/v3/automation/scripts_to_video"
body = {
    "scripts" : "K-Culture is a short-historied term referring to South Korean popular culture.\nThe term was first coined in the late 1990s,1 when various elements of Korean pop culture – from music, to films, dramas, and fashion, food, comics and novels – began to spread overseas, first into neighbouring Asian countries, then further afield.\nThe feverish fondness that Korean pop culture attracted in overseas media soon gave rise to a host of terms such terms as the “Korean Wave” (a.k.a. Hallyu), K-Culture, and so on. In fact, the term K-Culture was quickly reimported back into South Korea, where it has been used readily to describe South Korean pop culture.",
    "options" : {
        "language": "en",
        "scriptOption": "ai",
        "speed": 1,
        "templateId": "## template id ##",
        "model": "## model id ##",
        "voiceOnly": false,
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
<br/>
<br/>


## 4. Full Code
```javascript
const API_HOST = 'https://app.aistudios.com'

const GET_TOKEN_API_PATH = '/api/odin/v3/auth/token'
const CREATE_API_PATH = '/api/odin/v3/automation/topic_to_video'
const CREATE_PROGRESS_API_PATH = '/api/odin/v3/automation/progress'
const EXPORT_API_PATH = '/api/odin/v3/editor/project/export'
const EXPORT_PROGRESS_API_PATH = '/api/odin/v3/editor/progress'

const appId = '## your appId ##'
const userKey = '## your userKey ##'

const scripts = "K-Culture is a short-historied term referring to South Korean popular culture.\nThe term was first coined in the late 1990s,1 when various elements of Korean pop culture – from music, to films, dramas, and fashion, food, comics and novels – began to spread overseas, first into neighbouring Asian countries, then further afield.\nThe feverish fondness that Korean pop culture attracted in overseas media soon gave rise to a host of terms such terms as the “Korean Wave” (a.k.a. Hallyu), K-Culture, and so on. In fact, the term K-Culture was quickly reimported back into South Korea, where it has been used readily to describe South Korean pop culture.";
const options = {
    "language": "en",
    // "duration": 60,
    "scriptOption": "ai",
    // "objective": "education",
    // "audience": "students",
    // "tone": "clearly",
    "speed": 1,
    // "media": "generative",
    // "useGenerativeHighQuality": true,
    // "style": "digitalPainting",
    "templateId": "## template id ##",
    "model": "## model id ##", // Michael
    "voiceOnly": false,
};

const delay = async (ms = 1000 * 60) => {
    await new Promise(r => setTimeout(r, ms))
}

const main = async () => {
    try {
        /**
         * get api token
         */
        const token = await fetch(
            `${API_HOST}${GET_TOKEN_API_PATH}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    appId,
                    userKey
                })
            }
        )
            .then((response) => response.json())
            .then((response) => {
                if (response.success == true) {
                    return response.data.token
                } else {
                    console.error(`import authentication token error, code:`, response.error.code, `, msg:`, response.error.msg);
                    throw Error(response);
                }
            });

        console.log('token : ', token);

        /**
         * create project
         */
        const projectId = await fetch(
            `${API_HOST}${CREATE_API_PATH}`,
            {
                method: 'POST',
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "scripts": scripts,
                    "options": options
                })
            }
        )
            .then((response) => response.json())
            .then((response) => {
                if (response.success == true) {
                    return response.data.projectId
                } else {
                    console.error(`create project error, code:`, response.error.code, `, msg:`, response.error.msg);
                    throw Error(response);
                }
            });

        console.log('request create project, projectId : ', projectId);

        /**
         * project progress
         */
        let isCreateProjectFinish = false

        while (!isCreateProjectFinish) {
            const progressData = await fetch(
                `${API_HOST}${CREATE_PROGRESS_API_PATH}/?projectId=${projectId}`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: token,
                    },
                },
            )
                .then((response) => response.json())
                .then((response) => {
                    if (response.success === true) {
                        return response.data
                    } else {
                        console.error(`project progress error, code:`, response.error.code, `, msg:`, response.error.msg);
                        throw Error(response);
                    }
                })

            console.log('project creation progress, state: ', progressData.state, ', progress : ', progressData.progress);

            if (progressData.state === "finish" && progressData.progress === 100) {
                isCreateProjectFinish = true
            } else {
                await delay()
            }
        }

        /**
         * export project
         */
        await fetch(
            `${API_HOST}${EXPORT_API_PATH}`,
            {
                method: 'POST',
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "projectId": projectId
                })
            }
        )
            .then((response) => response.json())
            .then((response) => {
                if (response.success == true) {
                    return response.data.projectId
                } else {
                    console.error(`export project error, code:`, response.error.code, `, msg:`, response.error.msg);
                    throw Error(response);
                }
            });

        console.log('request export project');


        /**
         * export progress
         */
        let isExportFinish = false
        let videoUrl = ''

        while (!isExportFinish) {
            const progressData = await fetch(
                `${API_HOST}${EXPORT_PROGRESS_API_PATH}/${projectId}`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: token,
                    }
                },
            )
                .then((response) => response.json())
                .then((response) => {
                    if (response.success === true) {
                        return response.data
                    } else {
                        console.error(`export progress error, code:`, response.error.code, `, msg:`, response.error.msg);
                        throw Error(response);
                    }
                })

            console.log(`export `, progressData.state, `, progress : `, progressData.progress)

            if (progressData.progress < 100) {
                await delay()
            } else {
                videoUrl = progressData.downloadUrl
                isExportFinish = true
            }
        }

        console.log('videoUrl :', videoUrl);
    } catch (error) {
        // ...
    }

    console.log('finish');
}

main()
```
