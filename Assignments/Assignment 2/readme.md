# 📦 Assignment 2: Backend - Lost and Found Items API

A simple Express.js + PostgreSQL backend to manage lost and found items at IIT Kanpur.

---

## ✅ CRUD APIs for Lost and Found Items

### 1️⃣ Create an Item  
**API:** `POST /items`  
**Function:** Adds a new lost or found item to the database.

#### 🔧 Postman Usage:
- Method: `POST`
- URL: `http://localhost:3000/items`
- Go to: **Body → raw → JSON**  
- Paste the following:
```json
{
  "name": "Black Wallet",
  "description": "Found near library",
  "status": "found",     // or "lost"
  "location": "IIT Kanpur Library"
}
