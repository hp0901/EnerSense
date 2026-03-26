export const maskEmail = (email) => {
  if (!email) return "";

  const [name, domain] = email.split("@");

  if (name.length <= 5) {
    return name.substring(0, 2) + "***@" + domain;
  }

  const start = name.substring(0, 3);
  const end = name.substring(name.length - 2);

  return `${start}***${end}@${domain}`;
};
