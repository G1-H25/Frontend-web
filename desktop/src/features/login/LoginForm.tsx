import { useState } from "react";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Här kan du lägga logik för login, t.ex. API-anrop
    console.log("Username:", username, "Password:", password);
  };

  return (
    <div className="max-w-md mx-auto p-6 border border-[#9ACEFE] bg-white rounded-md shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Logga in</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Username */}
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

        {/* Password */}
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

        {/* Submit */}
        <button
          type="submit"
          className="bg-[#D01338] text-white px-4 py-2 rounded-md font-medium hover:bg-[#A91330] hover:cursor-pointer transition"
        >
          Logga in
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
