"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterTodos = void 0;
const prisma_config_1 = __importDefault(require("../prisma.config"));
const filterTodos = async (req, res) => {
    try {
        const { priority, from, to, tags } = req.query;
        const filters = {};
        if (priority)
            filters.priority = String(priority).toUpperCase();
        if (tags)
            filters.tags = { has: String(tags) };
        if (from || to) {
            filters.dueDate = {};
            if (from)
                filters.dueDate.gte = new Date(String(from));
            if (to)
                filters.dueDate.lte = new Date(String(to));
        }
        const todos = await prisma_config_1.default.todo.findMany({
            where: filters,
        });
        res.status(200).json(todos);
    }
    catch (error) {
        console.error("Filter Error:", error);
        res.status(500).json({ error: "Failed to filter todos" });
    }
};
exports.filterTodos = filterTodos;
