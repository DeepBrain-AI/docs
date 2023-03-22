---
sidebar_position: 1
---

# Overview

## Demo web page

The demo web page is a web page that allows you to experience functions using the Web(js) AI Human SDK, and when you press the DEMO button[(Link)](https://aihuman.deepbrain.io/webdemo/demo1.html), the following menu appears at the top right of the web page.

<img src="/img/aihuman/web/demo_btn.png" />

### Demo web page menu

Each menu is as follows.

- QuickStart : AIPlayer QuickStart
- SDK Demo : functionalities of AIPlayer
- STT Demo : AIPlayer + PlayChat

## Sample Project

The sample covered in this document is an example using the AI Human SDK, which provides a demonstration of its functions by implementing them in the Sample Project. Through this, it is possible to examine in detail how SDK can be actually used and operated.

**Configuration**

| Filename          | Division  |Description                      |
| ----------------- | -------- |----------------------------------|
| `generateJWT.js`  | `Server` | generate client token javascript
| `quickStart.html` | `Client` | quick start html
| `quickStart.js`   | `Client` | quick start javascript
| `demo1.html`      | `Client` | sdk demo html
| `demo1.js`        | `Client` | sdk demo javascript
| `demo1.css`       | `Client` | sdk demo css
| `demo2.html`      | `Client` | stt demo css
| `demo2.js`        | `Client` | stt demo css
| `demo2.css`       | `Client` | stt demo css

<br />

### How to Run

The sample project environment provides two types: node-express and nextjs. After accessing SDK-Project[(link)](https://aihuman.deepbrain.io/aihuman/sdk), you can download the sample project by clicking the 'Sample' button below.

<img src="/img/aihuman/web/sdk_sample1.png" />

<br />
<br />

**Configuration**

When you extract the downloaded files, you will have the following file structure. Here's how each project works.

| Folder name    | Description      |
| -------------- | ---------------- |
| `node-express` | sample project 1 |
| `nextjs`       | sample project 2 |

<br />

### Run using nextjs

Use nextjs to quickly create projects (SDK DEMO versions) using the AI Human SDK.

**1. Prepare appId and userKey through the [Project Setup](../getting-started/projectsetup) process.**

**2. Modify the `/nextjs/pages/api/generateJWT.js` file.**

- Input the appId in the 4th line.
- Input the userKey in the 2nd line.

<img src="/img/aihuman/web/sdk_sample3.png" />

**3. Run the server from the `/nextjs` directory location using the command below.**

```
$ npm install
$ npm run dev
```

**4. From a Chrome browser, access `http://localhost:3000`.**

**5. Normal operation screenshot**

The following version of `SDK DEMO` will be executed.

<img src="/img/aihuman/web/sdk_demo_01.png" />

<br />
<br />
<br />

### Run using node-express

**1. Prepare appId and userKey through the [Project Setup](../getting-started/projectsetup) process.**

**2. Modify the `/node-express/server/generateJWT.js` file.**

- Input the appId in the 5th line.
- Input the userKey in the 3rd line.

<img src="/img/aihuman/web/sdk_sample2.png" />

**3. Run the server from the `/node-express/server` directory location using the command below.**

```
$ npm install
$ npm start
```

**4. Run the `/node-express/client/quickStart.html` file from a Chrome browser.**

**5. Normal operation screenshot**

If quickStart.html, demo1.html, and demo2.html operate normally, it is as shown in the screen shot below.

<img src="/img/aihuman/web/quick_start.png" />
<img src="/img/aihuman/web/sdk_demo_01.png" />
<img src="/img/aihuman/web/stt_demo_01.png" />
