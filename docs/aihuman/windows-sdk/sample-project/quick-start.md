---
sidebar_position: 2
---

# AI Human QuickStart

:::note related files

- QuickStartView.xaml
- QuickStartViewModel.cs

:::

In Quick Start, the following screen appears when the default AI creation and pre-preparation step is completed through AIPlayer. It may take several minutes until it starts speaking depending on the network conditions, as there is a default loading time on the first run. After the first utterance, you can press the input box at the bottom of the screen to type in a sentence that you want to make the AI say.  The default AI is Jonathan. (Basically speaking a language that corresponds to the language value set in AI. However, you can implement multilingual services using the following [Change the Voice or Language](../aiplayer/advanced-features#change-the-voice-or-language) functionality.)

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

- Speak or Enter: Jonathan speaks the sentence entered in the TextBox at the bottom right.
- Home: Go to HomeView.xaml
- Exit: Close the app.
