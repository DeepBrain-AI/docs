# Clip 속성

## 1. AiModel
|key|desc|type|required|default|
|:---|:---|:---|:---|:---|
|model|사용하는 모델 정보|Json|true|-|
|model.ai_name|사용한 모델의 ID를 나타냅니다.|String|true|-|
|model.emotion|모델의 복장 ID를 나타냅니다.|String|true|-|
|tag|클립을 특정할 수 있는 태그|String|false|-|

AI 모델에 관한 정보는 [AI 모델 리스트](../reference/model-list)에서 자세히 확인하실 수 있습니다.

## 2. Shape
|key|desc|type|required|default|
|:---|:---|:---|:---|:---|
|shapeName|입력할 도형의 종류|String enum<br/>(Line_v2, Arrow_1_v2, Arrow_2_v2, <br/>Circle, Triangle, Square, <br/>Parallelogram, Drop_1, Polygon, <br/>Pentagon, Oval_1, Oval_2, <br/>Hexagon_1, Hexagon_2, Diamond, <br/>Star, Rectangle_corner0)|True|-|
|angle|도형의 기울기 (시계방향으로 증가함)|Float|false|0|
|opacity|도형의 투명도를 나타냅니다.|Int range(1-100)|false|100|
|fill|도형 내부 채우기 색|String|true|-|
|stroke|도형 외각선의 색을 나타냄|String|false|''|
|strokeWidth|도형 외각선의 굵기를 나타냄|Int|false|0|
|strokeRadius|도형 외각선의 곡률을 나타냄|Int|false|0|
|shadow|그림자 효과 설정 정보|Json|false|-|
|shadow.color|그림자의 색을 나타냅니다.|String|false|#00000060|
|shadow.blur|그림자의 블러 효과 정도를 나타냅니다.|Float range(0-10)|false|0|
|shadow.offsetX|그림자의 X축 위치를 나타냅니다.|Float range(0.1-10)|false|5|
|shadow.offsetY|그림자의 Y축 위치를 나타냅니다.|Float range(0.1-10)|false|5|
|shadow.enabled|그림자 효과의 노출 여부를 나타냅니다.|Boolean|false|-|
|animation|애니매이션 효과 설정 정보|Json|false|-|
|animation.type|애니매이션 타입을 나타냅니다.|String enum (fade-in, fade-out, in-right, in-down, in-left, in-up, out-right, out-down, out-left, out-up, zoom-in, zoom-out)|true|-|
|animation.duration|애니매이션 효과 지속시간을 나타냅니다.|Int range(1-30)|true|-|
|animation.delay|애니매이션 효과 지연시간을 나타냅니다.|Int range(0-30)|true|-|
|tag|클립을 특정할 수 있는 태그|String|false|-|


## 3. Image
|key|desc|type|required|default|
|:---|:---|:---|:---|:---|
|source_url|입력한 이미지의 원본 URL|String|true|-|
|angle|이미지의 기울기 (시계방향으로 증가함)|Float|false|0|
|opacity|이미지의 투명도를 나타냅니다.|Int range(1-100)|false|100|
|animation|애니매이션 효과 설정 정보|Json|false|-|
|animation.type|애니매이션 타입을 나타냅니다.|String enum (fade-in, fade-out, in-right, in-down, in-left, in-up, out-right, out-down, out-left, out-up, zoom-in, zoom-out)|true|-|
|animation.duration|애니매이션 효과 지속시간을 나타냅니다.|Int range(1-30)|true|-|
|animation.delay|애니매이션 효과 지연시간을 나타냅니다.|Int range(0-30)|true|-|
|tag|클립을 특정할 수 있는 태그|String|false|-|


## 4. TextImage
|key|desc|type|required|default|
|:---|:---|:---|:---|:---|
|fill|글자 색을 나타냅니다.|String|true|-|
|text|화면에 노출할 글자를 나타냅니다.|String|true|-|
|fontSize|입력한 글자의 크기를 나타냅니다.|Int|True|-|
|fontFamily|입력한 글자의 폰트를 나타냅니다.|String|false|Noto Sans CJK|
|align|입력한 글자의 정렬 방향을 나타냅니다.|String|false|left|
|angle|텍스트의 기울기 (시계방향으로 증가함)|Float|false|0|
|opacity|텍스트의 투명도를 나타냅니다.|Int range(1-100)|false|100|
|backgroundColor|글자 배경색을 나타냅니다.|String|false|''|
|stroke|텍스트 외각선의 색을 나타냄|String|false|''|
|strokeWidth|텍스트 외각선의 굵기를 나타냄|Int|false|0|
|fontWeight|텍스트의 굵기를 나타냅니다.|Int|false|''|
|fontStyle|텍스트의 스타일을 나타냅니다.|String enum(italic)|false|''|
|underline|텍스트의 밑줄 여부를 나타냅니다.|Boolean|false|false|
|shadow|그림자 효과 설정 정보|Json|false|-|
|shadow.color|그림자의 색을 나타냅니다.|String|false|#00000060|
|shadow.blur|그림자의 블러 효과 정도를 나타냅니다.|Float range(0-10)|false|0|
|shadow.offsetX|그림자의 X축 위치를 나타냅니다.|Float range(0.1-10)|false|5|
|shadow.offsetY|그림자의 Y축 위치를 나타냅니다.|Float range(0.1-10)|false|5|
|shadow.enabled|그림자 효과의 노출 여부를 나타냅니다.|Boolean|false|-|
|animation|애니매이션 효과 설정 정보|Json|false|-|
|animation.type|애니매이션 타입을 나타냅니다.|String enum (fade-in, fade-out, in-right, in-down, in-left, in-up, out-right, out-down, out-left, out-up, zoom-in, zoom-out)|true|-|
|animation.duration|애니매이션 효과 지속시간을 나타냅니다.|Int range(1-30)|true|-|
|animation.delay|애니매이션 효과 지연시간을 나타냅니다.|Int range(0-30)|true|-|
|tag|클립을 특정할 수 있는 태그|String|false|-|

## 5. VideoImage
|key|desc|type|required|default|
|:---|:---|:---|:---|:---|
|video_url|입력한 비디오의 원본 URL|String|true|-|
|volume|비디오의 음량을 나타냅니다.|Int range(1-100)|false|100|
|opacity|비디오의 투명도를 나타냅니다.|Int range (1-100)|false|100|
|tag|클립을 특정할 수 있는 태그|String|false|-|

## 6. Audio
|key|desc|type|required|default|
|:---|:---|:---|:---|:---|
|source_url|입력한 오디오의 원본 URL|String|true|-|
|volume|오디오의 음량을 나타냅니다.|Int range(1-100)|false|100|
|label|오디오의 이름을 나타냅니다.|String|true|-|
