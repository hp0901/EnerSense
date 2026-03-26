export const maskPhone = (phone) => {
  if (!phone) return "";

  if (phone.length <= 5) {
    return phone.slice(0, 2) + "***";
  }

  return phone.slice(0, 3) + "****" + phone.slice(-2);
};
