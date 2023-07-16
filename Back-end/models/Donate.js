const mongoose = require('mongoose');


const DonateSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      donation : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Donation', 
        required : true
      }
})

module.exports = mongoose.model('Donate', DonateSchema);