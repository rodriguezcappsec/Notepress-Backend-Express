const mongoose = require("mongoose");
module.exports = mongoose.model(
  "Notes",
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true
      },
      note: {
        type: String,
        required: true
      },
      userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      }
    },
    {
      timestamps: true
    }
  )
);
