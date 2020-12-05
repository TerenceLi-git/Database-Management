const Users = require('../models/Users');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const e = require('express');

module.exports = app =>{
  mongoose.set('useFindAndModify', false);
  app.get('/', (req,res)=>{
    res.send(`<div>Server's Up!</div>`)
  })

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
            newUser.labId = labId;
            newUser.password =  bcrypt.hashSync(password,14);
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
  app.post('/login', async(req,res) =>{
    try{

      Users.findOne({labId : req.body.labId}, (err,user)=>{
      
        if(!user){
          res.sendStatus(404)
        }else{
          if(err || !bcrypt.compareSync(req.body.password, user.password)){
            res.sendStatus(404);
          }
          else{
            res.send(user);
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
