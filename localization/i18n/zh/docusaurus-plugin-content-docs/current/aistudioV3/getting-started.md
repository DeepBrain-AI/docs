---
displayed_sidebar: aistudioV3Sidebar
sidebar_position: 1
slug: /aistudioV3/getting-started
---

# API 入门

:::caution

供中国国内用户使用的网址略有不同，请注意避免出错。

- 国际用户 - `https://app.aistudios.com`
- 中国用户 - `https://app.aistudios.cn`

:::

AI STUDIOS V3提供API功能，以提供给外部人员更加简单方便的产品服务。一般来说，视频合成需要用户的数据编辑和一定的合成时间。为了减轻需要大量制作视频的负担，我们可以通过使用API功能来尽量减少复杂的程序，更加合理高效地完成任务。想要使用API功能，我们需要一个AI STUDIOS V3的账户；需要购买Pro以上的套餐。

[购买API套餐](https://app.aistudios.cn)



## 1. 生成API Key

如果您已经购买了Pro以上的套餐，可以直接生成API Key。登录Studio V3之后，点击画面右上方的账户，选择‘个人资料’进入画面。在‘我的主板’界面选择‘Api Key’即可确认user key和app id。激活成功后退出该界面将无法再次查看‘userKey’，请妥善保管。

[获取API Key](./generate-api-key)



## 2. 通过API制作视频

使用获取的 'API Key' 生成视频，以确认视频的ID。

```bash
curl https://app.aistudios.cn/api/odin/v3/editor/project  \
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

如要使用模板制作API视频，请参照‘开始视频合成’项目，生成、编辑视频模板。



## 3. 确认视频合成进程

视频合成时，会根据视频的长短和服务器的状态，排队人数等各种因素，需要大概1~10分钟。视频合成完毕后，状态将会变为‘Complete’，既可以通过下面的代码确认该合成任务的状态，也可以通过Webhook获得视频合成完毕的通知。


```css
curl https://aistudios.cn/api/odin/editor/progress/${key}
-H "Authorization: ${API KEY}"
-H "Content-Type: application/json"
-X GET
```

## 4. 其他API文件

[关于API](reference/auth)

[示例代码](https://github.com/DeepBrain-AI/studio-v3-api-sample)
