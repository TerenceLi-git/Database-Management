const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const e = require('express');
const { reset } = require('nodemon');
var path = require('path');
const Users = require('../models/Users');
const TestCollections = require('../models/TestCollection');
const PoolMappings = require('../models/PoolMapping');
const WellTestings = require('../models/WellTesting');

module.exports = app => {
    app.get('/getWellData', async (req, res)=>{
        try{
            const WellTestingList = await WellTestings.find({});
            res.send(WellTestingList);
        }
        catch(err){
            console.log(err);
            res.sendstatus(400);
        }
    })

    app.post('/addWellTesting', async (req, res)=>{
            const wellBarcode = req.body.wellBarcode;
            const poolBarcode = req.body.poolBarcode;
            console.log(wellBarcode);
            console.log(poolBarcode);

            const newWellTesting = new WellTestings();
            newWellTesting.wellBarcode = req.body.wellBarcode;
            newWellTesting.poolBarcode = req.body.poolBarcode;

            const WellTesting = await newWellTesting.save();

            const WellTestingList = await WellTestings.find({});
            console.log(WellTestingList);
            res.send(WellTestingList);
    })

    app.post('/deleteWellTesting', async (req, res)=>{
      try{
          const tempWellTesting = req.body.wellBarcode;
      
          WellTestings.findOne({wellBarcode : tempWellTesting}, async(err, welltest) =>{
              if(welltest){
                const ello = await WellTestings.deleteOne({wellBarcode : tempWellTesting});
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

  app.post('/editWellTesting', async (req, res)=>{
    try{
        const tempWellTesting = req.body.wellBarcode;
        const tempResult = req.body.poolResult;

        WellTestings.findOne({wellBarcode : tempWellTesting}, async(err, welltest) =>{
            if(welltest){
              const ello = await WellTestings.findOneAndUpdate({wellBarcode : tempWellTesting}, {poolResult: tempResult});
              const poolid = ello.poolBarcode;
              const pool = await PoolMappings.findOne({poolBarcode : poolid});
              const testbarcodeArr = pool.testBarcode;
              for(let val of testbarcodeArr) {
                const testupdatelol = await TestCollections.findOneAndUpdate({testBarcode : val}, {testBarcodeStatus: tempResult});
            }
              console.log(testbarcodeArr);
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