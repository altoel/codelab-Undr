import "./Settings.css";
import { IoMicOutline } from "react-icons/io5";

export default function Settings() {
  const goBack = () => {
    window.history.pushState({}, "", "/");
    window.dispatchEvent(new PopStateEvent("popstate"));
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
        <button className="settings-menu-btn" onClick={goBack}>
          ☰
        </button>
      </div>

      {/* 본문 */}
      <div className="settings-content">
        <div className="settings-logo-text">Undr</div>

        {/* 사용자 설정 */}
        <section className="settings-section settings-section-user">
          <h1>사용자 설정</h1>
          <h2>조작 방향</h2>
          <div className="settings-buttons-group">
            <button className="settings-option-btn">왼손</button>
            <button className="settings-option-btn">오른손</button>
          </div>
        </section>

        {/* 이동 편의 */}
        <section className="settings-section settings-section-mobility">
          <h2>이동 편의</h2>
          <div className="settings-buttons-group">
            <button className="settings-option-btn">휠체어</button>
            <button className="settings-option-btn">지체장애</button>
            <button className="settings-option-btn">유모차</button>
          </div>
        </section>

        {/* 글씨크기 */}
        <section className="settings-section settings-section-text">
          <h2>글씨크기</h2>
          <div className="settings-buttons-group">
            <button className="settings-option-btn settings-text-small">
              작게
            </button>
            <button className="settings-option-btn settings-text-medium">
              중간
            </button>
            <button className="settings-option-btn settings-text-large">
              크게
            </button>
          </div>
        </section>

        {/* 마이크 버튼 */}
        <button className="settings-mic-btn">
          <IoMicOutline />
        </button>
      </div>
    </div>
  );
}
