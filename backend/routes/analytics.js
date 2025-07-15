const express = require('express');
const { logPageView, logResumeDownload, getAnalytics } = require('../utils/analytics');
const router = express.Router();

// POST /api/analytics/pageview
router.post('/pageview', (req, res) => {
  const ip = req.ip || req.connection.remoteAddress;
  logPageView(ip);
  res.json({ success: true });
});

// GET /api/analytics
router.get('/', (req, res) => {
  res.json(getAnalytics());
});

module.exports = router; 