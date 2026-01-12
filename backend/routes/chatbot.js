import express from "express";
import { chatbotMessage } from "../controller/chatbot.controller.js";
import { optionalAuth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/message", optionalAuth, chatbotMessage);

export default router;
