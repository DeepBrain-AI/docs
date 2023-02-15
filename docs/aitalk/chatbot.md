---
displayed_sidebar: aitalkSidebar
sidebar_position: 2
slug: /aitalk/chatbot
---

# Chatbot

AI Human supports **Deepbrain chatbot**, **third-party chatbots** and **webhook server**.


![chatbot](/img/aitalk/chatbot.png)


<br />

## Deepbrain Chatbot (PlayChat)

Create a chatbot on [Deepbrain AI Chat](https://aichat.deepbrainai.io) and connect it with your project.

![playchat-01](/img/aitalk/playchat-01.png)

1. Sign in or sign up to the website.

<br />

![playchat-02](/img/aitalk/playchat-02.png)

2. Select a chatbot from your chatbot list or create a new one by clicking 'New chatbot' button.

<br />

![playchat-03](/img/aitalk/playchat-03.png)

3. Click the settings icon in the upper left corner to see the chatbot ID.

<br />

![playchat-04](/img/aitalk/playchat-04.png)

4. Copy and paste botId into your AI Human project.

<br />

## Third-party chatbot

### IBM Watson Assistant

![watson-01](/img/aitalk/watson-01.png)

1. Go to [IBM Cloud resources](https://cloud.ibm.com/resources) list page.
2. Search for your Watson Assistant and click 'View full details'.

<br />

![watson-02](/img/aitalk/watson-02.png)

3. You can copy and paste your API key and service URL in this page.
4. Click 'Launch Watson Assistant' to get your Assistant ID.

![watson-03](/img/aitalk/watson-03.png)

5. Click 'Assistant Settings' on the left side menu.


![watson-04](/img/aitalk/watson-04.png)

6. Copy and paste your Assistant ID.

<br />

### Google Dialogflow

![dialogflow-01](/img/aitalk/dialogflow-01.png)

1. Create a dialogflow chatbot and access the [Google Cloud console](https://console.cloud.google.com/).

2. Check the project you're working in and click the 'IAM & Admin' menu.

<br />


![dialogflow-02](/img/aitalk/dialogflow-02.png)

3. Go to 'Service Accounts' tab and click the 'Create Service Account' button.

<br />


![dialogflow-03](/img/aitalk/dialogflow-03.png)
![dialogflow-04](/img/aitalk/dialogflow-04.png)

4. Enter a unique service account id value and select the dialog flow API admin role.

<br />

![dialogflow-05](/img/aitalk/dialogflow-05.png)
![dialogflow-06](/img/aitalk/dialogflow-06.png)
![dialogflow-07](/img/aitalk/dialogflow-07.png)

1. To download a private key file, click 'Manage keys' > 'Add Key' > 'Create new key' and select key type as JSON.

2. Upload this JSON key file to your AI Human project.

<br />
<br />


## Webhook

You can connect your own webhook server to handle chatbot scenarios.

![webhook-01](/img/aitalk/webhook-01.png)

### Type

**Type** specifies the type of your request and response body.

<br />

#### Text type

**Request**
```javascript
Hello.
```

**Response**
```javascript
Hello.
```

<br />

#### JSON type

**Request**
```javascript
{ text: 'hello' }
```

**Response**
```javascript
{
    "text": "hello.",
    "languages": { "ko": "hello." },
    "image": { 
        "url": "https://d2s5oxcf7msaxg.cloudfront.net/projects/default/logo.svg", 
        "displayname": "cities and locations.png" 
    },
    "buttons": [],
    "contentTitle": "Cities and Locations"
}
```

### Connection Type

**Connection Type** specifies how your webhook server communicate with AI Human service. It can be either `REST API` or `Websocket`.


### URL

**URL** specifies your webhook server URL.


### Sample Server Code

Below is the sample webhook server code with request, response body type of `Text` and connection type of `Websocket`.


```javascript
const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const cors = require('cors')
const port = 3000
 
const result = {
    "text": "hello.",
    "languages": { "ko": "hello." },
    "image": { 
        "url": "https://d2s5oxcf7msaxg.cloudfront.net/projects/default/logo.svg", 
        "displayname": "sample.png" 
    },
    "buttons": [],
    "contentTitle": "Cities and Locations"
};
 
const resultText = "hello."
 
app.use(cors())
app.post('/rest/text', function (req, res) {
   res.send(resultText)
})
app.post('/rest/json', function (req, res) {   
   res.json(result)
})
io.on('connection', (socket) => {
   socket.on("send", (json) => {
       socket.emit("message", result)
   })
});
server.listen(port, function () {
   console.log('server listening on port ' + port)
})
```
