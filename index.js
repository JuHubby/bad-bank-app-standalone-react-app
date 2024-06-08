var express = require("express");
var app = express();
var cors = require("cors");
var dal = require("./dal.js");

var bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json({ limit: "10mb" }));

//serve static files
app.use(express.static("public"));
app.use(cors());


// create user account
app.get('/account/create/:name/:lastname/:email/:password', function (req, res) {

  // check if account exists
  dal.find(req.params.email).
      then((users) => {

          // if user exists, return error message
          if(users.length > 0){
              console.log( 'User already in exists from Back end');
              res.send('User already in exists');    
          }
          else{
              // else create user
              dal.create(req.params.name,req.params.lastname,req.params.email,req.params.password).
                  then((user) => {
                      console.log("Hello from Create: " + JSON.stringify(user));
                      res.send(user);            
                  });            
          }

      });
});


// login user 
app.get('/account/login/:email/:password', function (req, res) {

  dal.find(req.params.email).
      then((user) => {

          // if user exists, check password
          if(user.length > 0){
              if (user[0].password === req.params.password){
                  res.send(user[0]);
              }
              else{
                  res.send('Login failed: wrong password');
              }
          }
          else{
              res.send('Login failed: user not found');
          }
  });
  
});

// find user account
app.get('/account/find/:email', function (req, res) {

  dal.find(req.params.email).
      then((user) => {
          console.log(user);
          res.send(user);
  });
});

// find one user by email - alternative to find
app.get('/account/findOne/:email', function (req, res) {

  dal.findOne(req.params.email).
      then((user) => {
          console.log(user);
          res.send(user);
  });
});


// update - deposit/withdraw amount
app.get('/account/update/:email/:amount', function (req, res) {

  var amount = Number(req.params.amount);

  dal.update(req.params.email, amount).
      then((response) => {
          console.log(response);
          res.send(response);
  });    
});

app.get("/account/all", function (req, res) {
    dal.all().then((docs) => {
        console.log("hi from getAll:" + JSON.stringify(docs));
        res.send(docs);
    });
    
  });


app.listen(3000, function () {
  console.log("Runing on port 3000!");
});
