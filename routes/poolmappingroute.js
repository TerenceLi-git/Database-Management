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
            const PoolMappingList = await PoolMapping.find({});
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
}