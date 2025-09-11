---
sidebar_position: 4
---

# AI Human 3D Demo
:::note related scene

- 3.AIHuman3D.scene

:::

AI Human 3D Demo is a page where you can try out various functionalities of AI3DPlayer. You can try changing to another approved AI model through [AI Model].

<p align="center">
<img src="/img/aihuman/unity/introduction_3d.png" style={{zoom: "30%"}} />
</p>

**First, get a list of available AIs and set up the UI.**

- DemoAIHuman3D.cs

```csharp
private void Awake()
{
    // Register a function in the corresponding delegate to receive the event and error of the AI3DPlayer. The function implementation is described below.
    _aiPlayer.onAIPlayerEvent += OnAIPlayerEvent;
    _aiPlayer.onAIPlayerError += OnAIPlayerError;

    // Start SDK authentication.
    AIError authError = AIHumanSDKManager.Instance.Authenticate();
    if (authError == null)
    {
        // If authentication is complete, get the available AI List.
        AIAPI.Instance.GetAIList(AIListType.Model_3D, (aiList, aiError) =>
        {
            if (aiError == null)
            {
                _aiList = aiList;

                string[] aiNames = GetAINames();
                if (aiNames != null && aiNames.Length > 0)
                {
                    Init(aiNames[0]);
                    InitDropdownUI(_aiDropdown, aiNames, 10, 80, OnChangedAIModel);
                }
                else
                {
                    Debug.LogError(string.Format("{0} {1}", nameof(DemoAIHuman3D), "There is no AI Model available."));
                }
            }
            else
            {
                Debug.LogError(string.Format("{0} {1} {2}", nameof(DemoAIHuman3D), aiError.ErrorCode, aiError.Description));
            }
        });
    }
    else
    {
        Debug.LogError(string.Format("{0} {1} {2}", nameof(DemoAIHuman3D), authError.ErrorCode, authError.Description));
    }
}

private void Init(string aiName)
{              
    _aiPlayer.Init(aiName);
}
```

**Receiving AI-related events and errors is possible through the following function implementation.** 

- DemoAIHuman3D.cs

```csharp
private void OnAIPlayerEvent(AI3DEvent aiEvent, object param)
{           
    switch (aiEvent)
    {
        case AI3DEvent.RES_LOAD_STARTED:
            {                                   
                break;
            }
        case AI3DEvent.RES_LOAD_COMPLETED:
            {           
                // When 3D character resource loading is complete, set up and initialize AI data in Dropdown, Slider UI.
                InitUI();
                break;
            }
        case AI3DEvent.RES_LOAD_FAILED:
            {            
                break;
            }
        case AI3DEvent.SPEECH_PLAY_PREPARE_STARTED:
            {              
                break;
            }
        case AI3DEvent.SPEECH_PLAY_PREPARE_COMPLETED:
            {              
                break;
            }
        case AI3DEvent.SPEECH_PLAY_PREPARE_FAILED:
            {               
                break;
            }
        case AI3DEvent.SPEECH_PLAY_STARTED:
            {              
                break;
            }
        case AI3DEvent.SPEECH_PLAY_COMPLETED:
            {               
                break;
            }              
        case AI3DEvent.AIPLAYER_STATE_CHANGED:
            {               
                break;
            }
    }
}

private void OnAIPlayerError(AIError aiError)
{         
    Debug.LogError(aiError.Description);
}
```

**Examples of Speak, Pause, Resume, and Stop.** 

- DemoAIHuman3D.cs

```csharp
public void OnClickSpeak()
{
    if (_sampleTextList.Count == 0)
        return;

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
        string gesture = _gestureDropdown.value > 0 ? _gestureDropdown.options[_gestureDropdown.value].text : null;
        if (gesture != null)
        {
            clip = AIAPI.CreateClipSet(speechText, gesture);
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
```

**Examples of codes for changing the scale of AI are as follows.** 

- DemoAIHuman3D.cs

```csharp
private void OnChangedScale(float value)
{
    // The AI3DPlayer.AIModel object is valid from the time resource loading is completed.
    if (_aiPlayer.AIModel != null)
    {
        ScalePivot scalePivot = _aiPlayer.AIModel.GetComponent<ScalePivot>();
        if (scalePivot != null)
        {
            // Get the Scale pivot transform. (TOP, CENTER, BOTTOM)
            Transform trPivot = scalePivot.GetTransform(ScalePivot.ePivotType.TOP);
            _aiPlayer.Scale(value, trPivot);
        }
    }           
}
```

The status of AI can be monitored through the implementation of the OnAIPlayerEvent function, and the status is as follows.

```csharp
RES_LOAD_STARTED: AI Resource loading started.
RES_LOAD_COMPLETED: AI Resource loading completed.
RES_LOAD_FAILED : AI Resource loading failed.
SPEECH_PLAY_PREPARE_STARTED: AI started preparation to speak.
SPEECH_PLAY_PREPARE_COMPLETED: AI finished preparation to speak.
SPEECH_PLAY_PREPARE_FAILED: AI failed preparation to speak.
SPEECH_PLAY_STARTED: AI started speaking.
SPEECH_PLAY_COMPLETED: AI finished speaking.
```
