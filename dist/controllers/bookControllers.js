"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBook = exports.deleteBook = exports.getBook = exports.getAllBooks = exports.addBook = exports.myController = void 0;
const uuid_1 = require("uuid");
const book_1 = require("../models/book");
/** A dummy controller function, just to test if my routes are working */
function myController(req, res) {
    res.json({ "msg": "respond with a resource from books" });
}
exports.myController = myController;
async function addBook(req, res) {
    const newId = (0, uuid_1.v4)();
    try {
        const { title, datePublished, description, pageCount, publisher, author } = req.body;
        await book_1.Book.create({ bookId: newId, title, datePublished, description, pageCount, publisher, author });
        res.redirect(201, `/books/${newId}`);
    }
    catch (error) {
        res.status(500).json({ 'error': error.message });
    }
}
exports.addBook = addBook;
async function getAllBooks(req, res) {
    console.log('calling controller function to get all books');
    try {
        const allBooks = await book_1.Book.findAll();
        res.json(allBooks);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
exports.getAllBooks = getAllBooks;
async function getBook(req, res) {
    console.log('calling controller function to get a book by id');
    try {
        const book = await book_1.Book.findByPk(req.params.id);
        if (book) {
            res.json(book.dataValues.title);
        }
        else {
            throw new Error("Book not found!");
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
exports.getBook = getBook;
async function deleteBook(req, res) {
    try {
        const book = await book_1.Book.findByPk(req.params.id);
        if (book) {
            await book.destroy();
            res.redirect(200, '/books');
        }
        else {
            throw new Error("Book not found!");
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
exports.deleteBook = deleteBook;
async function updateBook(req, res) {
    const id = req.params.id;
    const updates = req.body;
    try {
        const book = await book_1.Book.findByPk(id);
        if (book) {
            Object.assign(book, { ...book, ...updates });
            await book.save();
            res.redirect(200, `/books/${id}`);
        }
        else {
            throw new Error("Book not found!");
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
exports.updateBook = updateBook;
