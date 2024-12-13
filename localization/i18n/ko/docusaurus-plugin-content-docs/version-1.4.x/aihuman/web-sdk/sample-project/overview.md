---
sidebar_position: 1
---

# 개요

### Demo web page

Demo web page에서는 AI Human Web SDK(js)'의 기능을 사용해 볼 수 있습니다. 여기[(Link)](https://aihuman.aistudios.com/webdemo/demo1.html). 페이지의 오른쪽 상단에 아래와 같은 메뉴가 나오며, 이를 통해 SDK의 기능들을 둘러보십시오.

<img src="/img/aihuman/web/demo_btn.png" />

### Demo web page 메뉴

각 메뉴의 구성은 아래와 같습니다.

- QuickStart : 빠른 AIPlayer 시작
- SDK Demo : AIPlayer 기능 예시 
- STT Demo : AIPlayer + Chatbot(PlayChat) 예시 

## 샘플 Project

SDK 사이트에 제공된 샘플은 SDK의 기능을 보여주는 예입니다. 이를 통해 SDK가 실제로 어떻게 작동하는지 확인할 수 있습니다.

여기[(link)](https://aihuman.aistudios.com/aihuman/sdk)에서 다운로드하십시오.

<img src="/img/aihuman/web/sdk_sample1.png" />

<br />
<br />

### 실행 방법

샘플 프로젝트는 node-express와 nextjs로 두 가지를 제공합니다. 먼저 샘플의 내용을 확인합니다.

### Contents

zip file의 압축을 풀면, 다음과 같은 폴더가 생성됩니다. 

| Folder name    | Description      |
| -------------- | ---------------- |
| `node-express` | sample project 1 |
| `nextjs`       | sample project 2 |


폴더 안에는 다음과 같은 파일들이 있습니다. 

| Filename          | Division  |Description                      |
| ----------------- | -------- |----------------------------------|
| `generateJWT.js`  | `Server` | generate client token javascript
| `demo.html`      | `Client` | sdk demo html
| `demo.js`        | `Client` | sdk demo javascript
| `demo.css`       | `Client` | sdk demo css


<br />

### nextjs 실행하기

샘플의 nextjs 폴더를 살펴봅니다.

**1. [프로젝트 셋업](../getting-started/projectsetup)를 통해, appId를 입력하고, userKey를 발급받습니다.**

**2. `/nextjs/pages/api/generateJWT.js` 파일을 수정합니다.**

- 아래와 같이 appId, userkey를 입력합니다. 

<img src="/img/aihuman/web/sdk_sample3.png" />

**3. `/nextjs` 디렉토리에서 아래의 명령어를 통해 서버을 실행합니다.**

```
$ cd nextjs
$ npm install
$ npm run dev
```

**4. 크롬 브라우저에서 `http://localhost:3000`에 접속합니다.**

문제가 없다면, 아래와 같이 `SDK DEMO`가 실행됩니다.

<img src="/img/aihuman/web/sdk_demo_01_r1.png" />

<br />
<br />
<br />

### node-express 실행하기

**1. [프로젝트 셋업](../getting-started/projectsetup)를 통해, appId를 입력하고, userKey를 발급받습니다.**

**2. `/node-express/server/generateJWT.js` 파일을 수정합니다.**

- 아래와 같이 appId, userkey를 입력합니다. 

<img src="/img/aihuman/web/sdk_sample2.png" />

**3. `/node-express/server` 디렉토리 위치에서 아래의 명령어를 통해 서버을 실행합니다.**

```
$ cd node-express/server
$ npm install
$ npm start
```

**4. 크롬 브라우저로 `/node-express/client/quickStart.html` 파일을 불러옵니다.**
