export const detectIntent = (msg) => {
  msg = msg.toLowerCase();

  if (/hi|hello|hey/.test(msg)) return "greeting";
  if (/who am i|my name|account/.test(msg)) return "user";
  if (/board|panel/.test(msg)) return "boards";
  if (/device|appliance|gadget/.test(msg)) return "devices";
  if (/log|history/.test(msg)) return "logs";
  if (/energy|power|voltage|current/.test(msg)) return "energy";
  if (/summary|today|daily/.test(msg)) return "summary";

  return "unknown";
};