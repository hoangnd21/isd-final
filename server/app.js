var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var testAPIRouter = require("./routes/testAPI");
var gmailRoute = require('./routes/gmail')
var loginRoute = require('./routes/login')
var equipmentRoute = require('./routes/equipments')
var generalTypesRoute = require('./routes/generalType')
var subTypesRoute = require('./routes/subType')
var providerRoute = require('./routes/providers')
var batchRoute = require('./routes/batch')
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
var notification = require('./routes/notification')
var liquidationRoute = require('./routes/liquidation')
var cookieSession = require('cookie-session')
var reclaimRoute = require('./routes/reclaim')
var searchRoute = require('./routes/search')
var uploadRoute = require('./routes/upload')
var upload = require('express-fileupload')
// var bodyParser = require('body-parser');
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
// app.use(bodyParser.json({ limit: "50mb" }));
// app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
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
app.use(upload());
app.use("/testAPI", testAPIRouter);
app.use('/', loginRoute);
app.use('/equipments', equipmentRoute);
app.use('/generalTypes', generalTypesRoute);
app.use('/subTypes', subTypesRoute);
app.use('/providers', providerRoute);
app.use('/batch', batchRoute);
app.use('/accessories', accessoriesRoute);
app.use('/involvedDocuments', InvolvedDocumentsRoute);
app.use('/warranty', warrantyRoute);
app.use('/adjustment', adjustmentRoute);
app.use('/equipmentDistribution', equipmentDistributionRoute);
app.use('/errorReport', errorReportRoute);
app.use('/manaEquipOnUse', manaEquipOnUseRoute);
app.use('/status', statusRoute);
app.use('/user', userRoute);
app.use('/gmail', gmailRoute);
app.use('/excel', excelRoute);
app.use('/reclaim', reclaimRoute);
app.use('/noti', notification);
app.use('/liquidation', liquidationRoute);
app.use('/search', searchRoute);
app.use('/upload', uploadRoute);
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
