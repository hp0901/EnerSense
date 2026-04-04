import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ExpectedBillsCard = ({ link = "/billing-history" }) => {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const now = new Date();
    const data = [];

    for (let i = 0; i < 3; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() + i, 1);

      const base = 1800 + i * 300;

      data.push({
        month: d.toLocaleString("default", {
          month: "long",
          year: "numeric",
        }),
        amount: base.toFixed(2),
      });
    }

    setBills(data);
  }, []);

  return (
    <div className="rounded-2xl  border-slate-700 shadow-lg">

      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold text-white">
          Expected Bills
        </h2>

        <Link
          to={link}
          className="text-sm text-blue-400 bg-blue-500/10 px-4 py-2 rounded-xl hover:bg-blue-500/20"
        >
          View Full History
        </Link>
      </div>

      {/* List */}
      <div className="flex flex-col gap-3">
        {bills.map((bill, index) => (
          <div
            key={index}
            className="bg-[#1b2a44] px-4 py-3 rounded-xl flex justify-between items-center border border-slate-700"
          >
            <span className="text-gray-300">{bill.month}</span>
            <span className="text-green-400 font-semibold">
              ₹ {bill.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpectedBillsCard;