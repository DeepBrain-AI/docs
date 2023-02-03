---
sidebar_position: 3
---

# 나의 AI Human 만들기

In this chapter, we will quickly set up AIPlayer with the default AI and learn about AI speaking process. When setting up AIPlayer for the first time, it may take several minutes to load depending on the network condition.

For your information, it is similar to the QuickStart part of the Sample, which can be downloaded from the SDK website.

:::tip
From the demo, you can learn more from the scene and code in the file below.
- 1.QuickStart.scene
- DemoQuickStart.cs
- DemoPlayerCallback.cs
- DemoFrameImageProvider.cs
:::

### 1. Configures a scene for implementing AIPlayer functions.

#### 1-1. Select Assets > Create > Scene from the Unity Editor menu to create a new scene.
#### 1-2. Delete the Main Camera and Directional Light game objects that are created by default.
#### 1-3. Select AI Human SDK, AIPlayer, AIPlayer, and AIPlayerUI prefabs in the Assets/DeepBrainAI/SDK/Prefabs path of the Project window and place them in the Hierarchy window with drag and drop.
#### 1-4. After selecting the AIHumanSDK game object in the Hierarchy window, enter or set the authentication information issued by **[AI Human SDK Website](https://aitalk.deepbrainai.io)** in the AppId, UserKey, Uuid, and Platform items of the Inspector > AIHumanSDKManager component. (If Uuid is not entered, it is automatically Call Guid.NewGuid() to create a Uuid.)
#### 1-5. In the Unity Editor menu, create a new game object through GameObject > Create Empty and set the name to QuickStart.

<img src="/img/aihuman/unity/quickstart_hierarchy.png" />

#### 1-6. If you have created a Unity project in a URP or HDRP environment, select "Canvas/AIHumanView/RawImage - face" gameobject in the AIPlayerUI that you placed in the Hierarchy window, and replace the Material item in the Inspector window with "Chromakey - Built-in" to "Chromakey - URP" Material.

### 2. Write a script for implementing the AIPlayer function.
Select Assets > Create > C# Script from the Unity Editor menu to create a script and write it as follows.

- MyAIPlayerCallback.cs

Inherit and implement AIPlayerCallback for monitoring AIPlayer behavior.

```js
using UnityEngine;
using UnityEngine.UI;
using AIHuman.Common;
using AIHuman.SDK;

public class MyAIPlayerCallback : AIPlayerCallback
{
    public Text _statusText;
   
    public override void OnAIPlayerError(AIError error)
    {
        Debug.LogError(string.Format("{0} {1}", nameof(MyAIPlayerCallback), error.GetMessage()));

        _statusText.text = error.GetMessage();
    }

    public override void OnAIPlayerResLoadingProgressed(int current, int total)
    {       
        float progress = ((float)current / (float)total) * 100f;
        _statusText.text = string.Format("AI Resource Loading... {0}%", (int)progress);
    }

    public override void OnAIStateChanged(AIState state)
    {
        Debug.Log(string.Format("{0} {1}", nameof(MyAIPlayerCallback), state._state));

        switch (state._state)
        {
            case AIState.Type.RES_LOAD_STARTED:
                {
                    _statusText.text = "AI Resource loading started.";
                    break;
                }
            case AIState.Type.RES_LOAD_COMPLETED:
                {
                    _statusText.text = "AI Resource loading completed.";                                    
                    break;
                }
            case AIState.Type.SPEAKING_PREPARE_STARTED:
                {
                    _statusText.text = "AI started preparation to speak.";
                    break;
                }
            case AIState.Type.SPEAKING_PREPARE_COMPLETED:
                {
                    _statusText.text = "AI finished preparation to speak.";
                    break;
                }
            case AIState.Type.SPEAKING_STARTED:
                {
                    _statusText.text = "AI started speaking.";                  
                    break;
                }
            case AIState.Type.SPEAKING_COMPLETED:
                {
                    _statusText.text = "AI finished speaking.";                  
                    break;
                }          
        }
    }
}
```

- MyAIFrameImageProvider.cs

Implement ImageProvider by inheriting AIFrameImageProvider to receive AI resources (UnityEngine.Texture2D).

