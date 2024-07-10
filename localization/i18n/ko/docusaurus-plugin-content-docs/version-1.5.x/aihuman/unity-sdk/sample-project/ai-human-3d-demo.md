---
sidebar_position: 4
---

# AI Human 3D 데모
:::note related scene

- 3.AIHuman3D.scene

:::

AI Human 3D Demo는 AI3DPlayer의 다양한 기능들을 구현 한 데모이다. [AI 선택]을 통해 승인된 다른 AI 모델로 변경할 수 있다.

<p align="center">
<img src="/img/aihuman/unity/introduction_3d.png" style={{zoom: "30%"}} />
</p>

**먼저 사용 가능한 AI 목록을 가져온 후 UI를 셋업한다.**

- DemoAIHuman3D.cs

```csharp
private void Awake()
{
    // AI3DPlayer의 Event와 Error를 전달받기 위해 해당 delegate에 함수를 등록한다. 함수 구현은 아래에 설명한다. 
    _aiPlayer.onAIPlayerEvent += OnAIPlayerEvent;
    _aiPlayer.onAIPlayerError += OnAIPlayerError;

    // SDK 인증을 시작한다. 
    AIError authError = AIHumanSDKManager.Instance.Authenticate();
    if (authError == null)
    {
        // 인증이 완료 되었다면 사용 가능한 AI List를 가져온다.
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

<br/>

**AI 관련 Event, Error 받기는 아래와 같은 함수 구현을 통해 가능하다.** 

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
                // 3D 캐릭터 리소스 로딩이 완료 되었다면 Dropdown, Slider UI에 AI data를 설정하고 초기화 한다.
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

<br/>

**AI에게 발화시키기, 일시정지, 재시작, 정지의 코드 예제는 아래와 같다.** 

- DemoAIHuman3D.cs

```csharp
public void OnClickSpeak()
{
    if (_sampleTextList.Count == 0)
        return;

    // AI 언어, 음성 설정
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

<br/>

**AI의 Scale을 변경하는 코드 예제는 아래와 같다.** 

- DemoAIHuman3D.cs

```csharp
private void OnChangedScale(float value)
{
    // 리소스 로딩이 완료된 시점부터 AI3DPlayer.AIModel 객체는 유효하다.
    if (_aiPlayer.AIModel != null)
    {
        ScalePivot scalePivot = _aiPlayer.AIModel.GetComponent<ScalePivot>();
        if (scalePivot != null)
        {
            // Scale pivot transform을 가져온다. (TOP, CENTER, BOTTOM)
            Transform trPivot = scalePivot.GetTransform(ScalePivot.ePivotType.TOP);
            _aiPlayer.Scale(value, trPivot);
        }
    }           
}
```

<br/>

OnAIPlayerEvent 함수 구현을 통해 AI의 상태를 모니터링 할 수 있으며, 상태는 아래와 같다.

```csharp
RES_LOAD_STARTED: AI리소스 로드를 시작합니다.
RES_LOAD_COMPLETED: AI리소스 로드를 완료했습니다.
RES_LOAD_FAILED : AI리소스 로드에 실패하였습니다.
SPEECH_PLAY_PREPARE_STARTED: AI가 말할 준비를 시작합니다.
SPEECH_PLAY_PREPARE_COMPLETED: AI가 말할 준비를 마쳤습니다.
SPEECH_PLAY_PREPARE_FAILED: AI 말할 준비에 실패하였습니다.
SPEECH_PLAY_STARTED: AI가 말을 시작합니다.
SPEECH_PLAY_COMPLETED: AI가 말을 마쳤습니다.
```
