import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

const Navbar = () => {
  const linkClasses =
    "uppercase px-3 py-2 rounded-md hover:bg-[#D9F2FF] hover:text-[#2782E2] transition";
  const activeClasses = "font-bold underline";

  const { token } = useSelector((state: RootState) => state.login);
  const navigate = useNavigate();
  const location = useLocation();

  const handleProtectedNav = (path: string) => {
    if (token) {
      navigate(path);
    } else {
      navigate("/login");
    }
  };

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

      {/* Skyddad länk med samma stil och aktivt läge */}
      <button
        onClick={() => handleProtectedNav("/packets")}
        className={`${linkClasses} ${
          location.pathname.startsWith("/packets") ? activeClasses : ""
        }`}
      >
        Sändningar
      </button>

      <NavLink
        to="/about"
        className={({ isActive }) =>
          `${linkClasses} ${isActive ? activeClasses : ""}`
        }
      >
        Våra tjänster
      </NavLink>
    </nav>
  );
};

export default Navbar;
