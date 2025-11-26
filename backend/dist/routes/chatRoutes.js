"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chat_Controller_1 = require("../controllers/chat.Controller");
const router = (0, express_1.Router)();
router.post("/", chat_Controller_1.handleChatRequest);
exports.default = router;
