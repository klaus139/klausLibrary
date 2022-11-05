import express, { Request, Response, NextFunction} from  'express';
import { getAuthors, createAuthor, getAuthor, updateAuthor, deleteAuthor } from '../controllers/user';
import { createBook,create_Book, deleteBook, edit, getBooks, bookDelete, updateBook } from '../controllers/book'
import { validateToken } from '../middleware/auth';
const router = express.Router();

/* GET users listing. */
router.get('/books', validateToken, getBooks );

router.post('/add-book', validateToken, createBook);
router.get('/add_books', validateToken, create_Book);


router.put("/edit-movie/:id", validateToken, updateBook);
router.get('/update-movie/:id', validateToken, edit)

router.delete("/delete-movie/:id", validateToken, deleteBook); 
router.get("/delete-movie/:id", validateToken, bookDelete )

export default router
