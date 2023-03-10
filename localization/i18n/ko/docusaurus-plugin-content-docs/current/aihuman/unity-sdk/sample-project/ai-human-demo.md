---
sidebar_position: 3
---

# AI Human 데모
:::note related scene

- 2.AIHuman.scene

:::

AI Human Demo는 AIPlayer의 다양한 기능들을 구현 한 데모이다. [AI 선택]을 통해 승인된 다른 AI 모델로 변경할 수 있다. 그밖에 자세한 설명은 [AIPlayer 설명](/aihuman/unity-sdk/aiplayer/overview)을 참고하기 바란다.

<p align="center">
<img src="/img/aihuman/unity/introduction.png" style={{zoom: "40%"}} />
</p>

**먼저 사용 가능한 AI 목록을 가져온 후 UI를 셋업한다.**

- DemoAIHuman.cs

```csharp
private void Awake()
    {             
        // SDK 인증을 시작한다.
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
                // AIPlayer의 AI를 리스트의 첫번째 AI로 설정한다.      
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
        // AIPlayerCallback과 AIFrameImageProvider를 AIPlayer에 전달한다.
        _aiPlayer.Init(aiName, _aiPlayerCallback, _aiFrameImageProvider);

        // Dropdown, Slider UI에 AI data를 설정하고 초기화 한다.
        InitUI();
    }
```

**AI에게 발화시키기, 여러말 발화시키기, 일시정지, 재시작, 정지의 코드 예제는 아래와 같다.** 

- DemoAIHuman.cs

```csharp
    public void OnClickSpeak()
    {
        _sendingMessage.Clear();

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

**AI 동작의 콜백 받기는 AIPlayerCallback 클래스 상속을 통해 구현 가능하다.** 

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

**AI의 이미지 리소스(UnityEngine.Texture2D)는 AIFrameImageProvider 클래스 상속을 통해 구현하여 공급 받을 수 있다.** 

- DemoFrameImageProvider.cs

```csharp
public class DemoFrameImageProvider : AIFrameImageProvider
{ 
    public override void OnChangeBackgroundTexture(Vector3 scale, Texture2D bgTexture)
    {     
       // 배경 이미지 callback
    }

    public override void OnChangeFaceTexture(Vector3 scale, int idleWidth, int idleHeight, FaceRect faceRect, Texture2D faceTexture)
    {
        // 얼굴 이미지 callback
    }

    public override void OnDisabledBackgroundTexture()
    {        
    }

    public override void OnDisabledFaceTexture()
    {
    }

    public override void OnChromakeyFaceTexture(Color minHueColor, Color maxHueColor)
    {
        // chromakey 설정 callback
    }
}
```

OnAIPlayerEvent 구현을 통해 AI의 상태를 모니터링 할 수 있으며, 상태는 아래와 같다.

```csharp
RES_LOAD_STARTED: AI리소스 로드를 시작합니다.
RES_LOAD_COMPLETED: AI리소스 로드를 완료했습니다.
AICLIPSET_PLAY_PREPARE_STARTED: AI가 말할 준비를 시작합니다.
AICLIPSET_PLAY_PREPARE_COMPLETED: AI가 말할 준비를 마쳤습니다.
AICLIPSET_PLAY_STARTED: AI가 말을 시작합니다.
AICLIPSET_PLAY_COMPLETED: AI가 말을 마쳤습니다.
AICLIPSET_PLAY_FAILED: AI가 말하기에 실패하였습니다.
AI_CONNECTED: AI가 연결되었습니다.
AI_DISCONNECTED: AI 연결이 해제되었습니다.
```
