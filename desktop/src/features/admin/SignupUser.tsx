import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, resetState } from "./adminSlice";
import type { RootState, AppDispatch } from "../../app/store";

const SignupUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, success } = useSelector((state: RootState) => state.admin);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const [companyId, setCompanyId] = useState(1);

  // Nollställ formulärfält vid lyckad skapning
  useEffect(() => {
    if (success) {
      setUsername("");
      setPassword("");
      setRole("User");
      setCompanyId(1);
    }
  }, [success]);

  // Automatisk återställning av meddelanden efter 3 sekunder
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        dispatch(resetState());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error, dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const formData = { username, password, role, companyId };

  await dispatch(signupUser(formData));
};


  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-[#9ACEFE] bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Skapa användare</h2>

      {error && <p className="text-[#D01338] text-sm mb-4">{error}</p>}
      {success && <p className="text-green-500 text-sm mb-4">Användare skapad!</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="username" className="mb-1 font-medium">Användarnamn</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Ditt användarnamn"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1 font-medium">Lösenord</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Ditt lösenord"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="role" className="mb-1 font-medium">Roll</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="companyId" className="mb-1 font-medium">Företags-ID</label>
          <input
            type="number"
            id="companyId"
            value={companyId}
            onChange={(e) => setCompanyId(Number(e.target.value))}
            required
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`bg-[#D01338] text-white px-4 py-2 rounded-md font-medium transition
            ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#A91330] hover:cursor-pointer"}`}
        >
          {loading ? "Skapar..." : "Skapa användare"}
        </button>
      </form>
    </div>
  );
};

export default SignupUser;
