---
displayed_sidebar: aistudioV3Sidebar
sidebar_position: 1
slug: /aistudioV3/getting-started
---

# Get started with API

AI STUDIOS V3 discloses APIs for external developers, producers, and editors for quick and easy services. In general, video synthesis requires user data editing and conversion time. When a large amount of production is required in this synthesis process, API can be used to minimize user editing and automate repetitive processes to reduce working time and ensure efficient management. In order to use the API, you must have an AI Studios V3 account and subscribe to an Pro or higher plan.

[Subscribe to the API plan](https://app.deepbrain.io)



## 1. API key generation

If your account subscribes to a plan that is Pro or higher, you must then issue an API key. When selecting the account name at the top right of the screen after logging in to Studio V3, go to the 'Profile' item of the account in the exposure menu and run the 'Issuing API Key' at the bottom of the screen to check the user key and app. Once activated, the generated 'userKey' can no longer be verified, so copy it separately and manage it safely.

[Generate API key](./generate-api-key)



## 2. Masking API videos.

A test image is produced with the issued 'API Key' to check ther ID value of the generated image.

```bash
curl https://app.deepbrain.io/api/odin/v3/editor/project  \
-H "Authorization: ${API KEY}" \
-H "Content-Type: application/json" \
-X POST \
-d '{
      "name": "Test Project Using Api",
      "orientation": "landscape",
      "scenes": [{
        "background" : {
          "id" : "background",
          "type" : "background",
          "source_type" : "image",
          "source_url" : "/images/background/bg_blue_gradient.png",
          "source_color" : "rgb(54,188,37)"
        },
        "watermark" : false,
        "clips" : [
          {
            "id" : "aiModel-1h4ij5h8e87",
            "type" : "aiModel",
            "layer" : 1,
            "top" : 144.5979042385424,
            "left" : 630.2493927359487,
            "script" : {
              "org" : "<p>Hello, this is test video using Api.</p>"
            },
            "effects" : [
              {
                "type" : "head-only"
              }
            ],
            "height" : 2229,
            "width" : 679,
            "model" : {
              "ai_name" : "M000045058",
              "emotion" : "BG00002320",
              "language" : "en",
              "source_url" : "https://cdn.aistudios.com/ai/ai_mov_thm/tight_ai_mov_thm_M000045058_BG00002320.png",
              "editor" : {
                "headCenterX" : 613.3333333333334,
                "headCenterY" : 290,
                "headWidth" : 182,
                "headHeight" : 185,
                "modelTightX" : 367.33333333333337,
                "modelTightY" : 168.16666666666669,
                "modelTightS" : 1,
                "modelTightW" : 679,
                "modelTightH" : 2229,
                "modelOriginW" : 1374,
                "modelOriginH" : 2444,
                "scale" : 0.3,
                "adjustX" : -0.016860747210092203,
                "adjustY" : -0.024822695035461,
                "spaceB" : 46.833333333333314,
                "spaceT" : 168.16666666666669,
                "spaceL" : 367.33333333333337,
                "spaceR" : 327.66666666666663,
                "top" : 168.16666666666669,
                "left" : 367.33333333333337,
                "height" : 2229,
                "width" : 679
              },
              "origin" : {
                "height" : 2444,
                "width" : 1374
              },
              "deployImage" : {
                "themb_src" : "https://cdn.aistudios.com/ai/model-introduce/thumbnails/M000045058_BG00002320.png",
                "themb_width" : 384,
                "themb_height" : 240,
                "org_src" : "https://cdn.aistudios.com/ai/ai_mov_thm/tight_ai_mov_thm_M000045058_BG00002320_org.png",
                "org_width" : 1374,
                "org_height" : 2444,
                "edit_src" : "https://cdn.aistudios.com/ai/ai_mov_thm/tight_ai_mov_thm_M000045058_BG00002320.png",
                "edit_width" : 692,
                "edit_height" : 2277
              },
              "deploySize" : {
                "org_width" : 1374,
                "org_height" : 2444,
                "edit_width" : 679,
                "edit_height" : 2229
              },
              "editorValue" : {
                "headCenterX" : 613.3333333333334,
                "headCenterY" : 290,
                "headWidth" : 182,
                "headHeight" : 185,
                "modelTightX" : 367.33333333333337,
                "modelTightY" : 168.16666666666669,
                "modelTightS" : 1,
                "modelTightW" : 679,
                "modelTightH" : 2229,
                "modelOriginW" : 1374,
                "modelOriginH" : 2444,
                "scale" : 0.3,
                "adjustX" : -0.016860747210092203,
                "adjustY" : -0.024822695035461,
                "spaceB" : 46.833333333333314,
                "spaceT" : 168.16666666666669,
                "spaceL" : 367.33333333333337,
                "spaceR" : 327.66666666666663
              },
              "maskFile" : "M000045058_BG00002320H_alpha_INV.mp4"
            },
            "name" : "aiModel-1h4ij5h8e87",
            "lockScalingFlip" : true,
            "fill" : "rgb(0,0,0)",
            "scaleX" : 1,
            "scaleY" : 1,
            "opacity" : 100,
            "lockMovementX" : false,
            "lockMovementY" : false,
            "lockRotation" : false,
            "lockScalingX" : false,
            "lockScalingY" : false,
            "lockSkewingX" : false,
            "lockSkewingY" : false,
            "lockUniScaling" : false
          }
        ],
        "thumbnailUrl" : null,
        "sceneIdx" : 0
      }]
    }'
```

To create API images using templates, you can find out more about creating and editing projects to use as templates by referring to the "Start Image Synthesis" item.



## 3. Checking progress of the video.

It takes about 1 to 10 minutes to produce a video depending on the size of the video being produced, the server status, and the waiting users who are ahead of your requests. When completed, the status will change to Complete. You can also check the progress being produced with the call example below, or receive a notification of the completion of video production through Webhook.


```css
curl https://aistudios.com/api/odin/editor/progress/${key}
-H "Authorization: ${API KEY}"
-H "Content-Type: application/json"
-X GET
```

## 4. Other API documents

[Detailed API reference document](reference/auth)

[Sample Code](https://github.com/DeepBrain-AI/studio-v3-api-sample)