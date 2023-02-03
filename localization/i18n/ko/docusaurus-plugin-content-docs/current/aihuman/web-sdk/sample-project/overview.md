---
sidebar_position: 1
---

# 개요

## Demo web page

The demo web page is a web page that allows you to experience functions using the Web(js) AI Human SDK, and when you press the DEMO button[(Link)](https://aitalk.deepbrainai.io/webdemo/demo1.html), the following menu appears at the top right of the web page.

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

### Execution Guide

**1. Create a project to execute the sample code.**

**2. Download the sample code, decompress it, and add it to a location where static access is possible when the project is executed.**

- ex) For next.js, inside the public folder by default

**3. Implement [4.2. Create clientToken on Server](#42-create-clienttoken-on-server) on the project.**

In the generateClientToken function of the js internal file corresponding to the sample to be executed, enter an address that can request the clientToken generation implemented earlier.

**4. If you have performed all of the above '1 ~ 3', run the project and connect it.**

- By default, connect to the address of http://{set domain | IP address | localhost}:{set PORT}/{path to which the sample was added}/{filename}.html

**5. Normal operation screenshot**

The image below shows a screenshot of the normal operation of quickStart.html, demo1.html, and demo2.html from the left.

<img src="/img/aihuman/web/quick_start.png" />
<img src="/img/aihuman/web/sdk_demo_01.png" />
<img src="/img/aihuman/web/stt_demo_01.png" />
