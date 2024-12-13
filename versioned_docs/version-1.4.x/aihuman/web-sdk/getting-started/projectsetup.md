---
sidebar_position: 1
---

# Project Setup

(Working)

**1. Include the SDK**

Include the JavaScript SDK in the web page as shown below. 

```html
<script src="https://cdn-aihuman.deepbrainai.io/sdk/web/aiPlayer-1.4.1.min.js"></script>
```

**2. Specify the area to contain the AIPlayer object**

Designate the HTML Element area to include the AIPlayer object as shown below. You can freely adjust the area where the AIPlayer will be drawn by adjusting the size or position of the area.

```html
<div id="AIPlayerWrapper"></div>
```

**3. Create an AIPlayer object and set with the specified HTML element**

Create an AIPlayer object with the area (element) where the AIPlayer is to be drawn as an argument to the AIPlayer constructor as shown below.

```javascript
const wrapper = document.getElementById("AIPlayerWrapper");
const AI_PLAYER = new AIPlayer(wrapper);
```
