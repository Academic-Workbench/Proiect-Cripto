function Home() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-amber-300 to-amber-400 px-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-10 max-w-lg w-full text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2 drop-shadow-sm">
          Welcome
        </h1>

        <p className="text-lg text-gray-600 mb-10">
          Choose a login method or view all users.
        </p>
        <div className="space-y-8">
          <div>
            <p className="text-gray-700 font-medium mb-3">Login Methods:</p>
            <div className="flex justify-center gap-4">
              <a
                href="/loginsecured"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
              >
                Secure Login
              </a>

              <a
                href="/loginvulnerable"
                className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
              >
                Vulnerable Login
              </a>
            </div>
          </div>
          <div>
            <p className="text-gray-700 font-medium mb-3">Users:</p>
            <a
              href="/users"
              className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
            >
              Get Users
            </a>
          </div>
          <div>
            <p className="text-gray-700 font-medium mb-3">Phishing:</p>
            <a
              href="/sendemail"
              className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
            >
              Send Phishing Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
