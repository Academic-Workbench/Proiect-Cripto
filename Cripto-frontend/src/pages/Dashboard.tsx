import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 flex flex-col items-center justify-center px-6 py-12">
      <h1 className="text-5xl font-extrabold text-white mb-6">Dashboard</h1>
      <p className="text-xl text-white mb-4">
        You have successfully logged in!
      </p>
      <div className="flex space-x-4 mt-6">
        <a
          href="/"
          className="px-4 py-2 bg-white text-green-600 font-semibold rounded hover:bg-green-100 transition"
        >
          Go to Home
        </a>
        <a
          href="/users"
          className="px-4 py-2 bg-white text-blue-600 font-semibold rounded hover:bg-blue-100 transition"
        >
          View Users
        </a>
      </div>
      <div className="mt-10 text-white text-center">
        <p className="text-lg">
          This is your secure area. Only authenticated users should see this
          page.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
