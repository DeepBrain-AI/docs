---
sidebar_position: 6
---

# Functionalities other than AI Speaking
(mainly related to AI settings)

After the resource is loaded, some settings of aiPlayer can be changed while the actual operation is on. In the sample project screen below, you can see that **scale** can be adjusted.

<p align="center">
<img src="/img/aihuman/android/Screenshot_20221107-120334_AIHumanSDKDemo.jpg" style={{zoom: "25%"}} />
</p>

<br/>

### Change AI Speech Rate
: value between 0.5 and 1.5

```java
aiPlayer.setScale(scale);
```

<br/>

### Change AI Top Margin
The larger the value, the lower it is drawn.

```java
aiPlayer.setTopMargin(topMargin); //3d not support 
```
