---
sidebar_position: 3
---

# Check the progress of the project.

Progress describes how to check the composite progress through the project ID generated after the project export operation.

<br/>

## 1. API endpoint

```http
https://app.aistudios.com/api/odin/v3/editor/progress/${key}
```

<br/>

## 2. Response parameters

|key|desc|type|
|:---|:---|:---|
|progress|Progress between 0.00 ~ 100.|Float|
|downloadUrl|The path of the download url of the video.|String|

<br/>


## 3. Sample Request

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl https://app.aistudios.com/api/odin/v3/editor/progress/${project key}  \
-H "Authorization: ${API KEY}" \
-H "Content-Type: application/json" \
-X GET
```

</TabItem>
<TabItem value="js" label="Node.js">

```js
import axios from "axios"; 
const token = ${API KEY};

axios.get(`https://app.aistudios.com/api/odin/v3/editor/progress/${project key}`, 
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

url = "https://app.aistudios.com/api/odin/v3/editor/progress/${project key}"

headers = {
  "Content-Type": "application/json",
  "Authorization": ${API TOKEN}
}

r = requests.get(url, headers=headers)
```

</TabItem>
</Tabs>
