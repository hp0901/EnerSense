import { useState } from "react";
import {
  Building2,
  Info,
  Cpu,
  Briefcase,
  Mail,
  ChevronRight,
} from "lucide-react";

const sections = [
  {
    id: "company",
    title: "Company",
    icon: Building2,
    content: (
      <>
        EnerSense is a technology-driven platform focused on smart energy
        monitoring, optimization, and automation. The project is designed
        to bridge the gap between traditional electricity usage and modern
        IoT-based insights.
      </>
    ),
  },
  {
    id: "about",
    title: "About EnerSense",
    icon: Info,
    content: (
      <>
        EnerSense combines IoT hardware, cloud services, and a modern web
        dashboard to provide real-time electricity monitoring, usage
        analytics, and intelligent control of connected devices.
      </>
    ),
  },
  {
    id: "how",
    title: "How It Works",
    icon: Cpu,
    content: (
      <>
        EnerSense uses ESP32-based IoT devices connected to electrical
        sensors. These devices measure voltage and current, calculate power
        and energy consumption, and securely transmit data to the server,
        where it is visualized on the dashboard.
      </>
    ),
  },
  {
    id: "careers",
    title: "Careers",
    icon: Briefcase,
    content: (
      <>
        EnerSense encourages innovation and learning. While currently an
        academic and experimental project, future opportunities may include
        roles in IoT development, full-stack engineering, and data analytics.
      </>
    ),
  },
  {
    id: "contact",
    title: "Contact Us",
    icon: Mail,
    content: (
      <>
        For inquiries, feedback, or support, users can reach the EnerSense
        team through the official application contact form or registered
        communication channels.
      </>
    ),
  },
];

const CompanyCenter = () => {
  const [active, setActive] = useState("company");
  const activeSection = sections.find((s) => s.id === active);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          🏢 Company
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1 space-y-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActive(section.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all
                  ${
                    active === section.id
                      ? "bg-blue-600 shadow-lg"
                      : "bg-slate-900 hover:bg-slate-800"
                  }`}
                >
                  <Icon
                    className={`transition-transform duration-300
                    ${
                      active === section.id
                        ? "scale-110 text-white"
                        : "text-gray-400"
                    }`}
                  />
                  <span className="flex-1 text-left">
                    {section.title}
                  </span>
                  <ChevronRight
                    className={`transition-transform ${
                      active === section.id ? "rotate-90" : ""
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div className="md:col-span-3 bg-slate-900 rounded-2xl p-6 border border-slate-700 animate-fadeIn">
            <h2 className="text-2xl font-semibold mb-4">
              {activeSection.title}
            </h2>
            <p className="text-gray-300 leading-relaxed">
              {activeSection.content}
            </p>
          </div>
        </div>

        <p className="text-gray-500 text-sm mt-10 text-center">
          © 2026 EnerSense • Innovate • Monitor • Optimize
        </p>
      </div>
    </div>
  );
};

export default CompanyCenter;
