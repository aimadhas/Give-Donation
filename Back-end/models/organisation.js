const mongoose = require('mongoose');

const orgSchema = new mongoose.Schema({
  org_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String, 
    required: true  
  },
  picture: {
    type: String,   
  },  
  city: {
    type: String,   
    required: true  
  },
  address: {
    type: String,   
    required: true   
  },  
  Type: {
    type: String,   
    required: true   
  },
  Descripion: {
    type: String,   
    required: true   
  } 
}, {
  timestamps: true  
});

module.exports = mongoose.model('Organisation', orgSchema);


// const mongoose = require('mongoose');

// const orgSchema = new mongoose.Schema({
//   org_name: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   password: {
//     type: String, 
//     required: true  
//   },
//   picture: {
//     data: String,
//     contentType: String,
//   },   
//   city: {
//     type: String,   
//     required: true  
//   },
//   address: {
//     type: String,   
//     required: true   
//   },  
//   Type: {
//     type: String,   
//     required: true   
//   },
//   Descripion: {
//     type: String,   
//     required: true   
//   } 
// }, {
//   timestamps: true  
// });

// module.exports = mongoose.model('Organisation', orgSchema);