# Delete project
If you enter the project ID verified through the [Get projects](/aistudioV3/reference/get-projects) inquiry, you can safely delete the project.
<br/>

## 1. API Endpoint

```http
https://app.aistudios.com/api/odin/v3/editor/project
```

<br/>

## 2. Request Parameters

 | key | desc | type | required | default | 
 | :--- | :--- | :--- | :--- | :--- | 
 | ids | Array of unique identifiers for video projects to delete | Object | true | - | 

<br/>

## 3. Response Parameters
 | key | desc | type | 
 | :--- | :--- | :--- | 
 | deletedCount | Deleted Count | Int  | 

<br/>


## 4. Sample Request

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl https://app.aistudios.com/api/odin/v3/editor/project  \
-H "Authorization: ${API KEY}" \
-H "Content-Type: application/json" \
-X DELETE 
-d '{
    "ids": [
        "${projectId}"
    ]
}'
```

</TabItem>
<TabItem value="js" label="Node.js">

```js
import axios from "axios";
const token = ${API KEY};
const customWebhookUrl = ${webhook_delivery_address};

axios.delete('https://app.aistudios.com/api/odin/v3/editor/project', 
  {
    "ids" : [
        "${projectId}"
    ]
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

url = "https://app.aistudios.com/api/odin/v3/editor/project"
body =   {
  "ids" : [
    "${projectId}"
  ]
}
headers = {
  "Content-Type": "application/json",
  "Authorization": ${API TOKEN}
}

r = requests.delete(url, data=json.dumps(body), headers=headers)
```

</TabItem>
</Tabs>