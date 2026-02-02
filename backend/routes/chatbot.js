import express from "express";
import { chatbotMessage } from "../controller/chatbot.controller.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/message",  chatbotMessage);

export default router;
