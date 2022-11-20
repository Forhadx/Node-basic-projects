"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Author_1 = __importDefault(require("../controllers/Author"));
// import { Schemas, ValidateJoi } from '../middleware/Joi';
const router = express_1.default.Router();
router.post("/create", 
//  ValidateJoi(Schemas.author.create),
Author_1.default.createAuthor);
module.exports = router;
