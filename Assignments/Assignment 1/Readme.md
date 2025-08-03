# 🧩 Assignment 1 – Lost and Found Web App (Frontend)

## 📌 Purpose

This assignment marks the beginning of the main project – **Lost and Found Web App**. The objective is to build a **React-based frontend** for the portal. This app allows users to view and add lost or found items.

You'll apply your React skills to structure the UI of the web application and organize various views like Home, Items List, Add Item, and About/Contact. Authentication and database connectivity are not required yet – focus only on **static frontend UI**.

---

## 🧰 Tech Stack Used

| Area            | Technologies                |
|------------------|-----------------------------|
| **Framework**    | React.js                    |
| **Styling**      | CSS, Bootstrap, Material UI |
| **Build Tool**   | Vite / Create React App     |
| **Package Manager** | npm / yarn               |
| **Version Control** | Git + GitHub             |

---

## ✅ Features to Implement

Your static React frontend should have the following **non-functional (UI only)** pages:

1. **Home Page**
   - Welcome section
   - Description of the portal

2. **Lost Items Page**
   - List of sample "lost" items (hardcoded or dummy)

3. **Found Items Page**
   - List of sample "found" items

4. **Add Item Page**
   - Form layout to add an item (not functional)
   - Fields: name, description, status (lost/found), location

5. **About/Contact Page**
   - Add team info / contact email / purpose of the portal

> Use **React components** for each section. Try to maintain a proper layout and routing using React Router.

---

## 📁 Recommended Folder Structure

```bash
Assignment_1_<Your Roll Number>/
│
├── public/
│   └── index.html
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Home.jsx
│   │   ├── LostItems.jsx
│   │   ├── FoundItems.jsx
│   │   ├── AddItem.jsx
│   │   └── Contact.jsx
│   │
│   ├── App.js
│   └── index.js
│
├── package.json
├── README.md
└── .gitignore
