import { useState } from "react";
import {
  BookOpen,
  FileCode,
  Terminal,
  HelpCircle,
  LifeBuoy,
  Layers,
  ChevronRight,
} from "lucide-react";

const sections = [
  {
    id: "resources",
    title: "Resources",
    icon: Layers,
    content: (
      <>
        The EnerSense Resources section provides access to all learning,
        integration, and support materials in one place, helping users and
        developers understand and use the platform effectively.
      </>
    ),
  },
  {
    id: "docs",
    title: "Documentation",
    icon: BookOpen,
    content: (
      <>
        EnerSense documentation explains system architecture, IoT data flow,
        ESP32 integration, dashboard features, and deployment guidelines for
        both users and developers.
      </>
    ),
  },
  {
    id: "api",
    title: "API Reference",
    icon: Terminal,
    content: (
      <>
        The API Reference describes backend endpoints, authentication flow,
        device management APIs, and real-time data handling. These APIs enable
        seamless integration between ESP32 devices, the server, and the web
        dashboard.
      </>
    ),
  },
  {
    id: "guide",
    title: "User Guide",
    icon: FileCode,
    content: (
      <>
        The User Guide provides step-by-step instructions on adding devices,
        monitoring energy usage, controlling appliances, configuring peak and
        non-peak unit rates, and understanding billing estimates.
      </>
    ),
  },
  {
    id: "faqs",
    title: "FAQs",
    icon: HelpCircle,
    content: (
      <>
        The FAQ section answers common questions related to real-time energy
        monitoring, ESP32 connectivity, billing estimation, security, and
        system limitations.
      </>
    ),
  },
  {
    id: "support",
    title: "Support Center",
    icon: LifeBuoy,
    content: (
      <>
        The EnerSense Support Center assists users with technical issues,
        device connectivity problems, feature guidance, and general platform
        queries through the official application interface.
      </>
    ),
  },
];

const ResourcesCenter = () => {
  const [active, setActive] = useState("resources");
  const activeSection = sections.find((s) => s.id === active);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          📚 Resources Center
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
          © 2026 EnerSense • Learn • Build • Support
        </p>
      </div>
    </div>
  );
};

export default ResourcesCenter;
