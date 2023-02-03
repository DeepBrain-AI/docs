---
displayed_sidebar: aistudiosSidebar
sidebar_position: 1
slug: /aistudios/getting-started
---

# API 시작하기

AI STUDIOS에서는 외부 개발자, 또는 제작자, 편집자들이 쉽고 빠른 서비스를 이용하기 위해 API를 공개하고 있습니다. 일반적으로 비디오합성에는 사용자의 데이터 편집과 변환시간이 필요합니다. 이러한 합성과정에서 많은 양의 제작이 필요할 때 사용자의 편집을 최소화하고 반복되는 과정을 자동화하는 API를 사용하여 작업시간을 단축하고 효율적으로 관리할 수 있습니다. API를 이용하기 위해서는 AI STUDIOS 계정이 생성되어있어야 하며, API 요금제에 가입이 되어있어야 합니다.

[API 요금제 구독하기](https://aistudios.com)



## 1. API 키 생성

계정이 API 요금제에 가입이 되었다면 이 후 API 키를 발급받아야 합니다. 로그인 후 화면 우측 상단 계정명을 선택 시 노출 메뉴에서 계정의 '프로필' 항목으로 이동하여 화면 하단의 'API 키 발급'을 실행하여 API 키를 생성합니다. 생성 된 'API Secret Key' 는 한번 활성화 되면 더이상 확인이 불가하므로 별도로 복사하여 안전하게 관리하여 주세요.

[API 키 발급하기](https://www.deepbrain.io/pricing)



## 2. API 영상 제작하기

발급된 'API Key'로 테스트 영상을 제작하여, 생성된 영상의 ID값을 확인합니다. 테스트시 'Cube'는 차감되지 않습니다.

```css
curl https://aistudios.com/api/odin/editor/project  \
-H "Authorization: ${API KEY}" \
-H "Content-Type: application/json" \
-X POST \
-d '{
            "scenes":
                    [{
                        "AIModel": {
                            "script": "안녕하세요",
                            "model": "M000004017",
                            "clothes": "BG00006160",
                            "locationX": -0.28,
                            "locationY": 0.19,
                            "scale": 1
                        }
                    }]
    }'
```

템플릿을 이용하여 API 영상을 제작하려면 "영상합성 시작하기" 항목을 참조하여 템플릿으로 활용할 프로젝트를 생성하고 편집하는 방법에 대해 자세히 확인할 수 있습니다.



## 3. 영상 진행상태 확인

영상을 제작하게 되면 제작중인 영상의 분량과 서버 상태 및 대기중인 이용자에 따라 영상 제작시간이 약 1~10분 가량 소요됩니다. 완료되면 상태가 Complete 로 변경되며, 아래 호출 예문으로 제작중인 진행상태를 확인하거나 또는, Webhook 을 통해 영상 제작 완료 알림을 받을 수도 있습니다.

```css
curl https://aistudios.com/api/odin/editor/progress/${key}
-H "Authorization: ${API KEY}"
-H "Content-Type: application/json"
-X GET
```

## 4. 기타 API 문서

[자세한 API 참조 문서](reference/auth)
