"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const method_override_1 = __importDefault(require("method-override"));
const dotenv_1 = __importDefault(require("dotenv"));
const dotEnv = dotenv_1.default.config();
const index_1 = __importDefault(require("./routes/index"));
const users_1 = __importDefault(require("./routes/users"));
const books_1 = __importDefault(require("./routes/books"));
const app = (0, express_1.default)();
// view engine setup
app.set('views', path_1.default.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.disable('etag');
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, '..', path_1.default.sep, 'public')));
app.use((0, method_override_1.default)('_method'));
app.use('/', index_1.default);
app.use('/users', users_1.default);
app.use('/books', books_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
exports.default = app;
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
