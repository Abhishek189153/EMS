const express = require("express");
const router = express.Router();
const {
  createEvent,
  updateEvent,
  deleteEvent,
  getEventById,
  getEventsByUser,
  getAllEvents,
  searchEvents
} = require("../controllers/eventController");

router.post("/", createEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);
router.get("/:id", getEventById);
router.get("/user/:userId", getEventsByUser);
router.get("/", getAllEvents);
router.get("/search/filter", searchEvents);

module.exports = router; // ✅ VERY IMPORTANT
