---
displayed_sidebar: aistudiosSidebar
sidebar_position: 1
slug: /aistudios/getting-started
---

# Get started with API

AI STUDIOS discloses APIs for external developers, producers, and editors for quick and easy services. In general, video synthesis requires user data editing and conversion time. When a large amount of production is required in this synthesis process, API can be used to minimize user editing and automate repetitive processes to reduce working time and ensure efficient management. In order to use the API, you must have an AI Studio account created and subscribed to the API plan.

[Subscribe to the API plan](https://aistudios.com)



## 1. API key generation

If your account is subscribed to the API plan, you will need to get an API key. When selecting the account name at the top right of the screen after logging in, go to the "Profile" item of the account from the exposure menu and generate the API key by executing the "Issuing API Key" at the bottom of the screen. Once activated, the created 'API Secret Key' can no longer be checked, so please copy it separately and manage it safely.

[Generate API key](https://www.deepbrain.io/pricing)



## 2. Making API videos.

A test image is produced with the issued 'API Key' to check the ID value of the generated image. "Cube" is not deducted during the test.

```css
curl https://aistudios.com/api/odin/editor/project  \
-H "Authorization: ${API KEY}" \
-H "Content-Type: application/json" \
-X POST \
-d '{
            "scenes":
                    [{
                        "AIModel": {
                            "script": "Hi",
                            "model": "M000004017",
                            "clothes": "BG00006160",
                            "locationX": -0.28,
                            "locationY": 0.19,
                            "scale": 1
                        }
                    }]
    }'
```

To create API images using templates, you can find out more about creating and editing projects to use as templates by referring to the "Start Image Synthesis" item.



## 3. Checking progress of the video.

When the video is produced, it takes about 1 to 10 minutes to produce the video depending on the size of the video being produced, the server status, and the waiting users. When completed, the status will change to Complete, and you can check the progress being produced with the call example below, or receive a notification of the completion of video production through Webhook.

```css
curl https://aistudios.com/api/odin/editor/progress/${key}
-H "Authorization: ${API KEY}"
-H "Content-Type: application/json"
-X GET
```

## 4. Other API documents

[Detailed API reference document](reference/auth)
