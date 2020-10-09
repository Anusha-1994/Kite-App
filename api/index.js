const express                   = require('express');
const app                       = express();
const cors                      = require('cors');
const jwt                       = require('./helpers/jwt');
const bodyParser                = require('body-parser');
const userService               = require('./controllers/user.service');
const loginService              = require('./controllers/login.service');
const employeeService           = require('./controllers/employee.service')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


app.post('/login', (req, res) => {
  loginService.login(req, res)
});

app.post('/resetpassword', (req, res) =>{
  userService.resetPassword(req, res)
})

app.post('/signup', (req, res) => {
  userService.createUser(req, res)
});

app.use(jwt());


app.put('/employees', (req, res) => {
  employeeService.createEmployeeDetails(req, res)
});

app.get('/employees', (req, res) => {
  employeeService.getEmployeeDetails(req, res)
});


app.use(errorHandler);

app.listen(8000, () => {
  console.log('App listening on port 8000!')
});



function errorHandler(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
      // jwt authentication error
      return res.status(401).json({ message: 'Invalid Token' });
  }
}