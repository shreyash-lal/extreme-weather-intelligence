import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Alerts from "./pages/Alerts";
import GlobalRisk from "./pages/GlobalRisk";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/global-risk" element={<GlobalRisk />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
