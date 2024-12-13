---
sidebar_position: 1
---

# 프로젝트 셋업하기

(Working)

**1. SDK 추가하기**

아래와 같이 Javascript SDK를 웹페이지에 추가하십시오.

```html
<script src="https://cdn-aihuman.deepbrainai.io/sdk/web/aiPlayer-1.4.1.min.js"></script>
```

**2. AIPlayer 객체를 포함할 영역을 지정합니다.**

아래와 같이 AIPlayer 객체를 포함할 HTML Element 영역을 지정합니다. 영역의 크기나 위치를 조정하여 AIPlayer가 그려질 영역을 자유롭게 조정할 수 있습니다.

```html
<div id="AIPlayerWrapper"></div>
```

**3. AIPlayer 객체를 생성하십시오.**

AIPlayer 생성자에 대한 인수로 위에서 지정한 AIPlayer의 영역(wrapper)을 입력하여 AIPlayer 객체를 만듭니다.

```javascript
const wrapper = document.getElementById("AIPlayerWrapper");
const AI_PLAYER = new AIPlayer(wrapper);
```

<br/>

