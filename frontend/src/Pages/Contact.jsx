import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Later connect to backend / email service
    alert("Thank you for contacting EnerSense!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="w-full min-h-screen bg-[#0f172a] text-white px-4 sm:px-6 md:px-10 py-12">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* ================= HERO ================= */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-green-400">
            Contact EnerSense
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-3xl mx-auto">
            Have questions, feedback, or ideas?  
            EnerSense values communication and collaboration to build smarter
            energy solutions for the future.
          </p>
        </section>

        {/* ================= INTRO ================= */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-blue-400">
            Get in Touch
          </h2>
          <p className="text-slate-300 leading-relaxed">
            EnerSense is not just a technical project but a step toward
            responsible energy usage and sustainability. Communication plays a
            crucial role in improving systems, identifying real-world problems,
            and enhancing user experience.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Whether you are a student, faculty member, industry professional,
            or end user, we welcome your questions, suggestions, and feedback.
          </p>
        </section>

        {/* ================= WHY CONTACT ================= */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-blue-400">
            Why Contact EnerSense?
          </h2>

          <ul className="list-disc list-inside text-slate-300 space-y-2">
            <li>To understand how EnerSense works</li>
            <li>To provide feedback or improvement ideas</li>
            <li>To discuss technical or academic aspects</li>
            <li>To report issues or unexpected behavior</li>
            <li>To explore future collaboration opportunities</li>
          </ul>
        </section>

        {/* ================= CONTACT INFO ================= */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-blue-400">
            Contact Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#020617] border border-white/10 rounded-xl p-6 space-y-3">
              <h3 className="text-xl font-semibold text-green-400">
                Email Communication
              </h3>
              <p className="text-slate-300">
                Official communication regarding EnerSense can be done via
                email. Queries related to functionality, documentation, or
                project evaluation are encouraged.
              </p>
              <p className="text-slate-400 text-sm">
                Response Time: Within 24–48 hours
              </p>
            </div>

            <div className="bg-[#020617] border border-white/10 rounded-xl p-6 space-y-3">
              <h3 className="text-xl font-semibold text-green-400">
                Academic & Technical Support
              </h3>
              <p className="text-slate-300">
                EnerSense is a final year academic project. Technical discussions
                related to IoT, web development, and energy monitoring are
                welcome.
              </p>
              <p className="text-slate-400 text-sm">
                Suitable for: Students, Mentors, Evaluators
              </p>
            </div>
          </div>
        </section>

        {/* ================= CONTACT FORM ================= */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-blue-400">
            Send Us a Message
          </h2>

          <p className="text-slate-300 leading-relaxed">
            Use the form below to reach out to EnerSense. This form can later be
            connected to an email service or backend API for dynamic handling.
          </p>

          <form
            onSubmit={handleSubmit}
            className="bg-[#020617] border border-white/10 rounded-xl p-6 space-y-4 max-w-xl"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white
              border border-slate-700 focus:outline-none focus:ring-2
              focus:ring-green-500/50"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white
              border border-slate-700 focus:outline-none focus:ring-2
              focus:ring-green-500/50"
            />

            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white
              border border-slate-700 focus:outline-none focus:ring-2
              focus:ring-green-500/50"
            />

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600
              text-white py-3 rounded-lg font-semibold transition"
            >
              Send Message
            </button>
          </form>
        </section>

        {/* ================= PRIVACY ================= */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-blue-400">
            Privacy & Security
          </h2>
          <p className="text-slate-300 leading-relaxed">
            EnerSense respects user privacy. Any information shared through the
            contact form is used strictly for communication purposes and is not
            shared with third parties.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Future versions of EnerSense may include encrypted communication
            and secure data handling mechanisms.
          </p>
        </section>

        {/* ================= CONCLUSION ================= */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-blue-400">
            Let’s Build Smarter Energy Systems
          </h2>
          <p className="text-slate-300 leading-relaxed">
            Your feedback and ideas play a vital role in improving EnerSense.
            Together, we can promote smarter energy usage and sustainable
            development.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Feel free to reach out and be part of the EnerSense journey.
          </p>
        </section>

      </div>
    </div>
  );
};

export default Contact;
