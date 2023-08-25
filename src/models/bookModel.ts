import mongoose, { Schema, Document} from "mongoose";

interface Book extends Document {
  title: string;
  datePublished: Date;
  description: string;
  pageCount: number;
  genre: string;
  bookId: string;
  publisher: string;
  authorId: mongoose.Schema.Types.ObjectId;
}
const bookSchema = new Schema<Book>({
title: {type: String, required: true},
datePublished: {type: Date, required: true},
description: {type: String, required: true},
pageCount: {type: Number, required: true},
genre: {type: String, required: true},
bookId: {type: String, required: true},
publisher: {type: String, required: true},
authorId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

const BookModel = mongoose.model<Book>("Book", bookSchema);

export default BookModel;