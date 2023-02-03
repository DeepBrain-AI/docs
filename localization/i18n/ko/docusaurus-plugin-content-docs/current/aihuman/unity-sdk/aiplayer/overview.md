---
sidebar_position: 1
---

# 개요

In this chapter, we will learn how to set up and use the AIPlayer object that can perform specific actions by actually displaying AI Human.


:::tip Dev Tips!

- Basically, AIPlayer inherits UnityEngine.MonoBehavior, so it can be used as an 'Add Component' to the gameobject.
- In order to know the operating state of the AIPlayer, it is necessary to implement it through AIPlayerCallback inheritance. Like AIPlayer, AIPlayer Callback also inherits UnityEngine.MonoBehavior, so it can be used as an 'Add Component' to the gameobject.
- In order to receive AI images from AIPlayer, implementation through AIFrameImageProvider inheritance is necessary. Like AIPlayer, AIFrameImageProvider also inherits UnityEngine.MonoBehavior, so it can be used as an 'Add component' to the gameobject.
- The rendering of AI images supplied by AIPlayer (UI object configuration, position, scale) can be implemented by referring to QuickStart and AI Human Demo Scene.

:::
