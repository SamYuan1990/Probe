const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
// const logger = require('morgan');
const ejs = require('ejs');

const indexRouter = require('./routes/index');
const resultRouter = require('./routes/result');
const apiRouter = require('./routes/api');

const app = express();
const log4js = require('log4js');

log4js.configure({
    appenders: {app: {type: 'file', filename: 'logger.log'}},
    categories: {default: {appenders: ['app'], level: 'debug'}}
});

const logger = log4js.getLogger('app');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.__express);
app.set('view engine', 'html');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/result', resultRouter);
app.use('/api', apiRouter);

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
    logger.error(err);
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
