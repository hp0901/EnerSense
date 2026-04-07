import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const getAIReply = async (message) => {
  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant", // ✅ FREE MODEL
      messages: [
        { role: "user", content: message }
      ],
    });

    return response.choices[0].message.content;
  } catch (err) {
    console.error(err);
    return null;
  }
};