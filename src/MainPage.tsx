import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./MainPage.css";

// 서울 지하철 역 데이터 (중복 제거 및 확장)
const STATION_DATA = Array.from(new Set([
  // 1호선
  "소요산역", "동두천역", "보산역", "동두천중앙역", "지행역", "덕정역", "덕계역", "양주역", "녹양역", "가능역",
  "의정부역", "회룡역", "망월사역", "도봉산역", "도봉역", "방학역", "창동역", "녹천역", "월계역", "광운대역",
  "석계역", "신이문역", "외대앞역", "회기역", "청량리역", "제기동역", "신설동역", "동묘앞역", "동대문역", "종로5가역",
  "종로3가역", "종각역", "시청역", "서울역", "남영역", "용산역", "노량진역", "대방역", "신길역", "영등포역",
  "신도림역", "구로역", "구일역", "개봉역", "오류동역", "온수역", "역곡역", "소사역", "부천역", "중동역",
  "송내역", "부개역", "부평역", "백운역", "동암역", "간석역", "주안역", "도화역", "제물포역", "도원역",
  "동인천역", "인천역", "가산디지털단지역", "금천구청역", "광명역", "석수역", "관악역", "안양역", "명학역", "금정역",
  "군포역", "당정역", "의왕역", "성균관대역", "화서역", "수원역", "세류역", "병점역", "세마역", "오산대역",
  "오산역", "진위역", "송탄역", "서정리역", "평택역", "성환역", "직산역", "두정역", "천안역", "봉명역",
  "쌍용역", "아산역", "탕정역", "배방역", "온양온천역", "신창역",
  
  // 2호선
  "시청역", "을지로입구역", "을지로3가역", "을지로4가역", "동대문역사문화공원역", "신당역", "상왕십리역", "왕십리역", 
  "한양대역", "뚝섬역", "성수역", "건대입구역", "구의역", "강변역", "잠실나루역", "잠실역", "잠실새내역", 
  "종합운동장역", "삼성역", "선릉역", "역삼역", "강남역", "교대역", "서초역", "방배역", "사당역", "낙성대역", 
  "서울대입구역", "봉천역", "신림역", "신대방역", "구로디지털단지역", "대림역", "영등포구청역", "당산역", "합정역", 
  "홍대입구역", "신촌역", "이대역", "아현역", "충정로역", "용답역", "신답역", "용두역", "신설동역",
  
  // 3호선
  "대화역", "주엽역", "정발산역", "마두역", "백석역", "대곡역", "화정역", "원당역", "원흥역", "삼송역",
  "지축역", "구파발역", "연신내역", "불광역", "녹번역", "홍제역", "무악재역", "독립문역", "경복궁역", "안국역",
  "종로3가역", "을지로3가역", "충무로역", "동대입구역", "약수역", "금호역", "옥수역", "압구정역", "신사역", "잠원역",
  "고속터미널역", "교대역", "남부터미널역", "양재역", "매봉역", "도곡역", "대치역", "학여울역", "대청역", "일원역",
  "수서역", "가락시장역", "경찰병원역", "오금역",
  
  // 4호선
  "당고개역", "상계역", "노원역", "창동역", "쌍문역", "수유역", "미아역", "미아사거리역", "길음역", "성신여대입구역",
  "한성대입구역", "혜화역", "동대문역", "동대문역사문화공원역", "충무로역", "명동역", "회현역", "서울역", "숙대입구역",
  "삼각지역", "신용산역", "이촌역", "동작역", "총신대입구역", "사당역", "남태령역", "선바위역", "경마공원역", "대공원역",
  "과천역", "정부과천청사역", "인덕원역", "평촌역", "범계역", "금정역", "산본역", "수리산역", "대야미역", "반월역",
  "상록수역", "한대앞역", "중앙역", "고잔역", "초지역", "안산역", "신길온천역", "정왕역", "오이도역",
  
  // 5호선
  "방화역", "개화산역", "김포공항역", "송정역", "마곡역", "발산역", "우장산역", "화곡역", "까치산역", "신정역",
  "목동역", "오목교역", "양평역", "영등포구청역", "영등포시장역", "신길역", "여의도역", "여의나루역", "마포역", "공덕역",
  "애오개역", "충정로역", "서대문역", "광화문역", "종로3가역", "을지로4가역", "동대문역사문화공원역", "청구역", "신금호역",
  "행당역", "왕십리역", "마장역", "답십리역", "장한평역", "군자역", "아차산역", "광나루역", "천호역", "강동역",
  "길동역", "굽은다리역", "명일역", "고덕역", "상일동역", "강일역", "미사역", "하남풍산역", "하남시청역", "하남검단산역",
  "둔촌동역", "올림픽공원역", "방이역", "오금역", "개롱역", "거여역", "마천역",
  
  // 6호선
  "응암역", "역촌역", "불광역", "독바위역", "연신내역", "구산역", "새절역", "증산역", "디지털미디어시티역", "월드컵경기장역",
  "마포구청역", "망원역", "합정역", "상수역", "광흥창역", "대흥역", "공덕역", "효창공원앞역", "삼각지역", "녹사평역",
  "이태원역", "한강진역", "버티고개역", "약수역", "청구역", "신당역", "동묘앞역", "창신역", "보문역", "안암역",
  "고려대역", "월곡역", "상월곡역", "돌곶이역", "석계역", "태릉입구역", "화랑대역", "봉화산역",
  
  // 7호선
  "장암역", "도봉산역", "수락산역", "마들역", "노원역", "중계역", "하계역", "공릉역", "태릉입구역", "먹골역",
  "중화역", "상봉역", "면목역", "사가정역", "용마산역", "중곡역", "군자역", "어린이대공원역", "건대입구역", "뚝섬유원지역",
  "청담역", "강남구청역", "학동역", "논현역", "반포역", "고속터미널역", "내방역", "이수역", "남성역", "숭실대입구역",
  "상도역", "장승배기역", "신대방삼거리역", "보라매역", "신풍역", "대림역", "남구로역", "가산디지털단지역", "철산역", "광명사거리역",
  "천왕역", "온수역", "까치울역", "부천종합운동장역", "춘의역", "신중동역", "부천시청역", "상동역", "삼산체육관역", "굴포천역",
  "부평구청역", "산곡역", "석남역",
  
  // 8호선
  "암사역", "천호역", "강동구청역", "몽촌토성역", "잠실역", "석촌역", "송파역", "가락시장역", "문정역", "장지역",
  "복정역", "산성역", "남한산성입구역", "단대오거리역", "신흥역", "수진역", "모란역",
  
  // 9호선
  "개화역", "김포공항역", "공항시장역", "신방화역", "마곡나루역", "양천향교역", "가양역", "증미역", "등촌역", "염창역",
  "신목동역", "선유도역", "당산역", "국회의사당역", "여의도역", "샛강역", "노량진역", "노들역", "흑석역", "동작역",
  "구반포역", "신반포역", "고속터미널역", "사평역", "신논현역", "언주역", "선정릉역", "삼성중앙역", "봉은사역", "종합운동장역",
  "삼전역", "석촌고분역", "석촌역", "송파나루역", "한성백제역", "올림픽공원역", "둔촌오륜역", "중앙보훈병원역",
  
  // 경의중앙선
  "문산역", "운정역", "야당역", "탄현역", "일산역", "백마역", "풍산역", "대곡역", "행신역", "강매역",
  "화전역", "수색역", "디지털미디어시티역", "가좌역", "신촌역", "서강대역", "홍대입구역", "공덕역", "효창공원앞역", "용산역",
  "이촌역", "서빙고역", "한남역", "옥수역", "응봉역", "왕십리역", "청량리역", "회기역", "중랑역", "상봉역",
  "망우역", "양원역", "구리역", "도농역", "양정역", "덕소역", "도심역", "팔당역", "운길산역", "양수역",
  "신원역", "국수역", "아신역", "오빈역", "양평역", "원덕역", "용문역", "지평역",
  
  // 신분당선
  "신사역", "논현역", "신논현역", "강남역", "양재역", "양재시민의숲역", "청계산입구역", "판교역", "정자역", "미금역",
  "동천역", "수지구청역", "성복역", "상현역", "광교중앙역", "광교역"
])).sort();

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

  return (
    <div className="main-root">

      <div className="container active" id="container">
      <div className="top-area">
        <div className={`route-wrapper ${showRoutes ? 'visible' : 'hidden'}`}>
          <div className="line-bg"></div>
          <div className="line-active"></div>

          <div className="station-col">
            <div className="role-txt">출발역</div>
            <div className="dir-txt">신대방 방면</div>
            <div className="station-box" role="button" tabIndex={0} onClick={onGoGuideMap}>
              신림역
            </div>

            <div className="info-area">
              <div className="status-txt">
                성수(외선)행 <span>도착</span>
              </div>
              <div className="main-info-txt">17분</div>
              <div className="sub-txt">8개역 이동</div>
            </div>

            <div className="safe-detail">
              <div>5-1</div>
              <div>5-2</div>
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
            <button className="btn-fast">▼ 빠른경로</button>
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
          <div className="btn-setting" role="button" tabIndex={0} onClick={onGoSettings}>
            <img className="icon-img icon-setting" src="/assets/setting_icon.png" alt="환경설정" />
          </div>
        </div>

        <div className="input-pill">
          <input 
            className="input-val" 
            type="text" 
            placeholder="출발역 입력" 
            value={startStation}
            onChange={(e) => {
              const value = e.target.value;
              setStartStation(value);
              if (value.trim()) {
                const filtered = STATION_DATA.filter(station => 
                  station.includes(value)
                ).slice(0, 5);
                setStartResults(filtered);
                setActiveInput("start");
              } else {
                setStartResults([]);
                setActiveInput(null);
              }
            }}
            onFocus={() => {
              if (startStation.trim()) {
                setActiveInput("start");
              }
            }}
            onBlur={() => setTimeout(() => setActiveInput(null), 200)}
          />
          <span className="input-label">출발역</span>
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
            placeholder="도착역 입력" 
            value={endStation}
            onChange={(e) => {
              const value = e.target.value;
              setEndStation(value);
              if (value.trim()) {
                const filtered = STATION_DATA.filter(station => 
                  station.includes(value)
                ).slice(0, 5);
                setEndResults(filtered);
                setActiveInput("end");
              } else {
                setEndResults([]);
                setActiveInput(null);
              }
            }}
            onFocus={() => {
              if (endStation.trim()) {
                setActiveInput("end");
              }
            }}
            onBlur={() => setTimeout(() => setActiveInput(null), 200)}
          />
          <span className="input-label">도착역</span>
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

        <div className="action-btns">
          <div className="btn-icon" role="button" tabIndex={0}>
            <img className="icon-img" src="/assets/Mic.png" alt="음성" />
          </div>
          <div className="btn-icon" role="button" tabIndex={0} onClick={handleSearch}>
            <img className="icon-img" src="/assets/search_icon.png" alt="검색" />
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
