const { ObjectId } = require('mongoose');
const mongoose = require('mongoose');
 const timestamp = require('mongoose-timestamp');


 const WellTestingSchema = new mongoose.Schema({
   //add requirements
   wellBarcode: {
     type:String,
     required: true,
     default :"",
   },

   poolBarcode:{
     type : String,
     required: true,
     default :"",
   },

   poolResult:{
    type : String,
    required: true,
    default :"in progress",
  },
 });
 WellTestingSchema.plugin(timestamp);

 const WellTesting = mongoose.model('WellTesting',WellTestingSchema);
 module.exports = WellTesting
