---
sidebar_position: 1
---

# Overview

## Demo web page

The demo web page allows you to experience the AI Human Web SDK(js)'s features. You can check out the page here[(Link)](https://aihuman.deepbrain.io/webdemo/demo1.html). On the page, the following menu appears at the top right. Check out the Demo page to look around the SDK's features.

<img src="/img/aihuman/web/demo_btn.png" />

#### Demo web page menu

- QuickStart : Start AIPlayer quickly
- SDK Demo : Demo of AIPlayer Functionalities
- STT Demo : AIPlayer + Chatbot(PlayChat) example

## Sample Project

The sample provided on the SDK site is an example of the SDK, which demonstrates its functions. Through this, you can check out how the SDK actually works. 

You can download it from here[(link)](https://aihuman.deepbrain.io/aihuman/sdk).

<img src="/img/aihuman/web/sdk_sample1.png" />

<br />
<br />

### How to Run the Sample

The sample project gives two examples which are based on node-express and nextjs respectively. Let's check out the contents first.

#### Contents

When you extract the zip file, you will have the following folders. 

| Folder name    | Description      |
| -------------- | ---------------- |
| `node-express` | sample project 1 |
| `nextjs`       | sample project 2 |


And files inside nextjs folder.

| Filename          | Division  |Description                      |
| ----------------- | -------- |----------------------------------|
| `generateJWT.js`  | `Server` | generate client token javascript
| `demo.html`      | `Client` | sdk demo html
| `demo.js`        | `Client` | sdk demo javascript
| `demo.css`       | `Client` | sdk demo css


<br />

#### Run nextjs sample

Let's get into the nextjs folder from the sample.

**1. Prepare appId and userKey through the [Project Setup](../getting-started/projectsetup) process.**

**2. Modify the `/nextjs/pages/api/generateJWT.js` file.**

- Input the appId, userkey as shown below.

<img src="/img/aihuman/web/sdk_sample3.png" />

**3. Run the server from the `/nextjs` directory using commands below.**

```
$ cd nextjs
$ npm install
$ npm run dev
```

**4. From a Chrome browser, go to `http://localhost:3000`.**

The following web page(`SDK DEMO`) will be shown if everything goes well.

<img src="/img/aihuman/web/sdk_demo_01_r1.png" />

<br />
<br />
<br />

#### Run node-express sample

**1. Prepare appId and userKey through the [Project Setup](../getting-started/projectsetup) process.**

**2. Modify the `/node-express/server/generateJWT.js` file.**

- Input the appId, userkey as shown below.

<img src="/img/aihuman/web/sdk_sample2.png" />

**3. Run the server from the `/node-express/server` directory using commands below.**

```
$ cd node-express/server
$ npm install
$ npm start
```

**4. Open the `/node-express/client/demo.html` file with a Chrome browser.**