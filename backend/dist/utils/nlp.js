"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTextToTodos = parseTextToTodos;
const compromise_1 = __importDefault(require("compromise"));
const chrono_node_1 = __importDefault(require("chrono-node"));
function parseTextToTodos(text) {
    // Split sentences by 'and' or '.'
    const sentences = text.split(/ and |\. /i).filter(s => s.trim() !== "");
    return sentences.map(sentence => {
        const doc = (0, compromise_1.default)(sentence);
        // Extract priority keywords
        let priority = null;
        if (/high/i.test(sentence))
            priority = "HIGH";
        else if (/medium/i.test(sentence))
            priority = "MEDIUM";
        else if (/low/i.test(sentence))
            priority = "LOW";
        // Extract due date using chrono-node
        const date = chrono_node_1.default.parseDate(sentence);
        return {
            title: sentence.replace(/high|medium|low/i, "").trim(),
            completed: false,
            dueDate: date || null,
            priority,
            recurrence: null, // optional: add recurrence parsing
            tags: [],
        };
    });
}
