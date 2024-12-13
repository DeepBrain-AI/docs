---
sidebar_position: 1
---

# 개요

## Demo web page

본 문서에서 다루는 샘플은 AI Human SDK를 사용한 예시로, DEMO 버튼[(Link)](https://aihuman.aistudios.com/webdemo/demo1.html)을 누르면 웹페이지의 우측 상단에 아래와 같은 메뉴가 나타납니다.

<img src="/img/aihuman/web/demo_btn.png" />

### Demo web page menu

각 메뉴의 구성은 아래와 같습니다.

- QuickStart : AIPlayer QuickStart
- SDK Demo : functionalities of AIPlayer
- STT Demo : AIPlayer + PlayChat

## Sample Project

본 내용은 AI Human SDK를 사용하여 간단힌 프로젝트를 만드는 방법을 제공합니다. 이는 샘플 프로젝트를 다운받아 간단히 구현이 가능합니다. 다운 받은 샘플 프로젝트의 세부 파일에 대한 설명은 아래와 같습니다.

**파일 구성**

| Filename          | Division | Description                      |
| ----------------- | -------- | -------------------------------- |
| `generateJWT.js`  | `Server` | generate client token javascript |
| `quickStart.html` | `Client` | quick start html                 |
| `quickStart.js`   | `Client` | quick start javascript           |
| `demo1.html`      | `Client` | sdk demo html                    |
| `demo1.js`        | `Client` | sdk demo javascript              |
| `demo1.css`       | `Client` | sdk demo css                     |
| `demo2.html`      | `Client` | stt demo css                     |
| `demo2.js`        | `Client` | stt demo css                     |
| `demo2.css`       | `Client` | stt demo css                     |

<br />

### 실행방법

샘플 프로젝트 코드 환경은 node-express와 nextjs로 두 가지를 제공한다. SDK-Project[(링크)](https://aihuman.aistudios.com/aihuman/sdk)를 접속 후, 하단에서 아래의 `Sample` 버튼을 클릭하면 sample 프로젝트를 다운 받을 수 있습니다.

<img src="/img/aihuman/web/sdk_sample1.png" />

<br />
<br />

**파일 구성**

다운 받은 파일의 압축을 풀면 아래의 파일 구조를 가집니다. 각 프로젝트의 실행 방법은 다음과 같습니다.

| Folder name    | Description      |
| -------------- | ---------------- |
| `node-express` | sample project 1 |
| `nextjs`       | sample project 2 |

<br />

### nextjs 실행하기

nextjs를 활용하여 AI Human SDK를 사용한 프로젝트(SDK DEMO 버전)를 빠르게 만들 수 있습니다.

**1. [프로젝트 셋업](../getting-started/projectsetup)를 통해, appId와 userKey를 발급받는다.**

**2. `/nextjs/pages/api/generateJWT.js` 파일을 수정한다.**

- [프로젝트 셋업](../getting-started/projectsetup)에서 생성한 appId를 4번째 줄에 넣어줍니다.
- [프로젝트 셋업](../getting-started/projectsetup)에서 생성된 userKey를 2번째 줄에 넣어줍니다.

<img src="/img/aihuman/web/sdk_sample3.png" />

**3. `/nextjs` 디렉토리 위치에서 아래의 명령어를 통해 서버을 실행합니다.**

```
$ cd nextjs
$ npm install
$ npm run dev
```

**4. 크롬 브라우저에서 `http://localhost:3000`에 접속합니다.**

**5. 정상작동 스크린샷**

아래와 같은 `SDK DEMO` 버전이 실행됩니다.

<img src="/img/aihuman/web/sdk_demo_01.png" />

<br />
<br />
<br />

### node-express 실행하기

**1. [프로젝트 셋업](../getting-started/projectsetup)를 통해, appId와 userKey를 발급받는다.**

**2. `/node-express/server/generateJWT.js` 파일을 수정합니다.**

- [프로젝트 셋업](../getting-started/projectsetup)에서 생성한 appId를 5번째 줄에 넣어줍니다.
- [프로젝트 셋업](../getting-started/projectsetup)에서 생성된 userKey를 3번째 줄에 넣어줍니다.

<img src="/img/aihuman/web/sdk_sample2.png" />

**3. `/node-express/server` 디렉토리 위치에서 아래의 명령어를 통해 서버을 실행합니다.**

```
$ cd node-express/server
$ npm install
$ npm start
```

**4. 크롬 브라우저로 `/node-express/client/quickStart.html` 파일을 불러옵니다.**

**5. 정상작동 스크린샷**

아래 이미지는 왼쪽 부터 quickStart.html, demo1.html, demo2.html 정상작동 스크린샷입니다.

<img src="/img/aihuman/web/quick_start.png" />
<img src="/img/aihuman/web/sdk_demo_01.png" />
<img src="/img/aihuman/web/stt_demo_01.png" />
