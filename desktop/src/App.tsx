import { Routes, Route } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import Landing from "./pages/Landing"
import Packets from "./pages/Packets"
import About from "./pages/About"

function App() {
  return (
    <Routes>
      {/* Alla sidor använder MainLayout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Landing />} />
        <Route path="packets" element={<Packets />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  )
}

export default App
