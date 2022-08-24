var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const Handlebars = require('handlebars')
var expressHbs = require('express-handlebars');
const bodyParser = require("body-parser");
require('dotenv').config()
var session = require('express-session');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const app = express();
const mongoose = require("mongoose")

const indexRouter = require('./routes/index');
const userRouter = require("./routes/user")
const signupRouter = require("./routes/signup")
const productRouter = require("./routes/product")
const categoryRouter = require("./routes/category")
const loginRouter = require("./routes/login")
const profileRouter = require("./routes/profile")
const logoutRouter = require("./routes/logout")


mongoose.connect(process.env.MONGO_DB,{useNewUrlParser: true})
const db = mongoose.connection;
db.once('open', function() {
  console.log("Db Connected Successfully");
});
db.on('error', function(err) {
  console.log(err);
});

// view engine setup
app.engine(".hbs",expressHbs.engine({defaultLayout:'layout',extname:'.hbs', handlebars: allowInsecurePrototypeAccess(Handlebars)}));
app.set('view engine', '.hbs');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret :  process.env.SECRET,
  resave :true,
  saveUninitialized: true,
  cookie : {
    maxAge:(1000 * 60 * 100)
  }
}));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/product', productRouter);
app.use('/category', categoryRouter);
app.use('/profile',profileRouter);
app.use('/logout',logoutRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(err.message)

  // render the error page
  res.status(err.status || 500);
  if(err.status === 400) {
    res.render('400',{ layout:"layout-plain",title:'400'});
  }else if (err.status === 401){
    res.render('401',{ layout:"layout-plain",title:'401'});
  }else if (err.status === 403){
    res.render('403',{ layout:"layout-plain",title:'403'});
  }else if (err.status === 404){
    res.render('404',{ layout:"layout-plain",title:'404'});
  }else {
    res.render('500',{ layout:"layout-plain",title:'500'});
  }
});

app.listen(3000, () => {
  console.log('The web server has started on port 3000');
});
