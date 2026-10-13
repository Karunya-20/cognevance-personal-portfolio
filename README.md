# Personal Portfolio Website

## Features
- Responsive React portfolio sections: About, Skills, Projects, Contact.
- Primary portfolio sections use anchor navigation. Backend API documentation is available at http://localhost:5000/api-docs while the backend is running.
- Contact form calls Express API, validates required values, and stores submissions in MongoDB.
- Backend health endpoint and API documentation included.

## Setup
### Backend
```bash
cd backend
npm install
```
Copy `.env.example` to `.env`; set `MONGODB_URI` to a local MongoDB or Atlas connection string, then:
```bash
npm run dev
```
The server listens on port 5000 after MongoDB connects.

### Frontend
```bash
cd frontend
npm install
```
Copy `.env.example` to `.env`, then run:
```bash
npm run dev
```
Open the Vite URL printed in terminal (normally http://localhost:5173).

## Database
MongoDB database: `cognevance_portfolio`; collection: `contacts`.
Fields: `name`, `email`, `message`, `createdAt`.

## Test
1. Open the website, complete the contact form, and submit.
2. Confirm success message.
3. Check MongoDB `contacts` collection for the saved document.
4. `GET http://localhost:5000/api/health`.

## Deployment
Deploy frontend to Vercel/Netlify with `VITE_API_URL` set to the deployed backend URL. Deploy backend to Render and set `MONGODB_URI`, `FRONTEND_URL`, and `PORT`. Add real deployment URLs here after verifying them.

## Screenshots
Place real screenshots in `docs/screenshots/`. Do not use mock screenshots as proof of a running deployment.
