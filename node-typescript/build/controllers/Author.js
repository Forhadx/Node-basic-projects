"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createAuthor = (req, res, next) => {
    console.log("author...", req.body);
    res.json({ data: req.body });
};
exports.default = {
    createAuthor,
};
