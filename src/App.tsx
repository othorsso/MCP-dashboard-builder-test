import { useState } from "react";
import { ExceptionRadarDashboard } from "./components/ExceptionRadar/Dashboard";
import { LocationLoad } from "./components/ExceptionRadar/LocationLoad";

type ViewMode = "radar" | "location-load";

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>("radar");

  if (viewMode === "location-load") {
    return (
      <div style={{ width: "100%", minHeight: "100vh", background: "#020617" }}>
        <LocationLoad onBack={() => setViewMode("radar")} />
      </div>
    );
  }

  return (
    <div style={{ width: "100%", minHeight: "100vh", background: "#020617" }}>
      <ExceptionRadarDashboard onSwitchToLocationLoad={() => setViewMode("location-load")} />
    </div>
  );
}

export default App;
