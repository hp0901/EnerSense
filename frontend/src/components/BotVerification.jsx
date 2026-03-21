import React, { useState } from "react";

const BotVerification = ({ onVerified }) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="bg-white p-6 rounded-md shadow-md text-black w-[350px]">
      <p className="mb-3">Verifying you are not a bot...</p>

      <div
        className="cf-turnstile"
        data-sitekey="YOUR_SITE_KEY"
        data-callback={(token) => {
          setLoading(true);
          onVerified(token);
        }}
      />

      {loading && <p className="mt-2 text-sm text-gray-500">Verifying...</p>}
    </div>
  );
};

export default BotVerification;