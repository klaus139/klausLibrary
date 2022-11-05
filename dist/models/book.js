"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.editBook = exports.readAllBooks = exports.addBook = void 0;
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const utils_1 = __importDefault(require("../utils/utils"));
const perf_hooks_1 = require("perf_hooks");
const _ = require('lodash');
//import { Author, Book } from './user
//add book to author;
function addBook(book) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pathName = path_1.default.join(__dirname, 'database.json');
            const fileExists = fs.existsSync(pathName);
            if (!fileExists) {
                const data = {
                    books: [book],
                };
                fs.writeFileSync(pathName, JSON.stringify(data));
                return { value: data, error: null };
            }
            //if file exists
            if (fileExists) {
                const bookDb = yield (0, utils_1.default)(pathName);
                const bookBaseObj = JSON.parse(bookDb);
                bookBaseObj.push(book);
                fs.writeFileSync(pathName, JSON.stringify(bookBaseObj));
                const movieObj = { vaue: perf_hooks_1.monitorEventLoopDelay, error: null };
            }
        }
        catch (err) {
            console.error(err);
        }
    });
}
exports.addBook = addBook;
//get all books
function readAllBooks() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pathName = path_1.default.join(__dirname, 'database.json');
            const fileExists = fs.existsSync(pathName);
            if (!fileExists) {
                throw new Error('File does not exist');
            }
            else {
                const bookDb = yield (0, utils_1.default)(pathName);
                const bookBaseObj = JSON.parse(bookDb);
                const bookObj = { value: bookBaseObj, error: null };
                return bookObj;
            }
        }
        catch (err) {
            console.error(err);
            const errorObj = { value: null, error: err };
            return errorObj;
        }
    });
}
exports.readAllBooks = readAllBooks;
//update Book
function editBook(book) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pathName = path_1.default.join(__dirname, 'database.json');
            const fileExists = fs.existsSync(pathName);
            if (!fileExists) {
                throw new Error('File does not exist');
            }
            else {
                const bookDb = yield (0, utils_1.default)(pathName);
                const bookBaseObj = JSON.parse(bookDb);
                const bookIndex = bookBaseObj.findIndex((b) => b.id === book.id);
                if (bookIndex === -1) {
                    throw new Error('Book not found');
                }
                else {
                    //modified..
                    bookBaseObj[bookIndex].name = book.name || bookBaseObj[bookIndex].name;
                    bookBaseObj[bookIndex].isPublished = book.isPublished || bookBaseObj[bookIndex].isPublished;
                    bookBaseObj[bookIndex].datePublished = book.datePublished || bookBaseObj[bookIndex].datePublished;
                    bookBaseObj[bookIndex].serialNumber = book.serialNumber || bookBaseObj[bookIndex].serialNumber;
                    fs.writeFile(pathName, JSON.stringify(bookBaseObj, null, 2), (err) => {
                        if (err) {
                            throw new Error('Error writing to file');
                        }
                        else {
                            const bookObj = { value: bookBaseObj, error: null };
                            return bookObj;
                        }
                    });
                }
            }
        }
        catch (err) {
            console.error(err);
            const errorObj = { value: null, error: err };
            return errorObj;
        }
    });
}
exports.editBook = editBook;
//delete book
function deleteBook(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pathName = path_1.default.join(__dirname, 'database.json');
            const fileExists = fs.existsSync(pathName);
            if (!fileExists) {
                throw new Error('File does not exist');
            }
            else {
                //read from the database
                const bookDb = yield (0, utils_1.default)(pathName);
                const bookBaseObj = JSON.parse(bookDb);
                //find the index of the author
                const bookIndex = bookBaseObj.findIndex((item) => {
                    return item.id === id;
                });
                if (bookIndex === -1) {
                    throw new Error('Book not found');
                }
                else {
                    //delete the author
                    bookBaseObj.splice(bookIndex, 1);
                    fs.writeFile(pathName, JSON.stringify(bookBaseObj, null, 2), (err) => {
                        if (err) {
                            throw new Error('Error writing to file');
                        }
                        else {
                            const bookObj = { value: bookBaseObj, error: null };
                            return bookObj;
                        }
                    });
                }
            }
        }
        catch (err) {
            console.error(err);
            const errorObj = { value: null, error: err };
            return errorObj;
        }
    });
}
exports.deleteBook = deleteBook;
