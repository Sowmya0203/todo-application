"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.createSmartTodos = exports.createTodo = exports.getTodos = void 0;
const prisma_config_1 = __importDefault(require("../prisma.config"));
// --------------------------------------
// TEMPORARY NLP Parser Stub
// --------------------------------------
function parseTextToTodos(text) {
    const titles = text.split("and").map(t => t.trim()).filter(Boolean);
    return titles.map(title => ({
        title,
        completed: false,
        dueDate: null,
        priority: null,
        recurrence: null,
        tags: [],
    }));
}
// --------------------------------------
// GET ALL TODOS
// --------------------------------------
const getTodos = async (req, res) => {
    try {
        const todos = await prisma_config_1.default.todo.findMany({ orderBy: { createdAt: "desc" } });
        res.status(200).json(todos);
    }
    catch (error) {
        console.error("Get Todos Error:", error);
        res.status(500).json({ error: "Failed to fetch todos" });
    }
};
exports.getTodos = getTodos;
// --------------------------------------
// CREATE NORMAL TODO
// --------------------------------------
const createTodo = async (req, res) => {
    try {
        const { title, dueDate, priority, recurrence, tags } = req.body;
        if (!title)
            return res.status(400).json({ error: "Title is required" });
        const todo = await prisma_config_1.default.todo.create({
            data: {
                title,
                dueDate: dueDate ? new Date(dueDate) : null,
                priority: priority || null,
                recurrence: recurrence || null,
                tags: tags || [],
            },
        });
        res.status(201).json(todo);
    }
    catch (error) {
        console.error("Create Todo Error:", error);
        res.status(500).json({ error: "Failed to create todo" });
    }
};
exports.createTodo = createTodo;
// --------------------------------------
// CREATE SMART/NLP TODO
// --------------------------------------
const createSmartTodos = async (req, res) => {
    try {
        const { text } = req.body;
        const parsedTodos = parseTextToTodos(text); // stub parser
        const createdTodos = [];
        for (const t of parsedTodos) {
            const todo = await prisma_config_1.default.todo.create({ data: t });
            createdTodos.push(todo);
        }
        res.status(201).json(createdTodos);
    }
    catch (error) {
        console.error("Create Smart Todos Error:", error);
        res.status(500).json({ error: "Failed to create smart todos" });
    }
};
exports.createSmartTodos = createSmartTodos;
// --------------------------------------
// UPDATE TODO
// --------------------------------------
const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, dueDate, priority, recurrence, tags, completed } = req.body;
        const updated = await prisma_config_1.default.todo.update({
            where: { id: Number(id) },
            data: {
                title,
                dueDate: dueDate ? new Date(dueDate) : null,
                priority: priority || null,
                recurrence: recurrence || null,
                tags: tags || [],
                completed,
            },
        });
        res.status(200).json(updated);
    }
    catch (error) {
        console.error("Update Todo Error:", error);
        res.status(500).json({ error: "Failed to update todo" });
    }
};
exports.updateTodo = updateTodo;
// --------------------------------------
// DELETE TODO
// --------------------------------------
const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_config_1.default.todo.delete({ where: { id: Number(id) } });
        res.status(200).json({ message: "Todo deleted successfully" });
    }
    catch (error) {
        console.error("Delete Todo Error:", error);
        res.status(500).json({ error: "Failed to delete todo" });
    }
};
exports.deleteTodo = deleteTodo;
