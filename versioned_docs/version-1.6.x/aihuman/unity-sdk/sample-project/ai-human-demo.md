---
sidebar_position: 3
---

# AI Human Demo
:::note related scene

- 2.AIHuman.scene

:::

AI Human Demo is a page where you can try out various functionalities of AIPlayer. You can try changing to another approved AI model through [AI Model]. For other details, please refer to [AIPlayer Description](/aihuman/unity-sdk/aiplayer/overview).

<p align="center">
<img src="/img/aihuman/unity/introduction.png" style={{zoom: "30%"}} />
</p>

**First, get a list of available AIs and set up the UI.**

- DemoAIHuman.cs

```csharp
private void Start()
{
    // Start SDK authentication.
    AIError authError = AIHumanSDKManager.Instance.Authenticate();
    if (authError == null)
    {
        // If authentication is complete, get the available AI List.
        AIAPI.Instance.GetAIList(AIListType.Model_2D, (aiList, aiError) =>
        {
            if (aiError == null)
            {
                _aiList = aiList;

                string[] aiNames = GetAINames();
                if (aiNames != null && aiNames.Length > 0)
                {
                    Init(aiNames[0]);
                }
                else
                {
                    Debug.LogError(string.Format("{0} {1}", nameof(DemoAIHuman), "There is no AI Model available."));
                }
            }
            else
            {
                Debug.LogError(string.Format("{0} {1} {2}", nameof(DemoAIHuman), aiError.ErrorCode, aiError.Description));
            }
        });
    }
    else
    {
        Debug.LogError(string.Format("{0} {1} {2}", nameof(DemoAIHuman), authError.ErrorCode, authError.Description));
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

**Examples of Speak, Preload, Pause, Multi Speak(Randomly), Resume, and Stop.** 

- DemoAIHuman.cs

```csharp
public void OnClickSpeak()
{   
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
    string speechText = string.Empty;
    if (_textDropdown.gameObject.activeSelf)
    {
        speechText = _textDropdown.value > 0 ? _sampleTextList[_textDropdown.value] : null;
    }
    else
    {
        speechText = _enterInput.text;
    }

    if (!string.IsNullOrEmpty(speechText) || _gestureDropdown.value > 0)
    {
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

        _aiPlayer.Send(new[] { clip });
    }                 
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
    _aiPlayer.StopSpeaking();
}

public void OnClickMultiSpeak()
{
    List<AIClipSet> clipSetList = new List<AIClipSet>();

    for (int i = 1; i < _sampleTextList.Count; i++)
    {
        if ((Random.Range(0, 100) % _sampleTextList.Count - 1) % 2 == 0)
        {
            clipSetList.Add(AIAPI.CreateClipSet(_sampleTextList[i]));
        }
    }
    
    if (clipSetList.Count > 0)
    {
        _aiPlayer.Send(clipSetList.ToArray());
    }           
}
```

**With the implementation of AIPlayerCallback, you can receive callbacks for AI models and the behavior of AIPlayer.** 

```csharp
public abstract class AIPlayerCallback : MonoBehaviour, IAIPlayerCallback
{
    public abstract void OnAIPlayerEvent(AIEvent @event);   
    public abstract void OnAIPlayerResLoadingProgressed(int current, int total);
    public abstract void OnAIPlayerError(AIError error);
}
```

**With the implementation of AIFrameImageProvider, the Texture of AI models can be supplied.** 

```csharp
public abstract class AIFrameImageProvider : MonoBehaviour, IFrameImageProvider
{ 
    public abstract void OnChangeBackgroundTexture(Vector3 scale, Texture2D bgTexture);
    public abstract void OnChangeBackgroundTexture(int frameIdx, byte[] bytes);
    public abstract void OnChangeFaceTexture(Vector3 scale, int idleWidth, int idleHeight, FaceRect faceRect, Texture2D faceTexture);
    public abstract void OnDisabledBackgroundTexture();
    public abstract void OnDisabledFaceTexture();
    public abstract void OnChromakeyFaceTexture(float minHue, float maxHue, float bottomAlphaHeight, float topAlphaHeight, float sideAlphaWidth);
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
...
```
