import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    category: "General",
    question: "What is EnerSense?",
    answer:
      "EnerSense is a smart energy monitoring and control platform that uses IoT devices to track real-time electricity usage, provide insights, estimate bills, and allow remote control of connected appliances.",
  },
  {
    category: "IoT & Real-Time Data",
    question: "How does EnerSense collect real-time data?",
    answer:
      "EnerSense collects real-time electrical data using ESP32-based IoT devices connected to current and voltage sensors. The ESP32 continuously sends live data such as voltage, current, power, and energy usage to the server, which is then displayed instantly on the dashboard.",
  },
  {
    category: "IoT & Real-Time Data",
    question: "What happens if the ESP32 goes offline?",
    answer:
      "If no data is received from the ESP32 for more than 5 minutes, EnerSense automatically marks the device as offline. This may indicate a network issue, power failure, server issue, or hardware malfunction, and the system reflects this status on the dashboard.",
  },
  {
    category: "Devices & Control",
    question: "Can EnerSense control appliances remotely?",
    answer:
      "Yes. EnerSense allows users to remotely turn appliances ON or OFF through the web dashboard. Commands are securely sent from the server to the ESP32, which controls the appliance using relay modules.",
  },
  {
    category: "Billing",
    question: "How is my expected electricity bill calculated?",
    answer:
      "The expected bill is calculated using energy units (kWh) consumed and unit rates. EnerSense follows standard billing formulas used by respective electricity boards, including peak-hour and non-peak-hour rates if configured by the user.",
  },
  {
    category: "Billing",
    question: "Can I set different rates for peak and non-peak hours?",
    answer:
      "Yes. EnerSense allows users to manually configure peak-hour and non-peak-hour unit rates. The system then dynamically estimates the bill based on energy usage during those periods.",
  },
  {
    category: "Electricity Board",
    question: "Is EnerSense connected to my electricity board?",
    answer:
      "No. EnerSense is not directly connected to any government or state electricity board. It independently monitors energy usage and displays insights but does not access or modify official billing data.",
  },
  {
    category: "Electricity Board",
    question: "Does EnerSense replace the official electricity meter?",
    answer:
      "No. EnerSense does not replace the official electricity meter installed by the electricity board. It acts as an additional smart monitoring and control system for user awareness and optimization.",
  },
  {
    category: "Security & Privacy",
    question: "How secure is my energy data?",
    answer:
      "EnerSense uses secure authentication mechanisms and role-based access control. User data is isolated per account, and only authorized users can view or control their devices.",
  },
  {
    category: "Security & Privacy",
    question: "Is EnerSense approved by the government?",
    answer:
      "No. EnerSense is an independent project and is not government-approved or affiliated with any electricity board. It is designed for educational, monitoring, and optimization purposes only.",
  },
];

const EnerSenseFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black p-6 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">❓ EnerSense FAQs</h1>
        <p className="text-gray-400 mb-8">
          Frequently asked questions about EnerSense smart energy monitoring
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-slate-900 rounded-xl border border-slate-700"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center p-4 text-left"
              >
                <div>
                  <p className="text-sm text-blue-400 mb-1">
                    {faq.category}
                  </p>
                  <h3 className="font-medium">{faq.question}</h3>
                </div>
                <ChevronDown
                  className={`transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-4 pb-4 text-gray-300 text-sm leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnerSenseFAQ;
