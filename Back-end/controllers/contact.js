
const Contact = require("../models/contact");

const createContact = async (req, res) => { // Update the function name
  try {
    const { f_name, l_name, email, phone_number, message } = req.body;

    if (!f_name || !l_name || !email || !phone_number || !message) {
      res.status(400).json({ message: "Please provide valid contact details" });
      return;
    }

    const contact = await Contact.create({
      f_name,
      l_name,
      email,
      phone_number,
      message,
    });

    res.status(201).json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  createContact, // Update the exported function name
};
