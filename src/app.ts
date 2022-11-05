import createError, {HttpError} from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import methodOverride from 'method-override';
import dotenv from 'dotenv';


const dotEnv = dotenv.config();

import indexRouter from './routes/index';
import usersRouter from './routes/users';
import booksRouter from './routes/books';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.disable('etag');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', path.sep, 'public')));
app.use(methodOverride('_method'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books', booksRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err: HttpError, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app

























// import createError, {HttpError} from 'http-errors';
// import express, { Request, Response, NextFunction } from 'express';
// import path from 'path';
// import cookieParser from 'cookie-parser';
// import logger from 'morgan';
// import methodOverride from 'method-override';
// import dotenv from 'dotenv';
// import session, { Cookie } from 'express-session';

// // declare module 'express-session'{
// //   export interface SessionData {
// //     user: {[key: string] : any}
// //   }
// // }
// const app = express();
// app.use(cookieParser());
// const dotEnv= dotenv.config();
// import indexRouter from './routes/index';
// import usersRouter from './routes/users';



// // view engine setup
// app.set('views', path.join(__dirname, '../views'));
// app.set('view engine', 'ejs');
// app.disable('etag');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// app.use(express.static(path.join(__dirname, '..', path.sep, 'public')));
// app.use(methodOverride('_method'));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/books', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req: Request, res: Response, next: NextFunction) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err: HttpError, req: Request, res: Response, next: NextFunction) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// // app.get('../views/users',(req, res) => {
// //   res.render('users')
// // })

// export default app;
