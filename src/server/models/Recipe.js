const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const recipeSchema = new Schema({
  title:String,
  description:String,
  text:Array,
  tips:String,
  pictures:Array
});

module.exports = Recipe = mongoose.model('recipes', recipeSchema);