import { useState } from "react";
import {
  ShieldCheck,
  FileText,
  Lock,
  Scale,
  ChevronRight,
} from "lucide-react";

const sections = [
  {
    id: "legal",
    title: "Legal",
    icon: Scale,
    content: (
      <>
        EnerSense is an independent smart energy monitoring platform designed
        for educational and optimization purposes. It does not replace official
        electricity meters and is not affiliated with any government or utility
        provider.
      </>
    ),
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    icon: Lock,
    content: (
      <>
        EnerSense respects user privacy. Only essential data such as energy
        usage, device status, and account identifiers are stored. No personal
        data is shared with third parties or electricity boards.
      </>
    ),
  },
  {
    id: "terms",
    title: "Terms of Service",
    icon: FileText,
    content: (
      <>
        By using EnerSense, users agree to use the platform responsibly.
        Estimated billing, energy insights, and automation features are
        provided as guidance and may differ from official electricity bills.
      </>
    ),
  },
  {
    id: "security",
    title: "Security",
    icon: ShieldCheck,
    content: (
      <>
        EnerSense implements secure authentication, device isolation, and
        controlled access to ensure user data safety. However, no system can
        guarantee absolute security.
      </>
    ),
  },
  {
    id: "compliance",
    title: "Compliance",
    icon: Scale,
    content: (
      <>
        EnerSense follows general best practices for data protection and IoT
        security. It complies with standard software development and privacy
        guidelines but is not certified by any regulatory authority.
      </>
    ),
  },
];

const LegalCenter = () => {
  const [active, setActive] = useState("legal");
  const activeSection = sections.find((s) => s.id === active);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          ⚖️ Legal & Trust Center
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
          © 2026 EnerSense • Transparency • Security • Trust
        </p>
      </div>
    </div>
  );
};

export default LegalCenter;
