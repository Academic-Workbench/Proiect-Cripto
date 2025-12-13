import { useState } from "react";
import avatar from "../assets/avatar.png";

function PhishingLogin() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Trebuie să introduci atât email-ul cât și parola");
      return;
    }
    fetch("https://localhost:7024/api/Auth/logphishingemail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Login failed");
        }
        setError("");
        window.location.href = "/dashboard";
      })
      .catch((error) => {
        console.error(error);
        setError("Login failed");
      });
  };

  return (
    <div className="bg-purple-800 flex min-h-screen items-center justify-center px-6 py-12">
      <div className="bg-black/30 rounded-lg shadow-xl p-8 max-w-sm w-full text-white">
        <a
          href="/"
          className="text-white font-bold hover:text-yellow-300 transition mb-4 inline-block"
        >
          ← Home
        </a>

        <div className="text-center">
          <img
            src={avatar}
            alt="Avatar"
            className="mx-auto h-20 w-20 rounded-full ring-2 ring-white shadow-lg"
          />
          <h2 className="mt-6 text-2xl font-bold">Login Secured</h2>
        </div>

        {error && (
          <p className="text-red-400 text-center mt-4 font-semibold">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium">email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              className="mt-1 block w-full rounded-md bg-black/50 px-3 py-2 text-white placeholder-gray-400 focus:outline-2 focus:outline-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className="mt-1 block w-full rounded-md bg-black/50 px-3 py-2 text-white placeholder-gray-400 focus:outline-2 focus:outline-indigo-500 sm:text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-green-500 px-4 py-2 font-semibold text-black hover:bg-green-600 transition shadow-md"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
export default PhishingLogin;
