const Event = require("../models/Event");

exports.createEvent = async (req, res) => {
  try {
    const { title, category, description, image, eventDate,startTime, endTime, location, userId,tickets } = req.body;

    const newEvent = new Event({
      title,
      category,
      description,
      image,
      eventDate,
      startTime, 
      endTime,
      location,
      createdBy: userId,
      tickets
    });

    await newEvent.save();
    res.status(201).json({ msg: "Event created successfully", event: newEvent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/events/:id
exports.updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedEvent) return res.status(404).json({ error: "Event not found" });

    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/events/:id
exports.deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) return res.status(404).json({ error: "Event not found" });

    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/events/:id
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/events/user/:userId
exports.getEventsByUser = async (req, res) => {
  try {
    const events = await Event.find({ createdBy: req.params.userId });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/events/search?title=music&category=concert
exports.searchEvents = async (req, res) => {
  try {
    const { title, category, location, date } = req.query;

    const query = {};

    if (title) query.title = { $regex: title, $options: "i" };
    if (category) query.category = category;
    if (location) query.location = { $regex: location, $options: "i" };
    if (date) query.eventDate = new Date(date);

    const events = await Event.find(query);
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


