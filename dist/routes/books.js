"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookController_1 = require("../controllers/bookController");
const router = express_1.default.Router();
// ../books/
router.route('/')
    .get(bookController_1.getAllBooks)
    .post(bookController_1.addBook);
// ../books/<id>
router.route('/:id')
    .get(bookController_1.getBook)
    .delete(bookController_1.deleteBook);
// ../books/<id>/update
router.route('/:id/update')
    .put(bookController_1.updateBook);
exports.default = router;
