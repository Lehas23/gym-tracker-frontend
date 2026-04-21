import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Templates from "./pages/Templates";
import ActiveWorkout from "./pages/ActiveWorkout";
import Sessions from "./pages/Sessions";
import CreateTemplate from "./pages/CreateTemplate";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/active-workout/:sessionId" element={<ActiveWorkout />} />
        <Route path="/sessions" element={<Sessions />} />
        <Route path="/create-template" element={<CreateTemplate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
