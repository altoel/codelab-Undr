import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./MainPage.css";

export default function MainPage() {
  const navigate = useNavigate();
  const [startStation, setStartStation] = useState(() => {
    const saved = localStorage.getItem("startStation");
    return saved || "";
  });
  const [endStation, setEndStation] = useState(() => {
    const saved = localStorage.getItem("endStation");
    return saved || "";
  });
  const [startResults, setStartResults] = useState<string[]>([]);
  const [endResults, setEndResults] = useState<string[]>([]);
  const [activeInput, setActiveInput] = useState<"start" | "end" | null>(null);
  const [showRoutes, setShowRoutes] = useState(() => {
    const saved = localStorage.getItem("showRoutes");
    return saved === "true";
  });
  const [isHoveringMic, setIsHoveringMic] = useState(false);

  useEffect(() => {
    localStorage.setItem("showRoutes", showRoutes.toString());
  }, [showRoutes]);

  useEffect(() => {
    localStorage.setItem("startStation", startStation);
  }, [startStation]);

  useEffect(() => {
    localStorage.setItem("endStation", endStation);
  }, [endStation]);

  const onGoGuideMap = () => {
    navigate("/guide-map");
  };

  const onGoSettings = () => {
    navigate("/settings");
  };

  const handleSearch = () => {
    if (startStation.trim() && endStation.trim()) {
      setShowRoutes(true);
    } else {
      setShowRoutes(false);
    }
  };

  const handleMicMouseEnter = () => {
    setIsHoveringMic(true);
  };

  const handleMicMouseLeave = () => {
    setIsHoveringMic(false);
  };

  return (
    <div className="main-root">
      <div className="container active" id="container">
        <div className="top-area">
          <div className={`route-wrapper ${showRoutes ? "visible" : "hidden"}`}>
            <div className="line-bg"></div>
            <div className="line-active"></div>

            <div className="station-col">
              <div className="role-txt">출발역</div>
              <div className="dir-txt">신대방 방면</div>
              <div
                className="station-box"
                role="button"
                tabIndex={0}
                onClick={onGoGuideMap}
              >
                신림역
              </div>

              <div className="info-area">
                <div className="status-txt">
                  성수(외선)행 <span>도착</span>
                </div>
                <div className="main-info-txt">17분</div>
                <div className="sub-txt">8개역 이동</div>
              </div>
            </div>

            <div className="station-col">
              <div className="role-txt gray">경유역</div>
              <div className="dir-txt">신풍역 방면</div>
              <div className="station-box">강남역</div>

              <div className="info-area">
                <div className="status-txt">
                  신사행 <span>도착</span>
                </div>
                <div className="main-info-txt">2분</div>
                <div className="sub-txt">2개역 이동</div>
              </div>

              <div className="safe-detail">
                <div>2-1</div>
                <div>6-1</div>
              </div>
            </div>

            <div className="station-col">
              <div className="role-txt">도착역</div>
              <div className="dir-txt"></div>
              <div className="station-box">논현역</div>

              <div className="info-area" style={{ marginTop: 24 }}>
                <div className="main-info-txt">13:27</div>
                <div className="sub-txt">도착 예정</div>
              </div>

              <div className="safe-detail">
                <div>5-1</div>
                <div>5-2</div>
              </div>
            </div>
          </div>

          <div className="mid-controls">
            {/* 폰트어썸 의존 제거: 간단한 SVG(지하철 아이콘) */}
            <svg className="train-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 2c-3.87 0-7 0.67-7 3v10c0 2.21 2.69 3 7 3 4.31 0 7-.79 7-3V5c0-2.33-3.13-3-7-3Zm-5 4.2c0-.98 2.02-1.7 5-1.7s5 .72 5 1.7V7H7V6.2Zm0 3.3h10v5.4c0 .98-2.02 1.7-5 1.7s-5-.72-5-1.7V9.5Zm2.25 1.25a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm5.5 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2ZM8 20l-1.5 2h2l1-1h5l1 1h2L16 20H8Z"
              />
            </svg>

            <div className="right-group">
              <button className="btn-fast">▼ 승강기 경로</button>
            </div>
          </div>
        </div>

        <div className="bottom-sheet">
          <div className="sheet-header">
            <div className="logo-group">
              <div className="logo">Undr</div>
              <div className="icon-back">
                <span className="back-chevron" aria-hidden="true"></span>
              </div>
            </div>
            <div
              className="btn-setting"
              role="button"
              tabIndex={0}
              onClick={onGoSettings}
            >
              <img
                className="icon-img icon-setting"
                src="/assets/setting_icon.png"
                alt="환경설정"
              />
            </div>
          </div>

          <div className="search-container">
            <div className="input-container">
              <div className="input-pill">
                <input
                  className="input-val"
                  type="text"
                  placeholder="출발지 입력"
                  value={startStation}
                  onChange={(e) => {
                    const value = e.target.value;
                    setStartStation(value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setStartResults(["신림역 2호선", "신대방역"]);
                      setActiveInput("start");
                    }
                  }}
                  onFocus={() => {
                    if (startStation.trim()) {
                      setActiveInput("start");
                    }
                  }}
                  onBlur={() => setTimeout(() => setActiveInput(null), 200)}
                />
                <span className="input-label">출발지</span>
                {activeInput === "start" && startResults.length > 0 && (
                  <div className="search-results">
                    {startResults.map((station, index) => (
                      <div
                        key={index}
                        className="search-item"
                        onClick={() => {
                          setStartStation(station);
                          setStartResults([]);
                          setActiveInput(null);
                        }}
                      >
                        {station}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="input-pill">
                <input
                  className="input-val"
                  type="text"
                  placeholder="도착지 입력"
                  value={endStation}
                  onChange={(e) => {
                    const value = e.target.value;
                    setEndStation(value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setEndResults(["논현역", "반포역"]);
                      setActiveInput("end");
                    }
                  }}
                  onFocus={() => {
                    if (endStation.trim()) {
                      setActiveInput("end");
                    }
                  }}
                  onBlur={() => setTimeout(() => setActiveInput(null), 200)}
                />
                <span className="input-label">도착지</span>
                {activeInput === "end" && endResults.length > 0 && (
                  <div className="search-results">
                    {endResults.map((station, index) => (
                      <div
                        key={index}
                        className="search-item"
                        onClick={() => {
                          setEndStation(station);
                          setEndResults([]);
                          setActiveInput(null);
                        }}
                      >
                        {station}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div
              className="btn-icon search-btn"
              role="button"
              tabIndex={0}
              onClick={handleSearch}
            >
              <img
                className="icon-img"
                src="/assets/search_icon.png"
                alt="검색"
              />
            </div>
          </div>

          <div className="action-btns">
            <div
              className={`btn-icon ${isHoveringMic ? "recording" : ""}`}
              role="button"
              tabIndex={0}
              onMouseEnter={handleMicMouseEnter}
              onMouseLeave={handleMicMouseLeave}
            >
              {isHoveringMic ? (
                <span className="recording-text">음성 인식 중...</span>
              ) : (
                <img className="icon-img" src="/assets/Mic.png" alt="음성" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
