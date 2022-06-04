const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema(
    { 
        name: { type: String }, 
        region: { type: String },
    }, 
    { 
        collection: 'countries' ,
    }
);

const countryModel = mongoose.model('country', countrySchema);

module.exports = countryModel;