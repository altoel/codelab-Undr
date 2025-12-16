import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GuideMapPage.css";

type FacilityType = "bathroom" | "baby" | "elevator" | "lift" | "fire" | "aed";

type Position = {
  leftPct: number;
  topPct: number;
};

function makeRandomPositions(count: number): Position[] {
  // 원본 HTML 로직: X 15~60%, Y 15~55% 범위 내 난수 배치
  return Array.from({ length: count }, () => ({
    leftPct: Math.random() * 45 + 15,
    topPct: Math.random() * 40 + 15,
  }));
}

export default function GuideMapPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<FacilityType | null>(null);
  const [evPositions, setEvPositions] = useState<Position[]>(() => makeRandomPositions(3));

  const optionLabels: Array<{ key: FacilityType; label: string }> = useMemo(
    () => [
      { key: "bathroom", label: "화장실" },
      { key: "baby", label: "수유실" },
      { key: "elevator", label: "엘리베이터" },
      { key: "lift", label: "휠체어 리프트" },
      { key: "fire", label: "소화기" },
      { key: "aed", label: "자동심장충격기" },
    ],
    []
  );

  const handleSelect = (type: FacilityType) => {
    setSelected((prev) => {
      const next = prev === type ? null : type;
      if (next === "elevator") {
        setEvPositions(makeRandomPositions(3));
      }
      return next;
    });
  };

  const handleKey = (event: React.KeyboardEvent, type: FacilityType, action: () => void) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      action();
    }
  };

  return (
    <div className="guide-root">
      <div className="container">
        <div className="map-box">
          <img className="map-image" src="/assets/shinlim.jpg" alt="신림 지도" />

          {selected === "elevator" &&
            evPositions.map((pos, idx) => (
              <img
                key={idx}
                className="overlay-image"
                src="/assets/EV1.png"
                alt="엘리베이터 위치"
                style={{ left: `${pos.leftPct}%`, top: `${pos.topPct}%` }}
              />
            ))}
        </div>

        <div className="header">
          <div
            className="logo"
            role="button"
            tabIndex={0}
            onClick={() => navigate("/")}
            onKeyDown={(e) => handleKey(e, "bathroom", () => navigate("/"))}
          >
            Undr
          </div>

          <div
            className="settings-btn"
            role="button"
            tabIndex={0}
            onClick={() => navigate("/settings")}
            onKeyDown={(e) => handleKey(e, "bathroom", () => navigate("/settings"))}
          >
            <img className="icon-img icon-setting" src="/assets/setting_icon.png" alt="환경설정" />
          </div>
        </div>

        <div className="options">
          {optionLabels.map((o) => (
            <div
              key={o.key}
              className="option-btn"
              role="button"
              tabIndex={0}
              aria-pressed={selected === o.key}
              onClick={() => handleSelect(o.key)}
              onKeyDown={(e) => handleKey(e, o.key, () => handleSelect(o.key))}
              style={{ background: selected === o.key ? "#84E0AE" : "#d9f4e7" }}
            >
              {o.label}
            </div>
          ))}
        </div>

        <div className="search-box">
          <input type="text" placeholder="역을 검색하세요" />
        </div>

        <div className="fixed-buttons">
          <div
            className="voice-btn"
            role="button"
            tabIndex={0}
            onClick={() => {}}
            onKeyDown={(e) => handleKey(e, "bathroom", () => {})}
          >
            <img className="icon-img" src="/assets/Mic.png" alt="음성" />
          </div>

          <div
            className="bottom-search-btn"
            role="button"
            tabIndex={0}
            onClick={() => {}}
            onKeyDown={(e) => handleKey(e, "bathroom", () => {})}
          >
            <img className="icon-img" src="/assets/search_icon.png" alt="검색" />
          </div>
        </div>
      </div>
    </div>
  );
}
