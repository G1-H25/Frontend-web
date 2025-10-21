import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import type { RootState } from "../app/store";
import { logout } from "../features/login/loginSlice";
import { parseJwt } from "../utils/jwt";
// import { useEffect } from "react";

const LoginButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const token = useSelector((state: RootState) => state.login.token);
  const user = token ? parseJwt(token) : null;

  //! To see the JWT token in the console, only for development
  // useEffect(() => {
  //   if (token) {
  //     console.log("JWT token:", token);
  //     console.log("Token payload:", user);
  //   }
  // }, [token, user]);

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

  const role = user?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

  // Om man inte är inloggad och är på login-sidan → ta bort knappen
  if (!userName && location.pathname === "/login") {
    return null;
  }

  return userName ? (
    <div className="flex items-center gap-4">
      {/* Admin-knapp om användaren är Admin */}
      {role === "Admin" && (
        <button
          onClick={() => navigate("/admin")}
          className="bg-yellow-500 text-black px-3 py-1 rounded-md font-medium transition-colors hover:bg-yellow-400 hover:cursor-pointer"
        >
          Admin
        </button>
      )}

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
