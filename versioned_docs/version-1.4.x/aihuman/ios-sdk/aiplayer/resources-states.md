---
sidebar_position: 3
---

# AIPlayer Resources and States

Check if resource is fully loaded in AIPlayer

On class creation, AIPlayer automatically starts loading resources. You can check the loading status in registered delegate property. 

### Monitor resource loading through AIPlayerCallback

You can check if the resource loading started and completed through the onAIPlayerEvent method.

- AIState.RES_LOAD_STARTED : On loading start
- AIState.RES_LOAD_COMPLETED : On loading complete

While the resource is loading you can use onAIPlayerResLoadingProgressed method to check loading progress. 

If an error occurs during resource load, an error is reported through onAIPlayerError method. 

```Swift
extension AISampleViewController: AIPlayerCallback {
	func onAIPlayerEvent(event: AIEvent) {
	    switch event.type {
	    	...
	    	case .RES_LOAD_STARTED:
	    		print("AI Resource loading started.")
	    	break
	    	case .RES_LOAD_COMPLETED:
	    		print("AI Resource loading completed.")
	    	break
	    	...
	    }
	}

	func onAIPlayerResLoadingProgressed(progress: Int) {
        print("progress : \(progress)")
    }

    func onAIPlayerError(error: AIError?) {
    	print("AI Player error : \(state)")
    	if let error = error {
			print(error.localizedDescription)
		}
    }
}
```
