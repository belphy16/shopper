const express = require('express');
// const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// const env = process.env.NODE_ENV || 'development';
const app = express();
const port = process.env.PORT || 5000;

/*  Database
    ======================================================== */
const db = mongoose.connect('mongodb://localhost/shopper');

db.connection.on('error', () => {
  console.error('db connection error...');
});
db.connection.once('open', () => {
  console.log('db opened');
});

/*  Routing
    ======================================================== */
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(express.static('./public'));
app.use('/api', require('./server/routes/data-routes')());

// app.get('*', (req, res) => {
//   res.render('index');
// });

/*  Listen
    ======================================================== */
app.listen(port);
console.log(`Listening on port ${port} ...`);

module.exports = app;
