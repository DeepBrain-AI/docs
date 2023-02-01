---
sidebar_position: 3
---

# AIPlayer Resources and States

Check if resource is fully loaded in AIPlayer

On class creation, AIPlayer automatically starts loading resources. You can check the loading status in registered delegate property. 

### Monitor resource loading through AIPlayerCallback

You can check if the resource loading started and completed through the onAIPlayerStateChanged method.

- AIPlayerState.loadingResource : On loading start
- AIPlayerState.didFinishLoadingResource : On loading complete

While the resource is loading you can use onAIPlayerResLoadingProgressed method to check loading progress. 

If an error occurs during resource load, an error is reported through onAIPlayerError method. 

```Swift
extension AISampleViewController: AIPlayerCallback {
	func onAIPlayerStateChanged(state: AIPlayerState, type: AIClipSetType, key: String?) {
	    switch state {
	    	...
	    	case .loadingResource:
	    		print("AI Resource loading started.")
	    	break
	    	case .didFinishLoadingResource:
	    		print("AI Resource loading completed.")
	    	break
	    	...
	    }
	}

	func onAIPlayerResLoadingProgressed(progress: Int) {
        print("progress : \(progress)")
    }

    func onAIPlayerError(error: Error?, state: AIPlayerState) {
    	print("AI Player error : \(state)")
    	if let error = error {
			print(error.localizedDescription)
		}
    }
}
```
