const { ObjectId } = require('mongoose');
const mongoose = require('mongoose');
 const timestamp = require('mongoose-timestamp');


 const UsersSchema = new mongoose.Schema({
   //add requirements


   labId: {
     type:String,
     default :"",
     trim:true
   },

   password:{
     type : String,
     required: true,
     default :"",
   },
 });
 UsersSchema.plugin(timestamp);

 const Users = mongoose.model('Users',UsersSchema);
 module.exports = Users
