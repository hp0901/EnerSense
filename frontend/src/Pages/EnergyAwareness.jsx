import React from "react";

const sections = [
  {
    title: "Introduction to Electricity & EnerSense",
    content: [
      "Electricity is the backbone of modern civilization. It powers homes, industries, hospitals, communication systems, and digital infrastructure.",
      "Despite its importance, electricity is often wasted due to lack of awareness, inefficient appliances, and improper usage habits.",
      "EnerSense is a Smart Energy Monitoring System designed to provide real-time insights into energy consumption, helping users make data-driven decisions to reduce wastage and cost.",
    ],
  },
  {
    title: "Why Energy Awareness Matters",
    content: [
      "Electricity generation relies heavily on natural resources such as coal, gas, and water.",
      "Unnecessary consumption increases electricity bills and contributes to environmental pollution.",
      "Awareness enables users to identify inefficient usage patterns and adopt sustainable practices.",
    ],
  },
  {
    title: "Common Household Electrical Equipment – DOs & DON’Ts",
    content: [],
    list: [
      {
        name: "Lighting Systems (LEDs, Tube Lights)",
        do: [
          "Use LED bulbs instead of incandescent bulbs",
          "Turn off lights when not in use",
          "Use natural daylight whenever possible",
        ],
        dont: [
          "Leave lights ON unnecessarily",
          "Use outdated high-wattage bulbs",
          "Ignore flickering or faulty lights",
        ],
      },
      {
        name: "Air Conditioners & Cooling Systems",
        do: [
          "Set AC temperature between 24–26°C",
          "Clean filters regularly",
          "Use fans along with AC",
        ],
        dont: [
          "Run AC with doors or windows open",
          "Set extremely low temperatures",
          "Skip periodic servicing",
        ],
      },
      {
        name: "Refrigerators",
        do: [
          "Maintain optimal temperature",
          "Allow ventilation space",
          "Defrost regularly if required",
        ],
        dont: [
          "Overload the refrigerator",
          "Keep door open for long durations",
          "Place hot food directly inside",
        ],
      },
    ],
  },
  {
    title: "Industrial Electrical Equipment – Best Practices",
    content: [],
    list: [
      {
        name: "Motors & Pumps",
        do: [
          "Use energy-efficient motors",
          "Perform regular maintenance",
          "Monitor load and performance",
        ],
        dont: [
          "Run motors idle",
          "Ignore unusual noise or vibration",
          "Operate beyond rated capacity",
        ],
      },
      {
        name: "Machinery & Control Panels",
        do: [
          "Install energy monitoring systems like EnerSense",
          "Automate operations where possible",
          "Maintain proper power factor",
        ],
        dont: [
          "Operate outdated machinery",
          "Ignore power quality issues",
          "Delay fault detection",
        ],
      },
    ],
  },
  {
    title: "How to Save Electricity – Practical Guide",
    content: [
      "Energy conservation is not about reducing comfort but about using electricity intelligently.",
    ],
    list: [
      {
        name: "At Home",
        do: [
          "Replace old appliances with energy-efficient models",
          "Unplug chargers when not in use",
          "Use smart plugs and power strips",
          "Optimize cooling and heating usage",
        ],
        dont: [
          "Leave devices on standby mode",
          "Overuse high-power appliances",
        ],
      },
      {
        name: "In Industry",
        do: [
          "Monitor energy consumption in real time",
          "Identify peak demand hours",
          "Optimize shift-wise usage",
          "Use predictive analytics",
        ],
        dont: [
          "Ignore abnormal consumption patterns",
          "Operate without monitoring systems",
        ],
      },
    ],
  },
  {
    title: "Role of EnerSense in Energy Optimization",
    content: [
      "EnerSense provides real-time monitoring, analytics, and alerts to identify energy wastage.",
      "Users can track appliance-wise consumption and take corrective actions.",
      "Data-driven insights help reduce electricity bills and carbon footprint.",
      "EnerSense enables smart, sustainable, and cost-effective energy management.",
    ],
  },
];

const EnergyAwareness = () => {
  return (
    <div className="w-full min-h-screen bg-[#0f172a] text-white px-4 sm:px-6 md:px-10 py-10">
      <div className="max-w-6xl mx-auto space-y-14">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-400 text-center">
          EnerSense Knowledge Center
        </h1>

        {sections.map((section, index) => (
          <div key={index} className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-semibold text-blue-400">
              {section.title}
            </h2>

            {section.content &&
              section.content.map((para, i) => (
                <p key={i} className="text-slate-300 leading-relaxed">
                  {para}
                </p>
              ))}

            {section.list &&
              section.list.map((item, i) => (
                <div
                  key={i}
                  className="bg-[#020617] border border-white/10 rounded-xl p-6 space-y-4"
                >
                  <h3 className="text-xl font-semibold text-green-400">
                    {item.name}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-green-300 font-medium mb-2">DO</h4>
                      <ul className="list-disc list-inside text-slate-300 space-y-1">
                        {item.do.map((d, idx) => (
                          <li key={idx}>{d}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-red-300 font-medium mb-2">DON’T</h4>
                      <ul className="list-disc list-inside text-slate-300 space-y-1">
                        {item.dont.map((d, idx) => (
                          <li key={idx}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnergyAwareness;
