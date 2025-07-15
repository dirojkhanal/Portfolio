# Portfolio Backend API

This backend provides API endpoints for your personal portfolio, including:

- Contact form submission (with email or logging)
- Resume download tracking
- Admin API for updating content (with authentication)

## Setup

1. Install dependencies:

   ```
   cd backend
   npm install
   ```

2. (Optional) Create a `.env` file for sensitive config:

   ```
   ADMIN_PASSWORD=your_strong_password
   EMAIL_USER=your@email.com
   EMAIL_PASS=your_email_password
   ```

3. Start the server:
   ```
   npm start
   ```

## API Endpoints

### Contact Form

- `POST /api/contact` — `{ name, email, message }` (sends email or logs to console)

### Download Tracker

- `GET /api/download/resume` — Download the resume and increment the counter
- `GET /api/download/count` — Get the current download count

### Admin API

- `POST /api/admin/projects` — Update projects (requires `Authorization: Bearer <ADMIN_PASSWORD>`)
- `POST /api/admin/certificates` — Update certificates (requires `Authorization: Bearer <ADMIN_PASSWORD>`)

## Notes

- For production, use a real database and secure authentication.
- Email sending uses nodemailer (configure in `routes/contact.js`).
