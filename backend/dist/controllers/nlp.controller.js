"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseMessage = async (req, res) => {
    const { message } = req.body;
    if (!message)
        return res.status(400).json({ error: "Message is required" });
    let reply = "Could not understand your message.";
    if (message.toLowerCase().includes("todo"))
        reply = "Detected TODO command!";
    res.status(200).json({ reply });
};
exports.default = parseMessage; // ✅ default export
