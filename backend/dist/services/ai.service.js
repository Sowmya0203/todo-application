"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processUserMessage = processUserMessage;
const nlp_service_1 = require("./nlp.service");
const prisma_config_1 = __importDefault(require("../prisma.config"));
async function processUserMessage(message) {
    const intent = (0, nlp_service_1.detectIntent)(message);
    const entities = (0, nlp_service_1.extractEntities)(message);
    if (intent === "add_todo") {
        const todo = await prisma_config_1.default.todo.create({
            data: {
                title: entities.title,
                dueDate: entities.dueDate,
                priority: entities.priority ? entities.priority.toUpperCase() : null,
                recurrence: entities.recurrence,
                tags: entities.tags || [],
            },
        });
        return `Added: ${todo.title}`;
    }
    if (intent === "list_todos") {
        const todos = await prisma_config_1.default.todo.findMany();
        if (!todos.length)
            return "You have no tasks.";
        return todos.map((t) => `• ${t.title}`).join("\n");
    }
    return "I did not understand that.";
}
