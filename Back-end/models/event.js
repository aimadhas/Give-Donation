const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  IdEvnt: {
    type: String,
    required: true,
    unique: true
  },
  titreEvnt: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  heure: {
    type: String,
    required: true
  },
  lieu: {
    type: String,
    required: true
  },
  eventImage: {
    type: String,   
    required: true
  },
  org: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organisation'
  } ,
   Type: {
    type: String, 
    default: 'event'
  }
},
{
  timestamps: true,
}
);

module.exports = mongoose.model('Event', eventSchema);
