---
sidebar_position: 6
---

# with Lipsync & TTS

:::note related files

- 5.uLipsync & TTS.scene

:::

This demonstration is an example of a Lipsync AI service linked to an external 3D model, The process of receiving sentences from the user to **speak(Lipsync)** is simply implemented. If you run this demo scene, you can see Unity chan character familiar to Unity users.

**Supports built-in and URP.**

<p align="center">
<img src="/img/aihuman/unity/sampleproject_lipsync_tts.png" style={{zoom: "30%"}} />
</p>

### Using 3D Model, uLipsync and TTS (text to speak)

To try the Lipsync AI service in the Demo, a preparation process is required as follows.

- Prepare 3D model: Included in the demo (Unity chan)
- Prepare uLipsync package: Included in the demo (https://github.com/hecomi/uLipSync)

:::tip
The 3D model requires the BlendShapes configuration required for lipsync as follows. (Blendshapes related to the pronunciation and mouth shape of Unity Chan characters)
<p align="center">
<img src="/img/aihuman/unity/sampleproject_blendshapes.png" style={{zoom: "50%"}} />
</p>
:::

The following component configuration is required for lipsync.
- Lipsync : uLipSync, uLipSyncBlendShape
- Voice play : AudioSource
- Blinking eyes : AutoBlink (If the 3D model you want to use has BlendShapes for blink)  

<p align="center">
<img src="/img/aihuman/unity/sampleproject_lipsync_inspector.png" style={{zoom: "50%"}} />
</p>


The main purpose of this demonstration is to implement lip sync using **AudioClip** delivered through voice synthesis. The content was implemented by implementing **OnClickSpeech**, a click event function of the Play TTS button of the demo. When you set up the AudioClip you received in the Clip item of AudioSource and call AudioSource.Play(), the lipsync is played automatically.

**After requesting AudioClip, set up and play the AudioClip you received**

- DemoTTSLipsync.cs

```csharp
public void OnClickSpeech()
{
    if (string.IsNullOrEmpty(_inputSpeech.text))
        return;

    _resultText.text = "<b><color=#0000ff>Synthesizing...</color></b>";
    
    // Get the voice ID.
    string voiceID = _customVoiceList[_dropdownVoice.value].ID;

    AIAPI.Instance.GetAudioClip("chan", _inputSpeech.text, voiceID, (aiName, clipset, aiError, audioClip) =>
    {
        if (aiError != null)
        {
            _resultText.text = "<b><color=#ff0000>>Failure</color></b>\n" + aiError.Description;
        }
        else
        {
            _audioSource.clip = audioClip;
            _audioSource.Play();

            _resultText.text = "<b><color=#ff0000>Success</color></b>\n" + clipset.SpeechText;
        }
    });
}
```

The above description has many abbreviations. Please refer to the Hierarchy configuration and character resource settings of the demo.
