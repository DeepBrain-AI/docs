---
sidebar_position: 6
---

# 발화 이외 기능들

(주로 AI 설정 관련)

AI가 셋업 완료 이후 aiPlayer의 일부 설정들은 변경 가능하다. 아래 샘플 프로젝트 화면에서 **scale**이 조절 가능한 것이 보인다. 

<p align="center">
<img src="/img/aihuman/android/Screenshot_20221107-120334_AIHumanSDKDemo.jpg" style={{zoom: "25%"}} />
</p>

## AI 크기(스케일) 변경  
0.5 ~ 1.5 사이값

```java
aiPlayer.setScale(scale);
```

## AI 위치 
값이 커질수록 아래에서 그려진다(pixel 단위).

```java
aiPlayer.setTopMargin(topMargin); //3d not support 
```
