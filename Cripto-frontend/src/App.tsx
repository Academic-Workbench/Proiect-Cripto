import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginSecured from "./auth/LoginSecured";
import LoginVulnerable from "./auth/LoginVulnerable";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Dashboard from "./pages/Dashboard";
import SendPhishingEmail from "./pages/SendPhishingEmail";
import PhishingLogin from "./pages/PhishingLogin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loginsecured" element={<LoginSecured />} />
        <Route path="/loginvulnerable" element={<LoginVulnerable />} />
        <Route path="/users" element={<Users />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sendemail" element={<SendPhishingEmail />} />
        <Route path="/phishinglogin" element={<PhishingLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
