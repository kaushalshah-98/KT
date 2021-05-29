let mysql = require('mysql');
let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
let connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'your password',
  database: 'kt',
});

connection.connect((err) => {
  if (!err) {
    console.log('Database is connected..');
  } else console.log('Error Connecting a Database...', err);
});
exports.connection = connection;
exports.app = app;
exports.mysql = mysql;
