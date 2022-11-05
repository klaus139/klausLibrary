"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookDelete = exports.deleteBook = exports.edit = exports.updateBook = exports.getBooks = exports.create_Book = exports.createBook = void 0;
const user_1 = require("../models/user");
const utils_1 = require("../utils/utils");
function createBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const book = req.body;
            const { error } = yield (0, utils_1.validateBook)(book);
            if (error) {
                return res.status(400).send(error.details[0].message);
            }
            else {
                const bookData = yield (0, user_1.addAuthor)(book);
                if (bookData === null || bookData === void 0 ? void 0 : bookData.error) {
                    return res.status(500).json({ error: "cannot create book" });
                }
                else {
                    return res.status(201).redirect('/users/books');
                }
            }
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: "cannot create book" });
        }
    });
}
exports.createBook = createBook;
// post book/get
function create_Book(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.render('add-book');
    });
}
exports.create_Book = create_Book;
// get books
function getBooks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield (0, user_1.readAllAuthors)();
            const message = 'Books successfully gotten';
            if (result.error) {
                res
                    .status(404)
                    .render('error', { result: result.error, message: 'Books not found' });
            }
            else {
                res.status(200).render('books', { books: result.value, message: message });
            }
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: "cannot get books" });
        }
    });
}
exports.getBooks = getBooks;
//update book
function updateBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        try {
            if (!req.body) {
                res.status(400);
                throw new Error("Data to update can not be empty!");
            }
            const bookDetails = req.body;
            const result = yield (0, user_1.editAuthor)(bookDetails, id);
            res.status(200).redirect('/users/books');
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: "cannot update book" });
        }
    });
}
exports.updateBook = updateBook;
//edit book, get for the put request!
function edit(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        res.render('update', { id: id });
    });
}
exports.edit = edit;
//delete book
//delete Author
function deleteBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield (0, user_1.removeAuthor)(req.params.id);
            let message = 'Book successfully deleted';
            res.status(200).redirect('/users/books');
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: "cannot delete book" });
        }
    });
}
exports.deleteBook = deleteBook;
function bookDelete(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        res.render('delete', { id: id });
    });
}
exports.bookDelete = bookDelete;
// import express, { Response, Request } from 'express'
// import { addBook, removeBook } from '../models/book'
// import {  } from '../models/user'
// import { validateBook } from '../utils/utils'
// //add book
// export async function createBook(req: Request, res: Response) {
//   try{
//     const book: Book = req.body;
//     const { error } = await validateBook(book);
//     if (error) {
//       const err = error.details[0].message;
//       return res.status(400).render('error', { err: err, message: null });
//     } else {
//       const bookData = await addBook(book); 
//       if (bookData?.error) {
//         return res.status(500).json({ error: "cannot add book" });
//       } else {
//         return res.status(200).redirect('/users/books');
//       }
//     }
//   } catch (error) {
//     console.log(error);
// }
// // post book /get
// export async function create_Book(req: Request, res: Response) {
//   res.render('add-book');
// }
// //get books
// export async function getBooks(req: Request, res: Response) {
//   try{
//     const result = await readAllBooks();
//     const message = 'Books successfully gotten';
//     if (result.error) {
//       res
//         .status(404)
//         .render('error', { result: result.error, message: 'Books not found' });
//     } else {
//       // const user = req.cookies.user;
//       console.log(result.value);
//       // res.status(200).render('users', { authors: result.value, message: message })
//       res.status(200).render('books', { books: result.value, message: message });
//     }
//   }
// // //bookCreate
// // export async function bookCreate (req: Request, res: Response) {
// //   // const id : number = Number(req.params.id);
// //   res.render('book');
// // }
// // export async function deleteBook(req: Request, res: Response) {
// //     const result = await removeBook(Number(req.params.id), Number(req.body.bookId))
// //     const message = 'Book successfully deleted';
// //     if(result?.error){
// //         return res.status(404).render('error', {result: result.error, message: null})
// //     }
// //     else{
// //       return res.status(200)
// //       .redirect('/users/authors')
// //       // .render('book',{authors: result?.value, message: message});
// //     }
// // }
// // export async function bookDelete (req: Request, res: Response){
// //   const id : number = Number(req.params.id);
// //   res.render('deleteBook', {id});
// // }
