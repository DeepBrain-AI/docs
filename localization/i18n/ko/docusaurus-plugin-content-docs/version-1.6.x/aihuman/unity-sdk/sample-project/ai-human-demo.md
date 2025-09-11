---
sidebar_position: 3
---

# AI Human 데모
:::note related scene

- 2.AIHuman.scene

:::

AI Human Demo는 AIPlayer의 다양한 기능들을 구현 한 데모입니다. [AI 선택]을 통해 승인된 다른 AI 모델로 변경할 수 있습니다. 그밖에 자세한 설명은 [AIPlayer 설명](/aihuman/unity-sdk/aiplayer/overview)을 참고 바랍니다.

<p align="center">
<img src="/img/aihuman/unity/introduction.png" style={{zoom: "30%"}} />
</p>

**먼저 사용 가능한 AI 목록을 가져온 후 UI를 셋업합니다.**

- DemoAIHuman.cs

```csharp
private void Start()
{
    // SDK 인증을 시작한다. 
    AIError authError = AIHumanSDKManager.Instance.Authenticate();
    if (authError == null)
    {
        // 인증이 완료 되었다면 사용 가능한 AI List를 가져온다.
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
    // AIPlayerCallback과 AIFrameImageProvider를 AIPlayer에 전달한다.
    _aiPlayer.Init(aiName, _aiPlayerCallback, _aiFrameImageProvider);

    // Dropdown, Slider UI에 AI data를 설정하고 초기화 한다.
    InitUI();
}
```

**AI에게 발화시키기, 여러말 발화시키기, 일시정지, 재시작, 정지의 코드 예제는 아래와 같습니다.** 

- DemoAIHuman.cs

```csharp
public void OnClickSpeak()
{  
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

**AIPlayerCallback 구현을 통해, AI 모델 및 AIPlayer의 동작에 대한 콜백을 받을 수 있습니다.** 

```csharp
public abstract class AIPlayerCallback : MonoBehaviour, IAIPlayerCallback
{
    public abstract void OnAIPlayerEvent(AIEvent @event);   
    public abstract void OnAIPlayerResLoadingProgressed(int current, int total);
    public abstract void OnAIPlayerError(AIError error);
}
```

**AIFrameImageProvider 구현을 통해, AI 모델의 Texture를 공급 받을 수 있습니다.** 

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

OnAIPlayerEvent 구현을 통해 AI의 상태를 모니터링 할 수 있으며, 상태는 아래와 같습니다.

```csharp
RES_LOAD_STARTED: AI리소스 로드를 시작합니다.
RES_LOAD_COMPLETED: AI리소스 로드를 완료했습니다.
AICLIPSET_PLAY_PREPARE_STARTED: AI가 말할 준비를 시작합니다.
AICLIPSET_PLAY_PREPARE_COMPLETED: AI가 말할 준비를 마쳤습니다.
AICLIPSET_PLAY_STARTED: AI가 말을 시작합니다.
AICLIPSET_PLAY_COMPLETED: AI가 말을 마쳤습니다.
AICLIPSET_PLAY_FAILED: AI가 말하기에 실패하였습니다.
...
```
