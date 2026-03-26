import { Headphones } from "lucide-react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

/* MOCK SUPPORT DATA */

const tickets = [
  {
    id: "#ES1023",
    issue: "Device not updating data",
    status: "Resolved",
  },
  {
    id: "#ES1027",
    issue: "Energy spike alert clarification",
    status: "In Progress",
  },
];

export default function SupportPage() {
  const { user } = useUser();
  const navigate = useNavigate();
  const isPremium = user?.isPremium;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* HEADER */}
        <div className="bg-white/70 backdrop-blur-md border rounded-2xl p-6 shadow-sm mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Headphones className="text-purple-600" size={28} />
            <h1 className="text-3xl font-bold">Priority Support</h1>
          </div>

          <p className="text-gray-600 max-w-2xl">
            Premium users receive faster responses and dedicated assistance
            from the EnerSense support team.
          </p>
        </div>

        {/* SUPPORT TICKETS */}
        <div className="bg-white border rounded-2xl p-6 shadow-md mb-12">
          <h2 className="font-semibold mb-4">Recent Support Tickets</h2>

          <div className="space-y-3">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="p-4 border rounded-lg flex justify-between"
              >
                <div>
                  <p className="font-semibold">{ticket.id}</p>
                  <p className="text-sm text-gray-600">
                    {ticket.issue}
                  </p>
                </div>

                <span className="text-sm font-medium">
                  {ticket.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {!isPremium && (
          <div className="text-center bg-gradient-to-r from-purple-50 to-indigo-50 border rounded-2xl p-8">
            <h3 className="font-semibold mb-2">
              Unlock Priority Support
            </h3>

            <button
              onClick={() => navigate("/pricing")}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
            >
              Upgrade to Premium
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
