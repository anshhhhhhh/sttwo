const express = require ("express");

const HttpError = require("./models/http-error");

// const checkAuth = require("./middlewares/tokenAuth")

const Auth = require("./routes/Auth");
const Register = require("./routes/Register");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", 'http://localhost:3000'); 
  res.header("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  if(req.method === "OPTIONS") { 
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({})
  }
  next(); 
});

app.use('/api/auth',Auth);

app.use('/api/register',Register);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({message: error.message || 'An unknown error occurred.', errors: error.data || []});
});

app.listen(5007);