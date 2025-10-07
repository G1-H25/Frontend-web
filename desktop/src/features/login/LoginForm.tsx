import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./loginSlice";
import type { RootState, AppDispatch } from "../../app/store";

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.login);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
  };

  return (
    <div className="max-w-md mx-auto p-6 border border-[#9ACEFE] bg-white rounded-md shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Logga in</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Username */}
        <div className="flex flex-col">
          <label htmlFor="username" className="mb-1 font-medium">
            Användarnamn
          </label>
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

        {/* Password */}
        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1 font-medium">
            Lösenord
          </label>
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

        {/* Error message */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`bg-[#D01338] text-white px-4 py-2 rounded-md font-medium transition
            ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#A91330] hover:cursor-pointer"}
          `}
        >
          {loading ? "Loggar in..." : "Logga in"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
