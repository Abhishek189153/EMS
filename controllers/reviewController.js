const Review = require("../models/review");

// Create a review
exports.createReview = async (req, res) => {
  try {
    const { from, event, rating, description } = req.body;

    const newReview = new Review({ from, event, rating, description });
    await newReview.save();

    res.status(201).json({ message: "Review created", review: newReview });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a review
exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!review) return res.status(404).json({ error: "Review not found" });

    res.json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a review
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ error: "Review not found" });

    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get one review by ID
exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ error: "Review not found" });

    res.json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get reviews by user ID
exports.getReviewsByUser = async (req, res) => {
  try {
    const reviews = await Review.find({ from: req.params.userId });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get reviews for a specific event
exports.getReviewsByEvent = async (req, res) => {
  try {
    const reviews = await Review.find({ event: req.params.eventId });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all reviews
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search reviews (basic filters)
exports.searchReviews = async (req, res) => {
  try {
    const { rating, description } = req.query;

    const query = {};
    if (rating) query.rating = rating;
    if (description) query.description = { $regex: description, $options: "i" };

    const reviews = await Review.find(query);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
