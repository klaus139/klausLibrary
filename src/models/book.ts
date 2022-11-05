import * as fs from 'fs'
import path from 'path'
import readDataFile from '../utils/utils'
import { v4 as uuidv4 } from 'uuid';
import { monitorEventLoopDelay } from 'perf_hooks';
import { Book } from '../typings';
const _=require('lodash')
//import { Author, Book } from './user
//add book to author;

export async function addBook(book: Book) {
  try {
    const pathName: string = path.join(__dirname, 'database.json');
    const fileExists = fs.existsSync(pathName);
    if (!fileExists) {
      const data = {
        books: [book],
      };
      fs.writeFileSync(pathName, JSON.stringify(data));
      return { value: data, error: null };
    }

    //if file exists
    if(fileExists){
      const bookDb = await readDataFile(pathName);
      const bookBaseObj: Book[] = JSON.parse(bookDb);
      bookBaseObj.push(book);
      fs.writeFileSync(pathName, JSON.stringify(bookBaseObj));
      const movieObj = { vaue: monitorEventLoopDelay, error: null };
    }
  } catch (err) {
    console.error(err);
  }
}

//get all books
export async function readAllBooks() {
  try{
    const pathName: string = path.join(__dirname, 'database.json');
    const fileExists = fs.existsSync(pathName);
    if (!fileExists) {
      throw new Error('File does not exist');
    } else {
      const bookDb = await readDataFile(pathName);
      const bookBaseObj: Book[] = JSON.parse(bookDb);
      const bookObj = { value: bookBaseObj, error: null };
      return bookObj;
    }
  } catch (err) {
    console.error(err);
    const errorObj = { value: null, error: err };
    return errorObj;
  }
}

//update Book
export async function editBook(book: Book) {
  try {
    const pathName: string = path.join(__dirname, 'database.json');
    const fileExists = fs.existsSync(pathName);
    if (!fileExists) {
      throw new Error('File does not exist');
    } else {
      const bookDb = await readDataFile(pathName);
      const bookBaseObj: Book[] = JSON.parse(bookDb);
      const bookIndex: number = bookBaseObj.findIndex((b) => b.id === book.id);
      if (bookIndex === -1) {
        throw new Error('Book not found');
      } else {
        //modified..
        bookBaseObj[bookIndex].name = book.name || bookBaseObj[bookIndex].name;
        bookBaseObj[bookIndex].isPublished = book.isPublished || bookBaseObj[bookIndex].isPublished;
        bookBaseObj[bookIndex].datePublished = book.datePublished || bookBaseObj[bookIndex].datePublished;
        bookBaseObj[bookIndex].serialNumber = book.serialNumber || bookBaseObj[bookIndex].serialNumber;
        
        fs.writeFile(pathName, JSON.stringify(bookBaseObj, null, 2), (err) => { 
          if(err){
            throw new Error('Error writing to file');
          } else {
            const bookObj = { value: bookBaseObj, error: null };
            return bookObj;
          }
        });
        
      }
    }
  } catch (err) {
    console.error(err);
    const errorObj = { value: null, error: err };
    return errorObj;
  }
}

//delete book
export async function deleteBook(id: string) {
  try {
    const pathName: string = path.join(__dirname, 'database.json');
    const fileExists = fs.existsSync(pathName);
    if (!fileExists) {
      throw new Error('File does not exist');

    } else {
      //read from the database
      const bookDb = await readDataFile(pathName);
      const bookBaseObj: Book[] = JSON.parse(bookDb);

      //find the index of the author
      const bookIndex = bookBaseObj.findIndex((item) => {
        return item.id as any === id;
      });
      if (bookIndex === -1) {
        throw new Error('Book not found');
      } else {
        //delete the author
        bookBaseObj.splice(bookIndex, 1);
        fs.writeFile(pathName, JSON.stringify(bookBaseObj, null, 2), (err) => {
          if (err) {
            throw new Error('Error writing to file');
          } else {
            const bookObj = { value: bookBaseObj, error: null };
            return bookObj;
          }
        });
      } 
    }
  } catch (err) {
    console.error(err);
    const errorObj = { value: null, error: err };
    return errorObj;
  }
}
