import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Detect language (simple)
const detectLang = (text) => {
  if (/kem cho|shu|tame/.test(text.toLowerCase())) return "gu"; // Gujarati
  if (/kya|kaise|hai|mera/.test(text.toLowerCase())) return "hi"; // Hindi
  return "en";
};

// Translate to English
export const translateToEnglish = async (text) => {
  try {
    const lang = detectLang(text);
    if (lang === "en") return text;

    const res = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Translate to English" },
        { role: "user", content: text },
      ],
    });

    return res.choices[0].message.content;
  } catch (err) {
    console.error("Translate Error:", err.message);
    return text;
  }
};

// Translate back
export const translateBack = async (text, lang) => {
  if (lang === "en") return text;

  try {
    const res = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: `Translate to ${lang}` },
        { role: "user", content: text },
      ],
    });

    return res.choices[0].message.content;
  } catch {
    return text;
  }
};