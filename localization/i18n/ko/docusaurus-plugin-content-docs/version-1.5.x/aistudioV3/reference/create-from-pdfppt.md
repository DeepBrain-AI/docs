# PDF/PPT에서 프로젝트 생성
PDF/PPT 분석하여 슬라이드별 하나의 영상장면으로 변환하여 프로젝트를 생성하는 방법을 다룹니다. (비디오 합성은 포함하지 않습니다.)
<br/>

## 1. API endpoint
```http
POST https://app.aistudios.com/api/odin/v3/editor/project/pptpdf
```
<br/>

## 2. Request parameters
| key | desc | type | required | default |
| :--- | :--- | :--- | :--- | :--- |
| file | 변환할 파일<br />(`pdf` \| `pptx` \| `ppt`) | File (Binary) | true | - |
| name | 생성된 프로젝트의 이름 | String | false | - |
| workspaceId | [작업공간](./workspaces) 고유식별자 ID | String | false | - |
<br/>

## 3. Response parameters
| key | desc | type |
| :--- | :--- | :--- |
| projectId | 생성된 프로젝트의 ID | String |
<br/>

## 4. Sample Request
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl https://app.aistudios.com/api/odin/v3/editor/project/pptpdf \
-H "Authorization: ${API KEY}" \
-H "Content-Type: application/json" \
-X POST \
-F "file=@'${LOCAL FILE PATH}'" \
-F "name='${Project Name}'" \
-F "workspaceId='${workspace Id}'"
```

</TabItem>
<TabItem value="js" label="Node.js">

```js
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
let data = new FormData();

data.append('file', fs.createReadStream('${LOCAL FILE PATH}'));
data.append('name', '${Project Name}');
data.append('workspaceId', '${workspace Id}');

axios.request({
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://app.aistudios.com/api/odin/v3/editor/project/pptpdf',
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
import json

url = "https://app.aistudios.com/api/odin/v3/editor/project/pptpdf"
payload = {'name': '${Project Name}', 'workspaceId': '${workspace Id}'}
files=[(
    'file',
    ('file', open('${/local/file}','rb'), 'application/octet-stream')
)]
headers = {
  "Content-Type": "application/json",
  "Authorization": "${API KEY}"
}

r = requests.post(url, headers=headers, data=payload, files=files)
```

</TabItem>
</Tabs>

<br />

## 5. 전체코드
```javascript
const axios = require('axios');
const { error } = require('console');
const FormData = require('form-data');
const fs = require('fs');
const { random } = require('lodash');
const moment = require('moment/moment');
const path = require('path');

const GET_TOKEN_API_PATH = '/api/odin/v3/auth/token'
const CREATE_API_PATH = '/api/odin/v3/editor/project/pptpdf'

const appId = '## your appId ##';
const userKey = '## your userKey ##';

const formData = new FormData();
formData.append('file', fs.createReadStream(path.resolve(process.env.HOME, '## Local file path ##')));
// formData.append('workspaceId', '## workspace id ##');
// formData.append('name', '## project name ##');

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

    console.log(`token:`, token);


    /**
     * create project
     */
    const response = await axios.post(
      `${API_HOST}${CREATE_API_PATH}`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          Authorization: token
        }
      }
    ).then(response => {
      if (response.data.success == true) {
        console.log(`create project success,`, response.data);
        return response.data
      } else {
        console.error(`create project error, code:`, response.data.error.code, `, msg:`, response.data.error.msg);
        throw Error(response.data);
      }
    });

  } catch (err) {
    // ...
    if (err.response) {
      console.log('server error, status:', err.response.status, ', message', err.response.data);
    } else if (err.request) {
      console.log('response error,', err.request);
    } else {
      console.log(err);
    }
  }

  console.log('finish');
}

main()
```