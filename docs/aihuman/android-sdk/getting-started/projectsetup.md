---
sidebar_position: 2
---

# Project Setup

In this chapter, you will learn how to create a project and register UserKey using android project's AppId. Userkey is required for authentication to use AI Human SDK.

## 1. Create android project using Android Studio.

Below is the project's setting.(It is a sample, not mandatory)

<img src="/img/aihuman/android/screenshot_projectsetup_1.png"/>

**Download the SDK and Android sample from the [SDK Website](https://aihuman.deepbrain.io).** The sample project's configurations are shown below.

- Project level build gradle (File > Project structure)
  -  Android Gradle plugin version : 7.1.1, Gradle Version : 7.2

**[Project level build.gradle setup]**

<img src="/img/aihuman/android/screenshot_projectsetup_2.png"/>

**[App level build.gradle setup]**
- compileSdkVersion 32, buildToolVersion "30.0.3", minSdkVersion 22, targetSdkVersion 32

<img src="/img/aihuman/android/screenshot_projectsetup_3.png"/>


## 2. Add SDK (aar) to project

Add the 2 aar files(AIHumanSDK, AIHuman3DSDK) to your project's libs. The libs folder should be make under app dir. And update dependency in app level build.gradle file.(implementation fileTree(dir: "libs", include: ["*.jar", "*.aar"])). Check below **App level build.gradle** section. 

<img src="/img/aihuman/android/screenshot_projectsetup_4.png"/>



## 3. App level build.gradle : (Check the sample's build.gradle)

Configure the following items in build.gradle. See the sample for more details.

1. Java 8  : compileOptions
2. packagingOptions : exclude meta files 
3. viewBinding (option) : Not mandatory, but configured in the sample project.
4. dependency :  add SDK's dependency and sync it. 

```groovy
android{
  //...
  compileOptions {
      sourceCompatibility JavaVersion.VERSION_1_8
      targetCompatibility JavaVersion.VERSION_1_8
  }

  buildFeatures {
      viewBinding true
  }

  packagingOptions {
      exclude 'META-INF/DEPENDENCIES'
      exclude 'META-INF/LICENSE'
      exclude 'META-INF/LICENSE.txt'
      exclude 'META-INF/license.txt'
      exclude 'META-INF/NOTICE'
      exclude 'META-INF/NOTICE.txt'
      exclude 'META-INF/notice.txt'
      exclude 'META-INF/INDEX.LIST'
      exclude 'META-INF/ASL2.0'
      exclude("META-INF/*.kotlin_module")
  }
}

dependencies {
	//...

 	//dependencies for AIHumanSDK AI aar ====================================
    implementation fileTree(dir: "libs", include: ["*.jar", "*.aar"])

    implementation 'androidx.appcompat:appcompat:1.4.1'
    implementation('io.socket:socket.io-client:1.0.1') {
        exclude group: 'org.json', module: 'json'
    }

    implementation 'com.squareup.retrofit2:retrofit:2.6.0'
    implementation 'com.squareup.retrofit2:converter-scalars:2.6.0'

    //dialogflow (option but needs for the sample)
    implementation 'com.google.cloud:google-cloud-dialogflow:2.1.0'
    implementation 'com.fasterxml.jackson.core:jackson-core:2.11.1'
    implementation 'com.fasterxml.jackson.core:jackson-annotations:2.11.1'
    implementation 'com.fasterxml.jackson.core:jackson-databind:2.11.1'

    implementation 'io.grpc:grpc-okhttp:1.30.0'
    implementation 'com.google.code.gson:gson:2.8.6'

    //STT (option but needs for the sample)
    implementation 'org.greenrobot:eventbus:3.1.1'
    //no need to add protobuf for grpc
    implementation 'com.google.api.grpc:grpc-google-cloud-speech-v1:1.23.0'

    //jwt authentication
    api group: 'io.jsonwebtoken', name: 'jjwt', version: '0.9.0'
    //==================================== dependencies for AIHumanSDK AI aar

    // MS Speech SDK ====
    implementation 'com.microsoft.cognitiveservices.speech:client-sdk:1.19.0'
    // Diff lib for pronunciation assessment
    implementation "io.github.java-diff-utils:java-diff-utils:4.10"
    // ==== MS Speech SDK
}
```



## 4. AndroidManifest.xml setup

permission : INTERNET is required

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

application attribute setup 
    **When"Namespace 'tools' is not bound" occurs, click 'Create Namespace declaration.'**

```xml
<application
    android:usesCleartextTraffic="true"
    tools:replace="android:icon,android:theme">
```

for 3d character activity (if you use it)

```xml
<activity android:name=".activity.UnityActivity"
    android:screenOrientation="fullSensor"
    android:configChanges="mcc|mnc|locale|touchscreen|keyboard|keyboardHidden|navigation|orientation|screenLayout|uiMode|screenSize|smallestScreenSize|fontScale|layoutDirection|density"
    android:hardwareAccelerated="false"
    android:theme="@style/UnityThemeSelector.Translucent"
    android:process=":Unity"/>
```

## 5. Gradle JDK setting (11)

If you use android studio over articfox version, you will see "Android Gradle plugin requires Java 11 to run. You are currently using Java 1.8." error. For this case, choose gradle jdk 11 (Top menu > preference > build, Execution, Deployment > Build Tool > Gradle > Gradle JDK > 11 version). If you don' have 11 version, please download it from [oracle website](http://www.oracle.com). [link](https://www.oracle.com/java/technologies/javase/jdk11-archive-downloads.html)

<img src="/img/aihuman/android/screenshot_projectsetup_5.png"/>
