---
displayed_sidebar: aifrontWebhookSidebar
sidebar_position: 1
slug: /aifront/webhook-server
---

# Webhook Server


본 문서는 DeepBrain AI의 Template Chatbot Webhook에 관한 설명서이다.


## Webhook Sample

`projectInfo` JSON의 `chatbot` 항목 예시

```javascript
"chatbot": {
    "type": "webhook",
    "info": {
        "url": "http://localhost:3000",
        "type": "text",
        "connectionType": "websocket"
    }
}
```
- type (webhook)
- info
  - url
  - type
    - text
    - json
  - connectionType
    - websocket
    - rest

## Sample Chatbot Server

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

## Webhook type

### `text` type
request
```javescript
hello.
```
response
```javescript
hello.
```

### `json` type
request
```javascript
{ text: 'hello' }
```
response
```json
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