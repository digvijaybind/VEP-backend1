const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tokenSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    token: {
      type: String,
      required: true,
    },
  },
  {
    timestamp: true,
  }
);

module.exports = new mongoose.model("Token", tokenSchema);
