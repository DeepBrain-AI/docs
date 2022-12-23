---
sidebar_position: 4
---

# AIPlayer Basic Speaking Features

### Basic speaking using AIClipSet and Monitor AI Speaking

You can make the AI speak what you want by inputting desired sentence as a text parameter of __send__ method. 

  ```Swift
  //using text
  aiPlayer.send(text: "Hello World")	// speak one sentence
  aiPlayer.send(texts: [..., ...])		// speak multiple sentences
  
  //using AIClipSet
   let clipSet = AIClipSet.clipSet(text: "Hello World")
   aiPlayer.send(clipset: clipSet)
  ```

If the sentence is too long, there may be errors. <br/>
In general, speech may be made in pure text, but speech may be performed using AIClipSet. <br/>
It is also possible to perform an utterance with a specific gesture. For example, you can order AI to wave and say "hello!" This is called gesture speech. Details will be described in [4. AIPlayer advanced speaking features] (#Gestures) (Gestures). <br/> <br/>

If the text to be spoken is too long, it may not be possible to synthesize the text. There are other models that can synthesize long sentences. Although it varies from ai to ai, it is generally recommended that sentences be cut to an appropriate length in Korean, usually within 30 to 40 characters, and at a similar level in English. <br/>
In addition, if special characters, lists of incomplete characters, numbers, formulas, symbols, characters or abbreviations in other languages are included, they may or may not be uttered differently than expected.

### Montoring speech state through AIPlayerCallback

You can check AIPlayer's state through onAIPlayerStateChanged method in the __delegate__ property. 

- AIPlayerState.prepareSpeaking : Ready to start speaking
- AIPlayerState.startSpeaking : Speaking started
- AIPlayerState.speakNext : Whether to speak the next sentence in queue
- AIPlayerState.didFinishSpeaking : Speaking finished

```Swift
extension AISampleViewController: AIPlayerCallback {
	func onAIPlayerStateChanged(state: AIPlayerState, type: AIClipSetType, key: String?) {
	    switch state {
	    	...
	    	case .prepareSpeaking:
	    		print("AI finished preparation to speak.")
	    	break
	    	case .startSpeaking:
	    		print("AI started speaking.")
	    	break
	    	case .speakNext:
	    		print("AI started preparation to next speak.")
	    	break
	    	case .didFinishSpeaking:
	    		print("AI finished speaking.")
	    	break
	    	...
	    }
	}
```

#### Pause speaking

```Swift
aiPlayer.pause()
```

#### Resume speaking

```Swift
aiPlayer.resume()
```

#### Stop speaking (can not resume)

```Swift
aiPlayer.stopSpeaking()
```
