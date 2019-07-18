const mongoose = require('mongoose')
const userSchema = require('./connectDB.js')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
var router = express.Router();

const connectionString = 'mongodb+srv://varunkumarreddy:75NuIt%21%40%23@cluster0-33uo1.mongodb.net/test?retryWrites=true';

app.get('/', (req, res) => {
  res.send('Welcome to Node API')
})


app.get('/getData', (req, res) => {
  res.json({'message': 'Hello World'})
})

app.post('/postData', bodyParser.json(), (req, res) => {
  console.log('req', req.body)
  res.json(req.body)
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))

// let daa = {
//   username: "dgf",
//   password: "sfd",
//   phoneNumber: 56776,
//   rememberMe: false
// };

// mongoose.connect(connectionString, { useNewUrlParser: true })
//   .then(() =>  console.log('connection succesful'),
//    userSchema.create(daa, function (err, res, post) {
//       if (err) {
//         return next(err); 
//       } else {
//         console.log('hhhh', err , res , post);
//       };
//     })
//   )
//   .catch((err) => console.error(err));


// /* GET ALL user */
// router.get('/', function(req, res, next) {
//   userSchema.find(function (err, products) {
//     if (err) return next(err);
//     res.json(products);
//   });
// });

// /* GET SINGLE user BY ID */
// router.get('/:id', function(req, res, next) {
//   userSchema.findById(req.params.id, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

// /* SAVE user */
// router.post('/', function(req, res, next) {
//   userSchema.create(req.body, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

// /* UPDATE user */
// router.put('/:id', function(req, res, next) {
//   userSchema.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

// /* DELETE user */
// router.delete('/:id', function(req, res, next) {
//   userSchema.findByIdAndRemove(req.params.id, req.body, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

// module.exports = router;