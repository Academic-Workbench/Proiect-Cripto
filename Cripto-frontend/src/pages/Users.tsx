import { useEffect, useState } from "react";

interface User {
  id: number;
  username: string;
  password: string;
  passwordHash: string;
}

function GetUsers() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("https://localhost:7024/api/Auth/getsecured")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-green-600 flex flex-col items-center px-6 py-10">
      <a
        href="/"
        className="absolute top-6 left-6 text-white font-bold hover:text-yellow-300 transition"
      >
        ← Home
      </a>

      <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-8 drop-shadow-lg">
        Users
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-xl shadow-lg p-6 hover:scale-105 transform transition duration-300"
          >
            <p className="font-semibold text-lg text-gray-800">Username:</p>
            <p className="mb-2">{user.username}</p>

            <p className="font-semibold text-lg text-gray-800">Password:</p>
            <p className="mb-2">{user.password}</p>

            <p className="font-semibold text-lg text-gray-800">PasswordHash:</p>
            <p className="break-words text-sm text-gray-600">
              {user.passwordHash}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GetUsers;
