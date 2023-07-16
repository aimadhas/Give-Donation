const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  titreDonation: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  GoalAmount: {
    type: Number,
    required: true,
  },
  iniAmount: {
    type: Number,
    required: true,
  },
  DonationImage: {
    type: String, 
    required:true,
  },
  date: {
    type: Date,
    required: true
  },
  org: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organisation',
  }],
  Type: {
    type: String, 
    default: 'donation'
  },
}
,
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Donation', donationSchema);