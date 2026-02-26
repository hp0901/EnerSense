import React from "react";

const SendBulkEmail = () => {
  return (
    <>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 px-6 py-10">
        <div className="max-w-5xl mx-auto">

          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Bulk Email Manager
              </h1>
              <p className="text-gray-500 mt-1">
                Send announcements and updates to EnerSense users.
              </p>
            </div>

            <span className="px-4 py-1 text-sm bg-yellow-100 text-yellow-700 rounded-full font-medium">
              Feature Coming Soon
            </span>
          </div>

          {/* Main Card */}
          <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">

            {/* Form Section */}
            <div className="space-y-6">

              {/* Subject Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Subject
                </label>
                <input
                  type="text"
                  placeholder="Enter subject line..."
                  disabled
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-100 text-gray-500 cursor-not-allowed"
                />
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Content
                </label>
                <textarea
                  rows="6"
                  placeholder="Write your message here..."
                  disabled
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-100 text-gray-500 resize-none cursor-not-allowed"
                ></textarea>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm text-blue-700">
                  📢 This message will be delivered to <strong>all registered users</strong>.
                  Future updates will include filtering options such as Premium Users,
                  State-based targeting, and Scheduled Email Delivery.
                </p>
              </div>

              {/* Action Button */}
              <div className="flex justify-end">
                <button
                  disabled
                  className="px-6 py-3 bg-gray-400 text-white rounded-lg cursor-not-allowed"
                >
                  Send Email
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default SendBulkEmail;