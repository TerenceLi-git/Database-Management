const Users = require('../models/Users');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const e = require('express');
const { reset } = require('nodemon');
var path = require('path');
const TestCollections = require('../models/TestCollection')

module.exports = app => {
    app.get('/getData', async (req, res)=>{
        try{
            const TestCollectionList = await TestCollections.find({});
            res.send(TestCollectionList);
        }
        catch(err){
            console.log(err);
            res.sendstatus(400);
        }
    })

    app.post('/getDataUsingEmpId', async (req, res)=>{
        const employeeId = req.body.employeeId;
        console.log(employeeId);
        try{
            const TestCollectionList = await TestCollections.find({employeeId : employeeId});
            res.send(TestCollectionList);
        }
        catch(err){
            console.log(err);
            res.sendstatus(400);
        }
    })

    app.post('/addTestCollection', async (req, res)=>{
            const employeeId = req.body.employeeId;
            const testBarcode = req.body.testBarcode;
            console.log(employeeId);
            console.log(testBarcode);

            const newTestCollection = new TestCollections();
            newTestCollection.employeeId = req.body.employeeId;
            newTestCollection.testBarcode = req.body.testBarcode;

            const TestCollection = await newTestCollection.save();

            const TestCollectionList = await TestCollections.find({});
            console.log(TestCollectionList);
            res.send(TestCollectionList);
    })

    app.post('/deleteTestCollection', async (req, res)=>{
        try{
            const tempTestBarcode = req.body.testBarcode;
        
            TestCollections.findOne({testBarcode : tempTestBarcode}, async(err, testcollect) =>{
                if(testcollect){
                  const ello = await TestCollections.deleteOne({testBarcode : tempTestBarcode});
                  console.log("Poggers working.");
                  res.sendStatus(204);
                }
                else{
                  res.status(404).send("Test Collection does not contain this barcode");
                }
            })
          }
          catch(err){
            res.send(err);
          }
    })
}