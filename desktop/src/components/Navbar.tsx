// src/components/Navbar.tsx
import { NavLink } from "react-router-dom"

const Navbar = () => {
  const linkClasses = "px-4 py-2 rounded hover:bg-gray-200"
  const activeClasses = "font-bold underline"

  return (
    <nav className="bg-blue-600 text-white p-2 flex gap-4">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${linkClasses} ${isActive ? activeClasses : ""}`
        }
      >
        Hem
      </NavLink>
      <NavLink
        to="/packets"
        className={({ isActive }) =>
          `${linkClasses} ${isActive ? activeClasses : ""}`
        }
      >
        Paketen
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          `${linkClasses} ${isActive ? activeClasses : ""}`
        }
      >
        Om oss
      </NavLink>
    </nav>
  )
}

export default Navbar
