/**
 * Learning Reference:
 * https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/skeleton_website
 * https://github.com/mdn/express-locallibrary-tutorial.git
 * JWT Authentication - https://www.bezkoder.com/node-js-mongodb-auth-jwt/
 */
var createError = require('http-errors');
var express = require('express');
const cors = require("cors");


var path = require('path');
var cookieParser = require('cookie-parser');

var morgan = require('morgan');
var winston = require('./config/winston');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var genreRouter = require('./routes/genre');
var authRouter= require('./routes/auth.routes');

const { default: mongoose } = require('mongoose');
// const { devNull } = require('os');

// const fs = require('fs');

var app = express();
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(morgan('combined', { stream: winston.stream }));

// app.use(morgan('combined'));
//Set up mongoose connection
// var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost:27017/my_database';
mongoose.connect(mongoDB, {useNewUrlParser:true, useUnifiedTopology:true});
var db = mongoose.connection;
db.on('errpr' , console.error.bind(console, 'MongoDB connection error'));
db.on('connected',()=>{
  console.log('DB Connected');
});
//end mongoose connection



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/genre', genreRouter);
app.use('/', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
