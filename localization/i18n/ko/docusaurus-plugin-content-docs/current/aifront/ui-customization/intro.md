---
displayed_sidebar: aifrontUISidebar
sidebar_position: 1
slug: /aifront/ui-customization
---

# UI Customization

본 가이드 문서는 AI Human 템플릿 페이지 UI 개발을 위한 것입니다. AI Human 템플릿 페이지는 디바이스에 따라 데스크톱, 모바일, 키오스크용으로 구분되어 있습니다.

<br />


**AI Human Desktop**

<p align="center">
<img src="/img/aifront/aihuman-desktop.png"/>
</p>

<br />

**AI Human Mobile**

<p align="center">
<img src="/img/aifront/aihuman-mobile.png" style={{ zoom: '50%' }} />
</p>



<br />

**AI Human Kiosk**

<p align="center">
<img src="/img/aifront/aihuman-kiosk.png" style={{ zoom: '50%' }} />
</p>

<br />


각 페이지 코드는 `pages` 폴더 하위에 디바이스별로 나누어져 있습니다.

각 페이지는 `aihumans` DB의 `aihuman-projects` 콜렉션에 있는 데이터의 `projectInfo` 필드를 토대로 UI가 구성됩니다.

<p align="center">
<img src="/img/aifront/pages.png" />
</p>

각 페이지를 구성하는 컴포넌트들은 `components` 폴더 하위에서 확인하실 수 있습니다.

<p align="center">
<img src="/img/aifront/aihuman-components.png" />
</p>


다음과 같이 폴더 내부에 디바이스별로 컴포넌트가 구분되어 있습니다.

<p align="center">
<img src="/img/aifront/aihuman-components-detail.png" />
</p>
