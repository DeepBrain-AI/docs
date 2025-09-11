---
sidebar_position: 1
---

# Project Setup

### 0. System Requirements

| Environment         | Requirements                                                                                                                           |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Network             | 100Mbps or higher                                                                                                                      |
| PC                  | CPU i5 **10th Gen** or higher or equivalent performance<br/>RAM 8GB or higher                                                                  |
| Android             | **AP S710 (Android 10)** or **higher** or equivalent performance<br/>RAM 4GB or higher<br/>(even if satisfied, it is not smooth for Galaxy FE or A series) |
| iOS                 | **iPhone XS (iOS 13)** or **later**                                                                                                                     |
| Browser             | **Chrome 109** or **higher**<br/>**Safari 16** or **higher**                                                                                           |

<br/>

### 1. Include the AI Human SDK

Include the JavaScript (SDK) file in the web page as shown below.

```html
<script src="https://cdn-aihuman.deepbrainai.io/sdk/web/aiPlayer-1.6.X.min.js"></script>
```

<br/>

### 2. Specify the area to contain the AIPlayer object

Designate the HTML Element area to include the AIPlayer object as shown below. You can freely adjust the area where the AIPlayer will be drawn by adjusting the size or position of the area.

```html
<div id="AIPlayerWrapper"></div>
```

<br/>

### 3. Create an AIPlayer object and set with the specified HTML element

Create an AIPlayer object with the area (element) where the AIPlayer is to be drawn as an argument to the AIPlayer constructor as shown below.

```javascript
const wrapper = document.getElementById("AIPlayerWrapper");
const AI_PLAYER = new AIPlayer(wrapper);
```

<br/>

