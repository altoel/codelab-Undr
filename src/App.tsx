import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./MainPage";
import GuideMapPage from "./GuideMapPage";
import SettingsPage from "./SettingsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/guide-map" element={<GuideMapPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
