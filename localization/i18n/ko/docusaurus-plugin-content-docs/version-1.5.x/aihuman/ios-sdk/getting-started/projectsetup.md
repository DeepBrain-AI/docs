---
sidebar_position: 2
---

# 프로젝트 셋업하기

이번 챕터에서는 AI Human SDK를 이용한 인증에 필요한 UserKey, AppId 등을 생성하고 등록하는 방법에 대해 알 수 있습니다.

### 1. Download SDK

**[AI Human SDK Website](https://aihuman.aistudios.com)**에서 각 플랫폼에 대한 SDK를 다운로드할 수 있습니다.

### 2. Xcode 프로젝트 생성

SDK를 적용 할 Xcode 프로젝트를 생성합니다.

프로젝트 폴더에 **AIPlayerSDK.podspec 파일과 the AIPlayerSDK 폴더**를 추가합니다.

### 3. project 설정

터미널에서 경로를 프로젝트가 위치한 곳으로 변경합니다.

#### 3-1. Podfile 생성

cocoapods 구성 파일을 만듭니다.

- **Cocoapods**는 다양한 Xcode 프로젝트 라이브러리를 사용할 수 있는 라이브러리 종속성 관리자입니다.
- 설치 및 사용 방법은 **[cocoapods](https://cocoapods.org)**에서 확인할 수 있습니다.

```console
cd /project_path
pod init
```

#### 3-2. `pod 'AIPlayerSDK'` 추가 및 설치

생성된 podfile을 열고 **AIPlayerSDK**를 추가합니다. <br/>
3D캐릭터를 사용하려면 **`pod 'AIPlayerSDK/Include3D'`**를 추가해야 합니다.
실행 시에 라이브러리를 찾지 못하는 문제가 생기는 경우에는 post_install 부분을 추가해 줘야 합니다.

```console
target 'your project' do
  # Comment the next line if you don't want to use dynamic frameworks
  use_frameworks!

  # Pods for your project
	pod 'AIPlayerSDK', :path => '.'  // 2D만 사용 가능한 AIPlayer SDK 추가
  #pod 'AIPlayerSDK/Include3D', :path => '.'  // 2D와 3D를 사용 가능한 AIPlayer SDK 추가

  target 'your project tests' do
    inherit! :search_paths
    # Pods for testing
  end

  target 'your project UITests' do
    # Pods for testing
  end

end

# enable cocoapods BUILD_LIBRARY_FOR_DISTRIBUTION
post_install do |installer|
    installer.pods_project.targets.each do |target|
        target.build_configurations.each do |config|
            config.build_settings['BUILD_LIBRARY_FOR_DISTRIBUTION'] = 'YES'
        end
    end
end
```

Objective-C 프로젝트에서 사용할 때는 스위프트의 버젼을 podfile에 명시해야 합니다.

```
ENV['SWIFT_VERSION'] = '5'
```

to the podfile.

podfile을 저장한 후 터미널에서 아래 명령을 통해 라이브러리를 추가할 수 있습니다.

```
pod install
```

<br/>

#### 3-3. 프로젝트 설정 변경

<img src="/img/aihuman/ios/aisample_disable_bitcode.png" /> <br/>

.xcworkspace 파일을 실행한 후 **build setting**에서 **Enable Bitcode**를 사용하지 않음으로 설정합니다.

<br/>

### 4. 참고 사항

- AIPlayer SDK는 with **iOS 11.0** 이상에서 작동합니다.

- AIPlayer SDK는 with **Swift 5** 이상에서 작동합니다.

- AIPlayer SDK를 사용하기 위해서는 **xCode 12** 이상에서 작업해야 합니다.

- 참조1: 3D를 포함한 SDK의 경우 시뮬레이터에서는 실행이 불가능합니다.

- 참조2: 현재 iOS 16 이상 기기에서는 3D를 포함한 SDK를 디버깅할 수 없습니다.

<br/>
