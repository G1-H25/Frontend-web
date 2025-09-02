import { NavLink } from "react-router-dom"

const Navbar = () => {
  const linkClasses = "px-3 py-2 rounded-md hover:bg-[#D9F2FF] hover:text-[#2782E2] transition"
  const activeClasses = "font-bold underline"

  return (
    <nav className="flex gap-4">
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
