const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const e = require('express');
const { reset } = require('nodemon');
var path = require('path');
const WellTestings = require('../models/WellTesting')

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
}