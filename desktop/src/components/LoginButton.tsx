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
  //     const now = new Date();
  //     console.log("Now:", now.toLocaleString()); // lokal tid
  //     console.log("Now UTC:", now.toUTCString()); // UTC
  //     console.log("JWT token:", token);

  //     // --- Dekoda JWT ---
  //     const payloadBase64 = token.split(".")[1]; // mittendelen
  //     const decodedJson = atob(payloadBase64);   // base64 -> text
  //     const payload = JSON.parse(decodedJson);   // text -> objekt

  //     console.log("Token payload:", payload);

  //     // --- Hämta och visa exp ---
  //     if (payload.exp) {
  //       const expDate = new Date(payload.exp * 1000); // sekunder -> ms
  //       console.log("Token expires (UTC):", expDate.toUTCString());
  //       console.log("Token expires (Local):", expDate.toLocaleString());

  //       const timeLeft = (expDate.getTime() - now.getTime()) / 1000 / 60; // minuter kvar
  //       console.log(`Token expires in: ${timeLeft.toFixed(1)} min`);
  //     } else {
  //       console.warn("Ingen exp hittades i token");
  //     }
  //   }
  // }, [token, user]);


  const handleLogout = () => {
    dispatch(logout());
    navigate("/", { replace: true });
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
          className="bg-yellow-500 text-black px-3 py-1 rounded-md font-medium shadow-lg transition-colors hover:bg-yellow-400 hover:cursor-pointer"
        >
          Admin
        </button>
      )}

      <span className="font-medium">Inloggad som "{userName}"</span>
      <button
        onClick={handleLogout}
        className="bg-[#D01338] text-white px-4 py-2 rounded-md font-medium shadow-lg transition-colors hover:bg-[#A91330] hover:cursor-pointer"
      >
        Logga ut
      </button>
    </div>
  ) : (
    <button
      onClick={handleLogin}
      className="bg-[#D01338] text-white px-4 py-2 rounded-md font-medium shadow-lg transition-colors hover:bg-[#A91330] hover:cursor-pointer"
    >
      Logga in
    </button>
  );
};

export default LoginButton;
