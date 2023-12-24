var mongoose = require('mongoose');
var ToySchema = mongoose.Schema(
    {
        name: String,
        detail: String,
        image: String,
        price: Number,
        brand: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'brands'
        }
    });
var ToyModel = mongoose.model('toys', ToySchema); 
module.exports = ToyModel;