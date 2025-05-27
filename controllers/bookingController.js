const Event = require("../models/Event");
const Booking = require("../models/booking");

exports.bookTickets = async (req, res) => {
  try {
    const userId = req.user.id;
    const { eventId, date, venue, category, quantity } = req.body;

    // 1. Validate event
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ msg: "Event not found" });

    // 2. Match date and venue
    const inputDate = new Date(date).toISOString().split("T")[0];
    const eventDate = new Date(event.eventDate).toISOString().split("T")[0];

   // if (inputDate !== eventDate || venue !== event.venue) {
    //  return res.status(400).json({ msg: "Incorrect date or venue" });
    //}

    // 3. Check ticket availability
    if (event.tickets[category] < quantity) {
      return res.status(400).json({ msg: `Not enough ${category} tickets available` });
    }

    // 4. Subtract tickets
    event.tickets[category] -= quantity;
    event.tickets.total -= quantity;
    await event.save();

    // 5. Save booking
    const booking = new Booking({
      user: userId,
      event: eventId,
      category,
      quantity
    });
    await booking.save();

    res.status(200).json({
      msg: "Booking successful",
      booking,
      remainingTickets: event.tickets
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("user").populate("event");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("user").populate("event");
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get bookings by User ID
exports.getBookingsByUser = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId }).populate("event");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update booking
exports.updateBooking = async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(200).json({ msg: "Booking updated", booking: updatedBooking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete booking
exports.deleteBooking = async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
    if (!deletedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(200).json({ msg: "Booking deleted", booking: deletedBooking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

