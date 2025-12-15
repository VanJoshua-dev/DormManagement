import "./App.css";
import { Routes, Route } from "react-router-dom";
import "@fontsource-variable/inter";
import MainContainer from "./admin/main-container";
import Dashboard from "./admin/pages/dashboard-main";
import Application from "./admin/pages/application-main";
import Tenants from "./admin/pages/tenants-main";
import Rooms from "./admin/pages/rooms-main";
import LoginPage from "./auth-pages/login-page";
import ApplicationForm from "./application-form/application";
import 'animate.css';
function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/student-application-form" element={<ApplicationForm />} />
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
