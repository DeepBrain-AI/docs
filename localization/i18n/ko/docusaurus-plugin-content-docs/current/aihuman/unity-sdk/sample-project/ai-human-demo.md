---
sidebar_position: 3
---

# AI Human 데모
:::note related scene

- 2.AIHuman.scene

:::

AI Human Demo is a page where you can try out various functionalities of AIPlayer. You can try changing to another approved AI model through [AI Model]. For other details, please refer to [AIPlayer Description](/aihuman/unity-sdk/aiplayer/overview).

<p align="center">
<img src="/img/aihuman/unity/introduction.png" style={{zoom: "40%"}} />
</p>

**First, get a list of available AIs and set up the UI.**

- DemoAIHuman.cs

```js
private void Awake()
    {             
        // Start SDK authentication.
        AIHumanSDKManager.Instance.AuthStart(OnCompleteAuth);
    }
  
    private void OnCompleteAuth(JToken aiList, string error)
    {
        if (string.IsNullOrEmpty(error))
        {      
            // A list of available AIs can be obtained through CallBack.   
            string strJson = aiList.Root.ToString();
            _aiList = JsonConvert.DeserializeObject<AIAPI.AIList>(strJson);

            // Set AI of AIPlayer as the first AI on the list.                 
            Init(_aiList.ai[0].aiName);
        }
        else
        {
            Debug.LogError(string.Format("{0} {1}", nameof(AIHumanSDKManager), error));
        }
    }
  
    private void Init(string aiName)
    {              
        // Deliver AIPlayerCallback and AIFrameImageProvider to AIPlayer.
        _aiPlayer.Init(aiName, _aiPlayerCallback, _aiFrameImageProvider);

        // Set and initialize AI data in Dropdown, Slider UI.
        InitUI();
    }
```

**Examples of Speak, Preload, Pause, Multi Speak(Randomly), Resume, and Pause.** 

- DemoAIHuman.cs

```js
    public void OnClickSpeak()
    {
        _sendingMessage.Clear();

        // AI language, voice settings
        CustomVoice cv = null;
        if (_languageDropdown.value == 0)
        {
            cv = _voiceDropdown.value == 0 ? null : _customVoiceList[_voiceDropdown.value - 1];
        }
        else
        {
            cv = _customVoiceList[_voiceDropdown.value];
        }

        _aiPlayer.SetCustomVoice(cv);

        AIClipSet clip = null;
        string speechText = _textDropdown.value > 0 ? _sampleTextList[_textDropdown.value] : null;
        if (_gestureDropdown.value > 0)
        {
            bool gstEnableSpeech = _gestureList[_gestureDropdown.value - 1].EnableSpeech;
            if (gstEnableSpeech)
            {
                clip = AIAPI.CreateClipSet(speechText, _gestureList[_gestureDropdown.value - 1].Name);
            }
            else
            {
                clip = AIAPI.CreateClipSet("", _gestureList[_gestureDropdown.value - 1].Name);
            }
        }
        else
        {
            clip = AIAPI.CreateClipSet(speechText);
        }

        _sendingMessage.Add(clip);

        _aiPlayer.Send(new[] { clip });
    }

    public void OnClickPause()
    {
        _aiPlayer.Pause();
    }

    public void OnClickResume()
    {
        _aiPlayer.Resume();
    }

    public void OnClickStop()
    {
        _aiPlayer.Stop();
    }

    public void OnClickMultiSpeak()
    {
        _sendingMessage.Clear();
      
        for (int i = 1; i < _sampleTextList.Count; i++)
        {
            if ((Random.Range(0, 100) % _sampleTextList.Count - 1) % 2 == 0)
            {
                _sendingMessage.Add(AIAPI.CreateClipSet(_sampleTextList[i]));
            }
        }
        
        _aiPlayer.Send(_sendingMessage.ToArray());
    }
```

**Receiving callback of AI behavior can be implemented through inheritance of AIPlayerCallback class.** 

- DemoPlayerCallback.cs

```js
public class DemoPlayerCallback : AIPlayerCallback
{
    public override void OnAIPlayerError(AIError error)
    {       
    }

    public override void OnAIPlayerResLoadingProgressed(int current, int total)
    {             
    }

    public override void OnAIStateChanged(AIState state)
    {      
        switch (state._state)
        {
            case AIState.Type.RES_LOAD_STARTED:             
                break;             
            case AIState.Type.RES_LOAD_COMPLETED:
                break;
            case AIState.Type.SPEAKING_PREPARE_STARTED:
                break;
            case AIState.Type.SPEAKING_PREPARE_COMPLETED:
                break;
            case AIState.Type.SPEAKING_STARTED:
                break;
            case AIState.Type.SPEAKING_COMPLETED:
                break;
            case AIState.Type.SPEAKING_PREPARE_PRELOAD_STARTED:
                break;
            case AIState.Type.SPEAKING_PREPARE_PRELOAD_COMPLETED:
                break;
        }
    }
}
```

**AI image resource (UnityEngine.Texture2D) can be implemented and supplied through AIFrameImageProvider class inheritance.** 

- DemoFrameImageProvider.cs

```js
public class DemoFrameImageProvider : AIFrameImageProvider
{ 
    public override void OnChangeBackgroundTexture(Vector3 scale, Texture2D bgTexture)
    {     
       // callback background texture
    }

    public override void OnChangeFaceTexture(Vector3 scale, int idleWidth, int idleHeight, FaceRect faceRect, Texture2D faceTexture)
    {
        // callback face texture
    }

    public override void OnDisabledBackgroundTexture()
    {        
    }

    public override void OnDisabledFaceTexture()
    {
    }

    public override void OnChromakeyFaceTexture(Color minHueColor, Color maxHueColor)
    {
        // callback setting chromakey
    }
}
```

Through onAIStateChanged implementation, you can receive CallBack of AI states shown below.

```js
SPEAKING_STARTED: AI started speaking.
SPEAKING_COMPLETED: AI finished speaking.
SPEAKING_PREPARE_STARTED: AI started preparation to speak.
RES_LOAD_COMPLETED: AI Resource loading completed.
RES_LOAD_STARTED: AI Resource loading started.
SPEAKING_PREPARE_COMPLETED: AI finished preparation to speak.
```
