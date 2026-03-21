import { useEffect, useState } from "react";
import { downloadInvoice , getMyPayments } from "../services/operations/payments";
import { Link } from "react-router-dom";

export default function MyPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDownload = async (paymentId) => {
  try {
    const res = await downloadInvoice(paymentId);

    const url = window.URL.createObjectURL(
      new Blob([res.data], { type: "application/pdf" })
    );

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "EnerSense-Invoice.pdf");

    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Invoice download failed", error);
  }
};


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
      <div className="flex justify-center items-center h-auto text-gray-500">
        Loading payment history...
      </div>
    );
  }

  // 🟡 Empty state
  if (payments.length === 0) {
    return (
  <div className="min-h-screen flex flex-col items-center justify-center text-center space-y-3">
    <div className="text-5xl">💳</div>

    <h2 className="text-2xl font-semibold">
      No payments yet
    </h2>

    <p className="text-gray-600">
      Upgrade to premium to unlock advanced energy analytics.
    </p>

    <Link
      to="/pricing"
      className="mt-3 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
    >
      View Plans
    </Link>
  </div>
);
  }

  return (
    <div className="max-w-5xl min-h-screen mx-auto px-6 py-16">
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
                  {new Date(p.paidAt || p.createdAt).toDateString("en-GB")}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => handleDownload(p._id)}
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
