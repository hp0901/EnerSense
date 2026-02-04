import { CheckCircle, XCircle, Info } from "lucide-react";

const features = [
  {
    name: "CO₂ & Green Score",
    free: "Basic",
    premium: "Advanced",
  },
  {
    name: "Smart Alerts",
    free: "Limited",
    premium: "Unlimited",
  },
  {
    name: "Fault Detection",
    free: "Limited",
    premium: "Advanced",
    hint: "Free includes only critical safety faults with alert limits.",
  },
  {
    name: "Bill Prediction",
    free: false,
    premium: true,
  },
  {
    name: "History",
    free: "7 days",
    premium: "6–12 months",
  },
  {
    name: "Export",
    free: false,
    premium: "CSV / Excel / PDF",
  },
  {
    name: "Monthly Reports",
    free: false,
    premium: "Auto",
  },
  {
    name: "Support",
    free: "Standard",
    premium: "24×7 Priority",
  },
  {
    name: "Early Access",
    free: false,
    premium: true,
  },
];

export default function FeatureComparison() {
  return (
    <div className="overflow-x-auto mt-10">
      <table className="w-full border border-gray-200 rounded-3xl">
        <thead className="bg-gray-300">
          <tr>
            <th className="p-4 text-left">Feature</th>
            <th className="p-4 text-center">Free</th>
            <th className="p-4 text-center">Premium</th>
          </tr>
        </thead>

        <tbody>
          {features.map((f, i) => (
            <tr key={i} className="border-t">
              <td className="p-4 font-medium flex items-center gap-2">
                {f.name}
                {f.hint && (
                  <span className="text-gray-400 cursor-pointer" title={f.hint}>
                    <Info size={14} />
                  </span>
                )}
              </td>

              {/* FREE */}
              <td className="p-4 text-center">
                {typeof f.free === "boolean" ? (
                  f.free ? (
                    <CheckCircle className="text-green-500 mx-auto" />
                  ) : (
                    <XCircle className="text-red-500 mx-auto" />
                  )
                ) : (
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium
                    ${f.free === "Limited"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-700"}`}
                  >
                    {f.free}
                  </span>
                )}
              </td>

              {/* PREMIUM */}
              <td className="p-4 text-center">
                {typeof f.premium === "boolean" ? (
                  <CheckCircle className="text-green-500 mx-auto" />
                ) : (
                <span className="
                  inline-flex items-center justify-center
                  px-3 py-1
                  rounded-full
                  text-sm font-medium
                  bg-blue-100 text-blue-700
                  text-center
                  whitespace-normal
                  max-w-[140px]
                ">
                  {f.premium}
                </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
