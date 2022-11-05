import { Request, Response, NextFunction } from 'express';
import { addAuthor, readAllAuthors, readAuthor, editAuthor, removeAuthor } from '../models/user';
import { Book } from '../typings';
import { validateBook } from '../utils/utils';

export async function createBook(req: Request, res: Response){
  try{
    const book : Book = req.body;
    const { error } = await validateBook(book);
    if (error) {
      return res.status(400).send(error.details[0].message);

    } else {
      const bookData = await addAuthor(book as any);
      if (bookData?.error){
        return res.status(500).json({ error: "cannot create book" });
      } else {
        return res.status(201).redirect('/users/books');
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "cannot create book" });
  }
}

// post book/get
export async function create_Book(req: Request, res: Response) {
  res.render('add-book')
}

// get books
export async function getBooks(req: Request, res: Response) {
  try{
    const result = await readAllAuthors();
    const message = 'Books successfully gotten';
    if (result.error) {
      res
        .status(404)
        .render('error', { result: result.error, message: 'Books not found' })
    } else {
      res.status(200).render('books', { books: result.value, message: message })
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "cannot get books" });
  }
}

//update book
export async function updateBook(req: Request, res: Response){
  const id: number = Number(req.params.id);
  try{
    if (!req.body) {
      res.status(400)
      throw new Error("Data to update can not be empty!");
      
    }
    const bookDetails: Book = req.body;
    const result = await editAuthor(bookDetails as any, id);
    res.status(200).redirect('/users/books');

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "cannot update book" });
  }
}

//edit book, get for the put request!
export async function edit(req: Request, res: Response) {
  const id: number = Number(req.params.id);
  res.render('update', { id: id })
}

//delete book
//delete Author
export async function deleteBook(req: Request, res: Response){
  try{
    const result = await removeAuthor(req.params.id as any);
    let message = 'Book successfully deleted';
    res.status(200).redirect('/users/books');

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "cannot delete book" });
  }
}

export async function bookDelete(req: Request, res: Response) {
  const id: number = Number(req.params.id);
  res.render('delete', { id: id })
}





























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