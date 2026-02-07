const mongoose = require("mongoose");

const dailyLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    date: {
      type: String, // format: YYYY-MM-DD
      required: true
    },
    hours: {
      type: Number,
      default: 0
    },
    problems: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("DailyLog", dailyLogSchema);
