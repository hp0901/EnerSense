import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const PremiumContact = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  // Safety check (extra layer)
  if (!user?.isPremium) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold mb-4">
          Premium Support is for Premium members only
        </h2>
        <button
          onClick={() => navigate("/pricing")}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
        >
          Upgrade to Premium
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Heading */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold mb-2">
          Premium Support ⚡
        </h1>
        <p className="text-gray-600">
          Priority assistance for EnerSense Premium members
        </p>
      </div>

      {/* SLA Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-6 mb-10">
        <h3 className="text-lg font-semibold mb-1">
          🚀 Priority Response Guaranteed
        </h3>
        <p className="text-sm opacity-90">
          Premium members receive responses within <b>24 hours</b>
        </p>
      </div>

      {/* Support Options */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="border rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-2">
            📧 Email Support
          </h3>
          <p className="text-gray-600 mb-4">
            Reach our dedicated premium support team
          </p>
          <p className="font-medium text-indigo-600">
            premium-support@enersense.com
          </p>
        </div>

        <div className="border rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-2">
            🧑‍💻 Account Manager
          </h3>
          <p className="text-gray-600 mb-4">
            Get help tailored to your subscription and usage
          </p>
          <p className="font-medium">
            Assigned automatically to your account
          </p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white border rounded-2xl p-8 shadow-sm">
        <h3 className="text-lg font-semibold mb-6">
          Submit a Priority Request
        </h3>

        <form className="space-y-5">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Subject
            </label>
            <input
              type="text"
              placeholder="Issue subject"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Message
            </label>
            <textarea
              rows="5"
              placeholder="Describe your issue in detail"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
          </div>

          <button
            type="button"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Submit Priority Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default PremiumContact;
