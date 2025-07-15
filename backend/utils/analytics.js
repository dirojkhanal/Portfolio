const fs = require('fs');
const path = require('path');

const ANALYTICS_FILE = path.join(__dirname, '../data/analytics.json');

function readAnalytics() {
  if (!fs.existsSync(ANALYTICS_FILE)) {
    return { pageViews: 0, uniqueVisitors: [], resumeDownloads: [] };
  }
  return JSON.parse(fs.readFileSync(ANALYTICS_FILE, 'utf-8'));
}

function writeAnalytics(data) {
  fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(data, null, 2));
}

function logPageView(ip) {
  const data = readAnalytics();
  data.pageViews++;
  if (!data.uniqueVisitors.includes(ip)) {
    data.uniqueVisitors.push(ip);
  }
  writeAnalytics(data);
}

function logResumeDownload(ip) {
  const data = readAnalytics();
  data.resumeDownloads.push({ ip, timestamp: new Date().toISOString() });
  writeAnalytics(data);
}

function getAnalytics() {
  return readAnalytics();
}

module.exports = { logPageView, logResumeDownload, getAnalytics }; 