const mongoose = require("mongoose");
module.exports = mongoose.model(
  "Todo",
  new mongoose.Schema(
    {
      todo: {
        type: String,
        required: true
      },
      isCompleted: {
        type: Boolean
      },
      noteID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Note"
      }
    },
    {
      timestamps: true
    }
  )
);
