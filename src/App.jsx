import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Templates from "./pages/Templates";
import ActiveWorkout from "./pages/ActiveWorkout";
import CreateTemplate from "./pages/CreateTemplate";
import SessionDetail from "./pages/SessionDetail";
import TemplateDetail from "./pages/TemplateDetail";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useLocation } from "react-router-dom";

function AppContent() {
  const location = useLocation();

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/active-workout/:sessionId" element={<ActiveWorkout />} />
        <Route path="/create-template" element={<CreateTemplate />} />
        <Route path="/sessions/:sessionId" element={<SessionDetail />} />
        <Route path="/templates/:id" element={<TemplateDetail />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
