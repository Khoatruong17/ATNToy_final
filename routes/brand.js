var express = require('express');
var router = express.Router();
var ToyModel = require('../models/ToyModel');
var BrandModel = require('../models/BrandModel');

router.get('/', async (req, res) => {
  try {
    var brands = await BrandModel.find({});
    res.render('admin/brand/index', { brands });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/add', (req, res) => {
  res.render('admin/brand/add');
})

router.post('/add', async (req, res) => {
  var brand = req.body;
  try {
    await BrandModel.create(brand);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
  res.redirect('/brand');
})

router.get('/edit/:id', async (req, res) => {
  var id = req.params.id;
  try {
    var brand = await BrandModel.findById(id);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
  res.render('admin/brand/edit', {brand}); 
});

router.post('/edit/:id', async (req, res) => {
  var id = req.params.id;
  var brand = req.body;
  try{
     await BrandModel.findByIdAndUpdate(id, brand);
     console.log('updated successfully')
  }
  catch(err){
     console.log('update error:', err)
  }
  res.redirect('/brand'); 
})

router.get('/delete/:id', async(req, res) => {
  var id = await req.params.id;
  try{
    await BrandModel.findByIdAndRemove(id);
    console.log('deleted Brand successfully')
 }
 catch(err){
   console.error(error);
   res.status(500).send('Internal Server Error');
 }
 res.redirect('/brand');
})

module.exports = router;