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
        Start
      </NavLink>
      <NavLink
        to="/packets"
        className={({ isActive }) =>
          `${linkClasses} ${isActive ? activeClasses : ""}`
        }
      >
        Sändningar
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          `${linkClasses} ${isActive ? activeClasses : ""}`
        }
      >
        Våra tjänster
      </NavLink>
    </nav>
  )
}

export default Navbar
