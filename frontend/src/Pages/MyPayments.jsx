import { useEffect, useState } from "react";
import { getMyPayments } from "../services/operations/payments";

export default function MyPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await getMyPayments();
        setPayments(res.data || []);
      } catch (error) {
        console.error("Failed to load payments", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-500">
        Loading payment history...
      </div>
    );
  }

  // 🟡 Empty state
  if (payments.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold mb-2">
          No payments found
        </h2>
        <p className="text-gray-600 mb-6">
          You haven’t made any premium payments yet.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-6">My Payments 💳</h1>

      <div className="overflow-x-auto bg-white border rounded-xl shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">Plan</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Payment ID</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-center">Invoice</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((p) => (
              <tr key={p._id} className="border-t">
                <td className="px-4 py-3">
                  {p.plan.replace("-", " ").toUpperCase()}
                </td>
                <td className="px-4 py-3">₹{p.amount}</td>
                <td className="px-4 py-3 text-xs text-gray-600">
                  {p.razorpayPaymentId}
                </td>
                <td className="px-4 py-3">
                  {new Date(p.paidAt || p.createdAt).toDateString()}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() =>
                        window.open(
                        `${process.env.REACT_APP_BASE_URL}/invoice/${p._id}`,
                        "_blank"
                        )
                    }
                    className="text-indigo-600 font-medium hover:underline"
                    >
                    Download
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
