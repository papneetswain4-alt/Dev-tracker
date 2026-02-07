const express = require("express");
const DailyLog = require("../models/DailyLog");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ➕ Add or Update Today's Log
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { hours, problems } = req.body;

    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    let log = await DailyLog.findOne({
      user: req.user.id,
      date: today
    });

    if (log) {
      // update existing
      log.hours += hours || 0;
      log.problems += problems || 0;
    } else {
      // create new
      log = new DailyLog({
        user: req.user.id,
        date: today,
        hours: hours || 0,
        problems: problems || 0
      });
    }

    await log.save();

    res.json(log);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// 📥 Get All Logs for Logged-In User
router.get("/", authMiddleware, async (req, res) => {
  try {
    const logs = await DailyLog.find({ user: req.user.id }).sort({ date: 1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
