import jwt from "jsonwebtoken";

export const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    req.user = null; // user not logged in
    return next();
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // { id, email, name }
    next();
  } catch (error) {
    req.user = null;
    next(); // invalid token → treat as not logged in
  }
};
