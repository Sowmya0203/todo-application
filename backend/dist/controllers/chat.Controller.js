"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleChatRequest = handleChatRequest;
const ai_service_1 = require("../services/ai.service");
async function handleChatRequest(req, res) {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }
        const reply = await (0, ai_service_1.processUserMessage)(message);
        res.json({ reply });
    }
    catch (error) {
        console.error("Chat error:", error);
        res.status(500).json({ error: "Chat processing failed" });
    }
}
