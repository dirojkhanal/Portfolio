const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const { requireAuth } = require('./auth');
const { v4: uuidv4 } = require('uuid');

const DATA_PATHS = {
  projects: path.join(__dirname, '../data/projects.json'),
  certificates: path.join(__dirname, '../data/certificates.json'),
  skills: path.join(__dirname, '../data/skills.json'),
};

function readData(type) {
  const file = DATA_PATHS[type];
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, 'utf-8'));
}

function writeData(type, data) {
  const file = DATA_PATHS[type];
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// POST endpoints (update)
router.post('/:type', requireAuth, (req, res) => {
  const { type } = req.params;
  if (!DATA_PATHS[type]) return res.status(404).json({ error: 'Invalid type' });
  writeData(type, req.body);
  res.json({ success: true });
});

// Add new item
router.post('/:type/add', requireAuth, (req, res) => {
  const { type } = req.params;
  if (!DATA_PATHS[type]) return res.status(404).json({ error: 'Invalid type' });
  const items = readData(type);
  const newItem = { ...req.body, id: req.body.id || uuidv4() };
  items.push(newItem);
  writeData(type, items);
  res.json({ success: true, item: newItem });
});

// Update item by id
router.put('/:type/:id', requireAuth, (req, res) => {
  const { type, id } = req.params;
  if (!DATA_PATHS[type]) return res.status(404).json({ error: 'Invalid type' });
  let items = readData(type);
  const idx = items.findIndex(i => i.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Item not found' });
  items[idx] = { ...items[idx], ...req.body, id };
  writeData(type, items);
  res.json({ success: true, item: items[idx] });
});

// Delete item by id
router.delete('/:type/:id', requireAuth, (req, res) => {
  const { type, id } = req.params;
  if (!DATA_PATHS[type]) return res.status(404).json({ error: 'Invalid type' });
  let items = readData(type);
  const idx = items.findIndex(i => i.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Item not found' });
  const deleted = items.splice(idx, 1);
  writeData(type, items);
  res.json({ success: true, item: deleted[0] });
});

// Explicit GET routes for each type
router.get('/skills', (req, res) => {
  try {
    res.json(readData('skills'));
  } catch (e) {
    res.json([]);
  }
});

router.get('/certificates', (req, res) => {
  try {
    res.json(readData('certificates'));
  } catch (e) {
    res.json([]);
  }
});

router.get('/projects', (req, res) => {
  try {
    res.json(readData('projects'));
  } catch (e) {
    res.json([]);
  }
});

module.exports = router; 