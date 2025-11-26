"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSmartTodo = void 0;
const createSmartTodo = async (req, res) => {
    const { message } = req.body;
    if (!message)
        return res.status(400).json({ error: "Message is required" });
    // For now just echo the message
    res.status(201).json({ received: message });
};
exports.createSmartTodo = createSmartTodo;
