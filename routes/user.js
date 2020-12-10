const Users = require('../models/Users');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const e = require('express');
const { reset } = require('nodemon');
var path = require('path');

const labId = "0000";
const password = "password";
const employeeId = "";

module.exports = app => {
    mongoose.set('useFindAndModify', false);
    app.get('/', function(request, response) {
        response.sendFile(path.join(__dirname + '/../views/labLogin.html'));
    });

    app.get('/labHome', function(request, response) {
        response.sendFile(path.join(__dirname + '/../views/labHome.html'));
    });

    app.get('/testCollection', function(request, response) {
        response.sendFile(path.join(__dirname + '/../views/testCollection.html'));
    });

    app.get('/poolMapping', function(request, response) {
        response.sendFile(path.join(__dirname + '/../views/poolMapping.html'));
    });

    app.get('/wellTesting', function(request, response) {
        response.sendFile(path.join(__dirname + '/../views/wellTesting.html'));
    });

    app.get('/employeeLogin', function(request, response) {
        response.sendFile(path.join(__dirname + '/../views/employeeLogin.html'));
    });

    app.get('/employeeHome', function(request, response) {
        response.sendFile(path.join(__dirname + '/../views/employeeHome.html'));
    });

    app.get('/user', async(req, res, next) => {
        try {
            const users = await Users.find({});

            res.send(users);
            // res.sendStatus(200);
        } catch (err) {
            res.sendStatus(400);
        }
    })

    app.get('/getById/:id', async(req, res, next) => {
        try {
            const user = await Users.findById(req.params.id);

            res.send(user);
            // res.sendStatus(200);
        } catch (err) {
            res.sendStatus(400);
        }
    })

    //sign up
    app.post('/signup', async(req, res) => {
        try {
            const Email = req.body.email;
            const password = req.body.password;
            const employeeId = req.body.password;

            Users.findOne({ Email: Email }, async function(err, user) {

                if (!user) {
                    const newUser = new Users();
                    newUser.Email = req.body.email;
                    newUser.password = req.body.password;
                    newUser.EmployeeId = req.body.employeeId;

                    const user = await newUser.save();

                    res.status(201).send(user);
                } else {
                    res.send("User Exist")
                }

            })

        } catch (err) {
            res.sendStatus(400);
        }
    });

    //lab login test
    app.post('/labIdlogin', function(req, res) {
        givenLabId = req.body.labId;
        givenLabPassword = req.body.password;


        console.log(givenLabId);
        console.log(givenLabPassword);

        console.log(labId);
        console.log(password);

        console.log(!(password == givenLabPassword));

        if (!(labId == givenLabId)) {
            res.sendStatus(404)
            console.log("Given lab Id is wrong.");
        } else {
            if (!(password == givenLabPassword)) {
                res.sendStatus(404);
                console.log("password error");
            } else {
                console.log("redirecting");
                res.send('http://localhost:3000/labHome');
            }
        }
    })


    //Employee login test
    app.post('/login', function(req, res) {
        try {

            console.log(req.body.email);
            console.log(req.body.password);

            Users.findOne({ Email: req.body.email }, (err, user) => {

                console.log(req.body);

                if (!user) {
                    res.sendStatus(404)
                    console.log("user does not exist");
                } else {
                    console.log(user.password);
                    if (err || !(req.body.password == user.password)) {
                        res.sendStatus(404);
                        console.log("password error");
                    } else {
                        console.log("redirecting");
                        res.send("http://localhost:3000/employeeHome?id=" + user.EmployeeId);
                    }
                }
            });

        } catch (err) {
            console.log("AHHHH ERROR KM");
            res.sendStatus(404);
        }
    })
}