```js
using UnityEngine;
using UnityEngine.UI;
using AIHuman.SDK;
using AIHuman.Common;

public class MyAIFrameImageProvider : AIFrameImageProvider
{
    public RawImage _backgroundRawImage = null;
    public RawImage _faceRawImage = null;

    public override void OnChangeBackgroundTexture(Vector3 scale, Texture2D bgTexture)
    {     
        _backgroundRawImage.gameObject.SetActive(true);

        _backgroundRawImage.GetComponent<RectTransform>().sizeDelta = new Vector2(bgTexture.width, bgTexture.height);

        _backgroundRawImage.texture = bgTexture;
        _backgroundRawImage.transform.localScale = scale;
    }

    public override void OnChangeFaceTexture(Vector3 scale, int idleWidth, int idleHeight, FaceRect faceRect, Texture2D faceTexture)
    {
        _faceRawImage.gameObject.SetActive(true);

        _faceRawImage.GetComponent<RectTransform>().sizeDelta = new Vector2(faceTexture.width, faceTexture.height);

        float faceX = ((faceRect.width - idleWidth) * 0.5f) + faceRect.x;
        float faceY = -faceRect.y;
        
        _faceRawImage.GetComponent<RectTransform>().anchoredPosition = new Vector2(faceX, faceY);

        _faceRawImage.texture = faceTexture;
        _faceRawImage.transform.localScale = scale;
    }

    public override void OnDisabledBackgroundTexture()
    {
        _backgroundRawImage.gameObject.SetActive(false);
    }

    public override void OnDisabledFaceTexture()
    {
        _faceRawImage.gameObject.SetActive(false);
    }

    public override void OnChromakeyFaceTexture(Color minHueColor, Color maxHueColor)
    {
        _faceRawImage.material.SetColor("HueMin", minHueColor);
        _faceRawImage.material.SetColor("HueMax", maxHueColor);
    }
}
```

- QuickStart.cs

Write the SDK authentication process and AIPlayer initialization code. It also implements AI speaking through Button clicks.

```js
using UnityEngine;
using UnityEngine.UI;
using System.Text;
using AIHuman.SDK;
using AIHuman.View;
using AIHuman.Core;
using Newtonsoft.Json.Linq;

public class QuickStart : MonoBehaviour
{
    public AIPlayer _aiPlayer;
    public AIPlayerCallback _aiPlayerCallback;
    public AIFrameImageProvider _aiFrameImageProvider;   
    public InputField _inputChat;
    public Text _chatHistory;
    public Button _btnSend;

    private StringBuilder _sb = new StringBuilder();

    private void Awake()
    {      
        AIHumanSDKManager.Instance.AuthStart(OnCompleteAuth);

        _btnSend.onClick.AddListener(OnClickSend);
    }
 
    private void OnCompleteAuth(JToken aiList, string error)
    {
        if (string.IsNullOrEmpty(error))
        {          
            _aiPlayer.Init(AIAPI.Instance.DefaultAIName, _aiPlayerCallback, _aiFrameImageProvider);
        }
        else
        {
            Debug.LogError(string.Format("{0} {1}", nameof(AIHumanSDKManager), error));
        }
    }
  
    public void OnClickSend()
    {
        string[] requests = new string[] { _inputChat.text };
        _aiPlayer.Send(requests);
        
        for (int i = 0; i < requests.Length; i++)
        {
            if (!string.IsNullOrEmpty(_sb.ToString()))
            {
                _sb.Append("\n");
            }
            _sb.Append(requests[i]);
        }
        _chatHistory.text = _sb.ToString();
        _inputChat.text = string.Empty;       
    }
}
```


### 3. Apply the script you created.

#### 3-1. After selecting the QuickStart game object in the hierarchy window, register the scripts written in item 3 through the Add Component button in the Inspector window.
#### 3-2. Each item in the Inspector window is registered through drag and drop after selecting the game object in the Hierarchy window as shown in the image below.

<img src="/img/aihuman/unity/quickstart_inspector.png" />

### 4. Command the AI to speak 

- Editor Play > Loading Resources > Input Text at the bottom > Click the Send button

:::note
The actual AI Human may differ from the screenshot.
:::

<p align="center">
<img src="/img/aihuman/unity/quickstart_speech.png" style={{zoom: "40%"}} />
</p>


