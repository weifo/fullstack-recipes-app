const express = require('express');
const router = express.Router();
const auth =require('../../middleware/auth');

const Recipe=require('../../models/Recipe');

router.get('/:word', (req, res) => {
    let keyword=req.params.word;
    Recipe.find({"title":{$regex:keyword}})
      .then(items => res.json(items))
      ;
  });

  router.post('/',auth, (req, res) => {
    const newRecipe = new Recipe(req.body);
    newRecipe.save().then(item => res.json(item));
  });

  module.exports = router;

  