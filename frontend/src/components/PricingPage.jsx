import FeatureComparison from "./FeatureComparison";
import { useNavigate } from "react-router-dom";

export default function PricingPage() {
  const navigate = useNavigate();

  // TEMP (replace with backend/user context)
  const isPremium = false;

  const handleUpgrade = () => {
    navigate("/checkout");
  };

  return (
    <div
      className="
        max-w-7xl mx-auto
        px-4 sm:px-6 lg:px-8
        py-10 sm:py-14 lg:py-16
        bg-gradient-to-br from-indigo-50 via-white to-emerald-50
        rounded-2xl sm:rounded-3xl
        shadow-sm border border-indigo-100
      "
    >
      {/* Heading */}
      <div className="text-center mb-8 sm:mb-10 lg:mb-12">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          EnerSense Plans
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-xl mx-auto">
          Choose the plan that fits your energy monitoring needs
        </p>
      </div>

      {/* Feature Comparison */}
      <div className="overflow-x-auto">
        <FeatureComparison />
      </div>

      <hr className="my-8 sm:my-10 lg:my-12 border-gray-200" />

      {/* CTA Section */}
      {!isPremium ? (
        <div className="text-center px-2 sm:px-0">
          <h3 className="text-lg sm:text-xl font-semibold mb-2">
            Unlock Advanced Energy Insights 🚀
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-5 max-w-md mx-auto">
            Get unlimited alerts, detailed reports, and smarter predictions.
          </p>

          <button
            onClick={handleUpgrade}
            className="
              w-full sm:w-auto
              bg-indigo-600 text-white
              px-6 sm:px-8 py-3
              rounded-lg
              hover:bg-indigo-700
              transition
              text-sm sm:text-base
              font-medium
            "
          >
            Upgrade to Premium
          </button>
        </div>
      ) : (
        <div className="text-center text-green-600 font-medium text-sm sm:text-base">
          🎉 You’re on the Premium plan — enjoy unlimited features!
        </div>
      )}
    </div>
  );
}
