import { Routes, Route } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import Landing from "../pages/Landing"
import Packets from "../pages/Packets"
import About from "../pages/About"
import LoginPage from "../pages/LoginPage"
import AdminPage from "../pages/AdminPage"
import ProtectedRoute from "../components/ProtectedRoute"
import PacketDetailsPage from "../pages/PacketDetailsPage"


export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Landing />} />
        <Route path="packets" element={<Packets />} />
        <Route path="/packets/:packetId" element={<PacketDetailsPage />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<LoginPage />} />
        <Route
          path="admin"
          element={
            <ProtectedRoute role="Admin">
              <AdminPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  )
}
