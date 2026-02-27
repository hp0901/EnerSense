import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function MyPlanPage() {
  const { user, loading } = useUser();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-500">Loading your plan...</p>
      </div>
    );
  }

  if (!user?.isPremium) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold mb-4">
          You don’t have a Premium plan
        </h2>
        <button
          onClick={() => navigate("/pricing")}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
        >
          View Plans
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-br from-gray-400 to-yellow-150 border border-indigo-200  mx-auto px-6 py-16">
      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">My Plan 💎</h1>
        <p className="text-gray-600">
          Manage your EnerSense Premium subscription
        </p>
      </div>

      {/* ================= PLAN SUMMARY ================= */}
      <div className="bg-gradient-to-br from-purple-200 to-indigo-100 border border-indigo-200 rounded-2xl p-8 shadow-sm mb-10">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-center text-xl font-semibold">
              {user.cardType} Membership
            </h2>
            <p className="text-sm text-gray-600">
              {user.premiumPlan?.replace("-", " ").toUpperCase()}
            </p>
          </div>

          <span className="px-4 py-1 rounded-full text-sm bg-green-100 text-green-700 font-medium">
            Active
          </span>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500">Started On</p>
            <p className="font-medium">
              {new Date(user.premiumStartedAt).toDateString()}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Expires On</p>
            <p className="font-medium text-red-600">
              {new Date(user.premiumExpiresAt).toDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* ================= ACCOUNT DETAILS ================= */}
      <div className="bg-gradient-to-br from-indigo-300 to-yellow-200 border border-indigo-200  border rounded-2xl p-8 mb-10">
        <h3 className="text-lg font-semibold mb-6">
          Account Details 👤
        </h3>

        <div className="grid sm:grid-cols-2 gap-6 text-gray-700">
          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="font-medium">
              {user.firstName} {user.lastName}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">
              {user.email}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Board</p>
            <p className="font-medium">
              {user.board}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Membership Type</p>
            <p className="font-medium">
              {user.cardType}
            </p>
          </div>
        </div>
      </div>

      {/* ================= BENEFITS ================= */}
      <div className="bg-gradient-to-br from-pink-200 to-blue-200 border border-indigo-200  border rounded-2xl p-8">
        <h3 className="text-lg font-semibold mb-4">
          Premium Benefits
        </h3>

        <ul className="grid sm:grid-cols-2 gap-3 text-gray-700">
          <li>✔ Unlimited alerts</li>
          <li>✔ Fault detection</li>
          <li>✔ CO₂ & Green score</li>
          <li>✔ Bill prediction</li>
          <li>✔ Monthly reports</li>
          <li>✔ Priority support</li>
        </ul>

        <div className="mt-8 flex gap-4">
          <button
            onClick={() => navigate("/checkout")}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
          >
            Renew / Upgrade
          </button>

          <button
            onClick={() => navigate("/Premium-Contact")}
            className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
