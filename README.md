# 🔍 Lost and Found Web App – README

Welcome to the official documentation and submission guidelines for the **Lost and Found Web Application Project**.

This project is designed to guide you through the full web development lifecycle – from basic HTML/CSS/JS to advanced backend technologies – by building a full-stack Lost and Found portal.

---

## 🧰 Tech Stack Used

| Layer         | Technologies Used                                               |
|---------------|----------------------------------------------------------------|
| **Frontend**  | HTML, CSS, JavaScript, React.js, Bootstrap, Material UI        |
| **Backend**   | Node.js, Express.js                                            |
| **Database**  | PostgreSQL (using Filess.io hosting)                           |
| **API Tools** | Postman, ThunderClient (VS Code extension)                     |
| **Version Control** | Git, GitHub                                             |
| **Deployment (Optional)** | Render / Vercel / Netlify / Railway (suggested) |

---

## 📆 Week-wise Plan

### 🟢 Week 0: Frontend Basics – *HTML, CSS, JavaScript*
**Deadline**: 15th May EOD

- Learn and practice HTML, CSS, and JavaScript fundamentals.
- Complete beginner tutorials and reference docs.

---

### 📝 Assignment 0: Personal Resume Website
**Deadline**: 21st May EOD

Build a **Personal Information Website** using HTML, CSS, and JavaScript.  
Include:
- Dynamic greeting message (Good Morning/Afternoon/Evening)
- Current date and weekday using JS
- Sections for:
  - Name
  - About Me
  - Education
  - Skills
  - Hobbies
  - Contact Details
- At least one profile image and other relevant images

---

### ⚛️ Week 1: Advanced Frontend – *React + UI Libraries*
**Deadline**: 31st May EOD

- React basics: components, props, state, hooks
- UI Libraries: Bootstrap & Material UI
- Setup your first React app

---

### 📝 Assignment 1: Frontend for Lost and Found
**Deadline**: 14th June EOD

- Create a **React-based frontend** for your Lost and Found site.
- Include pages like:
  - Home
  - Lost Items
  - Found Items
  - Add Item Form
  - About/Contact
- No need to make login/register functional yet.

---

### 🖥️ Week 2 & 3: Backend Development – *CRUD APIs*
**Deadline**: 29th June EOD

- Build CRUD APIs using **Node.js + Express.js**
- Connect to **PostgreSQL** hosted on Filess.io
- Create and test routes using **Postman**

#### APIs to Implement:
- `POST /items` → Add lost/found item
- `GET /items` → View all items
- `PUT /items/:id` → Update item info
- `DELETE /items/:id` → Delete item

#### PostgreSQL Table Schema:
```sql
CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT CHECK (status IN ('lost', 'found', 'returned to owner')),
  location TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
