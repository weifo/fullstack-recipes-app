const express = require('express');
const router = express.Router();
const auth =require('../../middleware/auth');

const Catalog=require('../../models/Catalog');

router.get('/:catalog_id/', (req, res) => {
    let query='/category/'+req.params.catalog_id+'/';
    console.log(query)
    Catalog.find({"catalog":query})
      .then(items => res.json(items))
      ;
//     Catalog.find({"title":"小吃"})
//       .then(item=>res.json(item))
  });

  module.exports = router;