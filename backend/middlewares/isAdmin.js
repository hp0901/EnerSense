const ADMIN_ROLES = ["admin", "MainAdmin"];

export const isAdmin = (req, res, next) => {
  if (!ADMIN_ROLES.includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin only.",
    });
  }
  next();
};