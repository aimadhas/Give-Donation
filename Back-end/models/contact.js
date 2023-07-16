const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    f_name: {
      type: String,
      required: [true, "Please add a first name"],
    },
    l_name: {
      type: String,
      required: [true, "Please add a last name"],
    },
    email: {
      type: String,
      required: [true, "Please add a email"],
      unique: true,
    },
    phone_number: {
      type: Number,
      required: [true, "Please add a phone number"],
    },
    message: {
      type: String,
      required: [true, "Please add a message"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("contact", contactSchema);
