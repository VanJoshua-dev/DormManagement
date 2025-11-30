import "./App.css";
import { Routes, Route } from "react-router-dom";
import "@fontsource-variable/inter";
import MainContainer from "./admin/main-container";
import Dashboard from "./admin/pages/dashboard-main";
import Application from "./admin/pages/application-main";
import Tenants from "./admin/pages/tenants-main";
import Rooms from "./admin/pages/rooms-main";

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<MainContainer />}>
        <Route index element={<Dashboard />} />
        <Route path="application" element={<Application />} />
        <Route path="tenants" element={<Tenants />} />
        <Route path="rooms" element={<Rooms />} />
      </Route>
    </Routes>
  );
}

export default App;
