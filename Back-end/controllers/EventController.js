const Event = require('../models/event');

const Favorite = require('../models/favorite');


// Create a new event
exports.addEvent = async (req, res) => {
  const newEvent = new Event(req.body);
  try {
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

// Delete an event
exports.deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({error: 'Event not found'});
    }
    res.json(deletedEvent);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

// Update an existing event
exports.updateEvent = async (req, res) => {
  try {
    const updatedEvent =
        await Event.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true,
        });
    if (!updatedEvent) {
      return res.status(404).json({error: 'Event not found'});
    }
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('org', 'name');
    res.json(events);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('org', 'name');
    if (!event) {
      return res.status(404).json({error: 'Event not found'});
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

exports.getEventsByOrg = async (req, res) => {
  try {
    const events = await Event.find({ org: req.params.orgId }).populate('org', 'name');
    res.json(events);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};


// to add to favorites list khtad aygan add les favourites atamz id n user mn d
// Id n event
exports.addFavorite =
    async (req, res) => {
  try {
    const favorite = await Favorite.create({
      user: req.user._id,  // req.user contains the authenticated user info
      event: req.params.eventId
    });
    res.status(201).json({favorite});
  } catch (err) {
    const favorite = await Favorite.create({
      user: req.user._id,  // req.user contains the authenticated user info
      event: req.params.eventId
    });
    res.status(400).json({error: favorite});
    console.log(favorite);
  }
}

    exports.deleteFavorite = async (req, res) => {
  try {
    const favorite = await Favorite.findOneAndDelete(
        {user: req.user._id, event: req.params.eventId});
    res.json({favorite});
  } catch (err) {
    const favorite = await Favorite.findOneAndDelete(
        {user: req.user._id, event: req.params.eventId});
    res.status(400).json({error: favorite});
  }
}

exports.getFavoritesByUser = async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.params.userId }).populate('event');
    res.json(favorites);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};