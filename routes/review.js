const express = require("express");
const router = express.Router();
const {
  createReview,
  updateReview,
  deleteReview,
  getReviewById,
  getReviewsByUser,
  getReviewsByEvent,
  getAllReviews,
  searchReviews
} = require("../controllers/reviewController");


router.post("/", createReview);


router.put("/:id", updateReview);


router.delete("/:id", deleteReview);


router.get("/:id", getReviewById);

router.get("/user/:userId", getReviewsByUser);


router.get("/event/:eventId", getReviewsByEvent);


router.get("/", getAllReviews);


router.get("/search/filter", searchReviews); // Always place after specific routes

module.exports = router;
