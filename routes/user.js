const Users = require('../models/Users');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const e = require('express');
const { reset } = require('nodemon');
var path = require('path');

module.exports = app =>{
  mongoose.set('useFindAndModify', false);
  app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/../login.html'));
  });

  app.get('/labHome', function(request, response) {
    response.sendFile(path.join(__dirname + '/../labHome.html'));
  });

  app.get('/user' , async(req,res,next)=>{
        try{
        const users = await Users.find({});

        res.send(users);
        // res.sendStatus(200);
      }
      catch(err){
        res.sendStatus(400);
      }
  })

  app.get('/getById/:id' , async(req,res,next)=>{
    try{
      const user = await Users.findById(req.params.id);

    res.send(user);
    // res.sendStatus(200);
  }
  catch(err){
    res.sendStatus(400);
  }
})
//sign up
  app.post('/signup', async (req, res)=>{

      try{
        const labId = req.body.labId;
        const password = req.body.password;

        Users.findOne({labId:labId}, async function(err, user){

          if(!user) {
            const newUser = new Users();
            newUser.labId = req.body.labId;
            newUser.password =  req.body.password;

            const user = await newUser.save();
    
            res.status(201).send(user);
          }
          else{
            res.send("User Exist")
          }
          
        })
       
      }
      catch(err){
        res.sendStatus(400);
      }
});


//login
  app.post('/login', function(req,res){
    try{
      
      console.log(req.body.labId);
      console.log(req.body.password);

      Users.findOne({labId : req.body.labId}, (err,user)=>{
        
        console.log(req.body);
        
        if(!user){
          res.sendStatus(404)
          console.log("user does not exist");
        }else{
          console.log(user.password);
          if(err || !(req.body.password == user.password)){
            res.sendStatus(404);
            console.log("password error");
          }
          else{
            console.log("redirecting");
            res.send('http://localhost:3000/labHome');
          }
        }
      });

    }
    catch(err){
      console.log("AHHHH ERROR KM");
      res.sendStatus(404);
    }
  })
}
