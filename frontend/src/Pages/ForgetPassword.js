import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ForgetPassword = () => {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    // later you will call API here to send OTP 
    // for now, just navigate to OTP page
    navigate("/otp", {
    state: {
      flow: "forgot",
      email: email,
    },
  });


  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Forgot Password?
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          Enter your registered email and we’ll send you an OTP
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition"
          >
            Send OTP
          </button>
        </form>

      </div>
    </div>
  )
}

export default ForgetPassword
