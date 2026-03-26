export const isStrongPassword = (password) => {
  return (
    typeof password === "string" &&
    password.length >= 8 &&
    /[A-Z]/.test(password) &&        // at least one uppercase
    /[a-z]/.test(password) &&        // at least one lowercase
    /[0-9]/.test(password) &&        // at least one number
    /[^A-Za-z0-9]/.test(password)    // at least one special char
  );
};
