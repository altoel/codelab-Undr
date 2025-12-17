import "./SettingsPage.css";
import { IoMicOutline } from "react-icons/io5";
import { useState } from "react";

export default function SettingsPage() {
  const [handPreference, setHandPreference] = useState<"왼손" | "오른손">("오른손");
    const [mobilityAid, setMobilityAid] = useState<"휠체어" | "지체장애" | "유모차" | null>(null);
    const [textSize, setTextSize] = useState<"작게" | "중간" | "크게">("중간");
    const [isHovering, setIsHovering] = useState(false);
  
    const goBack = () => {
      window.history.pushState({}, "", "/");
      window.dispatchEvent(new PopStateEvent("popstate"));
    };

    const handleMicMouseEnter = () => {
      setIsHovering(true);
    };

    const handleMicMouseLeave = () => {
      setIsHovering(false);
    };
  
    return (
      <div className="settings-container">
        {/* 헤더 */}
        <div className="settings-header">
          <div className="settings-quote">
            "당신의 걸음이 멈추지 않게
            <br />
            세상과 당신을 잇습니다."
          </div>
        </div>
  
        {/* 본문 */}
        <div className="settings-content">
          <div className="settings-logo-text">Undr</div>
  
          {/* 사용자 설정 */}
          <section className="settings-section settings-section-user">
            <h1>사용자 설정</h1>
            <h2>조작 방향</h2>
            <div className="settings-buttons-group">
              <button 
                className="settings-option-btn"
                onClick={() => setHandPreference("왼손")}
                style={{ background: handPreference === "왼손" ? "#84E0AE" : "#d9f4e7" }}
              >
                왼손
              </button>
              <button 
                className="settings-option-btn"
                onClick={() => setHandPreference("오른손")}
                style={{ background: handPreference === "오른손" ? "#84E0AE" : "#d9f4e7" }}
              >
                오른손
              </button>
            </div>
          </section>
  
          {/* 이동 편의 */}
          <section className="settings-section settings-section-mobility">
            <h2>이동 편의</h2>
            <div className="settings-buttons-group">
              <button 
                className="settings-option-btn"
                onClick={() => setMobilityAid(mobilityAid === "휠체어" ? null : "휠체어")}
                style={{ background: mobilityAid === "휠체어" ? "#84E0AE" : "#d9f4e7" }}
              >
                휠체어
              </button>
              <button 
                className="settings-option-btn"
                onClick={() => setMobilityAid(mobilityAid === "지체장애" ? null : "지체장애")}
                style={{ background: mobilityAid === "지체장애" ? "#84E0AE" : "#d9f4e7" }}
              >
                지체장애
              </button>
              <button 
                className="settings-option-btn"
                onClick={() => setMobilityAid(mobilityAid === "유모차" ? null : "유모차")}
                style={{ background: mobilityAid === "유모차" ? "#84E0AE" : "#d9f4e7" }}
              >
                유모차
              </button>
            </div>
          </section>
  
          {/* 글씨크기 */}
          <section className="settings-section settings-section-text">
            <h2>글씨크기</h2>
            <div className="settings-buttons-group">
              <button 
                className="settings-option-btn settings-text-small"
                onClick={() => setTextSize("작게")}
                style={{ background: textSize === "작게" ? "#84E0AE" : "#d9f4e7" }}
              >
                작게
              </button>
              <button 
                className="settings-option-btn settings-text-medium"
                onClick={() => setTextSize("중간")}
                style={{ background: textSize === "중간" ? "#84E0AE" : "#d9f4e7" }}
              >
                중간
              </button>
              <button 
                className="settings-option-btn settings-text-large"
                onClick={() => setTextSize("크게")}
                style={{ background: textSize === "크게" ? "#84E0AE" : "#d9f4e7" }}
              >
                크게
              </button>
            </div>
          </section>
  
          {/* 마이크 버튼과 메뉴 버튼 */}
          <div className="settings-button-container">
            <button 
              className={`settings-mic-btn ${isHovering ? 'recording' : ''}`}
              onMouseEnter={handleMicMouseEnter}
              onMouseLeave={handleMicMouseLeave}
            >
              {isHovering ? (
                <span className="recording-text">음성 인식 중...</span>
              ) : (
                <IoMicOutline />
              )}
            </button>
            <button className="settings-menu-btn" onClick={goBack}>
              ☰
            </button>
          </div>
        </div>
      </div>
    );
}
