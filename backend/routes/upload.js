import express from "express";
import path from "path";

const router = express.Router();

// Serve uploaded files
router.use(
  "/",
  express.static(path.join(path.resolve(), "uploads"))
);

export default router;
