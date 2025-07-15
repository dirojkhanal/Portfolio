const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const SUBMISSIONS_FILE = path.join(__dirname, '../data/contact_submissions.json');

router.get('/', (req, res) => {
  if (!fs.existsSync(SUBMISSIONS_FILE)) return res.json([]);
  const submissions = JSON.parse(fs.readFileSync(SUBMISSIONS_FILE, 'utf-8'));
  res.json(submissions);
});

module.exports = router; 