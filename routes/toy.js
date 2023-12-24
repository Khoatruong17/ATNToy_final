var express = require('express');
var router = express.Router();
var ToyModel = require('../models/ToyModel');
var BrandModel = require('../models/BrandModel');

router.get('/', async (req, res) => {
  try {
    var toys = await ToyModel.find({}).populate('brand');
    res.render('admin/toy/index', { title: 'Admin - List of Toy', toys });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
})

router.get('/add', async (req, res) => {
  try {
    var brands = await BrandModel.find({});
    res.render('admin/toy/add', { title: 'Admin - Add Toy', brands });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
})


router.post('/add', async (req, res) => {
  var toy = req.body;
  try {
    await ToyModel.create(toy);
    console.log('added toy successfully')
    res.redirect('/toy');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
})

router.get('/edit/:id', async (req, res) => {
  var id = req.params.id;
  try {
    var toy = await ToyModel.findById(id);
    var brands = await BrandModel.find({});
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
  res.render('admin/toy/edit', { title: 'Admin - Edit Toy', toy, brands });
});

router.post('/edit/:id', async (req, res) => {
  var id = req.params.id;
  var toy = req.body;
  try{
     await ToyModel.findByIdAndUpdate(id, toy);
     console.log('updated toy successfully')
  }
  catch(err){
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
  res.redirect('/toy'); 
})

router.get('/delete/:id', async(req, res) => {
  var id = await req.params.id;
  try{
    await ToyModel.findByIdAndRemove(id);
    console.log('deleted toy successfully')
 }
 catch(err){
   console.error(error);
   res.status(500).send('Internal Server Error');
 }
 res.redirect('/toy');
})



module.exports = router;