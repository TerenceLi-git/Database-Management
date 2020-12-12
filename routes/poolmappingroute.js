const Users = require('../models/Users');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const e = require('express');
const { reset } = require('nodemon');
var path = require('path');
const PoolMappings = require('../models/PoolMapping')

module.exports = app => {
    app.get('/getPoolData', async(req, res) => {
        try {
            const PoolMappingList = await PoolMappings.find({});
            res.send(PoolMappingList);
        } catch (err) {
            console.log(err);
            res.sendstatus(400);
        }
    })

    app.post('/addPoolMapping', async(req, res) => {
        const poolBarcode = req.body.poolBarcode;
        const testBarcode = req.body.testBarcode;
        console.log(poolBarcode);
        console.log(testBarcode);

        const newPoolBarcode = new PoolMappings();
        newPoolBarcode.poolBarcode = req.body.poolBarcode;
        newPoolBarcode.testBarcode = req.body.testBarcode;

        const PoolBarcode = await newPoolBarcode.save();

        const PoolMappingList = await PoolMappings.find({});
        console.log(PoolMappingList);
        res.send(PoolMappingList);
    })

    app.post('/deletePoolMapping', async (req, res)=>{
      try{
          const temppoolBarcode = req.body.poolBarcode;
      
          PoolMappings.findOne({poolBarcode : temppoolBarcode}, async(err, poolcollect) =>{
              if(poolcollect){
                const ello = await PoolMappings.deleteOne({poolBarcode : temppoolBarcode});
                console.log("Poggers working.");
                res.sendStatus(204);
              }
              else{
                res.status(404).send("Pool Mapping does not contain this barcode");
              }
           
          })
        }
        catch(err){
          res.send(err);
        }
  })
}