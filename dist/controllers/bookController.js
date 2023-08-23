"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBook = exports.deleteBook = exports.getAllBooks = exports.getBook = exports.addBook = void 0;
// import { v4 as uuidv4 } from 'uuid';
const bookModel_1 = __importDefault(require("../models/bookModel"));
async function addBook(req, res) {
    const { title, datePublished, description, pageCount, genre, bookId, publisher } = req.body;
    const userId = req.user.userId;
    try {
        const newBook = await bookModel_1.default.create({
            title,
            datePublished,
            description,
            pageCount,
            genre,
            bookId,
            publisher
        });
        return res.status(201).json({ message: 'Book added successfully', book: newBook });
    }
    catch (error) {
        console.error('Book addition error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}
exports.addBook = addBook;
const getBook = async (req, res) => {
    try {
        console.log('Calling the controller to get a book by id');
        const bookId = req.params.id;
        console.log(bookId);
        const book = await bookModel_1.default.findById(bookId);
        res.status(200).json({
            data: book
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            error: err,
            message: 'server error'
        });
    }
};
exports.getBook = getBook;
const getAllBooks = async (req, res) => {
    try {
        const allBooks = await bookModel_1.default.find({});
        res.status(201).json({
            allBooks
        });
    }
    catch (err) {
        res.status(400).json({
            error: err,
            message: 'server error'
        });
    }
};
exports.getAllBooks = getAllBooks;
const deleteBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const deletedBook = await bookModel_1.default.findByIdAndDelete(bookId);
        if (deletedBook) {
            res.status(200).json({
                msg: "You have successfully deleted a book",
                deletedBook
            });
        }
    }
    catch (error) {
        res.status(400).json({
            msg: "Could not delete the book"
        });
    }
};
exports.deleteBook = deleteBook;
const updateBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const updates = req.body;
        const updatedBook = await bookModel_1.default.findByIdAndUpdate(bookId, updates, {
            new: true,
        });
        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        return res.status(200).json({ message: 'Book updated successfully', book: updatedBook });
    }
    catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ error: 'An error occurred while updating the book' });
    }
};
exports.updateBook = updateBook;
