const express = require("express");
const router = express.Router();
const ChocolateLog = require("../models/ChocolateLog");

router.post("/", async (req, res) => {
  try {
    const newLog = new ChocolateLog(req.body);
    await newLog.save();
    res.status(201).json(newLog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const logs = await ChocolateLog.find().sort({ timestamp: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/summary", async (req, res) => {
  try {
    const logs = await ChocolateLog.find();
    const summary = {
      totalConsumed: 0,
      byMember: {},
      byType: {}
    };

    logs.forEach(log => {
      summary.totalConsumed += log.quantity;
      summary.byMember[log.member] = (summary.byMember[log.member] || 0) + log.quantity;
      summary.byType[log.type] = (summary.byType[log.type] || 0) + log.quantity;
    });

    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;