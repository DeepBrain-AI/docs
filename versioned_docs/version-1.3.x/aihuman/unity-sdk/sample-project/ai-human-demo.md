---
sidebar_position: 3
---

# AI Human Demo
:::note related scene

- 2.AIHuman.scene

:::

AI Human Demo is a page where you can try out various functionalities of AIPlayer. You can try changing to another approved AI model through [AI Model]. For other details, please refer to [AIPlayer Description](/aihuman/unity-sdk/aiplayer/overview).

<p align="center">
<img src="/img/aihuman/unity/introduction.png" style={{zoom: "40%"}} />
</p>

**First, get a list of available AIs and set up the UI.**

- DemoAIHuman.cs

```csharp
private void Awake()
    {             
        // Start SDK authentication.
        AIHumanSDKManager.Instance.Authenticate(OnCompleteAuth);
    }
     
    private void OnCompleteAuth(AIAPI.AIList aiList, AIError error)
    {
        if (error == null)
        {                     
            _aiList = aiList;

            string[] aiNames = GetAINames();
            if (aiNames != null && aiNames.Length > 0)
            {
                // Set AI of AIPlayer as the first AI on the list.       
                Init(GetAINames()[0]);
            }
            else
            {
                Debug.LogError(string.Format("{0} {1}", nameof(DemoAIHuman), "There is no AI Model available."));
            }
        }
        else
        {
            Debug.LogError(string.Format("{0} {1} {2}", nameof(DemoAIHuman), error.ErrorCode, error.Description));
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

```csharp
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

```csharp
public class DemoPlayerCallback : AIPlayerCallback
{
    public override void OnAIPlayerError(AIError error)
    {       
    }

    public override void OnAIPlayerResLoadingProgressed(int current, int total)
    {             
    }

    public override void OnAIPlayerEvent(AIEvent @event)
    {      
        switch (@event.EventType)
        {
            case AIEvent.Type.RES_LOAD_STARTED:
                {                   
                    break;
                }
            case AIEvent.Type.RES_LOAD_COMPLETED:
                {                  
                    break;
                }
            case AIEvent.Type.AICLIPSET_PLAY_PREPARE_STARTED:
                {                   
                    break;
                }
            case AIEvent.Type.AICLIPSET_PLAY_PREPARE_COMPLETED:
                {                   
                    break;
                }            
            case AIEvent.Type.AICLIPSET_PLAY_STARTED:
                {                   
                    break;
                }
            case AIEvent.Type.AICLIPSET_PLAY_COMPLETED:
                {                   
                    break;
                }
            case AIEvent.Type.AICLIPSET_PLAY_FAILED:
                {                  
                    break;
                }
            case AIEvent.Type.AICLIPSET_PRELOAD_STARTED:
                {                   
                    break;
                }
            case AIEvent.Type.AICLIPSET_PRELOAD_COMPLETED:
                {                
                    break;
                }
            case AIEvent.Type.AICLIPSET_PRELOAD_FAILED:
                {                   
                    break;
                }
            case AIEvent.Type.AI_CONNECTED:
                {                 
                    break;
                }
            case AIEvent.Type.AI_DISCONNECTED:
                {                    
                    break;
                }
            case AIEvent.Type.AICLIPSET_PLAY_BUFFERING:
                {                  
                    break;
                }
            case AIEvent.Type.AICLIPSET_RESTART_FROM_BUFFERING:
                {                 
                    break;
                }
            case AIEvent.Type.AIPLAYER_STATE_CHANGED:
                {                  
                    break;
                }
        }
    }
}
```

**AI image resource (UnityEngine.Texture2D) can be implemented and supplied through AIFrameImageProvider class inheritance.** 

- DemoFrameImageProvider.cs

```csharp
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

Through OnAIPlayerEvent implementation, you can receive Callback of AI states shown below.

```csharp
RES_LOAD_STARTED: AI Resource loading started.
RES_LOAD_COMPLETED: AI Resource loading completed.
AICLIPSET_PLAY_PREPARE_STARTED: AI started preparation to speak.
AICLIPSET_PLAY_PREPARE_COMPLETED: AI finished preparation to speak.
AICLIPSET_PLAY_STARTED: AI started speaking.
AICLIPSET_PLAY_COMPLETED: AI finished speaking.
AICLIPSET_PLAY_FAILED: AI failed to speak.
AI_CONNECTED: AI is connected.
AI_DISCONNECTED: AI is disconnected.
```
