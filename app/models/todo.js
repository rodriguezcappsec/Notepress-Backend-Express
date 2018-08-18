const mongoose = require("mongoose");
module.exports = mongoose.model(
  "Todo",
  new mongoose.Schema(
    {
      todo: {
        type: String,
        required: true
      },
      noteID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Note",
        required: true
      }
    },
    {
      timestamps: true
    }
  )
);
