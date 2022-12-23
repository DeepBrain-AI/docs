---
sidebar_position: 2
---

# Project Set up

In this chapter, you will learn how to create and register UserKey and AppId, etc. required for authentication for using AI Human SDK.

## 1. Download SDK
You can download SDKs for each platform here. **[AI Human SDK Website](https://aitalk.deepbrainai.io)**.

## 2. Create an Xcode project and cocoapods

Create project to use the AI Human SDK in the Xcode.

Add the **AIPlayer.podspec file and the AIPlayer folder** to the Project folder.


## 3. Setup the project

Changing the terminal path to the location of the project.

#### 3-1. Create Podfile

Create a cocoapods configuration file.
- **Cocoapods** is a library dependency management manager that allows you to use numerous Xcode project libraries.
- You can find out how to install and use it at **[cocoapods](https://cocoapods.org)**.

```console
cd /project_path
pod init
```

#### 3-2. Add and install `pod 'AIPlayer'`

Open the generated podfile and add **AIPlayer**. <br/>
It does not support bitcode, so it is necessary to add disabling bitcode at the bottom of podfile.

```console
target 'your project' do
  # Comment the next line if you don't want to use dynamic frameworks
  use_frameworks!

  # Pods for your project
	pod 'AIPlayer', :path => '.'  // add AIPlayer SDK Cocoapods

  target 'your project tests' do
    inherit! :search_paths
    # Pods for testing
  end

  target 'your project UITests' do
    # Pods for testing
  end

end

# disable cocoapods BITCODE
post_install do |installer|
    installer.pods_project.targets.each do |target|
        target.build_configurations.each do |config|
            config.build_settings['ENABLE_BITCODE'] = 'NO'
        end
    end
end
```

For the objective c project, you must add
```
ENV['SWIFT_VERSION'] = '5'
```
 to the podfile.

After saving the podfile, you can add the library through the command below in the terminal.

```
pod install
```

<br/>

#### 3-3. Change project setting

<!-- <img src="/img/aihuman/windows/NewProject_Add_Sdk.png" /> -->
<!-- <img src="/img/aihuman/ios/aisample_disable_bitcode.PNG" width="508" height="105" /> <br/> -->
<img src="/img/aihuman/ios/aisample_disable_bitcode.PNG" /> <br/>
 
 After running the .xcworkspace file, disable **Enble Bitcode** in the build settings of the project.

<br/>

## 4. Notes for reference

- AIPlayer SDK works with **iOS 10.0** or later.

- AIPlayer SDK works with **Swift 5** or later.

- To use AIPlayer SDK, You must work with **xCode 12** or later

- Note1: It is not possible to build on the simulator.

- Note2: Currently, SDK including 3D cannot be debugged on iOS 16 and later devices.

<br/>
