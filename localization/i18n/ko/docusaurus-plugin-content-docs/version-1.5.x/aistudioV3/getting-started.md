---
displayed_sidebar: aistudioV3Sidebar
sidebar_position: 1
slug: /aistudioV3/getting-started
---

# API 시작하기

AI STUDIOS V3에서는 외부 개발자, 또는 제작자, 편집자들이 쉽고 빠른 서비스를 이용하기 위해 API를 공개하고 있습니다. 일반적으로 비디오 합성에는 사용자의 데이터 편집과 변환시간이 필요합니다. 이러한 많은 양의 제작이 필요할 때 사용자의 편집을 최소화하고 반복되는 과정을 자동화하는 API를 사용하여 작업시간을 단축하고 효율적으로 관리할 수 있습니다. API를 이용하기 위해서는 AI STUDIOS V3 계정이 하며, Pro 이상의 요금제에 가입되어있어야 합니다.

[API 요금제 구독하기](https://app.deepbrain.io)



## 1. API 키 생성

계정이 Pro 이상의 요금제를 구독하고 있다면, 이후 API 키를 발급받아야 합니다. Studio V3 로그인 후 화면 오른쪽 위 계정명을 선택 시 노출 메뉴에서 계정의 '프로필' 항목으로 이동하여 화면 하단의 'API 키 발급'을 실행하여, user key와 app id를 확인합니다. 생성된 'userKey'는 한번 활성화되면 더는 확인이 불가하므로 별도로 복사하여 안전하게 관리하여 주세요.

[API 키 발급하기](./generate-api-key)



## 2. API 영상 제작하기

발급된 'API Key'로 테스트 영상을 제작하여, 생성된 영상의 ID값을 확인합니다.

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

템플릿을 이용하여 API 영상을 제작하려면 "영상합성 시작하기" 항목을 참조하여 템플릿으로 활용할 프로젝트를 생성하고 편집하는 방법에 대해 자세히 확인할 수 있습니다.



## 3. 영상 진행상태 확인

영상을 제작하게 되면 제작 중인 영상의 분량과 서버 상태 및 대기 중인 이용자에 따라 영상 제작 시간이 약 1~10분가량 소요됩니다. 완료되면 상태가 Complete로 변경되며, 아래 호출 예문으로 제작 중인 진행상태를 확인하거나, Webhook 을 통해 영상 제작 완료 알림을 받을 수도 있습니다.


```css
curl https://aistudios.com/api/odin/editor/progress/${key}
-H "Authorization: ${API KEY}"
-H "Content-Type: application/json"
-X GET
```

## 4. 기타 API 문서

[자세한 API 참조 문서](reference/auth)
[간단한 예제 문서](https://github.com/DeepBrain-AI/studio-v3-api-sample)
