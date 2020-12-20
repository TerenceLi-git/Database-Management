const { ObjectId } = require('mongoose');
const mongoose = require('mongoose');
 const timestamp = require('mongoose-timestamp');


 const TestCollectionSchema = new mongoose.Schema({
   //add requirements

   employeeId: {
     type:String,
     required: true,
     default :"",
   },

   testBarcode:{
     type : String,
     required: true,
     default :"",
   },

   testBarcodeStatus: {
    type:String, 
    default: "in progress",
  }
 });
 TestCollectionSchema.plugin(timestamp);

 const TestCollection = mongoose.model('TestCollection',TestCollectionSchema);
 module.exports = TestCollection
