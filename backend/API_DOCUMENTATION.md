# Portfolio API Documentation

Base URL: `http://localhost:5000`

## Health check
`GET /api/health` → `{ "success": true, "message": "Portfolio API is running" }`

## Submit contact form
`POST /api/contact`
Content-Type: `application/json`
```json
{"name":"Demo User","email":"demo@example.com","message":"Hello"}
```
Success (201):
```json
{"success":true,"message":"Message saved successfully.","id":"MongoDB document id"}
```
Validation error (400) returns `{ "success": false, "message": "..." }`. Database/server error returns 500.
Submissions are stored in the `contacts` collection.
