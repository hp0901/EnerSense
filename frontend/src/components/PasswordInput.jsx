import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";

/* ===============================
   PASSWORD HELPERS
================================ */
const getPasswordStrength = (password) => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return "weak";
  if (score <= 4) return "moderate";
  return "strong";
};

const passwordRules = (password) => ({
  uppercase: /[A-Z]/.test(password),
  lowercase: /[a-z]/.test(password),
  number: /[0-9]/.test(password),
  special: /[^A-Za-z0-9]/.test(password),
});

const RuleItem = ({ ok, text }) => (
  <li
    className={`flex items-center gap-2 transition ${
      ok ? "text-green-400" : "text-slate-400"
    }`}
  >
    <span className="font-bold">{ok ? "✔" : "✖"}</span>
    {text}
  </li>
);

const PasswordInput = ({ value, onChange }) => {
  const [show, setShow] = useState(false);
  const strength = getPasswordStrength(value);
  const rules = passwordRules(value);

  return (
    <div>
      <label className="text-sm font-semibold text-slate-300 mb-1 block">
        Password
      </label>

      {/* INPUT */}
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter password"
          className="input pr-10"
          required
        />
        <span
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
        >
          {/* Added text-slate-400 to change the icon color */}
          {show ? <FiEyeOff className="text-slate-400" /> : <FiEye className="text-slate-400" />}
        </span>
      </div>

      {/* STRENGTH BAR */}
      {value && (
        <div className="mt-2">
          <div className="h-2 w-full bg-slate-600 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all ${
                strength === "weak"
                  ? "w-1/3 bg-red-500"
                  : strength === "moderate"
                  ? "w-2/3 bg-yellow-400"
                  : "w-full bg-green-500"
              }`}
            />
          </div>

          <p
            className={`mt-1 text-xs font-semibold ${
              strength === "weak"
                ? "text-red-400"
                : strength === "moderate"
                ? "text-yellow-400"
                : "text-green-400"
            }`}
          >
            {strength === "weak" && "Weak password"}
            {strength === "moderate" && "Moderate password"}
            {strength === "strong" && "Strong password"}
          </p>
        </div>
      )}

      {/* RULES (❌ → ✔ LIVE UPDATE) */}
      <ul className="mt-3 text-xs space-y-1">
        <RuleItem ok={rules.uppercase} text="One uppercase letter (A–Z)" />
        <RuleItem ok={rules.lowercase} text="One lowercase letter (a–z)" />
        <RuleItem ok={rules.number} text="One number (0–9)" />
        <RuleItem ok={rules.special} text="One special character (!@#$%^&*)" />
      </ul>
    </div>
  );
};

export default PasswordInput;
