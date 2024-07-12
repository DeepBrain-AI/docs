---
sidebar_position: 2
---

# AI Human 퀵스타트

:::note Sample Project에서 아래 파일들을 참고하세요.

- QuickStartView.xaml
- QuickStartViewModel.cs

:::

AI Human QuickStart에서는 SDK 인증과 리소스 로딩 등의 사전 작업이 완료되면 AIPlayer를 통해 기본(default) AI 모델이 다음과 같이 화면에 등장하게 됩니다. 처음 실행에는 기본 로드 시간이 있기 때문에 네트워크 조건에 따라 AI가 최종 발화하기까지 몇 분이 소요될 수도 있습니다. 첫번째 인사 발화 후 화면 하단의 텍스트 박스에 입력한 문장을 발화 시켜볼 수 있습니다. 현재 기본 AI 모델은 Jonathan입니다. (AI 모델은 기본 설정된 언어 코드에 해당하는 언어를 구사합니다. 추가로 음성 또는 구사하는 언어를 변경할 수 있는 [언어 및 음성 변경(CustomVoice)](../aiplayer/advanced-features#언어-및-음성-변경) 기능을 이용하여 다국어 서비스를 구현할 수도 있습니다.)

<img src="/img/aihuman/windows/Jonathan_demo.png" />

```csharp
public QuickStartViewModel()
{
    _aiPlayer = new AIPlayer(this);
    AIPlayerObject = _aiPlayer.GetObject();

    SpeakCommand = new RelayCommand(Speak_Command, CanSpeak);
}

...

private void Speak_Command(object args)
{
    if (CanSpeak && string.IsNullOrEmpty(InputText) == false)
    {
        AIClipSet clip = AIAPI.CreateClipSet(InputText);
        _aiPlayer.Send(new[] { clip });

        SpeechList.Add(string.Format(Resource.ChatFormat, _aiPlayer.AIName, InputText));
        InputText = string.Empty;
        CanSpeak = false;
    }
}
```

- Speak or Enter: 기본(default) AI(Jonathan)에게 입력된 문장을 발화하라고 명령합니다.
- Go Home: 홈(HomeView.xaml)으로 돌아갑니다.
- Quit: 응용 프로그램을 종료합니다.
