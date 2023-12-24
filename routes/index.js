var express = require('express');
var router = express.Router();
var BrandModel = require('../models/BrandModel');
var ToyModel = require('../models/ToyModel');

/* GET home page. */
router.get('/', async(req, res) => {
  try {
    var toys = await ToyModel.find({}).populate('brand');
    res.render('index', { title: 'Toy Store', toys });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/detail/:id', async (req, res) => {
  try {
      const id = req.params.id;
      const toys = await ToyModel.findById(id).populate('brand');
      res.render('detail', { title: 'Toy Detail', toys });
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
