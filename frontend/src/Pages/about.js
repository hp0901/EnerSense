import React from "react";

const About = () => {
  return (
    <div className="w-full min-h-screen bg-[#0f172a] text-white px-4 sm:px-6 md:px-10 py-12">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* ================= HERO ================= */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-green-400">
            About EnerSense
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-3xl mx-auto">
            EnerSense is a Smart Energy Monitoring System designed to transform
            how electricity is monitored, analyzed, and optimized in homes and
            industries using real-time data and intelligent insights.
          </p>
        </section>

        {/* ================= INTRO ================= */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-blue-400">
            Introduction
          </h2>
          <p className="text-slate-300 leading-relaxed">
            Electricity is one of the most critical resources in modern society.
            From residential homes to large-scale industries, every system
            depends on continuous and reliable power. However, inefficient
            consumption, lack of monitoring, and poor awareness often lead to
            excessive energy wastage, higher costs, and environmental damage.
          </p>
          <p className="text-slate-300 leading-relaxed">
            EnerSense was developed as a final year engineering project with the
            goal of addressing these challenges by providing a smart, scalable,
            and user-friendly energy monitoring solution.
          </p>
        </section>

        {/* ================= PROBLEM ================= */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-blue-400">
            Problem Statement
          </h2>
          <p className="text-slate-300 leading-relaxed">
            Traditional electricity systems provide only monthly billing data,
            which makes it difficult for users to understand when, where, and
            how energy is being consumed. This lack of visibility results in:
          </p>

          <ul className="list-disc list-inside text-slate-300 space-y-2">
            <li>Unnecessary power wastage</li>
            <li>Unexpectedly high electricity bills</li>
            <li>Delayed fault detection</li>
            <li>No real-time feedback for optimization</li>
          </ul>

          <p className="text-slate-300 leading-relaxed">
            There is a strong need for a system that continuously monitors
            energy usage and provides actionable insights to users.
          </p>
        </section>

        {/* ================= SOLUTION ================= */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-blue-400">
            Our Solution – EnerSense
          </h2>
          <p className="text-slate-300 leading-relaxed">
            EnerSense addresses these challenges by integrating IoT sensors,
            cloud technology, and a web-based dashboard to provide real-time
            energy monitoring and analytics.
          </p>

          <p className="text-slate-300 leading-relaxed">
            The system captures live electrical parameters such as voltage,
            current, power, and energy consumption, processes the data, and
            presents it in an intuitive dashboard for users.
          </p>
        </section>

        {/* ================= FEATURES ================= */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-blue-400">
            Key Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Real-time energy monitoring",
              "Appliance-wise energy insights",
              "Smart alerts for abnormal usage",
              "Historical data visualization",
              "Secure authentication system",
              "Cloud-based data storage",
              "User-friendly dashboard",
              "Scalable for home and industry",
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-[#020617] border border-white/10 rounded-xl p-5 text-slate-300"
              >
                {feature}
              </div>
            ))}
          </div>
        </section>

        {/* ================= TECHNOLOGY ================= */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-blue-400">
            Technology Stack
          </h2>

          <ul className="list-disc list-inside text-slate-300 space-y-2">
            <li>IoT Sensors & ESP32 for data acquisition</li>
            <li>Node.js & Express for backend services</li>
            <li>MongoDB for database management</li>
            <li>React.js for frontend dashboard</li>
            <li>JWT-based secure authentication</li>
            <li>Cloud deployment for scalability</li>
          </ul>
        </section>

        {/* ================= USE CASES ================= */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-blue-400">
            Use Cases
          </h2>

          <p className="text-slate-300 leading-relaxed">
            EnerSense can be used in multiple environments, including:
          </p>

          <ul className="list-disc list-inside text-slate-300 space-y-2">
            <li>Residential homes for reducing electricity bills</li>
            <li>Commercial buildings for energy optimization</li>
            <li>Industrial plants for load monitoring</li>
            <li>Educational institutions for awareness</li>
          </ul>
        </section>

        {/* ================= FUTURE ================= */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-blue-400">
            Future Scope
          </h2>

          <p className="text-slate-300 leading-relaxed">
            EnerSense is designed to be extensible. Future enhancements may
            include:
          </p>

          <ul className="list-disc list-inside text-slate-300 space-y-2">
            <li>AI-based energy consumption prediction</li>
            <li>Mobile application integration</li>
            <li>Smart billing automation</li>
            <li>Renewable energy tracking</li>
            <li>Carbon footprint analysis</li>
          </ul>
        </section>

        {/* ================= CONCLUSION ================= */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-blue-400">
            Conclusion
          </h2>
          <p className="text-slate-300 leading-relaxed">
            EnerSense demonstrates how modern technologies like IoT, cloud
            computing, and web development can be combined to solve real-world
            energy challenges. The project promotes sustainability, cost
            efficiency, and intelligent decision-making.
          </p>
          <p className="text-slate-300 leading-relaxed">
            By empowering users with real-time insights, EnerSense encourages
            responsible electricity usage and contributes to a smarter and
            greener future.
          </p>
        </section>

      </div>
    </div>
  );
};

export default About;
