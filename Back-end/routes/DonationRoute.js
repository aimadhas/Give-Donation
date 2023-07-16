const express = require('express');
const router = express.Router();
const Donate = require('../controllers/DonationController');
const Auth = require("../middleware/auth");

router.post('/donation', Donate.createDonation);
router.post('/donate',Donate.donate);
router.delete('/donation/:id', Donate.deleteDonation);
router.put('/donation/:id', Donate.updateDonation);
router.get('/donations', Donate.getDonations);
router.get('/donation/:id', Donate.getDonationById);
router.get('/organisations/:orgId/donation',Donate.getDonationByOrg);



module.exports = router;