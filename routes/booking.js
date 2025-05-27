const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { bookTickets,
  getAllBookings,
  getBookingById,
  getBookingsByUser,
  updateBooking,
  deleteBooking} = require("../controllers/bookingController");

router.post("/book", auth, bookTickets);
router.get("/", getAllBookings);
router.get("/:id", getBookingById);
router.get("/user/:userId", getBookingsByUser);
router.put("/:id", updateBooking);
router.delete("/:id", deleteBooking);

module.exports = router;
