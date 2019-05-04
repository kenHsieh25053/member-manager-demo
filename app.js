const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const adminRouter = require('./routers/admin');
const memberRouter = require('./routers/member');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(adminRouter);
app.use(memberRouter);

module.exports = app;