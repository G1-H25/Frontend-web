import { useNavigate, useLocation } from "react-router-dom";

const LoginButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  const handleClick = () => {
    if (!isLoginPage) {
      navigate("/login");
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoginPage}
      className={`px-4 py-2 rounded-md font-medium transition
        ${isLoginPage
          ? "bg-[#A91330] text-white opacity-0 pointer-events-none" 
          : "bg-[#D01338] text-white hover:bg-[#A91330] hover:cursor-pointer"
        }`}
    >
      Logga in
    </button>
  );
};

export default LoginButton;
