---
displayed_sidebar: aifrontUISidebar
sidebar_position: 5
slug: /aifront/ui-customization/tutorial
---

# Tutorial


`KioskPanelBox` 컴포넌트의 패널 UI를 변경해봅시다.

변경 전 패널은 `short` 상태 시 설정된 메인 패널 이미지 또는 딥브레인 기본 패널 이미지를 표시합니다.

```javascript
  {panelType === 'short' ? (
    <div
      className={`${styles.panelBox} ${styles.contentShortPanel}`}
      style={{
        backgroundImage: `url("${
          mainPanel || '/images/template/kioskMainPanel.png'
        }")`,
      }}
    />
  ) : ( ... )}
```

`div` 태그 내부에 다음과 같이 버튼을 포함하는 새로운 컨텐츠 영역을 생성해주고, 버튼을 클릭할 경우 힌트를 클릭할 때와 동일하게 동작하도록 처리해주었습니다.

```javascript
    <>
      {panelType === 'short' ? (
        <div className={`${styles.panelBox} ${styles.contentShortPanel}`}>
          <div className={`${styles.infoMainPanel}`}>
            <p className={styles.mainTitle}>INFORMATION</p>
            <div className={styles.mainContent}>
              {mainContents.map((button, idx) => (
                <button
                  className="main"
                  key={button.label}
                  onClick={() => {
                    clickHint(button.message);
                  }}
                >
                  <img src={button.icon} alt={button.label} />
                  <p className={styles.label}>{button.label}</p>
                  <p className={styles.enLabel}>{button.enLabel}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : ( ... )}
    </>
  ```

이렇게 수정한 패널은 아래 사진처럼 화면 상에 표시됩니다.

![custom-panel](/img/aifront/custom-panel.png);