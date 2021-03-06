const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const mainRoutes = require('./routes');
const projectRoutes = require('./routes/project');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static('public'));

app.use(mainRoutes);
app.use('/project', projectRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404, 'PAGE NOT FOUND'));
  });

// error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // console log error message
    console.log(res.locals.message, err.status || 500)
  
    // render the error page
    res.status(err.status || 500);
    if (err.status === 404) {
        res.render('page-not-found');
    } else {
        res.render('error');
    }
  });

module.exports = app;