const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  rating: { type: String,min:1,max:5, required: true },
  description: { type: String, required: true }
 
});

module.exports = mongoose.model("Review", reviewSchema);
