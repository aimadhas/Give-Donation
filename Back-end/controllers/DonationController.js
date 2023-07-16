const Donation = require('../models/donation');
const Donate = require('../models/Donate');
const stripe = require('stripe')('sk_test_51NQcaVE0aAOUbF8tn3sLDHDep0weYJU3kzYUsqCWTtHZrtkbBz5j9fmQYW387Of7wd9DaVy1Puuh4UZEzGxYsMO300U88MWzVe');

exports.createDonation = async (req, res) => {
  const { titreDonation, description, GoalAmount, iniAmount, Type, DonationImage, org ,date} = req.body;

  // Create a Buffer object from the base64-encoded image data

  const newDonation = new Donation({
    titreDonation,
    description,
    GoalAmount,
    iniAmount,
    Type,
    DonationImage,
    org,
    date
  });
  try {
    const savedDonation = await newDonation.save();
    res.status(201).json(savedDonation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteDonation = async (req, res) => {
  try {
    const deletedDonation = await Donation.findByIdAndDelete(req.params.id);
    if (!deletedDonation) {
      return res.status(404).json({ error: 'Donation not found' });
    }
    res.json(deletedDonation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDonation = async (req, res) => {
  try {
    const updatedDonation = await Donation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedDonation) {
      return res.status(404).json({ error: 'Donation not found' });
    }
    res.json(updatedDonation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDonations = async (req, res) => {
  try {
    const donations = await Donation.find().populate('org', 'name');
    res.json(donations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.donate = async (req, res) => {
  console.log("/////////")
  const { donationId, amount , user} = req.body;
  try {
    const donation = await Donation.findById(donationId);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items:[{
        'price_data': {
          'currency': 'mad',
          'product_data': {
            'name': 'Donate',
            'images' : ['https://example.com/image.png'], // add your image URL here
          },
          'unit_amount': amount*100,
        },
        'quantity': 1,
      }],
      mode:'payment',
      success_url: 'http://194.163.172.157:4173/payement', 
    });

    const newDonate = new Donate({
      user,  
      donation: donationId,
      amount,
      session_id: session.id, 
    });
    const savedDonate = await newDonate.save();
    donation.iniAmount += amount;
    await donation.save();
    console.log(session.url)
    res.json({ sessionUrl: session.url });
  } catch (error) {
    const donation = await Donation.findById(donationId);
    res.status(400).json({ message: error.message, donation });
  }
};

exports.getDonationById = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id).populate('org', 'name');
    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }
    res.json(donation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDonationByOrg = async (req, res) => {
  try {
    const donations = await Donation.find({ org: req.params.orgId }).populate('org', 'name');
    res.json(donations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};