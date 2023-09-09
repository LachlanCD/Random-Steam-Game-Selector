const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fileUpload = require("express-fileupload");
const cors = require('cors');

require ("dotenv").config();

const indexRouter = require('./routes/index');
const steamRouter = require('./routes/steam');
const ytRouter = require('./routes/youtube');
const newsRouter = require('./routes/news');
const counterRouter = require('./routes/s3.js');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(fileUpload());

// set routes
app.use('/', indexRouter);
app.use('/steam', steamRouter);
app.use('/youtube', ytRouter);
app.use('/news', newsRouter);
app.use('/counter', counterRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // return error message
  res.status(err.status || 500);
  res.send({ error: true, message: err.message});
});

module.exports = app;
