# 🛠 Assignment 2 – Backend Development for Lost and Found Web App

## 📝 Summary

In Assignment 2, you will develop the **backend** for the Lost and Found Web App.  
Your task is to create a set of **CRUD APIs** using **Node.js**, **Express.js**, and **PostgreSQL**.  
This forms the server-side logic for storing, retrieving, updating, and deleting lost and found item data.

---

## 🎯 Objective

Build a fully functional REST API to interact with the `items` database, enabling clients (your frontend from Assignment 1) to:

- Add a new lost/found item
- View all items
- Update item status/details
- Delete an item

---

## 🧰 Tech Stack Used

| Layer         | Technology                   |
|---------------|-------------------------------|
| **Backend**   | Node.js, Express.js           |
| **Database**  | PostgreSQL (via Filess.io)    |
| **API Testing**| Postman / ThunderClient (VS Code) |
| **Env Handling** | dotenv                     |
| **Version Control** | Git + GitHub            |

---

## ✅ Features to Implement (APIs)

> **Table Name:** `items`

1. **Create an Item**  
   - **Method:** `POST`  
   - **Route:** `/items`  
   - **Body Example:**
   ```json
   {
     "name": "Black Wallet",
     "description": "Found near library",
     "status": "found", // or "lost"
     "location": "IIT Kanpur Library"
   }
   ```

2. **Get All Items**  
   - **Method:** `GET`  
   - **Route:** `/items`

3. **Update an Item**  
   - **Method:** `PUT`  
   - **Route:** `/items/:id`  
   - **Body Example:**
   ```json
   {
     "status": "returned to owner"
   }
   ```

4. **Delete an Item**  
   - **Method:** `DELETE`  
   - **Route:** `/items/:id`

---

## 🧪 Sample Table Schema (PostgreSQL)

```sql
CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT CHECK (status IN ('lost', 'found', 'returned to owner')),
  location TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🗃️ Setting Up PostgreSQL on Filess.io

1. Go to: [https://dash.filess.io](https://dash.filess.io)
2. Click **"Create Database"**
3. Choose:
   - **Database Type:** PostgreSQL
   - **Name:** `lost_and_found`
   - Select region → **Create**
4. Copy database credentials (host, port, user, password)

---

## ⚙️ Connecting to PostgreSQL (Node.js)

> Use these credentials in a `.env` file

```env
DB_USER=your_user
DB_HOST=your_host
DB_NAME=lost_and_found
DB_PASSWORD=your_password
DB_PORT=5432
```

```js
// db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = pool;
```

---

## 🧾 Folder Structure

```bash
Assignment_2_<Your Roll Number>/
│
├── server.js
├── db.js
├── .env
├── package.json
├── routes/
│   └── items.js
└── README.md
```

---

## 🚀 How to Run Locally

```bash
# Step 1: Install dependencies
npm install

# Step 2: Start the server
node server.js   # or use nodemon

# Step 3: Test using Postman or ThunderClient
```

---

## 📦 Useful NPM Packages

- `express` – Web framework
- `pg` – PostgreSQL client
- `dotenv` – For environment variables
- `nodemon` – Auto-restart dev server
- `cors` – Enable cross-origin requests (optional)

---

## 🛡️ Submission Instructions

1. **Folder Name**: `Assignment_2_<Your Roll Number>`
2. **Upload To**: `Assignments/Assignment2/`
3. **Push & Create a Pull Request** to the main GitHub repository

Make sure:
- Your backend runs without crashing
- All API routes return expected responses
- You’ve documented your code with proper comments

---

## 💡 Tips

- Keep your database and server logic separate for clarity
- Use `.env` file to avoid hardcoding credentials
- Validate your inputs and handle errors gracefully

---

## 🙌 Acknowledgements

This backend assignment is part of the **Lost and Found Web App Project**, aimed at making you confident in backend development with real databases and APIs.