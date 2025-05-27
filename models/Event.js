const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: {
        type: String,
        enum: ["Conference", "Birthday", "Marriage", "Meetup", "Festival"],
        required: true
    },
    description: { type: String, required: true },
    image: { type: String },
    eventDate: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    location: {
        venue: { type: String, required: true },
        address: { type: String, required: true },
    },
  createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    tickets: [
        {
            name: String,
            price: Number,
            quantity: Number,
            discription: String
        }
    ]

});

module.exports = mongoose.model("Event", eventSchema);
