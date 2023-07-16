const express = require('express');
const router = express.Router();
const eventController = require('../controllers/EventController');
const Auth = require("../middleware/auth");

// Create a new event
router.post('/add',eventController.addEvent );
router.post('/:eventId/favorite' ,Auth.protectRoute ,eventController.addFavorite);

// Retrieve all events
router.get('/events'  ,eventController.getEvents);

// Update an existing event
router.put('/update/:id' ,eventController.updateEvent);

router.get('/organisations/:orgId/events',eventController.getEventsByOrg);

router.get('/:id',eventController.getEventById);

// Delete an event
router.delete('/delete/:id',eventController.deleteEvent);
router.delete('/:favoriteId/favorite',eventController.deleteFavorite);

// Get user favorites
router.get('/users/:userId/favorites', eventController.getFavoritesByUser);

module.exports = router;