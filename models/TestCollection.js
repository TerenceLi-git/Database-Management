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
 });
 TestCollectionSchema.plugin(timestamp);

 const TestCollection = mongoose.model('TestCollections',TestCollectionSchema);
 module.exports = TestCollection
