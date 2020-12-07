const { ObjectId } = require('mongoose');
const mongoose = require('mongoose');
 const timestamp = require('mongoose-timestamp');


 const UsersSchema = new mongoose.Schema({
   //add requirements


   Email: {
     type:String,
     required: true,
     default :"",
   },

   password:{
     type : String,
     required: true,
     default :"",
   },

   EmployeeId: {
     type:String,
     required: true,
     default: "",
   },
 });
 UsersSchema.plugin(timestamp);

 const Users = mongoose.model('Users',UsersSchema);
 module.exports = Users
