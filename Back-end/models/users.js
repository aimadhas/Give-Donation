const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    f_name: {
      type: String,
      required: [true, "Please add a name"],
    },
    l_name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add a email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    city: {
      type: String,
      required: [true, "Please add a city"],
    },
    photo: {
      type: String,   
    },  
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", userSchema);
