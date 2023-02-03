---
sidebar_position: 1
---

# 프로젝트 셋업하기

(Working)

**1. Including the SDK**

Include the JavaScript SDK in the web page as shown below. The URL included in the script is the latest JavaScript SDK download path provided by Deep Brain AI, so you can always use the latest version.

```html
<script src="https://cdn-aihuman.deepbrainai.io/sdk/web/aiPlayer-latest.min.js"></script>
```

In addition, a specific version other than the latest version may be used as shown below.

```html
<script src="https://cdn-aihuman.deepbrainai.io/sdk/web/aiPlayer-1.4.0.min.js"></script>
```

**2. Specifies the area to contain the AIPlayer object.**

Designate the HTML Element area to include the AIPlayer object as shown below. You can freely adjust the area where the AIPlayer will be drawn by adjusting the size or position of the area.

```html
<div id="AIPlayerWrapper"></div>
```

**3. Creating an AIPlayer object**

Create an AIPlayer object by entering the area where the AIPlayer is to be drawn as an argument to the AIPlayer constructor as shown below.

```javascript
const wrapper = document.getElementById("AIPlayerWrapper");
const AI_PLAYER = new AIPlayer(wrapper);
```

**4. Authenticating the SDK**

**4.1. Setting up appId and issuing userKey on SDK website**

- Log in to the [SDK website](https://aihuman.deepbrain.io)
- If there is no project, you can get a userkey by entering the appId to be used on the web after creation and pressing OK.
- If you have a project, you can check the appId of the project and the userKey issued.

<img src="/img/aihuman/web/project.png" />
