"use strict";

if(process.env.NODE_ENV === undefined) {
    throw new Error("NODE_ENV was not defined in environment variables");
}

if(process.env.PROJECT_PATH === undefined) {
    throw new Error("PROJECT_PATH was not defined in environment variables");
}

require("extend-error");
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require("../app/common/ConfigProvider").getConfig();
var cors = require("cors");

var routes = require('./routes/index');
var user = require('./routes/user');
var events = require('./routes/events');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    origin: config.web.domain,
    methods: "GET,PUT,POST",
    allowHeaders: "Content-Type,Authorization"
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/user', user);
app.use('/events', events);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'dev') {
    app.use(function(err, req, res) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;