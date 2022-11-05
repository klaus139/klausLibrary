"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_1 = require("../controllers/book");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
/* GET users listing. */
router.get('/books', auth_1.validateToken, book_1.getBooks);
router.post('/add-book', auth_1.validateToken, book_1.createBook);
router.get('/add_books', auth_1.validateToken, book_1.create_Book);
router.put("/edit-movie/:id", auth_1.validateToken, book_1.updateBook);
router.get('/update-movie/:id', auth_1.validateToken, book_1.edit);
router.delete("/delete-movie/:id", auth_1.validateToken, book_1.deleteBook);
router.get("/delete-movie/:id", auth_1.validateToken, book_1.bookDelete);
exports.default = router;
