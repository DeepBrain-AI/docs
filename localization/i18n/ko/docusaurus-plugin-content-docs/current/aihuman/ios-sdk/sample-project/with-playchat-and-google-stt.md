---
sidebar_position: 5
---

# Google STT와 PlayChat 연동

:::note 관련 파일

- STTSampleViewController.swift

:::

:::info
STTSampleViewController의 viewDidLoad 함수에서, GoogleSTTOtion의 생성자에 GoogleAPI 키를 입력해야 한다.
:::

마지막으로 AI Human + PlayChat + Google STT(구글에서 제공하는 음성인식 데이터를 텍스트로 변환)는 대화형 AI 서비스를 실제 대화를 주고 받는것과 같은 환경으로 했을때의 경험을 제공한다. 챗봇으로 부터 받은 메세지를 AI를 통해 음성을 듣고 유저가 실제 입으로 말하는 내용을 챗봇으로 전달한다.

<p align="center">
<img src="/img/aihuman/ios/aisample_ss_stt.PNG" style={{zoom: "50%"}} />
</p>
