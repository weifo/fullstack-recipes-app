const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const userSchema = new Schema({
  name:{ type:String,required:true },
  email:String,
  password:{ type:String,required:true },
  recipe_ids:Array,
  avatar:String
});

module.exports = User = mongoose.model('users', userSchema);