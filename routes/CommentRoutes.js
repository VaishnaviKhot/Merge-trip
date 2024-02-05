// commentRoutes.js
const express = require("express");
const router = express.Router();
const Comment = require("../models/Comments");
const Trip = require("../models/Trip");

// const commentRoutes = require('./path-to-commentRoutes.js');
// app.use('/api/comment', commentRoutes);


router.post("/add-comment", async (req, res) => {
  try {
    const { tripId, text } = req.body;
    const newComment = new Comment({ tripId, text });
    await newComment.save();

    // Update the trip with the new comment ID
    await Trip.findByIdAndUpdate(tripId, { $push: { comments: newComment._id } });

    res.status(201).json({ success: true, comment: newComment });
  } catch (error) {
    console.error("Error saving comment:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

router.get("/comments-for-trip/:tripId", async (req, res) => {
  try {
    const tripId = req.params.tripId;

    // Populate the comments in the trip details
    const tripWithComments = await Trip.findById(tripId).populate("comments").exec();

    if (!tripWithComments) {
      return res.status(404).json({ success: false, error: "Trip not found" });
    }

    res.status(200).json({ success: true, comments: tripWithComments.comments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
