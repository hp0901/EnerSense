import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useUser } from "../context/UserContext.js";
import {
  capturePremiumPayment,
  verifyPremiumPayment,
} from "../services/operations/premium.js";
import { loadRazorpay } from "../utils/loadRazorpay.js";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { fetchUser } = useUser();

  const plans = [
    {
      id: "1-month",
      title: "1 Month",
      duration: "Monthly",
      original: 99,
      final: 99,
      discountLabel: "0% OFF",
      popular: false,
    },
    {
      id: "6-month",
      title: "6 Months",
      duration: "Best Value",
      original: 99 * 6,
      final: Math.round(99 * 6 * 0.9),
      discountLabel: "10% OFF",
      popular: true,
    },
    {
      id: "1-year",
      title: "1 Year",
      duration: "Yearly",
      original: 99 * 12,
      final: Math.round(99 * 12 * 0.85),
      discountLabel: "15% OFF",
      popular: false,
    },
  ];

  const handleContinue = async (planId) => {
    try {
      // 1️⃣ Load Razorpay SDK
      const loaded = await loadRazorpay();
      if (!loaded) {
        toast.error("Razorpay SDK failed to load");
        return;
      }

      // 2️⃣ Create order from backend
      const orderRes = await capturePremiumPayment({ plan: planId });
      const order = orderRes.data;

      // 3️⃣ Razorpay options
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "EnerSense Premium",
        description: "Premium Subscription",
        theme: { color: "#4f46e5" },

        handler: async function (response) {
          try {
            const {
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature,
            } = response;

            // 4️⃣ Verify payment
            await verifyPremiumPayment({
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature,
              plan: planId,
            });

            toast.success("Payment successful 🎉");

            // 5️⃣ Refresh user (navbar / plan badge)
            await fetchUser();

            // 6️⃣ Redirect
            navigate("/premium-benefits");
          } catch (error) {
            console.error(error);
            toast.error("Payment verification failed");
          }
        },
      };

      // 4️⃣ Open Razorpay modal
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Payment initiation failed"
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 bg-gradient-to-br from-indigo-50 via-white to-emerald-50 rounded-3xl border border-indigo-100">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-2">
          Choose Your Premium Plan 💎
        </h1>
        <p className="text-gray-600">
          Unlock advanced energy insights, alerts, and reports
        </p>
      </div>

      {/* Plans */}
      <div className="space-y-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-2xl border p-6 shadow-sm transition ${
              plan.popular
                ? "bg-indigo-50 border-indigo-600 border-l-4"
                : "bg-gray-100 border-gray-300"
            }`}
          >
            {/* Labels */}
            <div className="flex items-center gap-2 mb-3">
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  plan.popular
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                {plan.discountLabel}
              </span>

              {plan.popular && (
                <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">
                  Most Popular
                </span>
              )}
            </div>

            {/* Title + Price */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl font-semibold">{plan.title}</h2>
                <p className="text-sm text-gray-600">{plan.duration}</p>
              </div>

              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">
                  ₹{plan.final}
                </p>
                <p className="text-sm text-gray-700 line-through">
                  ₹{plan.original}
                </p>
              </div>
            </div>

            {/* Features */}
            <ul className="text-sm text-gray-700 space-y-1 mb-4">
              <li>✔ Unlimited alerts</li>
              <li>✔ Fault detection</li>
              <li>✔ CO₂ & Green score</li>
              <li>✔ Bill prediction</li>
              <li>✔ Monthly reports</li>
            </ul>

            {/* CTA */}
            <button
              onClick={() => handleContinue(plan.id)}
              className={`w-full py-3 rounded-lg font-medium transition ${
                plan.popular
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "bg-gray-800 text-white hover:bg-gray-900"
              }`}
            >
              Pay & Continue
            </button>
          </div>
        ))}
      </div>

      {/* Back */}
      <div className="text-center mt-10">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-white bg-indigo-600 px-3 py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          ← Back to Pricing
        </button>
      </div>
    </div>
  );
}
