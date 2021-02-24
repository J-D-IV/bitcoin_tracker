/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const cors = require('cors');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const Axios = require('axios');
// const showcase = require('./newShowcase');
const app = express();
const router = express.Router();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// To support URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// To parse cookies from the HTTP Request
app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, '../dist')));
// app.use('/', insert-database-file-you-declared);

const formatEnd = (date, format) => {
  const map = {
    mm: date.getMonth() + 1,
    dd: date.getDate(),
    yy: date.getFullYear().toString().slice(-2),
  }
  if (date.getMonth() <= 9) {
    map.mm = '0' + map.mm;
  }
  return format.replace(/mm|dd|yy/gi, matched => map[matched])
}
const now = new Date();
const end = formatEnd(now, '20yy-mm-dd')

const formatStart = (date, format) => {
  const map = {
    mm: date.getMonth() + 1,
    dd: date.getDate(),
    yy: date.getFullYear().toString().slice(-2) -1,
  }
  if (date.getMonth() <= 9) {
    map.mm = '0' + map.mm;
  }
  return format.replace(/mm|dd|yy/gi, matched => map[matched])
}

const start = formatStart(now, '20yy-mm-dd' )

app.get("/btc", (req, res) => {
  Axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`)
    .then(function (response) {
      console.log(response.data);
      res.status(200).json(response.data);
    })
    .catch(function (error) {
      console.log(error);
      res.sendStatus(500);
    })
    // .finally(function () {
    //   console.log("done");
    // });
});

app.listen(port, (err) => {
  if (err) {
    console.log('Error Starting server');
  } else {
    console.log('Server Running on Port: ', port);
  }
});

