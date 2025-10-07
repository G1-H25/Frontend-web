import { Routes, Route } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import Landing from "../pages/Landing"
import Packets from "../pages/Packets"
import About from "../pages/About"
import Login from "../features/login/Login"

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Landing />} />
        <Route path="packets" element={<Packets />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  )
}
