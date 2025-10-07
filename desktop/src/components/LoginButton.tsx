import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import type { RootState } from "../app/store";
import { logout } from "../features/login/loginSlice";
import { parseJwt } from "../utils/jwt";

const LoginButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const token = useSelector((state: RootState) => state.login.token);
  const user = token ? parseJwt(token) : null;

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const userName =
    typeof user?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] === "string"
      ? user["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]
      : null;

  // Om användaren inte är inloggad och redan är på /login, visa inget
  if (!userName && location.pathname === "/login") {
    return null;
  }

  return userName ? (
    <div className="flex items-center gap-4">
      <span className="font-medium">Inloggad som "{userName}"</span>
      <button
        onClick={handleLogout}
        className="bg-[#D01338] text-white px-4 py-2 rounded-md font-medium transition-colors hover:bg-[#A91330] hover:cursor-pointer" 
      >
        Logga ut
      </button>
    </div>
  ) : (
    <button
      onClick={handleLogin}
      className="bg-[#D01338] text-white px-4 py-2 rounded-md font-medium transition-colors hover:bg-[#A91330] hover:cursor-pointer" 
    >
      Logga in
    </button>
  );
};

export default LoginButton;
