const express = require('express');
const httpStatus = require('http-status');
const helmet = require('helmet');
const xss = require('xss-clean');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const routes = require('./routes/v1');
const routesWeb = require('./routes');
const config = require('./config/config');
const morgan = require('./config/morgan');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
const { jwtStrategy } = require('./config/passport');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./swaggerOption');
const expressLayout = require('express-ejs-layouts');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const path = require('path');

const app = express();


if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// set security HTTP headers
app.use(helmet());

// aktifin parsing json
app.use(express.json());

// aktifin urlencoded
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

app.use(methodOverride('_method'));

//static file
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

//express session
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      // secure: true, // becareful set this option, check here: https://www.npmjs.com/package/express-session#cookiesecure. In local, if you set this to true, you won't receive flash as you are using `http` in local, but http is not secure
    },
  })
);

//flash message
app.use(
  flash({
    sessionKeyName: 'express-flash-message',
   
  })
);

//template engine
app.use(expressLayout);
app.set('layout','./layouts/main');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// v1 api routes
app.use('/v1', routes);

// web routes
app.use('/', routesWeb);


//Homepage
app.get('/', (req, res) => {

  const locals={
    title: 'Inventory-System',
    description: 'Inventory-System Web App'
  }
  res.render('index', locals);
 // res.send('hello world');  
});


const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


//Handle 404
app.get('*', (req,res)=>{
  res.status(404).render('404');
})



// send 404 error jika route tidak ada
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});



// convert error jadi Instance API Error jika ada error yang tidak ketangkap
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
