const express = require('express');
const path = require('path');
const router = express.Router();

let downloadCount = 0;

// GET /api/download/resume
router.get('/resume', (req, res) => {
  const filePath = path.join(__dirname, '../..', 'assets', 'resume.pdf');
  res.download(filePath, 'resume.pdf', (err) => {
    if (err) {
      res.status(404).send('Resume not found');
    }
  });
});

// GET /api/download/count
router.get('/count', (req, res) => {
  res.json({ count: downloadCount });
});

module.exports = router; 