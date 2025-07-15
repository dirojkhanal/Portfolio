const express = require('express');
const router = express.Router();

// Simple in-memory admin password (replace with env var in production)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'changeme';

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || auth !== `Bearer ${ADMIN_PASSWORD}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// Example: Update projects (POST /api/admin/projects)
router.post('/projects', authMiddleware, (req, res) => {
  // Placeholder: Accepts new projects array
  const { projects } = req.body;
  // In a real app, save to DB or file
  console.log('Admin updated projects:', projects);
  res.json({ success: true });
});

// Example: Update certificates (POST /api/admin/certificates)
router.post('/certificates', authMiddleware, (req, res) => {
  const { certificates } = req.body;
  console.log('Admin updated certificates:', certificates);
  res.json({ success: true });
});

module.exports = router; 