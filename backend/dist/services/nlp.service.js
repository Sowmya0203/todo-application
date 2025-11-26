"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectIntent = detectIntent;
exports.extractEntities = extractEntities;
const chrono_node_1 = __importDefault(require("chrono-node"));
function detectIntent(message) {
    const m = message.toLowerCase();
    if (m.includes("add") || m.includes("create"))
        return "add_todo";
    if (m.includes("list") || m.includes("show"))
        return "list_todos";
    return "unknown";
}
function extractEntities(message) {
    const parsedDate = chrono_node_1.default.parseDate(message);
    let priority = "NONE";
    if (message.includes("high"))
        priority = "HIGH";
    if (message.includes("medium"))
        priority = "MEDIUM";
    if (message.includes("low"))
        priority = "LOW";
    const title = message
        .replace(/add|create|high|medium|low/gi, "")
        .trim();
    return {
        title,
        dueDate: parsedDate || null,
        priority,
        recurrence: null,
        tags: [],
    };
}
