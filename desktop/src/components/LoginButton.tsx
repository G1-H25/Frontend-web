import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../app/store";
import { logout } from "../features/login/loginSlice";
import { parseJwt } from "../utils/jwt";

const LoginButton = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.login.token);
  const user = token ? parseJwt(token) : null;

  const handleLogout = () => {
    dispatch(logout());
  };

  // Typesäker avkodning av användarnamn
  const userName =
    typeof user?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] === "string"
      ? user["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]
      : null;

  return userName ? (
    <div className="flex items-center gap-4">
      <span className="font-medium">Inloggad som "{userName}"</span>
      <button
        onClick={handleLogout}
        className="bg-[#00072D] text-white px-3 py-1 rounded"
      >
        Logga ut
      </button>
    </div>
  ) : (
    <button className="bg-[#00072D] text-white px-3 py-1 rounded">
      Logga in
    </button>
  );
};

export default LoginButton;
