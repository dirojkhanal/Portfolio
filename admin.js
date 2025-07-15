// Admin Dashboard Interactivity
const API_BASE = 'http://localhost:4000';
const loginContainer = document.getElementById('admin-login');
const dashboardContainer = document.getElementById('admin-dashboard');
const loginForm = document.getElementById('admin-login-form');
const loginError = document.getElementById('admin-login-error');
const sidebarLinks = document.querySelectorAll('.admin-sidebar nav ul li[data-section]');
const sections = document.querySelectorAll('.admin-section');
let adminToken = null;

// Sidebar navigation
sidebarLinks.forEach(link => {
  link.addEventListener('click', () => {
    sidebarLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    sections.forEach(sec => sec.style.display = 'none');
    document.getElementById('section-' + link.dataset.section).style.display = '';
  });
});

// Login
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  loginError.textContent = '';
  const username = loginForm.username.value;
  const password = loginForm.password.value;
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  if (data.success && data.token) {
    adminToken = data.token;
    loginContainer.style.display = 'none';
    dashboardContainer.style.display = '';
    loadDashboard();
  } else {
    loginError.textContent = data.error || 'Login failed';
  }
});

// Logout
const logoutBtn = document.getElementById('admin-logout');
logoutBtn.addEventListener('click', () => {
  adminToken = null;
  dashboardContainer.style.display = 'none';
  loginContainer.style.display = '';
  loginForm.reset();
});

// Utility: fetch with auth
async function apiFetch(url, options = {}) {
  options.headers = options.headers || {};
  if (adminToken) options.headers['Authorization'] = 'Bearer ' + adminToken;
  return fetch(url, options);
}

// Render list for a section
function renderList(type, list, container, fields) {
  container.innerHTML = '';
  list.forEach(item => {
    const div = document.createElement('div');
    div.className = 'admin-list-item';
    div.innerHTML = fields.map(f => `<span>${item[f] || ''}</span>`).join(' ');
    // Edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => showEditForm(type, item, fields, container);
    // Delete button
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.onclick = async () => {
      if (confirm('Delete this item?')) {
        await apiFetch(`${API_BASE}/api/content/${type}/${item.id}`, { method: 'DELETE' });
        loadSection(type);
      }
    };
    div.appendChild(editBtn);
    div.appendChild(delBtn);
    container.appendChild(div);
  });
}

// Show add/edit form
function showEditForm(type, item, fields, container) {
  const form = document.createElement('form');
  form.className = 'admin-edit-form';
  fields.forEach(f => {
    const input = document.createElement('input');
    input.name = f;
    input.placeholder = f.charAt(0).toUpperCase() + f.slice(1);
    input.value = item ? item[f] || '' : '';
    form.appendChild(input);
  });
  const saveBtn = document.createElement('button');
  saveBtn.type = 'submit';
  saveBtn.textContent = item ? 'Update' : 'Add';
  form.appendChild(saveBtn);
  form.onsubmit = async e => {
    e.preventDefault();
    const data = {};
    fields.forEach(f => data[f] = form[f].value);
    if (item) {
      await apiFetch(`${API_BASE}/api/content/${type}/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    } else {
      await apiFetch(`${API_BASE}/api/content/${type}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    }
    loadSection(type);
    form.remove();
  };
  container.appendChild(form);
}

// Load and render a section
async function loadSection(type) {
  let fields = [];
  if (type === 'projects') fields = ['title', 'description', 'link'];
  if (type === 'certificates') fields = ['title', 'provider', 'link'];
  if (type === 'skills') fields = ['name', 'level'];
  const container = document.getElementById(`admin-${type}-list`);
  const list = await fetch(`${API_BASE}/api/content/${type}`).then(r => r.json());
  renderList(type, list, container, fields);
  // Add button
  const addBtn = document.getElementById(`add-${type.slice(0, -1)}-btn`);
  addBtn.onclick = () => showEditForm(type, null, fields, container);
}

// Hook up section loads
sidebarLinks.forEach(link => {
  link.addEventListener('click', () => {
    const section = link.dataset.section;
    if (['projects', 'certificates', 'skills'].includes(section)) {
      loadSection(section);
    }
  });
});

// Initial load for dashboard
async function loadDashboard() {
  // Fetch counts
  const [projects, certificates, skills, contacts] = await Promise.all([
    fetch(`${API_BASE}/api/content/projects`).then(r => r.json()),
    fetch(`${API_BASE}/api/content/certificates`).then(r => r.json()),
    fetch(`${API_BASE}/api/content/skills`).then(r => r.json()),
    fetch(`${API_BASE}/api/contact_submissions`).then(r => r.json()).catch(() => []),
  ]);
  document.getElementById('count-projects').textContent = projects.length;
  document.getElementById('count-certificates').textContent = certificates.length;
  document.getElementById('count-skills').textContent = skills.length;
  document.getElementById('count-contacts').textContent = contacts.length || 0;

  // Load analytics
  const analytics = await fetch(`${API_BASE}/api/analytics`).then(r => r.json());
  renderAnalyticsChart(analytics);

  // Also load lists for all sections
  loadSection('projects');
  loadSection('certificates');
  loadSection('skills');
}

// Render analytics chart
function renderAnalyticsChart(analytics) {
  const ctx = document.getElementById('analytics-chart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Page Views', 'Unique Visitors', 'Resume Downloads'],
      datasets: [{
        label: 'Analytics',
        data: [analytics.pageViews || 0, (analytics.uniqueVisitors || []).length, (analytics.resumeDownloads || []).length],
        backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc']
      }]
    },
    options: { responsive: true, plugins: { legend: { display: false } } }
  });
}

// TODO: Add CRUD actions for projects, certificates, skills, contacts 