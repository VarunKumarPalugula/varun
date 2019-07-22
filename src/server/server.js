const mongoose = require('mongoose')
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const userSchema = require('./connectDB.js')
var app = express();
app.use(bodyParser.json());
app.use(cors());

const connectionString = 'mongodb+srv://varunkumarreddy:75NuIt%21%40%23@cluster0-33uo1.mongodb.net/test?retryWrites=true';



mongoose.connect(connectionString, { useNewUrlParser: true })
  .then(() =>  console.log('connection succesful')
  )
  .catch((err) => console.error(err));


/* GET ALL user */
app.get('/', function(req, res, next) {
  userSchema.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE user BY ID */
app.get('/getAllUser', function(req, res, next) {
  userSchema.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});



/* SAVE user */
app.post('/register', function(req, res, next) {
  console.log(req.body)
  userSchema.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE user */
app.put('/updatePassword', function(req, res, next) {
  console.log(req.body)
  userSchema.findByIdAndUpdate( { '_id' : req.body.number }, req.body , { new: true }, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE user */
app.delete('/deleteUser', function(req, res, next) {
  userSchema.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))
