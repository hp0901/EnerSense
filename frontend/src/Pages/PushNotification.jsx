import React, { useState } from "react";
import { sendPushNotificationApi } from "../services/operations/adminapi";
import { toast } from "react-hot-toast";

const PushNotifications = () => {
  const [form, setForm] = useState({
    title: "",
    message: "",
    audience: "all",
    image: null,
    link: "https://enersense.in",
  });

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await sendPushNotificationApi({
      title: form.title,
      message: form.message,
      audience: form.audience,
      link: form.link,
    });
    console.log(res);

    toast("🚀 " + res);
  } catch (error) {
    toast("❌ " + error);
  }
};


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="bg-white shadow-md rounded-xl p-6 mb-8">
          <h1 className="text-3xl font-bold text-indigo-600">
            🔔 Push Notification Center
          </h1>
          <p className="text-gray-600 mt-2">
            Send real-time alerts and updates to your users instantly 🚀
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 mb-8">
          <p className="text-sm text-indigo-700">
            💡 Tip: Use push notifications wisely to keep users engaged without spamming.  
            Target the right audience for better impact 🎯
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-xl p-6 space-y-6"
        >
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">
              📝 Notification Title
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter notification title..."
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium mb-1">
              💬 Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Write your message..."
              rows="4"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
          </div>

          {/* Audience Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">
              🎯 Target Audience
            </label>
            <select
              name="audience"
              value={form.audience}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
            >
              <option value="all"> 🌍 All Users </option>
              <option value="premium">💎 Premium Users</option>
              <option value="non-premium">🆓 Non-Premium Users</option>
              <option value="new">🆕 New Users</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-1">
              🖼️ Attach Image (optional)
            </label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Redirect Link */}
          <div>
            <label className="block text-sm font-medium mb-1">
              🔗 Redirect Link (optional)
            </label>
            <input
              type="text"
              name="link"
              value={form.link}
              onChange={handleChange}
              placeholder="https://example.com"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:scale-[1.02] transition"
          >
            🚀 Send Push Notification
          </button>
        </form>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm mt-8">
          ⚡ Real-time engagement = Better user retention 💡
        </div>

      </div>
    </div>
  );
};

export default PushNotifications;