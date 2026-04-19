import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Templates from './pages/Templates'
import ActiveWorkout from './pages/ActiveWorkout'
import Sessions from './pages/Sessions'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/templates" element={<Templates />} />
      <Route path="/active-workout" element={<ActiveWorkout />} />
      <Route path="/sessions" element={<Sessions />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App