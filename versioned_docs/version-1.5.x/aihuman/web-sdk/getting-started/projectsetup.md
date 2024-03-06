---
sidebar_position: 1
---

# Project Setup

**0. HW/SW requirements**
- 100Mbps and above network environment 
- for PC, intel i5 and above performance CPU/4G RAM 
- for Android, snapdrago S660 or above performance CPU/4G RAM (for example, Galaxy A7 is minimum.)
- for iOS, iOS6S or above 
- browser support: Chrome(109 and after), Safari (16 and after)

**1. Include the SDK**

Include the JavaScript SDK in the web page as shown below. 

```html
<script src="https://cdn-aihuman.deepbrainai.io/sdk/web/aiPlayer-1.5.2.min.js"></script>
```

**2. Specify the area to contain the AIPlayer object.**

Designate the HTML element to include the AIPlayer object as shown below. You can freely set the size and position with this.

```html
<div id="AIPlayerWrapper"></div>
```

**3. Create an AIPlayer object and set with the specified HTML element**

Create an AIPlayer object with the area (element) where the AIPlayer is to be drawn as an argument to the AIPlayer constructor as shown below.

```javascript
const wrapper = document.getElementById("AIPlayerWrapper");
const AI_PLAYER = new AIPlayer(wrapper);
```
