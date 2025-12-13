import { useState } from "react";

function SendPhishingEmail() {
  const [email, setEmail] = useState<string>("");

  const sendemail = () => {
    if (!email) {
      alert("Please enter a recipient email.");
      return;
    }
    fetch("https://localhost:7024/api/Auth/sendemail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("failed to send email");
        }
        alert("Phishing email sent successfully!");
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to send phishing email.");
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Send Phishing Email
        </h1>
        <form className="space-y-4">
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="recipientEmail"
            >
              Recipient Email
            </label>
            <input
              type="email"
              id="recipientEmail"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="enter recipient's email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </form>
        <button
          type="submit"
          className="w-full mt-6 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
          onClick={sendemail}
        >
          Send Phishing Email
        </button>
      </div>
    </div>
  );
}
export default SendPhishingEmail;
