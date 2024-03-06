---
sidebar_position: 1
---

# 개요

In this chapter, we will learn how to set up and use the AIPlayer object that can perform specific actions by actually displaying AI Human.

AIPlayer consists of UserControl type View and ViewModel that controls related routines. For more details, please refer to the contents below and the main class API manual.


:::tip Dev Tips!

- The concepts of MVVM, Dependency Injection, and Data Binding are applied to AI Human SDK and WPF Sample.
- When developing a custom app by using the SDK, create an AIHuman.Media.AIPlayer object. When composing a screen, obtain a View object by using the GetObject() function of AIPlayer and place it.
- It is recommended to use Data Binding for properties such as margin, size, and speed in AIPlayer.
- For ViewModel related to SDK in Custom App, it is recommended to inherit and implement AIHuman.Common.Base.ViewModelBase, AIHuman.Interface.IAIPlayerCallback.
- It is recommended to call the Dispose() function of the object before destroying or terminating the AIPlayer. (AIPlayerViewModel is a Dispoable object.)

:::
