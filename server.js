const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const connectDB = require('./config/db');
// SERVER SIDE TODO
/*
Require Login to view leads
  - create user model
    username/email  -string
    password        -string
    admin           -boolean
  - create user routes 
    user/login
    user/new
    user/:id -- not critical
  - login with passport.js
  -bcrypt password
Assign leads to users

*/

// inits app
const app = express();

// Load env variables
dotenv.config({ path: './config/config.env' });

//Compress all routes
app.use(compression());

app.use(helmet());
// serve static files in /public
app.use(express.static(__dirname + '/public'));

// Body Parser
app.use(express.json());

//Cors
app.use(cors());

//Routes
app.get('/', (req, res, next) => {
  res.status(200).json({ fuck: 'you' });
});
const leadRoute = require('./routes/lead');
app.use('/lead', leadRoute);
const contactUsRoute = require('./routes/contactUs');
app.use('/contact-us', contactUsRoute);
// starts server
const startServer = async () => {
  const PORT = process.env.PORT || 5000;
  const portString = `${PORT}`.brightYellow;
  await connectDB();
  const server = app.listen(PORT, () => {
    console.log(
      ` Server running in ${process.env.NODE_ENV} , App listening on port ${portString}!`
        .yellow.bold
    );
  });
};
startServer();
