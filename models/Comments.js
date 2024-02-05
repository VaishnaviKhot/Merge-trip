// commentModel.js
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: "Trip" },
  text: String,
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
