# Clip Properties

## 1. AiModel
|key|desc|type|required|default|
|:---|:---|:---|:---|:---|
|script|Model utterance information|Json|true|-|
|script.org|Text for AI to read. It must match the language of the model.|String|true|-|
|script.tts|External TTS information that is not the default voice of the model.|Json|false|-|
|model|Model Information|Json|true|-|
|model.ai_name|The AI Model to be used.|String|true|-|
|model.emotion|The clothes that ther AI Model will wear.|String|true|-|

If you don't have an issued key yet, you can issue it through [Generate API key](../generate-api-key).

## 2. Shape
|key|desc|type|required|default|
|:---|:---|:---|:---|:---|
|shapeName|Type of figure|String enum<br/>(Line_v2, Arrow_1_v2, Arrow_2_v2, <br/>Circle, Triangle, Square, <br/>Parallelogram, Drop_1, Polygon, <br/>Pentagon, Oval_1, Oval_2, <br/>Hexagon_1, Hexagon_2, Diamond, <br/>Star, Rectangle_corner0)|True|-|
|angle|Slope of the figure (increased clockwise)|Float|false|0|
|opacity|The transparency of the figure.|Int range(1-100)|false|100|
|fill|Inner fill color of a figure.|String|true|-|
|stroke|The color of the outer line of the figure.|String|false|''|
|strokeWidth|Thickness of Shape Outer Line|Int|false|0|
|strokeRadius|Curvature of the external line of the figure|Int|false|0|
|shadow|Shadow Effect|Json|false|-|
|shadow.color|The color of the shadow.|String|false|#00000060|
|shadow.blur|The degree of blur effect in the shadow.|Float range(0-10)|false|0|
|shadow.offsetX|The X-axis position of the shadow.|Float range(0.1-10)|false|5|
|shadow.offsetY|The Y-axis position of the shadow.|Float range(0.1-10)|false|5|
|shadow.enabled|Exposure of shadow effects|Boolean|false|-|
|animation|Animation Effect|Json|false|-|
|animation.type|Animation type|String enum (fade-in, fade-out, in-right, in-down, in-left, in-up, out-right, out-down, out-left, out-up, zoom-in, zoom-out)|true|-|
|animation.duration|Animation effect duration|Int range(1-30)|true|-|
|animation.delay|Animation effect latency|Int range(0-30)|true|-|


## 3. Image
|key|desc|type|required|default|
|:---|:---|:---|:---|:---|
|source_url|Source path of the image.|String|true|-|
|angle|Slope of the image (increased clockwise)|Float|false|0|
|opacity|The transparency of the fimage.|Int range(1-100)|false|100|
|animation|Animation Effect|Json|false|-|
|animation.type|Animation type|String enum (fade-in, fade-out, in-right, in-down, in-left, in-up, out-right, out-down, out-left, out-up, zoom-in, zoom-out)|true|-|
|animation.duration|Animation effect duration|Int range(1-30)|true|-|
|animation.delay|Animation effect latency|Int range(0-30)|true|-|


## 4. TextImage
|key|desc|type|required|default|
|:---|:---|:---|:---|:---|
|fill|The color of the text.|String|true|-|
|text|Text to be exposed on screen|String|true|-|
|fontSize|Size of the text.|Int|True|-|
|fontFamily|Font of the text.|String|false|Noto Sans CJK|
|align|Sorting direction of text|String|false|left|
|angle|Slope of the text (increased clockwise)|Float|false|0|
|opacity|The transparency of the text.|Int range (1-100)|false|100|
|backgroundColor|Background color of text|String|false|''|
|stroke|The color of the outer line of the text.|String|false|''|
|strokeWidth|The thickness of the outer line of the text.|Int|false|0|
|fontWeight|The thickness of the text|Int|false|''|
|fontStyle|Style of the text.|String enum(italic)|false|''|
|underline|Indicates whether the text is underlined.|Boolean|false|false|
|shadow|Shadow Effect|Json|false|-|
|shadow.color|The color of the shadow.|String|false|#00000060|
|shadow.blur|The degree of blur effect in the shadow.|Float range(0-10)|false|0|
|shadow.offsetX|The X-axis position of the shadow.|Float range(0.1-10)|false|5|
|shadow.offsetY|The Y-axis position of the shadow.|Float range(0.1-10)|false|5|
|shadow.enabled|Exposure of shadow effects|Boolean|false|-|
|animation|Animation Effect|Json|false|-|
|animation.type|Animation type|String enum (fade-in, fade-out, in-right, in-down, in-left, in-up, out-right, out-down, out-left, out-up, zoom-in, zoom-out)|true|-|
|animation.duration|Animation effect duration|Int range(1-30)|true|-|
|animation.delay|Animation effect latency|Int range(0-30)|true|-|

## 5. VideoImage
|key|desc|type|required|default|
|:---|:---|:---|:---|:---|
|video_url|Source path of the video.|String|true|-|
|volume|The volume of the video.|Int range(1-100)|false|100|
|opacity|The transparency of the video.|Int range (1-100)|false|100|

## 6. Audio
|key|desc|type|required|default|
|:---|:---|:---|:---|:---|
|source_url|Source path of the audio.|String|true|-|
|volume|The volume of the audio.|Int range(1-100)|false|100|
|label|Name of the audio file to display on the editor screen.|String|true|-|
