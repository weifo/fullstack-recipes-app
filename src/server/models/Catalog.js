const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const catalogSchema = new Schema({
  title:{ type:String,required:true },
  catalog:{type:String,required:true},
  class:{type:String,required:true},
  data:{type:Array,required:true}
});

module.exports = Catalog = mongoose.model('catalog', catalogSchema,'catalog');