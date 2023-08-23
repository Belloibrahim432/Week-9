import express from 'express';
import authenticateToken from '../auth/authMiddleware';
import {getAllBooks, addBook, getBook, deleteBook, updateBook} from "../controllers/bookController"

const router = express.Router();

// ../books/
router.route('/')
  .get(getAllBooks)
  .post(authenticateToken,addBook);

// ../books/<id>
router.route('/:id')
  .get(getBook)
  .delete(authenticateToken,deleteBook);

// ../books/<id>/update
router.route('/:id/update')
  .put(authenticateToken,updateBook)

export default router;
