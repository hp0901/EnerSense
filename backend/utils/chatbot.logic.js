// utils/chatbot.logic.js

export const normalizeText = (text = "") =>
  text.toLowerCase().replace(/[^\w\s]/gi, "");

export const getChatbotReply = (message) => {
  const userMessage = normalizeText(message);

  // Default reply
  let reply =
    "I'm not completely sure about that 🤔. You can ask me about energy usage, reports, alerts, or your account.";

  // Greetings
  if (
    userMessage.includes("hello") ||
    userMessage.includes("hi") ||
    userMessage.includes("hey")
  ) {
    reply = "Hi 👋 Welcome to EnerSense! How can I assist you today?";
  }

  // About EnerSense
  else if (
    userMessage.includes("what is enersense") ||
    userMessage.includes("about enersense")
  ) {
    reply =
      "EnerSense ⚡ is a smart energy monitoring system that helps you track, analyze, and optimize your electricity usage in real time.";
  }

  //Name of the chatbot
   else if ( 
    userMessage.includes("what is your name") ||
    userMessage.includes("your name")
  ) {
    reply =
      "I am EnerBot 🤖, your virtual assistant for EnerSense. How can I help you today?";
  }

  // Energy usage
  else if (
    userMessage.includes("energy") ||
    userMessage.includes("consumption") ||
    userMessage.includes("usage")
  ) {
    reply =
      "You can view your real-time and historical energy consumption on the dashboard 📊. Would you like tips to reduce your energy usage?";
  }

  // Reports
  else if (
    userMessage.includes("report") ||
    userMessage.includes("history") ||
    userMessage.includes("analytics")
  ) {
    reply =
      "EnerSense provides daily, weekly, and monthly energy reports 📈 to help you understand your usage patterns.";
  }

  // Alerts
  else if (
    userMessage.includes("alert") ||
    userMessage.includes("notification") ||
    userMessage.includes("warning")
  ) {
    reply =
      "EnerSense sends alerts 🚨 when your energy usage exceeds normal limits, helping you avoid high bills.";
  }

  // Savings tips
  else if (
    userMessage.includes("save") ||
    userMessage.includes("reduce") ||
    userMessage.includes("bill")
  ) {
    reply =
      "To reduce your electricity bill 💡, try using energy-efficient appliances and monitor peak usage hours in EnerSense.";
  }

  // Account
  else if (
    userMessage.includes("login") ||
    userMessage.includes("account") ||
    userMessage.includes("profile")
  ) {
    reply =
      "You can manage your account settings, profile details, and authentication options from the account section 🔐.";
  }

  // Help
  else if (
    userMessage.includes("help") ||
    userMessage.includes("support")
  ) {
    reply =
      "I'm here to help 😊. You can ask about energy usage, reports, alerts, savings tips, or your account.";
  }

  return reply;
};
