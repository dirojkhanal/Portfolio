require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;
const contactRouter = require('./routes/contact');
const downloadRouter = require('./routes/download');
const adminRouter = require('./routes/admin');
const fs = require('fs');
const path = require('path');
const analyticsRouter = require('./routes/analytics');
const contentRouter = require('./routes/content');
const { router: authRouter } = require('./routes/auth');
const contactSubmissionsRouter = require('./routes/contact_submissions');

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

app.use(cors());
app.use(express.json());
app.use('/api/contact', contactRouter);
app.use('/api/download', downloadRouter);
app.use('/api/admin', adminRouter);
app.use('/api/auth', authRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/content', contentRouter);
app.use('/api/contact_submissions', contactSubmissionsRouter);

app.get('/', (req, res) => {
  res.send('Portfolio Backend API is running.');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 