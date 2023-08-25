import { Request, Response } from "express";
// import { v4 as uuidv4 } from 'uuid';
import BookModel from "../models/bookModel";
import mongoose from "mongoose";
import { verifyToken, UserPayload } from "../utils";

export async function addBook(req: Request, res: Response) {
  const {
    title,
    datePublished,
    description,
    pageCount,
    genre,
    bookId,
    publisher,
  } = req.body;
  const decoded = await verifyToken(req);
  if (!decoded) {
    return res.status(403).json({ error: "Unauthorised" });
  }
  const userId = decoded.userId;

  try {
    const newBook = await BookModel.create({
      title,
      datePublished,
      description,
      pageCount,
      genre,
      bookId,
      publisher,
      authorId: userId,
    });

    return res
      .status(201)
      .json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    console.error("Book addition error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

export const getBook = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Calling the controller to get a book by id");
    const bookId = req.params.id;
    console.log(bookId);
    const book = await BookModel.findById(bookId);

    res.status(200).json({
      data: book,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err,
      message: "server error",
    });
  }
};

export const getAllBooks = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const allBooks = await BookModel.find({});
    res.status(201).json({
      allBooks,
    });
  } catch (err) {
    res.status(400).json({
      error: err,
      message: "server error",
    });
  }
};

export const deleteBook = async (
  req: Request,
  res: Response
) => {
  try {
    const bookId = req.params.id;
    const decoded = await verifyToken(req);
    if (!decoded) {
      return res.status(403).json({ error: "Unauthorised" });
    }
    const userId = decoded.userId;

    const deletedBook = await BookModel.findById(bookId);
    if (!deletedBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    if (deletedBook.authorId.toString() !== userId) {
      return res.status(403).json({ error: "Unauthorised" });
    }

    await deletedBook.deleteOne();

    if (deletedBook) {
      res.status(200).json({
        msg: "You have successfully deleted a book",
        deletedBook,
      });
    }
  } catch (error) {
    res.status(400).json({
      msg: "Could not delete the book",
    });
  }
};
export const updateBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const updates = req.body;

    const updatedBook = await BookModel.findByIdAndUpdate(bookId, updates, {
      new: true,
    });
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res
      .status(200)
      .json({ message: "Book updated successfully", book: updatedBook });
  } catch (error) {
    console.error("Error: ", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the book" });
  }
};
