var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var nodemailer = require('nodemailer');
var uuid = require('uuid')
var logger = require('morgan');
var cors = require("cors");
var testAPIRouter = require("./routes/testAPI");
var passwordRoute = require('./routes/password')
var loginRoute = require('./routes/login')
var equipmentRoute = require('./routes/equipments')
var groupEquipmentRoute = require('./routes/groupEquipment')
var groupSubEquipmentRoute = require('./routes/groupSubEquipment')
var providerRoute = require('./routes/providers')
var provideBatchRoute = require('./routes/provideBatch')
var accessoriesRoute = require('./routes/accessories')
var InvolvedDocumentsRoute = require('./routes/involvedDocuments')
var warrantyRoute = require('./routes/warranty')
var adjustmentRoute = require('./routes/adjustment')
var equipmentDistributionRoute = require('./routes/equipmentDistribution')
var errorReportRoute = require('./routes/errorReport')
var manaEquipOnUseRoute = require('./routes/manaEquipOnUse')
var statusRoute = require('./routes/status')
var userRoute = require('./routes/users')
var excelRoute = require('./routes/excel')
var cookieSession = require('cookie-session')
var app = express();


// view engine setup

app.use(cookieSession({
  name: 'sessions',
  keys: ['omega'],

  // Cookie Options
  maxAge: 1 * 60 * 60 * 1000 // 24 hours
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('trust proxy', 1)
app.use(logger('dev'));
app.use(express.json());
app.use(cors({
  //credentials: true
  //origin: 'http://localhost:9000'
}));
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", req.header.origin);
//   res.header('Access-Control-Allow-Credentials', true);
//   res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
//   res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS");
//   next();
// });
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 1 * 6 * 60 * 10000
  }
}))

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/testAPI", testAPIRouter);
app.use('/', loginRoute);
app.use('/equipments', equipmentRoute);
app.use('/groupEquipment', groupEquipmentRoute);
app.use('/groupSubEquipment', groupSubEquipmentRoute);
app.use('/providers', providerRoute);
app.use('/provideBatch', provideBatchRoute);
app.use('/accessories', accessoriesRoute);
app.use('/involvedDocuments', InvolvedDocumentsRoute);
app.use('/warranty', warrantyRoute);
app.use('/adjustment', adjustmentRoute);
app.use('/equipmentDistribution', equipmentDistributionRoute);
app.use('/errorReport', errorReportRoute);
app.use('/manaEquipOnUse', manaEquipOnUseRoute);
app.use('/status', statusRoute);
app.use('/user', userRoute);
app.use('/password', passwordRoute);
app.use('/excel', excelRoute);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
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



module.exports = app;
